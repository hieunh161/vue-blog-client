
// import Vue from 'vue';
import _ from 'lodash';
import * as types from '../mutation-types';
import articleService from '../../services/article';
import tagService from '../../services/tag';

/* eslint-disable no-param-reassign */
const STATUS = {
  INITIAL: 0,
  SAVING: 1,
  SUCCESS: 2,
  FAILED: 3,
};

const INITIAL_STATE = {
  // article
  articleId: '',
  article: {},
  allArticles: [],
  userArticles: [],
  // image uploading
  uploadStatus: STATUS.INITIAL,
  // loading status
  isLoading: false,
  isSavingDraft: false,
  isPublishingArticle: false,
  isLoadingArticlesByUser: false,
};

// getters
const getters = {
  articleId: s => s.articleId,
  uploadStatus: s => s.uploadStatus,
  coverImage: s => s.article.coverImage,
  article: s => s.article,
  allArticles: s => s.allArticles,
  userArticles: s => s.userArticles,
  // loading status
  isLoading: s => s.isLoading,
  isSavingDraft: s => s.isSavingDraft,
  isPublishingArticle: s => s.isPublishingArticle,
  isLoadingArticlesByUser: s => s.isLoadingArticlesByUser,
};

const mutations = {
  [types.READ_USER_ARTICLES](s, articles) {
    if (!articles || articles.length === 0) {
      console.log(articles);
    }
    s.userArticles = articles;
  },
  [types.READ_ALL_ARTICLES](s, articles) {
    s.allArticles = articles;
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
  // edit article
  [types.ARTICLE_UPDATE_SAVING_DRAFT](s, status) {
    s.isSavingDraft = status;
  },
  [types.ARTICLE_UPDATE_PUBLISH](s, status) {
    s.isPublishingArticle = status;
  },
  // reset state
  [types.ARTICLE_UPDATE_DEFAULT_STATE](s) {
    Object.assign(s, _.cloneDeep(INITIAL_STATE));
  },
  // update state of likes when user click like
  [types.ARTICLE_UPDATE_LIKE_STATE](s, updateData) {
    if (!s.article.likes) {
      s.article = Object.assign({}, s.article, { likes: updateData });
    }
    // update likes only if likes object exist
    s.article.likes = Object.assign({}, s.article.likes, updateData);
    console.log(s.article);
  },
};

const actions = {
  createTemplateArticle: ({ commit }, user) => {
    // reset all article data to default
    commit(types.ARTICLE_UPDATE_DEFAULT_STATE);
    return articleService.createTemplateArticle(user);
  },
  readArticle: ({ commit, state }, { articleId, router }) => {
    commit(types.ARTICLE_UPDATE_DEFAULT_STATE);
    commit(types.UPDATE_LOADING_FLAG, true);
    commit(types.SET_ARTICLE_ID, articleId);
    return articleService.readArticle(articleId).then(
      (articleContent) => {
        commit(types.UPDATE_LOADING_FLAG, false);
        if (articleContent) {
          commit(types.SET_ARTICLE, articleContent);
          if (articleContent.coverImage) {
            commit(types.UPDATE_UPLOADING_STATUS, STATUS.SUCCESS);
          }
          // increase number of views by one
          const views = articleContent.views + 1;
          articleService.updateArticleProperty(state.articleId, { views });
        } else {
          router.push({ path: 'page-not-found' });
        }
      });
  },
  readAllArticles: ({ commit }) => {
    articleService.readAllArticles()
    .then(articles => commit(types.READ_ALL_ARTICLES, articles));
  },
  readArticlesByUser: ({ commit }, userId) => {
    articleService.readArticlesByUser(userId)
    .then(articles => commit(types.READ_USER_ARTICLES, articles));
  },
  updateArticle: (context, updateData) => {
    // update tags
    const { addTags, deleteTags, articleId } = updateData;
    console.log(updateData);
    return tagService.updateTags(addTags, articleId, true)
    .then(() => tagService.updateTags(deleteTags, articleId, false))
    .then(() => articleService.updateArticle(updateData));
  },
  saveDraft: ({ commit, dispatch }, updateData) => {
    commit(types.ARTICLE_UPDATE_SAVING_DRAFT, true);
    dispatch('updateArticle', updateData).then(() => {
      commit(types.ARTICLE_UPDATE_SAVING_DRAFT, false);
    });
  },
  publishArticle: ({ commit, dispatch }, updateData) => {
    commit(types.ARTICLE_UPDATE_PUBLISH, true);
    dispatch('updateArticle', updateData).then(() => {
      commit(types.ARTICLE_UPDATE_PUBLISH, false);
    });
  },
  uploadImage: ({ commit, dispatch }, formData) => {
    commit(types.UPDATE_UPLOADING_STATUS, STATUS.SAVING);
    articleService.uploadImage(formData)
      .then(img => dispatch('setArticleCoverImage', img));
  },
  updateUploadStatus: ({ commit }, uploadStatus) => {
    commit(types.UPDATE_UPLOADING_STATUS, uploadStatus);
  },
  setArticleCoverImage: ({ commit, state }, img) => {
    articleService.setArticleCoverImage(state.articleId, img).then(
      () => {
        commit(types.UPDATE_UPLOADING_STATUS, STATUS.SUCCESS);
        commit(types.UPDATE_COVER_IMAGE, img);
      },
    ).catch((err) => {
      console.log(err);
      commit(types.UPDATE_UPLOADING_STATUS, STATUS.FAILED);
    });
  },
  // like article
  likeArticle: ({ commit }, { articleId, userId, isLiked }) => {
    // const isLiked = !context.state.article.likes || !context.state.article.likes[userId];
    const likedArticle = {};
    likedArticle[userId] = isLiked;
    commit(types.ARTICLE_UPDATE_LIKE_STATE, likedArticle);
    return articleService.likeArticle(articleId, userId, isLiked);
  },
};

// initial state
const state = _.cloneDeep(INITIAL_STATE);

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
