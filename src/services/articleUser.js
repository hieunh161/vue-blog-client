import * as firebase from 'firebase';
// import * as axios from 'axios';
import util from './util';
import { REF_ARTICLE } from './const';
// import { imgUrlConfig, firebaseConfig } from '../config';

// const createTemplateArticle = (articleTemplate, user) => {
//   const userId = user.uid;
//   return firebase.database()
//   .ref(REF_ARTICLE).push(articleTemplate)
//   .then((result) => {
//     const articleId = result.key;
//     const articleObject = {};
//     articleObject[articleId] = true;
//     firebase.database().ref(REF_USER)
//     .child(userId).child(REF_ARTICLE)
//     .update(articleObject);
//     firebase.database().ref(REF_ARTICLE_SHALLOW)
//     .update(articleObject);
//     return Promise.resolve(articleId);
//   })
//   .then(articleId => articleId);
// };

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

export default {
  getArticlesByUser,
  getArticlesByStatus,
};
