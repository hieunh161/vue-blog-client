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
  createCategory: ({ commit }, { title }) => {
    const category = {
      title,
      createTimestamp: Date.now(),
      modifyTimestamp: Date.now(),
    };
    return categoryService.createCategory(category)
    .then(result => commit(types.CATEGORY_CREATE, {
      key: result.key,
      value: category,
    }));
  },
  readCategories: ({ commit }) => categoryService.readCategories().then((result) => {
    commit(types.CATEGORY_READ, result);
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
