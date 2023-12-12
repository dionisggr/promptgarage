import { createRouter, createWebHistory } from 'vue-router';
import Main from './components/Main.vue';
import Prompts from './components/Prompts.vue';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', component: Main },
    { path: '/prompts', component: Prompts },
  ],
});

export default router;
