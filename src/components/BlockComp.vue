<template>
   <div class = "card" style="min-width:100px"  :calss="this.selected"> 
    <div class="card-body" :class="blockTheme">
      <h5 class="card-title">Block #{{index}}</h5>
    </div>

     <ul class="list-group list-group-flush">
	    <li class="list-group-item card-header">
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
	    		<small>{{ new Date(block.timestamp) }}</small>
	    	</div>
	    </li>
	  </ul>
      <ul class="list-group list-group-flush card-footer">
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
            }
        },
        props:['blockI',"nonceI",'diffI','amountI','indexI','selected'],
        watch:{
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
	width: 28rem; 
	display:inline-block; 
	margin: 0 10px 0 0;
    border: 0.5px solid black;
    cursor: pointer;
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
.card-footer{
    height: 13rem;
    overflow-y: auto
}

@media only screen and (max-width: 1200px){
    .card{
	width: 22rem; 
    }
    .card-footer{
        height:9rem
    }
}
@media only screen and (max-width: 600px){
	/*Big smartphones [426px -> 600px]*/
    .card{
	width: 20rem; 
    }
    .card-footer{
        height:9rem
    }
}
@media only screen and (max-width: 425px){
	/*Small smartphones [325px -> 425px]*/
    .card{
	width: 16rem; 
    }
    .card-footer{
        height:6rem
    }
}

</style>