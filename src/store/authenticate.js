import * as firebase from 'firebase';

/* eslint-disable no-param-reassign */
const authenticate = {
  state: {
    count: 0,
    facebook: {
      isLoading: false,
      result: null,
    },
    user: null,
  },
  namespaced: true,
  mutations: {
    increment(state) {
      // `state` is the local module state
      state.count += 1;
    },
    setUser(state, value) {
      state.user = value;
    },
  },
  actions: {
    loginFacebook: (context) => {
      const provider = new firebase.auth.FacebookAuthProvider();
      firebase.auth().signInWithPopup(provider)
      .then((result) => {
        context.commit('setUser', result.user);
      }).catch((error) => {
        console.log(error);
      });
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
  },
};

export default authenticate;
