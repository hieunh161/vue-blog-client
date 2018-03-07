/* eslint-disable no-trailing-spaces */
import Vue from 'vue';
import Router from 'vue-router';
import Home from '@/components/Home';
import Login from '@/components/Login';
import UserProfile from '@/components/UserProfile';
import ArticleDetail from '@/components/article/ArticleDetail';
import ArticleEditor from '@/components/article/ArticleEditor';
import ArtileUserList from '@/components/article/ArtileUserList';
import DemoPage from '@/components/demo/DemoPage';
import Dashboard from '@/components/Dashboard';
import PageNotFound from '@/components/PageNotFound';
import UnAuthorized from '@/components/UnAuthorized';
import * as firebase from 'firebase';
import localStorage from '../services/localStorage';

Vue.use(Router);

const requireAuth = (to, from, next) => {
  // check from local storage then use token
  const authUser = localStorage.get('authUser');
  if (authUser && authUser.access_token) {
    next();
  } else {
    next({
      path: '/unauthorized',
    });
  }
};

// redirect to home if user come to login page when logged in
const isLoggedIn = (to, from, next) => {
  if (firebase.auth().currentUser && to.path === '/login') {
    next({
      path: '/',
    });
  } else {
    next();
  }
};

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home,
    },
    {
      path: '/login',
      name: 'Login',
      component: Login,
      beforeEnter: isLoggedIn,
    },
    {
      path: '/dashboard',
      name: 'Dashboard',
      component: Dashboard,
      beforeEnter: requireAuth,
    },
    {
      path: '/demo',
      name: 'DemoPage',
      component: DemoPage,
    },
    {
      path: '/user',
      name: 'UserProfile',
      component: UserProfile,
      beforeEnter: requireAuth,
    },
    {
      path: '/article/:id',
      component: ArticleDetail,
    },
    {
      path: '/article/:id/edit',
      component: ArticleEditor,
    },
    {
      path: '/user/:id/article',
      component: ArtileUserList,
    },
    {
      path: '*',
      name: 'PageNotFound',
      component: PageNotFound,
    },
    {
      path: 'unauthorized',
      name: 'UnAuthorized',
      component: UnAuthorized,
    },
  ],
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    }
    return { x: 0, y: 0 };
  },
});
