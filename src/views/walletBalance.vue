<template>
<div class="containe">
  <h1 class="h1"> Address </h1>
  <span><strong class="text-start text-wrap">{{this.$route.params.id}}</strong></span>
  <br>
  <br>
  <p class=" text-lg-start h5">Wallet Balance : {{this.$blockchain.getBalanceOfAddress(this.$route.params.id)}}</p>
   <h2 class="h4">Transactions on this wallet</h2>
   <TransTable :trans="this.$blockchain.getAllTransactionsForWallet(this.$route.params.id)"/>
</div>
</template>

<script>
import TransTable from '../components/transTable.vue'
export default {
    components:{TransTable},
}
</script>

<style>

</style>