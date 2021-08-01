import {
  createRouter,
  createWebHistory
} from 'vue-router';

const routes = [
  {
    path: '/home',
    name: 'home',
    component: () => 
      import('../views/home.vue') 
  },
  {
    path: '/setup',
    name: 'Setup',
    component: () => 
      import('../views/setup.vue')
  },
  {
    path: '/',
    name: 'dashborad',
    component: () => 
      import('../views/dashborad.vue'),
    children: [
      {
        path: 'ref',
        component: () => 
          import('../views/menu/ref.vue')
      }
    ]
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router;