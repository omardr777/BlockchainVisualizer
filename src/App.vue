<template>
  <div class="container" style="overflow-x:hidden">
    <navBar :blockchain="blocks"/>
    <router-view/>
  </div>
</template>

<script>
import navBar from "./components/navBar.vue"

export default({
  components:{navBar,},
  data(){
    return{
      blocks:[]
    } 
  },
  watch: {
      'this.$blockchain': {
          handler(newValue){
              console.log('colors changed', newValue)
              
          }, deep: true
      }
  }
})
</script>


<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}
</style>
