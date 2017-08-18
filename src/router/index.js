/* eslint-disable no-trailing-spaces */
import Vue from 'vue';
import Router from 'vue-router';
import Hello from '@/components/Hello';
import Login from '@/components/Login';
import UserProfile from '@/components/UserProfile';
import Customer from '@/components/Customer';
import PageNotFound from '@/components/PageNotFound';
import * as firebase from 'firebase';

Vue.use(Router);

const requireAuth = (to, from, next) => {
  if (!firebase.auth().currentUser) {
    console.log('User is not logged in');
    next({
      path: '/login',
    });
  } else {
    next();
  }
};

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
      beforeEnter: requireAuth,
    },
    {
      path: '/customer',
      name: 'Customer',
      component: Customer,
      beforeEnter: requireAuth,
    },
    {
      path: '*',
      name: 'PageNotFound',
      component: PageNotFound,
    },
  ],
});
