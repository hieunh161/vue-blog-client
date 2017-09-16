import * as types from '../mutation-types';
import articleApi from '../../api/article';

/* eslint-disable no-param-reassign */
const STATUS = {
  INITIAL: 0,
  SAVING: 1,
  SUCCESS: 2,
  FAILED: 3,
};
// const STATUS_INITIAL = 0;
// const STATUS_SAVING = 1;
// const STATUS_SUCCESS = 2;
// const STATUS_FAILED = 3;

// initial state
const state = {
  articleId: '',
  article: {},
  isLoading: false,
  isUploadingImage: false,
  uploadStatus: STATUS.INITIAL,
};

// getters
const getters = {
  articleId: s => s.articleId,
  isLoading: s => s.isLoading,
  isUploadingImage: s => s.isUploadingImage,
  uploadStatus: s => s.uploadStatus,
  coverImage: s => s.article.coverImage,
  article: s => s.article,
  articleTitle: s => (s.article ? s.article.title : ''),
  articleContent: s => (s.article ? s.article.content : ''),
};

// mutations
const mutations = {
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
  [types.UPDATE_UPLOADING_IMAGE_FLAG](s, isUploadingImage) {
    s.isUploadingImage = isUploadingImage;
  },
  [types.UPDATE_UPLOADING_STATUS](s, status) {
    s.uploadStatus = status;
  },
};

// actions
const actions = {
  createTemplateArticle() {
    return articleApi.createTemplateArticle({});
  },
  readArticle(context, { articleId, router }) {
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
  updateArticle(context, updateData) {
    articleApi.updateArticle(updateData);
  },
  uploadImage(context, formData) {
    context.commit(types.UPDATE_UPLOADING_IMAGE_FLAG, true);
    context.commit(types.UPDATE_UPLOADING_STATUS, STATUS.SAVING);
    articleApi.uploadImage(formData)
      .then(img => context.dispatch('setArticleCoverImage', img));
  },
  setArticleCoverImage(context, img) {
    console.log(img);
    console.log(context.state.articleId);
    articleApi.setArticleCoverImage(context.state.articleId, img).then(
      () => {
        context.commit(types.UPDATE_UPLOADING_IMAGE_FLAG, false);
        context.commit(types.UPDATE_UPLOADING_STATUS, STATUS.SUCCESS);
        context.commit(types.UPDATE_COVER_IMAGE, img);
      },
    ).catch((err) => {
      console.log(err);
      context.commit(types.UPDATE_UPLOADING_STATUS, STATUS.FAILED);
    });
  },
  // setArticleId(context, articleId) {
  //   context.commit(types.SET_ARTICLE_ID);
  // },
  saveDraftArticle(context, data) {
    const articleContent = {
      author: {
        id: 'id',
        photoURL: 'photoUrl',
        displayName: 'displayName',
      },
      title: 'title',
      content: data,
      slugify: 'slugify',
      category: 'category',
      tags: ['tag1', 'tag2'],
      createdDate: Date.now(),
      lastModified: Date.now(),
      status: 'DRAFT',
      comments: [''],
      views: 0,
      likes: 0,
    };
    if (context.state.article.articleId) {
      // edit old data
      articleApi.editArticle(articleContent).then((result) => {
        context.commit(types.SAVE_ARTICLE, { result });
      });
    } else {
      articleApi.createArticle(articleContent).then((result) => {
        context.commit(types.SAVE_ARTICLE, { result });
      });
    }
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
