
// import Vue from 'vue';
// import _ from 'lodash';
import * as types from '../mutationTypes';
import articleUser from '../../services/articleUser';
import { ARTICLE_STATUS } from '../../services/const';
// import tagService from '../../services/tag';
// import { UPLOAD_STATUS } from '../../services/const';

/* eslint-disable no-param-reassign */
const INITIAL_STATE = {
  // publishArticles: [],
  // draftArticles: [],
  articles: [],
};

// getters
const getters = {
  publishArticles: s => s.articles.filter(article => article.status === ARTICLE_STATUS.PUBLISH),
  draftArticles: s => s.articles.filter(article => article.status === ARTICLE_STATUS.DRAFT),
  articles: s => s.articles,
};

const mutations = {
  // [types.ARTICLE_USER_SET_PUBLISH]: (state, articles) => {
  //   state.publishArticles.push(articles);
  // },
  // [types.ARTICLE_USER_SET_DRAFT]: (state, articles) => {
  //   state.draftArticles.push(articles);
  // },
  [types.ARTICLE_USER_SET_CONTENT]: (state, articles) => {
    state.articles = articles;
  },
};

const actions = {
  getArticlesByUser: ({ commit }, userId) => articleUser.getArticlesByUser(userId)
    .then(result => commit(types.ARTICLE_USER_SET_CONTENT, result)),
  getArticlesByStatus: ({ commit }, userId, status) => {
    articleUser.getArticlesByStatus(userId, status)
    .then(result => commit(types.ARTICLE_USER_SET_PUBLISH, result));
  },
  // getPublishArticles: ({ commit }, userId) => {
  //   articleUser.getArticlesByStatus(userId, ARTICLE_STATUS.PUBLISH)
  //   .then(result => commit(types.ARTICLE_USER_SET_PUBLISH, result));
  // },
  // getDraftArticles: ({ commit }, userId) => {
  //   articleUser.getArticlesByStatus(userId, ARTICLE_STATUS.DRAFT)
  //   .then(result => commit(types.ARTICLE_USER_SET_DRAFT, result));
  // },
  // getUserArticles: ({ dispatch }, userId) => {
  //   dispatch('getPublishArticles', userId)
  //   .then(() => dispatch('getDraftArticles', userId));
  // },
  // getArticlesByUser: (userId) => {
  // },
  // getOthersArticles: (userId) => {
  // },
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
