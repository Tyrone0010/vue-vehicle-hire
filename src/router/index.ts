import Vue from 'vue';
import VueRouter, { RouteConfig } from 'vue-router';
import AvailableVehiclesView from '../views/AvailableVehiclesView.vue';
import VehiclesView from '../views/VehiclesView.vue';

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'home',
    component: VehiclesView,
  },
  {
    path: '/vehicles',
    name: 'vehicles',
    component: VehiclesView,
  },
  {
    path: '/available-vehicles',
    name: 'availableVehicles',
    component: AvailableVehiclesView,
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
