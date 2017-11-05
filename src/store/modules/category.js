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
    return categoryService.createCategory(category);
  },
  readCategory({ commit }) {
    return categoryService.readCategory().then((result) => {
      commit(types.CATEGORY_READ_CATEGORY, result);
    });
  },
  updateCategory(context, { category }) {
    return categoryService.updateCategory(category);
  },
  deleteCategory(context, { categoryId }) {
    return categoryService.deleteCategory(categoryId);
  },
};

const mutations = {
  [types.CATEGORY_READ_CATEGORY](s, categories) {
    Object.assign(s.categories, categories);
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
