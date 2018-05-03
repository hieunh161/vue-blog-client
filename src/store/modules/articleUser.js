
import * as types from '../mutationTypes';
import { ARTICLE_STATUS } from '../../services/const';
import articleUserService from '../../services/articleUser';

/* eslint-disable no-param-reassign */
const INITIAL_STATE = {
  articles: [],
  status: ARTICLE_STATUS.DRAFT,
  publishArticles: [],
  draftArticles: [],
};

// getters
const getters = {
  publishArticles: s => s.publishArticles,
  draftArticles: s => s.draftArticles,
  articles: s => s.articles,
  hasArticleInTab: s => s.hasArticleInTab,
};

const actions = {
  getArticlesByUser: ({ commit }, userId) => articleUserService.getArticlesByUser(userId)
    .then(result => commit(types.ARTICLE_USER_SET_CONTENT, result)),
  getArticlesByStatus: ({ commit }, userId, status) => {
    articleUserService.getArticlesByStatus(userId, status)
    .then(result => commit(types.ARTICLE_USER_SET_PUBLISH, result));
  },
  articlesByUser: ({ commit, state }, userId) =>
    articleUserService.articlesByUser(userId, state.pageIndex)
    .then(result => commit(types.ARTICLE_USER_SET_CONTENT, result.data)),
  setTab: ({ commit }, status) => commit(types.ARTICLE_USER_SET_STATUS, status),
  getArticles: ({ commit, state }, { userId, pageIndex }) =>
    articleUserService.articlesByUserStatus(userId, state.status, pageIndex)
    .then(result => commit(types.ARTICLE_USER_SET_CONTENT, result.data)),
  loadTabContent: ({ commit, state }, userId) =>
  articleUserService.articlesByUserStatus(userId, state.status)
    .then(result => commit(types.ARTICLE_USER_SET_CONTENT, result.data)),
};

const mutations = {
  [types.ARTICLE_USER_SET_CONTENT]: (state, result) => {
    if (state.status === ARTICLE_STATUS.DRAFT) {
      state.draftArticles = result;
      state.hasArticleInTab = state.draftArticles.length > 0;
    }
    if (state.status === ARTICLE_STATUS.PUBLISH) {
      state.publishArticles = result;
      state.hasArticleInTab = state.publishArticles.length > 0;
    }
  },
  [types.ARTICLE_USER_SET_STATUS]: (s, status) => {
    s.status = status;
  },
};

// initial state
const state = INITIAL_STATE;

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
