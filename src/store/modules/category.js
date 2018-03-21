import * as types from '../mutationTypes';
import categoryService from '../../services/category';

const state = {
  categories: [],
};

const getters = {
  categories: s => s.categories,
};

const actions = {
  createCategory: ({ commit }, { name, priority }) =>
    categoryService.createCategory({ name, priority })
    .then(result => commit(types.CATEGORY_CREATE, result.data)),
  readCategories: ({ commit }) => categoryService.readCategories()
    .then(result => commit(types.CATEGORY_READ, result.data.data)),
  updateCategory: ({ commit }, { id, name, priority }) =>
    categoryService.updateCategory({ id, name, priority })
    .then(result => commit(types.CATEGORY_UPDATE, result.data)),
  deleteCategory: ({ commit }, id) => categoryService.deleteCategory(id)
    .then(() => commit(types.CATEGORY_DELETE, id)),
};

/* eslint-disable no-param-reassign */
const mutations = {
  [types.CATEGORY_CREATE]: (s, category) => {
    s.categories.push(category);
  },
  [types.CATEGORY_READ]: (s, categories) => {
    s.categories = categories;
  },
  [types.CATEGORY_UPDATE]: (s, category) => {
    Object.assign(s.categories[s.categories.findIndex(el => el.id === category.id)], category);
  },
  [types.CATEGORY_DELETE]: (s, categoryId) => {
    s.categories.splice(s.categories.findIndex(el => el.id === categoryId), 1);
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
