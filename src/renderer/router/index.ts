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
          component: () => import('@/renderer/pages/mine/layout.vue'),
          redirect: '/mine/management',
          children: [
            {
              path: '/mine/management',
              component: () => import('@/renderer/pages/mine/management.vue')
            },
            {
              path: '/mine/backup',
              component: () => import('@/renderer/pages/mine/backup.vue')
            },
            {
              path: '/mine/setting',
              component: () => import('@/renderer/pages/mine/setting.vue')
            },
            {
              path: '/mine/network',
              component: () => import('@/renderer/pages/mine/network.vue')
            },
            {
              path: '/mine/crypto',
              component: () => import('@/renderer/pages/mine/crypto.vue')
            },
            {
              path: '/mine/address',
              component: () => import('@/renderer/pages/mine/address.vue')
            },
            {
              path: '/mine/general',
              component: () => import('@/renderer/pages/mine/general.vue')
            },
            {
              path: '/mine/agreement',
              component: () => import('@/renderer/pages/mine/agreement.vue')
            },
            {
              path: '/mine/about-us',
              component: () => import('@/renderer/pages/mine/about.vue')
            }
          ]
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
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'NotFound',
      component: () => import('@/renderer/pages/404/index.vue')
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
