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
    // {
    //   path: '/artist',
    //   name: 'ArtistListPage',
    //   component: () => import('../views/pages/ArtistListPage.vue')
    // },
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
  ]
})

export default router