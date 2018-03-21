import * as types from '../mutationTypes';
import fileService from '../../services/file';

const state = {
  // categories: [],
  uploadImage: null,
};

const getters = {
  uploadImage: s => s.uploadImage,
};

const actions = {
  uploadImage: ({ commit }, data) => fileService.uploadImage(data)
    .then(result => commit(types.IMAGE_SET_UPLOAD, result)),
};

/* eslint-disable no-param-reassign */
const mutations = {
  [types.IMAGE_SET_UPLOAD](s, result) {
    s.uploadImage = result;
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
