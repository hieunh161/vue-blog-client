import * as firebase from 'firebase';
import userApi from '../api/user';

/* eslint-disable no-param-reassign */
const authenticate = {
  state: {
    facebook: {
      isLoading: false,
      result: null,
    },
    user: null,
    userInfo: null,
  },
  namespaced: true,
  mutations: {
    setUser(state, value) {
      state.user = value;
    },
    setUserInfo(state, value) {
      state.userInfo = value;
    },
  },
  actions: {
    loginWithFacebook: (context) => {
      userApi.signInWithFacebook()
      .then((result) => {
        context.commit('setUser', result.user);
        context.dispatch('getUserInfo', result.user);
      }).catch((error) => {
        console.log(error);
      });
    },
    loginWithGoogle: (context) => {
      userApi.signInWithGoogle()
      .then((result) => {
        context.commit('setUser', result.user);
        context.dispatch('getUserInfo', result.user);
      }).catch((error) => {
        console.log(error);
      });
    },
    getUserInfo: (context, user) => {
      userApi.getLocalUserInfo(user)
      .then(userInfo => context.commit('setUserInfo', userInfo));
    },
    logOut: (context) => {
      firebase.auth().signOut()
      .then(() => {
        context.commit('setUser', null);
      }, (error) => {
        console.log(`Signout failed, ${error}!`);
      });
    },
  },
  getters: {
    isLoggedIn: state => !!state.user,
    avatar: state => (state.user ? state.user.photoURL : ''),
    displayName: state => (state.user ? state.user.displayName : ''),
    currentUser: state => state.user,
    currentUserInfo: state => state.userInfo,
    isAdmin: (state) => {
      if (state.userInfo) {
        // admin is 2
        return state.userInfo.role === 2;
      }
      return false;
    },
  },
};

export default authenticate;
