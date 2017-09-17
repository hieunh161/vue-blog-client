/* eslint-disable no-trailing-spaces */
import Vue from 'vue';
import Router from 'vue-router';
import Hello from '@/components/Hello';
import Login from '@/components/Login';
import UserProfile from '@/components/UserProfile';
import Customer from '@/components/Customer';
import Article from '@/components/Article';
import ArticeCreate from '@/components/ArticeCreate';
import ArticleList from '@/components/ArticleList';
import ArticleDetail from '@/components/article/ArticleDetail';
import ArticleEdit from '@/components/article/ArticleEdit';
import ArtileUserList from '@/components/article/ArtileUserList';
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
      name: 'Hello',
      component: Hello,
    },
    {
      path: '/login',
      name: 'Login',
      component: Login,
      beforeEnter: isLoggedIn,
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
      path: '/article/:id/view',
      component: ArticleDetail,
    },
    {
      path: '/article/:id/edit',
      component: ArticleEdit,
    },
    {
      path: '/user/:id/article',
      component: ArtileUserList,
    },
    {
      path: '/article/', 
      component: Article,
      children: [
        {
          // UserProfile will be rendered inside User's <router-view>
          // when /user/:id/profile is matched
          path: 'create',
          component: ArticeCreate,
        },
        {
          path: 'list',
          component: ArticleList,
        },
        {
          path: '',
          component: ArticleList,
        },
      ],
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
