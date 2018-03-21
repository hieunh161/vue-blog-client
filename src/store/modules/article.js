
// import Vue from 'vue';
import _ from 'lodash';
import * as types from '../mutationTypes';
import articleService from '../../services/article';
import tagService from '../../services/tag';
import categoryService from '../../services/category';
import { UPLOAD_STATUS } from '../../services/const';

/* eslint-disable no-param-reassign */
const INITIAL_STATE = {
  // article
  articleId: '',
  article: {},
  allArticles: [],
  userArticles: [],
  // image uploading
  uploadStatus: UPLOAD_STATUS.INITIAL,
  // loading status
  isSavingDraft: false,
  isPublishingArticle: false,
  isLoadingArticlesByUser: false,
  // Lazy load and paging
  numberArticlePerPage: 6,
  articleIds: null,
  currentPageIndex: 0,
  numberArticles: 0,
  totalPages: 0,
  // new
  selectedArticle: null,
  // viewArticle: null,
};

// getters
const getters = {
  articleId: s => s.articleId,
  article: s => s.article,
  allArticles: s => s.allArticles,
  userArticles: s => s.userArticles,
  canLoadMore: s => s.numberArticles > s.allArticles.length,
  // loading status
  isSavingDraft: s => s.isSavingDraft,
  isPublishingArticle: s => s.isPublishingArticle,
  isLoadingArticlesByUser: s => s.isLoadingArticlesByUser,
  // new
  selectedArticle: s => s.selectedArticle,
  coverImage: s => (s.selectedArticle ? s.selectedArticle.coverImage : null),
  uploadStatus: s => s.uploadStatus,
};

const actions = {
  createTemplateArticle: ({ commit }, user) => {
    const articleTemplate = {
      author: {
        uid: user.uid,
        photoURL: user.photoURL,
        displayName: user.displayName,
        description: user.description,
      },
      title: '',
      content: 'Start writing here...',
      slugify: '',
      createTimestamp: Date.now(),
      modifyTimestamp: Date.now(),
      createUser: user.uid,
      updateUser: user.uid,
      published: false,
      status: 0,
      views: 0,
      coverImage: {},
      category: {},
      tags: {},
      comments: {},
      likes: {},
      isDelete: false,
    };
    // reset all article data to default
    commit(types.ARTICLE_UPDATE_DEFAULT_STATE);
    return articleService.createTemplateArticle(articleTemplate, user);
  },
  readArticleByIdWithViewUpdate: ({ commit, state }, { articleId }) =>
  articleService.readArticle(articleId)
    .then((result) => {
      commit(types.ARTICLE_SET_VIEW, result.data);
      return articleService.updateArticle(state.article);
    }),
  readFirstArticles: ({ commit, state }) => articleService
    .readFirstArticle(state.numberArticlePerPage)
    .then(articles => commit(types.READ_MORE_ARTICLES, articles)),
  readMoreArticles: ({ commit, state }) => {
    // get last item
    const lastItem = state.allArticles[state.currentPageIndex - 1].id;
    return articleService.readMoreArticles(lastItem, state.numberArticlePerPage)
    .then(articles => commit(types.READ_MORE_ARTICLES, articles));
  },
  readAllArticles: ({ commit }) => {
    articleService.readAllArticles()
    .then(articles => commit(types.READ_ALL_ARTICLES, articles));
  },
  getNumberOfArticles: ({ commit }) => articleService.getNumberOfArticles()
    .then(articleIds => commit(types.GET_NUMBER_ARTICLES, articleIds)),
  readArticlesByUser: ({ commit }, userId) => articleService.readArticlesByUser(userId)
    .then(articles => commit(types.READ_USER_ARTICLES, articles)),
  updateArticle: (context, updateData) => {
    // update tags
    const { addTags, deleteTags, articleId, oldCategory, newCategory } = updateData;
    // remove old category, update new category
    if (oldCategory) {
      categoryService.updateArticleCategory(oldCategory, articleId, false);
    }
    if (newCategory) {
      categoryService.updateArticleCategory(newCategory, articleId, true);
    }
    return tagService.updateTags(addTags, articleId, true)
    .then(() => tagService.updateTags(deleteTags, articleId, false))
    .then(() => articleService.updateArticle(updateData));
  },
  saveDraft: ({ commit, dispatch }, updateData) => articleService.updateArticle(updateData)
    .then(result => console.log(result)),
  publishArticle: ({ commit, dispatch }, updateData) => {
    commit(types.ARTICLE_UPDATE_PUBLISH, true);
    return dispatch('updateArticle', updateData).then(() => commit(types.ARTICLE_UPDATE_PUBLISH, false));
  },
  uploadImage: ({ commit, dispatch }, formData) => {
    commit(types.UPDATE_UPLOADING_STATUS, UPLOAD_STATUS.SAVING);
    articleService.uploadImage(formData)
      .then(img => dispatch('updateArticleCoverImage', img));
  },
  updateUploadStatus: ({ commit }, uploadStatus) => {
    commit(types.UPDATE_UPLOADING_STATUS, uploadStatus);
  },
  updateArticleCoverImage: ({ commit, state }, img) => {
    articleService.updateArticleCoverImage(state.articleId, img).then(
      () => {
        commit(types.UPDATE_UPLOADING_STATUS, UPLOAD_STATUS.SUCCESS);
        commit(types.UPDATE_COVER_IMAGE, img);
      },
    ).catch((err) => {
      console.log(err);
      commit(types.UPDATE_UPLOADING_STATUS, UPLOAD_STATUS.FAILED);
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
  deleteArticle: (article) => {
    categoryService.deleteArticleCategory(article.category);
    tagService.deleteArticleFromTags(article.tags);
    articleService.deleteArticle(article.id);
  },
  createNew: ({ commit }, userId) => articleService.createNew({ author: userId })
    .then(result => commit(types.ARTICLE_SET_SELECTED, result.data)),
  readArticleById: ({ commit }, { articleId }) => articleService.readArticle(articleId)
    .then(result => commit(types.ARTICLE_SET_SELECTED, result.data)),
  updateCoverImage: ({ state }, link) => {
    state.selectedArticle.coverImage = link;
  },
};

const mutations = {
  [types.READ_USER_ARTICLES](s, articles) {
    s.userArticles = articles;
  },
  [types.READ_ALL_ARTICLES](s, articles) {
    s.allArticles = articles;
  },
  [types.READ_FIRST_ARTICLES](s, articles) {
    s.allArticles = articles;
  },
  [types.READ_MORE_ARTICLES](s, articles) {
    s.allArticles = s.allArticles.concat(articles);
    s.currentPageIndex += s.numberArticlePerPage;
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
  },
  [types.GET_NUMBER_ARTICLES](s, articleIds) {
    s.articleIds = articleIds;
    s.numberArticles = Object.keys(articleIds).length;
    // total page
    s.totalPages = Math.ceil(s.numberArticles / s.numberArticlePerPage);
  },
  // new
  [types.ARTICLE_SET_SELECTED](s, article) {
    s.selectedArticle = article;
  },
  [types.ARTICLE_SET_VIEW](s, article) {
    s.article = article;
    s.article.views += 1;
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
