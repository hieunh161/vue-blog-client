import * as types from '../mutation-types';
import categoryService from '../../services/category';

const state = {
  categories: [],
  categoriesName: [],
};

const getters = {
  categories: s => s.categories,
  categoriesName: s => s.categoriesName,
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
  getListCategory({ commit }) {
    return categoryService.readCategory().then((result) => {
      const names = [];
      result.forEach((element) => {
        names.push(element.value.title);
      });
      commit(types.CATEGORY_SET_CATEGORY_NAME, names);
    });
  },
};

/* eslint-disable no-param-reassign */
const mutations = {
  [types.CATEGORY_READ_CATEGORY](s, categories) {
    s.categories = Object.assign({}, s.categories, categories);
  },
  [types.CATEGORY_SET_CATEGORY_NAME](s, categoriesName) {
    s.categoriesName = Object.assign({}, s.categoriesName, categoriesName);
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
