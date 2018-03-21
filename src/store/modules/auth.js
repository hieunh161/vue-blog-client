import * as axios from 'axios';
import authService from '../../services/auth';
import localStorage from '../../services/localStorage';
import * as types from '../mutationTypes';

// const AuthorizedStatus = {
//   UNAUTHORIZED: 0,
//   AUTHORIZING: 1,
//   AUTHORIZED: 2,
// };

const state = {
  authUser: {
    userId: null,
    displayName: null,
    photoUrl: null,
    email: null,
    access_token: null,
    refresh_token: null,
    role: null,
  },
  authResult: {
    isAuthorizing: false,
    error_message: null,
    authorized: false,
  },
};

const getters = {
  authUser: s => s.authUser,
  authResult: s => s.authResult,
  isLoggedIn: s => s.authUser.access_token,
  isAdmin: s => s.authUser.role === 1,
};

const actions = {
  login: ({ commit }, { username, password }) => {
    commit(types.AUTH_CLEAR_STATE);
    commit(types.AUTH_SET_LOADING, true);
    return authService.login({ username, password })
      .then((response) => {
        if (response.status === 200) {
          commit(types.AUTH_SET_TOKEN, response.data);
          authService.getUser()
            .then(result => commit(types.AUTH_SET_USER_INFO, result.data));
        } else if (response.data.error) {
          console.log(response);
        }
        commit(types.AUTH_SET_LOADING, false);
      })
      .catch(error => commit(types.AUTH_SET_ERROR, error.response.data));
  },
  logout: ({ commit }) => {
    commit(types.AUTH_CLEAR_STATE);
  },
  setAuthUser: ({ commit }, authUser) => {
    commit(types.AUTH_SET_AUTH_USER, authUser);
  },
};

/* eslint-disable no-param-reassign */
const mutations = {
  [types.AUTH_CLEAR_STATE](s) {
    s.authResult.isAuthorizing = false;
    s.authResult.error_message = null;
    s.authResult.authorized = false;
    s.authUser.access_token = null;
    s.authUser.refresh_token = null;
    localStorage.save('authUser', s.authUser);
  },
  [types.AUTH_SET_LOADING](s, loading) {
    s.authResult.isAuthorizing = loading;
  },
  [types.AUTH_SET_TOKEN](s, header) {
    s.authResult.authorized = true;
    s.authUser.access_token = header.access_token;
    s.authUser.refresh_token = header.refresh_token;
    axios.defaults.headers.common.Accept = 'application/json';
    axios.defaults.headers.common.Authorization = `Bearer ${header.access_token}`;
    localStorage.save('authUser', s.authUser);
  },
  [types.AUTH_SET_ERROR](s, error) {
    s.authResult.error_message = error.message;
  },
  [types.AUTH_SET_AUTH_USER](s, authUser) {
    s.authUser = authUser;
    localStorage.save('authUser', s.authUser);
  },
  [types.AUTH_SET_USER_INFO](s, userInfo) {
    s.authUser.userId = userInfo.id;
    s.authUser.displayName = userInfo.display_name;
    s.authUser.email = userInfo.email;
    s.authUser.photoUrl = userInfo.photo_url;
    s.authUser.role = userInfo.role;
    localStorage.save('authUser', s.authUser);
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};

