<template>
    <nav class="navbar navbar-expand-lg bg-dark">
           <div class="container-fluid">
               <!-- <li class="nav-item"> -->
                    <!-- <router-link :to="'/' " class="nav-brand">Home</router-link> -->
               <!-- </li> -->
                <!-- <button class="bg-dark nav-brand" @click="this.$router.push('/')">Blockchain</button> -->
                <!-- <li class="nav-item"> -->
                <router-link :to="{name:'block',params:{blockchain:JSON.stringify(this.blockchain)}}" class="nav-link" >Blockchain</router-link>
               
            <!-- </li> -->
        <ul class="navbar-nav">
            
            <li class="nav-item">
                  <router-link :to="{name:'addTran',params:{blockchain:JSON.stringify(this.blockchain)}}" class="nav-link" >Add Transaction</router-link>
            </li>
            <li class="nav-item">
                  <router-link :to="{name:'penTrx'}" class="nav-link" >Pending Transactions</router-link>
            </li>
            <li class="nav-item">
                  <router-link :to="{name:'settingsView'}" class="nav-link" >Settings</router-link>
            </li>
            <!-- <li class="nav-item">
                  <router-link :to="{name:'walletBalance'}" class="nav-link" >wallet Balance</router-link>
            </li> -->
        </ul>
        <!-- <p>{{blockchain}}</p> -->
    </div>
    </nav>
</template>

<script>
export default {
    props:['blockchain'],
    // methods:{homepage(){this.$router.push('/')}}
}
</script>

<style scoped>
a.router-link-active{
    background-color:rgb(56, 55, 55);
    border-radius:5px;
    color:white;
}
a{
    color:white;
    cursor:pointer;
    text-decoration: none;
}
a.active{background-color:rgb(56, 55, 55);}
a:hover{color:white}
</style>