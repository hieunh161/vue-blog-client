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
  articleId: '',
  article: {},
  allArticles: [],
  userArticles: [],
  uploadStatus: STATUS.INITIAL,
  // loading status
  isLoading: false,
  isSavingDraft: false,
  isPublishingArticle: false,
};

// initial state
const state = INITIAL_STATE;

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
};

// mutations
const mutations = {
  [types.READ_USER_ARTICLES](s, articles) {
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
  [types.RESET_ARTICLE_STATE](s) {
    /* eslint-disable no-undef */
    Object.assign(s, INITIAL_STATE);
  },
};

// actions
const actions = {
  createTemplateArticle(context, user) {
    return articleService.createTemplateArticle(user);
  },
  readArticle(context, { articleId, router }) {
    context.commit(types.RESET_ARTICLE_STATE);
    context.commit(types.UPDATE_LOADING_FLAG, true);
    context.commit(types.SET_ARTICLE_ID, articleId);
    return articleService.readArticle(articleId).then(
      (articleContent) => {
        context.commit(types.UPDATE_LOADING_FLAG, false);
        if (articleContent) {
          context.commit(types.SET_ARTICLE, articleContent);
          if (articleContent.coverImage.url) {
            context.commit(types.UPDATE_UPLOADING_STATUS, STATUS.SUCCESS);
          }
          // increase number of views by one
          const views = articleContent.views + 1;
          articleService.updateArticleProperty(context.state.articleId, { views });
        } else {
          router.push({ path: 'page-not-found' });
        }
      });
  },
  readAllArticles({ commit }) {
    articleService.readAllArticles()
    .then(articles => commit(types.READ_ALL_ARTICLES, articles));
  },
  readArticlesByUser(context, userId) {
    articleService.readArticlesByUser(userId)
    .then(articles => context.commit(types.READ_USER_ARTICLES, articles));
  },
  updateArticle(context, updateData) {
    // update tags
    return tagService.insertTags(context.state.article.tags)
    .then(() => articleService.updateArticle(updateData));
  },
  saveDraft(context, updateData) {
    context.commit(types.ARTICLE_UPDATE_SAVING_DRAFT, true);
    context.dispatch('updateArticle', updateData).then(() => {
      context.commit(types.ARTICLE_UPDATE_SAVING_DRAFT, false);
    });
  },
  publishArticle(context, updateData) {
    context.commit(types.ARTICLE_UPDATE_PUBLISH, true);
    context.dispatch('updateArticle', updateData).then(() => {
      context.commit(types.ARTICLE_UPDATE_PUBLISH, false);
    });
  },
  uploadImage(context, formData) {
    context.commit(types.UPDATE_UPLOADING_STATUS, STATUS.SAVING);
    articleService.uploadImage(formData)
      .then(img => context.dispatch('setArticleCoverImage', img));
  },
  updateUploadStatus(context, uploadStatus) {
    context.commit(types.UPDATE_UPLOADING_STATUS, uploadStatus);
  },
  setArticleCoverImage(context, img) {
    articleService.setArticleCoverImage(context.state.articleId, img).then(
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
