import { createRouter, createWebHistory } from 'vue-router'
import BlockPage from '../views/BlockView.vue'
import addTran from '../views/addTran.vue'
import penTrx from '../views/pendingTrans.vue'
import settings from '../views/settingsView.vue'
import walletBalance from '../views/walletBalance.vue'

const routes = [
  {
    path: '/',
    name: 'block',
    component: BlockPage
  },
  {
    path: '/add-tran',
    name: 'addTran',
    component: addTran
  },
  {
    path: '/pending-trx',
    name: 'penTrx',
    component: penTrx
  },
  {
    path: '/settings',
    name: 'settingsView',
    component: settings
  },
  {
    path: '/wallet-bal/:id',
    name: 'walletBalance',
    component: walletBalance
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
