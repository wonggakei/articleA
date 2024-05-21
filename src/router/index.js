import { createRouter, createWebHistory } from 'vue-router'
import { useUserStore } from '@/stores'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    // 登陆页面
    { path: '/login', component: () => import('@/views/login/LoginPage.vue') },

    // 架子
    {
      path: '/',
      component: () => import('@/views/layout/LayoutContainer.vue'),
      redirect: '/show',
      children: [
        {
          path: '/show',
          component: () => import('@/views/article/ArticleShow.vue')
        },
        {
          path: '/manage',
          component: () => import('@/views/article/ArticleManage.vue')
        },
        {
          path: '/channel',
          component: () => import('@/views/article/ArticleChannel.vue')
        },
        {
          path: '/avatar',
          component: () => import('@/views/user/UserAvatar.vue')
        },
        {
          path: '/profile',
          component: () => import('@/views/user/UserProfile.vue')
        },
        {
          path: '/password',
          component: () => import('@/views/user/UserPassword.vue')
        }
      ]
    }
  ]
})

// 登录访问拦截
router.beforeEach((to) => {
  const userStore = useUserStore()
  if (!userStore.token && to.path !== '/login') return '/login'
})

export default router
