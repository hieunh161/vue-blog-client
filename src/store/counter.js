import * as firebase from 'firebase';

/* eslint-disable no-param-reassign */
const counter = {
  state: {
    count: 0,
    isLoading: true,
  },
  // define the possible mutations that can be applied to our state
  mutations: {
    initCounter: (s, payload) => {
      s.count = payload.count;
      s.isLoading = payload.isLoading;
    },
    increment: (s) => {
      /* eslint no-param-reassign: ["error", { "props": false }] */
      s.count += 1;
      const counterRef = firebase.database().ref('counter');
      counterRef.set({ count: s.count });
    },
    decrement: (s) => {
      /* eslint no-param-reassign: ["error", { "props": false }] */
      s.count -= 1;
      const counterRef = firebase.database().ref('counter');
      counterRef.set({ count: s.count });
    },
  },
  actions: {
    loadCounter: (context) => {
      const counterRef = firebase.database().ref('counter');
      counterRef.on('value', (snapshot) => {
        const result = snapshot.val();
        context.commit('initCounter', { count: result.count, isLoading: false });
      });
    },
  },
};

export default counter;
