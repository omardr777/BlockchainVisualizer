<template>
   <div class = "card" style="min-width:100px"  :calss="this.selected"> 
    <div class="card-body" :class="blockTheme">
      <h5 class="card-title">Block #{{index}}</h5>
    </div>

     <ul class="list-group list-group-flush">
	    <li class="list-group-item">
	    	<span class="">Hash</span>
	    	<br>
	    	<div class="text-truncate" >
	    		<small>{{ block.hash }}</small>
	    	</div>

			<br>
			<span class="">Hash of previous block</span>
	    	<br>

	    	<div class="text-truncate" >
	    		<small>{{ block.previousHash }}</small>
	    	</div>
	    </li>

	    <li class="list-group-item">
	    	<span class="">Nonce</span><br>
	    	<div class="text-truncate text-muted">
	    		<!-- <small>{{ block.nonce }}</small> -->
                <input type="number" v-model="block.nonce" class="form-control">
	    	</div>
	    </li>

	    <li class="list-group-item">
	    	<span class="">Timestamp</span><br>
	    	<div class="text-truncate text-muted">
	    		<small>{{ block.timestamp }}</small>
	    	</div>
	    </li>
	  </ul>
      <ul class="list-group list-group-flush" style="min-height:300px">
          <table class="table table-striped" v-if="block.transactions.length > 0">
            <thead>
                <tr>
                    <th scope="col">From</th>
                    <th scope="col">To</th>
                    <th scope="col">Amount</th> 
                </tr>
            </thead>
             <tbody>
              <tr v-for="tran in block.transactions" :key="tran">
                  <td v-if="tran.fromAddress == null"><input type="text" class="form-control" placeholder="System" v-model="tran.fromAddress" ></td>
                  <td v-else ><input type="text" class="form-control" :placeholder="System" v-model="tran.fromAddress" ></td>
                  <td><input type="text" class="form-control" :placeholder="tran.toAddress" v-model="tran.toAddress"></td>
                  <td><input type="text" class="form-control" :placeholder="tran.amount" v-model="tran.amount"></td>
              </tr>
            </tbody>
            
          </table>
          <p v-else class="h4">Gensis Block</p>
      </ul>
      <button class="btn btn-primary" @click="mine" style="margin:10px">mine</button>
  </div>
</template>

<script>
    export default {
        data(){
            return{
                block:this.blockI,
                nonce:this.nonceI,
                diff:this.diffI,
                amount:this.amountI,
                index:this.indexI,
                blockTheme:'scuccess'
                // nonce:this.block.nonce
            }
        },
        props:['blockI',"nonceI",'diffI','amountI','indexI','selected'],
        watch:{
            // nonce:function(){
            //     this.block.nonce = this.nonce
            //     this.block.hash = this.block.calculateHash()
            //     this.nonce = this.block.nonce
            // },
            // amount:function(){
            //     this.block.amount = this.amount
            //     this.block.hash = this.block.calculateHash()
            //     this.amount = this.block.amount
            //     console.log("AMOUNT")
            // },
            block:{
                handler: function () {
                    this.block.hash = this.block.calculateHash()
                    console.log("block has been changed",this.block)
                    // console.log("\n\n\n",this.blocks.isChainValid());
                    this.blockTheme = this.block.isValid(this.$blockchain.difficulty)? 'scuccess' : 'danger'
                },
                deep: true
            }
        },
        methods:{
            mine(){
                this.block.mine(this.diffI)
                this.nonce = this.block.nonce

            }
        }
    }
</script>
<style scoped>
.card{
	width: 30rem; 
	display:inline-block; 
	margin: 0 10px 0 0;
    border: 0.5px solid black;
}
.scuccess {
    background:rgba(43, 255, 0, 0.271)
}
 .scuccess ul{
    background:rgba(16, 98, 0, 0.177)
}
 .danger ul {
    background:rgba(16, 98, 0, 0.177)
}
.danger {
    background:rgba(110, 25, 25, 0.315)
}
.selected{
    border-color: blue !important;
}
</style>