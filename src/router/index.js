/* eslint-disable no-trailing-spaces */
import Vue from 'vue';
import Router from 'vue-router';
import Hello from '@/components/Hello';
import Login from '@/components/Login';
import UserProfile from '@/components/UserProfile';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Hello',
      component: Hello,
    },
    {
      path: '/login',
      name: 'Login',
      component: Login,
    },
    {
      path: '/user',
      name: 'UserProfile',
      component: UserProfile,
    },
  ],
});
