// const EC = require('elliptic').ec;
// const ec = new EC('secp256k1');
// const key = ec.genKeyPair();
// const publicKey = key.getPublic('hex');
// const privateKey = key.getPrivate('hex');

// console.log(publicKey, privateKey);
const EC = require('elliptic').ec;

// You can use any elliptic curve you want
const ec = new EC('secp256k1');

// Generate a new key pair and convert them to hex-strings
const key = ec.genKeyPair();
const publicKey = key.getPublic('hex');
const privateKey = key.getPrivate('hex');

// function getKey() {

// }

// Print the keys to the console
console.log();
console.log('Your public key (also your wallet address, freely shareable)\n', publicKey);

console.log();
console.log('Your private key (keep this secret! To sign transactions)\n', privateKey);
exports.getKey = () => {
    return { keyObj: key, publicKey: publicKey, privateKey: privateKey };
};