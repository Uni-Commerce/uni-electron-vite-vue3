import { createRouter, createWebHashHistory } from 'vue-router'
import { useUserStore } from '@/renderer/stores'

const router = createRouter({
  history: createWebHashHistory(),

  routes: [
    {
      path: '/',
      component: () => import('@/renderer/pages/layout/index.vue'),
      redirect: 'home',
      children: [
        {
          path: '/home',
          component: () => import('@/renderer/pages/home/index.vue')
        }
      ]
    }
    // { path: '/backup', component: () => import('@/renderer/pages/backup/index.vue') },
    // { path: '/wallet', component: () => import('@/renderer/pages/wallet/index.vue') }
  ]
})

router.beforeEach(async (to) => {
  const { hasWallet } = useUserStore()

  // if (to.path === '/wallet') return true

  // // 如果没有钱包，重定向到wallet
  // if (!hasWallet) {
  //   return { path: '/wallet' }
  // }

  return true
})

export default router
