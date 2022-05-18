<template>
  <div class="container">
	<h1>Create transaction</h1>
	<p>Transfer some money to someone!</p>
    <!-- <p>{{this.$blockchain}}</p>
    <p>{{this.trx}}</p> -->
	<br>

	<div class="form-group">
	    <label for="fromAddress">From address</label>
	    <input type="text" class="form-control" id="fromAddress" :value="this.$walletKey.publicKey" disabled>
	    <small id="fromAddressHelp" class="form-text text-muted">
	    	This is your wallet address. You cannot change it because you can only spend your own coins.
	    </small>
  	</div>

  	<div class="form-group">
	    <label for="toAddress">To address</label>
	    <input type="text" class="form-control"  v-model="toAddress">
	    <small id="toAddressHelp" class="form-text text-muted">
	    	The address of the wallet where you want to send the money to. You can type random text here (if you are not interested in recovering the funds)
	    </small>
  	</div>

  	<div class="form-group">
	    <label for="amount">Amount</label>
	    <input type="number" class="form-control" id="amount" v-model="amount">
	    <small id="amountHelp" class="form-text text-muted">
	    	You can transfer any amount. Account balance is not checked in this demo. Have at it!
	    </small>
  	</div>

  	
</div>

<button @click="createTran" class="btn btn-primary">Sign & create transaction</button>

</template>

<script>
import {Transaction} from '../blockchain'
export default {
    data(){
        return{ 
            toAddress : '',
            amount:null
         }
    },
    methods:{
        createTran(){
            let t = new Transaction(this.$walletKey.publicKey,this.toAddress,this.amount)
            t.sighTransaction(this.$walletKey.keyObj);
            this.$blockchain.addTransaction(t);
            this.toAddress ='';
            this.amount = null
            this.$router.push('/pending-trx')
        }
    },
    
}
</script>

<style>

</style>