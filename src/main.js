// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import * as firebase from 'firebase';
import Vue from 'vue';
import App from './App';
import router from './router';
import store from './store';

Vue.config.productionTip = false;

// allows usage of firebase in your vue components by using this.$firebase
Vue.prototype.$firebase = firebase.initializeApp({
  apiKey: 'AIzaSyCzA-y8C021W67dmjysTqewxr5hcVbL-uU',
  authDomain: 'my-login-49810.firebaseapp.com',
  databaseURL: 'https://my-login-49810.firebaseio.com',
  projectId: 'my-login-49810',
  storageBucket: 'my-login-49810.appspot.com',
  messagingSenderId: '14639730247',
});

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App },
});
