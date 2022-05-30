<template>
    <div class="container" style="overflow-x: auto;white-space: nowrap; margin-top:1rem;">
        <div v-for="(block,index) in this.blocks.chain" :key="index" style="display:inline-block">
            <BlockComp :blockI="block" :nonceI="block.nonce" :diffI="this.$blockchain.difficulty" :amountI="block.transactions.amount" :indexI="index" @click="selectedBlock = index" :selected="selectedBlock==index ? 'selected' : ''"/> 
        </div>
        
    </div>
    <div class="container" style="margin-top:1rem; overflow-x: auto;">
        <h1 class="h2"> Transactions inside block #{{selectedBlock}}</h1>
        <TransTable :trans="this.$blockchain.chain[selectedBlock].transactions" />
    </div>
</template>

<script>
import BlockComp from '../components/BlockComp.vue'
import TransTable from '../components/transTable.vue'
export default {
    components:{
        BlockComp,
        TransTable
        },
    data(){
        return {
            blocks:this.$blockchain,
            selectedBlock:0
        }
    },
      watch: {
      blocks: {
          handler(newValue){
              console.log('colors changed', newValue)
              this.$blockchain.hashChangeing();
              this.$blockchain = this.blocks
          }, deep: true
      },
      selectedBlock:function(){
          console.log(this.selectedBlock)
      }
  }
}
</script>

<style>

</style>