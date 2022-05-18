<template>
  <div class="container">
	<h1>Pending transactions</h1>
	<p>These transactions are waiting to be included in the next block. Next block is created when you start the mining process.</p>

	<!-- <p>{{this.$blockchain.pendingTransactions}}</p> -->
    <p v-if="this.$blockchain.pendingTransactions.length == 0">No Pending</p>
    <table class="table table-striped" v-else>
        <thead>
            <tr>
                <th scope="col">#</th>
                <th scope="col">From</th>
                <th scope="col">To</th>
                <th scope="col">Amount</th>
                
                <th scope="col">Valid?</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="(tx,index) in this.$blockchain.pendingTransactions" :key="index">
                <td>{{index}}</td>
                <td class="text-truncate" style="max-width: 100px;">
                    <span v-if="tx.fromAddress != null">{{tx.fromAddress}}</span>
                    <span v-else>System</span>
                </td>
                <td class="text-truncate" style="max-width: 100px;">
                    <span>{{tx.toAddress}}</span>
                </td>
                <td class="text-truncate" style="max-width: 100px;">
                 <span>{{tx.amount}}</span>
                </td>
                <td style="max-width: 40px;">
                    <span v-if="tx.isValid()">✓</span>
                    <span v-if="!tx.isValid()">✗</span>
                </td>
            </tr>
        </tbody>
    </table>
	 <button class="btn btn-primary" @click="minePending" v-if="this.$blockchain.pendingTransactions.length == 0" disabled>
     	Start mining
    </button>
     <button class="btn btn-primary" @click="minePending" v-else>
     	Start mining
    </button>
</div>
</template>

<script>
export default {
    methods:{
        minePending(){
            this.$blockchain.minePendingTransaction(this.$walletKey.publicKey);
            this.$router.push('/')
        }
    }
}
</script>

<style>

</style>