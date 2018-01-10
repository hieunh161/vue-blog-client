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
  createCategory: (context, { category }) => categoryService.createCategory(category),
  readCategory: ({ commit }) => categoryService.readCategory().then((result) => {
    commit(types.CATEGORY_READ_CATEGORY, result);
  }),
  updateCategory: (context, { category }) => categoryService.updateCategory(category),
  deleteCategory: (context, { categoryId }) => categoryService.deleteCategory(categoryId),
  getListCategory: ({ commit }) => categoryService.readCategory().then((result) => {
    const names = [];
    result.forEach((element) => {
      names.push(element.value.title);
    });
    commit(types.CATEGORY_SET_CATEGORY_NAME, names);
  }),
  getCategoryNames: ({ commit }) => categoryService.readCategory().then((result) => {
    const names = [];
    result.map(item => name.push(item.title));
    // result.forEach((element) => {
    //   names.push(element.value.title);
    // });
    console.log(result);
    console.log(names);
    commit(types.CATEGORY_SET_CATEGORY_NAME, names);
  }),
};

/* eslint-disable no-param-reassign */
const mutations = {
  [types.CATEGORY_READ_CATEGORY]: (s, categories) => {
    s.categories = Object.assign({}, s.categories, categories);
  },
  [types.CATEGORY_SET_CATEGORY_NAME]: (s, categoriesName) => {
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
