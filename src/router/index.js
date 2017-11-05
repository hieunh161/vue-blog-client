/* eslint-disable no-trailing-spaces */
import Vue from 'vue';
import Router from 'vue-router';
import Home from '@/components/Home';
import Login from '@/components/Login';
import UserProfile from '@/components/UserProfile';
import ArticleDetail from '@/components/article/ArticleDetail';
import ArticleEditor from '@/components/article/ArticleEditor';
import ArtileUserList from '@/components/article/ArtileUserList';
import TagArticle from '@/components/article/TagArticle';
import DemoPage from '@/components/demo/DemoPage';
import Dashboard from '@/components/Dashboard';
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
      path: 'article/tag/:tag',
      component: TagArticle,
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
  ],
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    }
    return { x: 0, y: 0 };
  },
});
