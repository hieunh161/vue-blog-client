import * as types from '../mutation-types';
import articleApi from '../../api/article';

/* eslint-disable no-param-reassign */
// initial state
const state = {
  all: [],
  article: {},
};

// getters
const getters = {
  article: s => s.article,
};

// actions
const actions = {
  createTemplateArticle() {
    return articleApi.createTemplateArticle({});
  },
  readArticle(context, articleId) {
    return articleApi.readArticle(articleId);
  },
  updateArticle(context, updateData) {
    return articleApi.updateArticle(updateData);
  },
  uploadImage(context, formData) {
    return articleApi.uploadImage(formData);
  },
  saveDraftArticle(context, data) {
    console.log(data);
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
    console.log(context);
    if (context.state.article.articleId) {
      // edit old data
      console.log('edit old');
      articleApi.editArticle(articleContent).then((result) => {
        context.commit(types.SAVE_ARTICLE, { result });
      });
    } else {
      console.log('create new');
      articleApi.createArticle(articleContent).then((result) => {
        context.commit(types.SAVE_ARTICLE, { result });
      });
    }
  },
};

// mutations
const mutations = {
  [types.SAVE_ARTICLE](s, { data }) {
    s.article.articleId = data;
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
