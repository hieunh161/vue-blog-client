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
        console.log('Signout successful!');
        context.commit('setUser', null);
      }, (error) => {
        console.log(`Signout failed, ${error}!`);
      });
    },
  },
  getters: {
    isLoggedIn() {
      return !!firebase.auth().currentUser;
    },
  },
};

export default authenticate;
