<template>
  <div class="container">
  <h1>Settings</h1>
  <p>Control how the blockchain behaves when new transactions or blocks are created. Changes are automatically saved.</p>

  <br>

  <div class="form-group">
    <label for="difficulty">Difficulty</label>
    <input type="number" class="form-control" id="difficulty" v-model="diff">
    <small id="difficultyHelp" class="form-text text-muted">
    	Difficulty controls how long the mining process takes. Higher numbers will make mining a lot slower!
    	<br>Default: 2
    </small>
  </div>

  <br>

  <div class="form-group">
    <label for="miningReward">Mining reward</label>
    <input type="number" class="form-control" id="miningReward" v-model="minRe">
    <small id="miningRewardHelp" class="form-text text-muted">
		How much "coins" a miner receives for successfully creating a new block for the chain.
		<br>Default: 100
    </small>
  </div>

</div>
</template>

<script>
export default {
    data(){
        return{
            diff:this.$blockchain.difficulty, 
            minRe:this.$blockchain.miningReward
        } 
    },
    watch:{
        diff:function(){
            this.$blockchain.difficulty = this.diff;
        },
        minRe:function(){
            this.$blockchain.miningReward = this.minRe;
        }
    } 
}
</script>

<style>

</style>