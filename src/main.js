// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import * as firebase from 'firebase';
// import { mapState } from 'vuex';
import Vue from 'vue';
import VueProgressiveImage from 'vue-progressive-image';
import SocialSharing from 'vue-social-sharing';
import Notifications from 'vue-notification';
import VueI18n from 'vue-i18n';
import App from './App';
import router from './router';
import store from './store';
import messages from './message';
import '../semantic/dist/semantic.css';
import '../semantic/dist/semantic';
import './assets/css/nprogress.css';
import './filter';
import { firebaseConfig } from './config';

Vue.config.productionTip = false;
Vue.use(VueProgressiveImage);
Vue.use(SocialSharing);
Vue.use(Notifications);
Vue.use(VueI18n);

const i18n = new VueI18n({
  locale: 'en',
  messages,
});

// allows usage of firebase in your vue components by using this.$firebase
Vue.prototype.$firebase = firebase.initializeApp(firebaseConfig);

/* eslint-disable no-new */
/* eslint-disable no-unused-vars */
// const unsubscribe = firebase.auth().onAuthStateChanged(() => {
const vue = new Vue({
  i18n,
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App },
});
  // unsubscribe();
// });
