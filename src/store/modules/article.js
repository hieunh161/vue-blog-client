import * as types from '../mutation-types';
import articleApi from '../../api/article';

/* eslint-disable no-param-reassign */
const STATUS = {
  INITIAL: 0,
  SAVING: 1,
  SUCCESS: 2,
  FAILED: 3,
};

const INITIAL_STATE = {
  articleId: '',
  article: {},
  userArticles: [],
  isLoading: false,
  uploadStatus: STATUS.INITIAL,
};

// initial state
const state = INITIAL_STATE;

// getters
const getters = {
  articleId: s => s.articleId,
  isLoading: s => s.isLoading,
  uploadStatus: s => s.uploadStatus,
  coverImage: s => s.article.coverImage,
  article: s => s.article,
  userArticles: s => s.userArticles,
};

// mutations
const mutations = {
  [types.READ_USER_ARTICLES](s, articles) {
    s.userArticles = articles;
  },
  [types.SAVE_ARTICLE](s, { data }) {
    s.article.articleId = data;
  },
  [types.SET_ARTICLE](s, article) {
    s.article = article;
  },
  [types.SET_ARTICLE_ID](s, articleId) {
    s.articleId = articleId;
  },
  [types.UPDATE_COVER_IMAGE](s, coverImage) {
    if (s.article) {
      s.article.coverImage = coverImage;
    }
  },
  [types.UPDATE_LOADING_FLAG](s, isLoading) {
    s.isLoading = isLoading;
  },
  [types.UPDATE_UPLOADING_STATUS](s, status) {
    s.uploadStatus = status;
  },
  [types.RESET_ARTICLE_STATE](s) {
    /* eslint-disable no-undef */
    Object.assign(s, INITIAL_STATE);
  },
};

// actions
const actions = {
  createTemplateArticle(context, user) {
    return articleApi.createTemplateArticle(user);
  },
  readArticle(context, { articleId, router }) {
    context.commit(types.RESET_ARTICLE_STATE);
    context.commit(types.UPDATE_LOADING_FLAG, true);
    context.commit(types.SET_ARTICLE_ID, articleId);
    return articleApi.readArticle(articleId).then(
      (articleContent) => {
        context.commit(types.UPDATE_LOADING_FLAG, false);
        if (articleContent) {
          context.commit(types.SET_ARTICLE, articleContent);
          if (articleContent.coverImage.url) {
            context.commit(types.UPDATE_UPLOADING_STATUS, STATUS.SUCCESS);
          }
        } else {
          router.push({ path: 'page-not-found' });
        }
      });
  },
  readArticlesByUser(context, userId) {
    articleApi.readArticlesByUser(userId)
    .then(articles => context.commit(types.READ_USER_ARTICLES, articles));
  },
  updateArticle(context, updateData) {
    articleApi.updateArticle(updateData);
  },
  uploadImage(context, formData) {
    context.commit(types.UPDATE_UPLOADING_STATUS, STATUS.SAVING);
    articleApi.uploadImage(formData)
      .then(img => context.dispatch('setArticleCoverImage', img));
  },
  setArticleCoverImage(context, img) {
    articleApi.setArticleCoverImage(context.state.articleId, img).then(
      () => {
        context.commit(types.UPDATE_UPLOADING_STATUS, STATUS.SUCCESS);
        context.commit(types.UPDATE_COVER_IMAGE, img);
      },
    ).catch((err) => {
      console.log(err);
      context.commit(types.UPDATE_UPLOADING_STATUS, STATUS.FAILED);
    });
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
