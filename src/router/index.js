import { createRouter, createWebHistory } from 'vue-router';
import BarGraphPage from '../pages/BarGraphPage.vue';
import PieChartPage from '../pages/PieChartPage.vue';
import UsersPage from '../pages/UsersPage.vue'; 
import HomePage from '@/pages/HomePage.vue';

const routes = [
  {
    path: '/',
    name: 'HomePage',
    component: HomePage
  },
  {
    path: '/bar-graph',
    name: 'BarGraph',
    component: BarGraphPage,
  },
  {
    path: '/pie-chart',
    name: 'PieChart',
    component: PieChartPage,
  },
  {
    path: '/users', 
    name: 'Users',
    component: UsersPage,
  },
  {
    path: '/',
    redirect: '/bar-graph'
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
