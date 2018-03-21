import * as types from '../mutationTypes';
import categoryService from '../../services/category';

const state = {
  categories: [],
  categoriesName: [],
};

const getters = {
  categories: s => s.categories,
};

const actions = {
  createCategory: ({ commit }, { name, priority }) => {
    console.log(name);
    return categoryService.createCategory({ name, priority })
    .then(result => commit(types.CATEGORY_CREATE, result.data));
  },
  readCategories: ({ commit }) => categoryService.readCategories()
  .then((result) => {
    console.log(result);
    commit(types.CATEGORY_READ, result.data.data);
  }),
  updateCategory: ({ commit }, { category }) => categoryService.updateCategory({
    title: category.value.title,
    modifyTimestamp: Date.now(),
  }),
  deleteCategory: ({ commit }, category) => categoryService.deleteCategory(category.key)
    .then(() => commit(types.CATEGORY_DELETE, category)),
};

/* eslint-disable no-param-reassign */
const mutations = {
  [types.CATEGORY_CREATE]: (s, category) => {
    s.categories.push(category);
  },
  [types.CATEGORY_READ]: (s, categories) => {
    console.log(categories);
    s.categories = categories;
  },
  [types.CATEGORY_DELETE]: (s, category) => {
    const index = s.categories.indexOf(category);
    s.categories.splice(index, 1);
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
