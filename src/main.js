import { createApp } from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import { Blockchain } from "./blockchain";
import { getKey } from './keygenerator'
// const globalVar = { data() { return { blockchain: new Blockchain() } } }
// Vue.prototype.$Block = [{ hash: 'test' }]
// App.prototype.$appName = 'My App'
// App.config.globalProperties.$myGlobalVariable = "globalVariable"
const app = createApp(App).use(router)
// app.mixin(globalVar)
app.config.globalProperties.$blockchain = new Blockchain()
app.config.globalProperties.$walletKey = getKey()

app.mount("#app")

// window.Vue = require('vue');

// import Vue from "vue";
// import App from "./App.vue";
// import router from "./router/index";


// /* eslint-disable no-new */
// new Vue({
//     router,
//     render: h => h(App)
// }).$mount("#app");