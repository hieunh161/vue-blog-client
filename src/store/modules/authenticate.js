import * as firebase from 'firebase';
import userApi from '../../api/user';

/* eslint-disable no-param-reassign */
const state = {
  facebook: {
    isLoading: false,
    result: null,
  },
  user: null,
  userInfo: null,
};

const mutations = {
  setUser(s, value) {
    s.user = value;
  },
  setUserInfo(s, value) {
    s.userInfo = value;
  },
};

const actions = {
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
};

const getters = {
  isLoggedIn: s => !!s.user,
  avatar: s => (s.user ? s.user.photoURL : ''),
  displayName: s => (s.user ? s.user.displayName : ''),
  currentUser: s => s.user,
  currentUserInfo: s => s.userInfo,
  isAdmin: (s) => {
    if (s.userInfo) {
      // admin is 2
      return s.userInfo.role === 2;
    }
    return false;
  },
};

export default {
  state,
  namespaced: true,
  mutations,
  actions,
  getters,
};
