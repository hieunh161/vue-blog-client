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
  mutations: {
    increment(state) {
      // `state` is the local module state
      state.count += 1;
    },
    setLoggedInUser(state, payload) {
      state.user = payload.user;
    },
  },
  actions: {
    loginFacebook: (context) => {
      console.log('facebook');
      const provider = new firebase.auth.FacebookAuthProvider();
      firebase.auth().signInWithPopup(provider)
      .then((result) => {
        const token = result.credential.accessToken;
        const user = result.user;
        console.log(token);
        console.log(user);
        context.commit({
          type: 'setLoggedInUser',
          user,
        });
      }).catch((error) => {
        console.log(error);
      });
    },
  },
  getters: {
    doubleCount(state) {
      return state.count * 2;
    },
  },
};

export default authenticate;
