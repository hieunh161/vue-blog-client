import Vue from 'vue';
import Vuex from 'vuex';
import user from './modules/user';
import customer from './customer';
import counter from './counter';
import article from './modules/article';

Vue.use(Vuex);

// create the Vuex instance by combining the state and mutations objects
// then export the Vuex store for use by our components
export default new Vuex.Store({
  modules: {
    user,
    counter,
    customer,
    article,
  },
});
