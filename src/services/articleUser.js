import * as firebase from 'firebase';
import * as axios from 'axios';
// import * as axios from 'axios';
import util from './util';
import { REF_ARTICLE } from './const';
import { articleUrl } from '../config';

const getArticlesByStatus = (userId, status) => {
  firebase.database().ref(REF_ARTICLE)
    .orderBy('createUser')
    .startAt(userId)
    .endAt(userId)
    .orderBy('status')
    .startAt(status)
    .endAt(status)
    .then(result => util.getListArticleFromSnap(result));
};

const getArticlesByUser = userId => firebase.database().ref(REF_ARTICLE)
    .orderByChild('createUser')
    .equalTo(userId)
    .once('value')
    .then(result => util.getListArticleFromSnap(result));


const articlesByUser = (userId, pageIndex) => axios.get(`${articleUrl}/user/${userId}?page=${pageIndex}`);

// const articlesByUserStatus = (userId, status, pageIndex) =>
// axios.get(`${articleUrl}/user/${userId}/status/${status}?page=${pageIndex}`);

const articlesByUserStatus = (userId, status) => axios.get(`${articleUrl}/user/${userId}/status/${status}`);

export default {
  getArticlesByUser,
  getArticlesByStatus,
  articlesByUser,
  articlesByUserStatus,
};
