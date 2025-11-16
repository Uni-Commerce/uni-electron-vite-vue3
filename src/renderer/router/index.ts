import { createRouter, createWebHashHistory } from 'vue-router'
// import { useUserStore } from '@/renderer/stores'

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
        },
        {
          path: '/history',
          component: () => import('@/renderer/pages/history/index.vue')
        },
        {
          path: '/swap',
          component: () => import('@/renderer/pages/swap/index.vue')
        },
        {
          path: '/mine',
          component: () => import('@/renderer/pages/mine/index.vue')
        }
      ]
    },
    { path: '/backup', component: () => import('@/renderer/pages/backup/index.vue') },
    {
      path: '/wallet',
      component: () => import('@/renderer/pages/wallet/layout.vue'),
      redirect: 'wallet',
      children: [
        {
          path: '/wallet',
          component: () => import('@/renderer/pages/wallet/index.vue')
        },
        {
          path: '/wallet/create',
          component: () => import('@/renderer/pages/wallet/create.vue')
        },
        {
          path: '/wallet/import',
          component: () => import('@/renderer/pages/wallet/import.vue')
        }
      ]
    }
  ]
})

router.beforeEach(async () => {
  // const { hasWallet } = useUserStore()

  // if (to.path === '/wallet') return true

  // // 如果没有钱包，重定向到wallet
  // if (!hasWallet) {
  //   return { path: '/wallet' }
  // }

  return true
})

export default router
