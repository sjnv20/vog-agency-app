import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/main',
      component: () => import('../App.vue')
    },
     {
      path: '/main',
      name: 'MainHome',
      component: () => import('../views/MainHome.vue'),
       meta: {
        headerType: 'home',
      },
    },
    {
      path: '/casting',
      name: 'CastingPage',
      component: () => import('../views/pages/CastingPage.vue')
    },
    {
      path: '/artist/singer',
      name: 'SingerPage',
      component: () => import('../views/pages/SingerPage.vue')
    },
        {
      path: '/artist/moderator',
      name: 'ModeratorPage',
      component: () => import('../views/pages/ModeratorPage.vue')
    },
  ],
  scrollBehavior(to, from, savedPosition) {
    // 뒤로가기
    if (savedPosition) {
      return savedPosition
    }
    // 기본: 항상 맨 위
    return { top: 0 }
  }
})

export default router