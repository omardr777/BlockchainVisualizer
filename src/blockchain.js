const SHA256 = require('crypto-js/sha256');
const EC = require('elliptic').ec;
const ec = new EC('secp256k1');

class Transaction {
    constructor(fromAddress, toAddress, amount) {
        this.fromAddress = fromAddress;
        this.toAddress = toAddress;
        this.amount = amount;
        // this.timestamp = Date.now();
    }
    calculateHash() {
        // if (this.fromAddress == null) { this.fromAddress = "System" }
        return SHA256(this.fromAddress + this.toAddress + this.amount).toString();
    }
    sighTransaction(signingKey) {
        if (signingKey.getPublic('hex') !== this.fromAddress) {
            throw new Error('You cannot sign transactions for other wallets')
        }
        const hashTx = this.calculateHash();
        const sig = signingKey.sign(hashTx, 'base64')
        this.signature = sig.toDER('hex');
    }
    isValid() {
        if (this.fromAddress === "System") return true;
        if (!this.signature || this.signature.length === 0) {
            // throw new Error('No signature available')
            return false;
        }
        const publicKey = ec.keyFromPublic(this.fromAddress, 'hex')
        return publicKey.verify(this.calculateHash(), this.signature);
    }
}


class Block {
    constructor(timestamp, transactions, previousHash = '') {

        this.transactions = transactions;
        this.timestamp = timestamp;
        this.previousHash = previousHash;
        this.hash = this.calculateHash();
        this.nonce = 0;
    }

    calculateHash() {
        return SHA256(JSON.stringify(this.transactions) + this.previousHash + this.nonce).toString();
    }

    mine(difficulty) {
        this.nonce = 0;
        while (this.hash.substring(0, difficulty) !== Array(difficulty + 1).join('0')) {
            this.nonce++;
            this.hash = this.calculateHash();
        }
        console.log("Block mined: " + this.hash, this.nonce)
    }
    hasValidTransactions() {
        for (const tx of this.transactions) {
            if (!tx.isValid()) return false
        }
        return true;
    }
    isValid(difficulty) {
        if (this.calculateHash().substring(0, difficulty) !== Array(difficulty + 1).join('0')) {
            return false;
        }
        return true;
    }


}

class Blockchain {
    constructor() {
        this.difficulty = 2;
        this.chain = [this.createGensisBlock()];
        this.pendingTransactions = [];
        this.miningReward = 100;
    }
    createGensisBlock() {
        let b = new Block("Founder Block", [], "0");
        let t = this.difficulty
        b.mine(t)
        return b
    }

    getLatestBlock() {
        return this.chain[this.chain.length - 1];
    }

    // addBlock(newBlock) {
    //     newBlock.previousHash = this.getLatestBlock().hash;
    //     newBlock.mine(this.difficulty)
    //     this.chain.push(newBlock);
    // }

    minePendingTransaction(miningRewardAddress) {
        this.pendingTransactions.push(new Transaction('System', miningRewardAddress, this.miningReward))
        // console.log(this.pendingTransactions)
        let block = new Block(Date.now(), this.pendingTransactions, this.getLatestBlock().hash);
        block.mine(this.difficulty)
        console.log("block successfully mined");
        this.chain.push(block);
        this.pendingTransactions = [];

    }
    addTransaction(transaction) {
        if (!transaction.fromAddress || !transaction.toAddress) throw new Error("Transaction must include from address and to address");
        if (!transaction.isValid()) throw new Error('cannot add invalid transaction to chain')
        this.pendingTransactions.push(transaction);
    }
    getBalanceOfAddress(address) {
        let balance = 0;
        for (const block of this.chain) {
            for (const trans of block.transactions) {
                if (trans.fromAddress === address) {
                    balance -= trans.amount
                }
                if (trans.toAddress === address) {
                    balance += trans.amount
                }
            }
        }
        return balance
    }
    getAllTransactionsForWallet(address) {
        const txs = [];

        for (const block of this.chain) {
            for (const tx of block.transactions) {
                if (tx.fromAddress === address || tx.toAddress === address) {
                    txs.push(tx);
                }
            }
        }
        return txs;
    }
    hashChangeing() {
        for (let i = 1; i < this.chain.length; i++) {
            const curBlock = this.chain[i];
            const prevBlock = this.chain[i - 1];
            curBlock.previousHash = prevBlock.hash
        }
    }
    isChainValid() {
        for (let i = 1; i < this.chain.length; i++) {
            const curBlock = this.chain[i];
            const prevBlock = this.chain[i - 1];
            if (!curBlock.hasValidTransactions()) return false;
            // if (curBlock.hash !== curBlock.calculateHash()) { return false }
            // if (prevBlock.hash !== prevBlock.calculateHash()) { return false }
            if (curBlock.previousHash !== prevBlock.calculateHash()) { return false }
        }
        return true;
    }
}

module.exports.Blockchain = Blockchain;
module.exports.Transaction = Transaction;