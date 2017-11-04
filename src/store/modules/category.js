import * as types from '../mutation-types';
import categoryService from '../../services/category';

const state = {
  categories: [],
};

const getters = {
  categories: s => s.categories,
};

const actions = {
  createCategory(context, { category }) {
    console.log(category);
    return categoryService.createCategory(category);
  },
  readCategory({ commit }) {
    return categoryService.readCategory().then((result) => {
      console.log(result);
      commit(types.CATEGORY_READ_CATEGORY, result);
    });
  },
};

const mutations = {
  [types.CATEGORY_READ_CATEGORY](s, categories) {
    Object.assign(s.categories, categories);
    // s.categories = categories;
    console.log(s);
    console.log(categories);
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
