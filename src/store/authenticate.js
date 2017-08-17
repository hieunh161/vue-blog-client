/* eslint-disable no-param-reassign */
const authenticate = {
  state: { count: 0 },
  mutations: {
    increment(state) {
      // `state` is the local module state
      state.count += 1;
    },
  },

  getters: {
    doubleCount(state) {
      return state.count * 2;
    },
  },
};

export default authenticate;
