import * as axios from 'axios';
import authService from '../../services/auth';
import * as types from '../mutationTypes';

const state = {
  authUser: {
    isAuthorizing: false,
    error_message: null,
    authorized: false,
    access_token: null,
    refresh_token: null,
  },
};

const getters = {
  authUser: s => s.authUser,
};

const actions = {
  login: ({ commit }, { username, password }) => {
    commit(types.AUTH_SET_LOADING, true);
    return authService.login({ username, password })
      .then((response) => {
        console.log('come here');
        console.log(response);
        if (response.status === 200) {
          commit(types.AUTH_SET_TOKEN, response.data);
          // const header = {
          //   Accept: 'application/json',
          //   Authorization: `Bearer ${response.data.access_token}`,
          // };
          // // set global config for axios header
          // axios.defaults.headers.common.Accept = 'application/json';
          // axios.defaults.headers.common.Authorization = `Bearer ${response.data.access_token}`;
        } else if (response.data.error) {
          console.log(response);
        }
        commit(types.AUTH_SET_LOADING, false);
      })
      .catch((error) => {
        console.log('come here error in catch');
        console.log(error.response);
        commit(types.AUTH_SET_ERROR, error.response.data);
      });
  },
};

/* eslint-disable no-param-reassign */
const mutations = {
  [types.AUTH_SET_LOADING](s, loading) {
    s.authUser.isAuthorizing = loading;
  },
  [types.AUTH_SET_TOKEN](s, header) {
    s.authUser.authorized = true;
    s.authUser.access_token = header.access_token;
    s.authUser.refresh_token = header.refresh_token;
    axios.defaults.headers.common.Accept = 'application/json';
    axios.defaults.headers.common.Authorization = `Bearer ${header.access_token}`;
  },
  [types.AUTH_SET_ERROR](s, error) {
    s.authUser.error_message = error.message;
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};

