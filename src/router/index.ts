import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/maps/streets-in-sofia-named-after-a-plant',
      name: 'streets-in-sofia-named-after-a-plant',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/MapsView.vue'),
    },
    {
      path: '/maps/boulevards-in-sofia-and-their-memory',
      name: 'boulevards-in-sofia-and-their-memory',
      component: () => import('../views/BoulevardsMapsView.vue'),
    }
  ],
})

export default router
