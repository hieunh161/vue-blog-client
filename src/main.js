// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import * as firebase from 'firebase';
// import { mapState } from 'vuex';
import Vue from 'vue';
import VueProgressiveImage from 'vue-progressive-image';
import SocialSharing from 'vue-social-sharing';
import Notifications from 'vue-notification';
import App from './App';
import router from './router';
import store from './store';
import directive from './directive';

import '../semantic/dist/semantic.css';
import '../semantic/dist/semantic';
import './filter';

Vue.config.productionTip = false;
Vue.use(VueProgressiveImage);
Vue.use(SocialSharing);
Vue.use(Notifications);

// allows usage of firebase in your vue components by using this.$firebase
Vue.prototype.$firebase = firebase.initializeApp({
  apiKey: 'AIzaSyD6QnbW4Sk4kZuWdGzO2BkIKtHj9n4CxHg',
  authDomain: 'my-blog-68afd.firebaseapp.com',
  databaseURL: 'https://my-blog-68afd.firebaseio.com',
  projectId: 'my-blog-68afd',
  storageBucket: '',
  messagingSenderId: '157291960262',
});

/* eslint-disable no-new */
/* eslint-disable no-unused-vars */
// const unsubscribe = firebase.auth().onAuthStateChanged(() => {
const vue = new Vue({
  el: '#app',
  router,
  store,
  directive,
  template: '<App/>',
  components: { App },
});
  // unsubscribe();
// });
