import {
  createRouter,
  createWebHistory
} from 'vue-router';

const routes = [
  {
    path: '/',
    name: 'home',
    component: () => 
      import('../views/home.vue') 
  },
  {
    path: '/setup',
    name: 'Setup',
    component: () => 
      import('../views/setup.vue')
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router;