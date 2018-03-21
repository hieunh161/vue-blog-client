/* eslint-disable no-trailing-spaces */
import Vue from 'vue';
import Router from 'vue-router';
// import Login from '@/components/Login';
// import * as firebase from 'firebase';
import localStorage from '../services/localStorage';

const Home = () => import('@/components/Home');
const UserProfile = () => import('@/components/UserProfile');
const ArticleDetail = () => import('@/components/article/ArticleDetail');
const ArticleEditor = () => import('@/components/article/ArticleEditor');
const ArtileUserList = () => import('@/components/article/ArtileUserList');
const DemoPage = () => import('@/components/demo/DemoPage');
const Dashboard = () => import('@/components/Dashboard');
const PageNotFound = () => import('@/components/PageNotFound');
const UnAuthorized = () => import('@/components/UnAuthorized');

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
// const isLoggedIn = (to, from, next) => {
//   if (firebase.auth().currentUser && to.path === '/login') {
//     next({
//       path: '/',
//     });
//   } else {
//     next();
//   }
// };

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home,
    },
    // {
    //   path: '/login',
    //   name: 'Login',
    //   component: Login,
    //   beforeEnter: isLoggedIn,
    // },
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
