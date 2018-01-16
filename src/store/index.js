import Vue from 'vue';
import Vuex from 'vuex';
import user from './modules/user';
import article from './modules/article';
import articleUser from './modules/articleUser';
import category from './modules/category';

Vue.use(Vuex);

// create the Vuex instance by combining the state and mutations objects
// then export the Vuex store for use by our components
export default new Vuex.Store({
  modules: {
    user,
    article,
    articleUser,
    category,
  },
});
