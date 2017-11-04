import * as firebase from 'firebase';
import _ from 'lodash';
import * as types from '../mutation-types';
import userService from '../../services/user';

/* eslint-disable no-param-reassign */
const INITIAL_STATE = {
  facebook: {
    isLoading: false,
    result: null,
  },
  user: null,
  userInfo: null,
};

const state = _.cloneDeep(INITIAL_STATE);

const mutations = {
  [types.USER_UPDATE_DEFAULT_STATE](s) {
    Object.assign(s, _.cloneDeep(INITIAL_STATE));
  },
  [types.USER_UPDATE_CURRENT_USER_STATE](s, value) {
    s.user = value;
  },
  [types.USER_UPDATE_INFO_STATE](s, value) {
    s.userInfo = Object.assign({}, s.userInfo, value);
  },
  [types.USER_UPDATE_FOLLOW_STATE](s, updateData) {
    if (!s.userInfo.followings) {
      s.userInfo = Object.assign({}, s.userInfo, { followings: updateData });
    }
    // update likes only if likes object exist
    s.userInfo.followings = Object.assign({}, s.userInfo.followings, updateData);
  },
};

const actions = {
  loginWithFacebook: (context) => {
    userService.signInWithFacebook()
    .then((result) => {
      context.commit(types.USER_UPDATE_CURRENT_USER_STATE, result.user);
      context.dispatch('getUserInfo', result.user);
    }).catch((error) => {
      console.log(error);
    });
  },
  loginWithGoogle: (context) => {
    userService.signInWithGoogle()
    .then((result) => {
      context.commit(types.USER_UPDATE_CURRENT_USER_STATE, result.user);
      context.dispatch('getUserInfo', result.user);
    }).catch((error) => {
      console.log(error);
    });
  },
  setCurrentUser: (context, user) => {
    context.commit(types.USER_UPDATE_CURRENT_USER_STATE, user);
  },
  getUserInfo: (context, user) => {
    userService.getLocalUserInfo(user)
    .then(userInfo => context.commit(types.USER_UPDATE_INFO_STATE, userInfo));
  },
  logOut: (context) => {
    firebase.auth().signOut()
    .then(() => {
      context.commit(types.USER_UPDATE_DEFAULT_STATE);
    }, (error) => {
      console.log(`Signout failed, ${error}!`);
    });
  },
  followUser(context, { follower, following, isFollowed }) {
    const followerUser = {};
    followerUser[following] = isFollowed;
    context.commit(types.USER_UPDATE_FOLLOW_STATE, followerUser);
    return userService.followUser(follower, following, isFollowed);
  },
};

const getters = {
  isLoggedIn: s => !!s.user,
  avatar: s => (s.user ? s.user.photoURL : ''),
  displayName: s => (s.user ? s.user.displayName : ''),
  currentUser: s => s.user,
  currentUserInfo: s => s.userInfo,
  isAdmin: (s) => {
    if (s.userInfo) {
      // admin is 2
      return s.userInfo.role === 2;
    }
    return false;
  },
};

export default {
  state,
  namespaced: true,
  mutations,
  actions,
  getters,
};
