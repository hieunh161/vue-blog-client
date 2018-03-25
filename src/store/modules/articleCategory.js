import * as types from '../mutationTypes';
import articleCategoryService from '../../services/articleCategory';

/* eslint-disable no-param-reassign */
const InitState = {
  categoryId: null,
  articles: [],
  page: 1,
  totalPage: 0,
  totalArticles: 0,
};
// getters
const getters = {
  articles: s => s.articles,
  canLoadMore: s => s.page < s.totalPage,
};

const actions = {
  loadArticles: ({ commit, state }, categoryId) => {
    commit(types.ARTICLE_CATEGORY_SET_ID, categoryId);
    return articleCategoryService.articlesCategory(state.categoryId, state.page)
      .then(result => commit(types.ARTICLE_CATEGORY_SET_CONTENT, result.data));
  },
  loadMore: ({ commit, state }) => {
    commit(types.ARTICLE_CATEGORY_NEXT_PAGE);
    return articleCategoryService.articlesCategory(state.categoryId, state.page)
    .then(result => commit(types.ARTICLE_CATEGORY_ADD_CONTENT, result.data));
  },
  clearCache: ({ commit, state }, categoryId) => {
    if (state.categoryId !== categoryId) {
      commit(types.ARTICLE_CATEGORY_CLEAR_STATE);
    }
  },
};

const mutations = {
  [types.ARTICLE_CATEGORY_SET_CONTENT]: (s, result) => {
    s.totalPage = result.last_page;
    s.totalArticles = result.total;
    s.articles = result.data;
  },
  [types.ARTICLE_CATEGORY_SET_ID]: (s, categoryId) => {
    s.categoryId = categoryId;
  },
  [types.ARTICLE_CATEGORY_NEXT_PAGE]: (s) => {
    s.page += 1;
  },
  [types.ARTICLE_CATEGORY_ADD_CONTENT]: (s, result) => {
    s.articles = s.articles.concat(result.data);
  },
  [types.ARTICLE_CATEGORY_CLEAR_STATE]: (s) => {
    s.categoryId = null;
    s.articles = [];
    s.page = 1;
    s.totalPage = 0;
    s.totalArticles = 0;
  },
};

const state = InitState;

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
