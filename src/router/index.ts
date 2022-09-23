import { createRouter, createWebHistory } from 'vue-router';
import Index from '@/view/index.vue';

const history = createWebHistory('/');

const router = createRouter({
  history,
  routes: [
    {
      path: '/main',
      name: 'main',
      component: Index,
    },
  ],
});

export default router;
