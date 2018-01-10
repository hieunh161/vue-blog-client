import * as firebase from 'firebase';
import * as axios from 'axios';
import util from './util';
import { REF_ARTICLE, REF_USER, IMG_UPLOAD_URL, REF_ARTICLE_SHALLOW } from './const';
import { imgUrlConfig, firebaseConfig } from '../config';

const createTemplateArticle = (articleTemplate, user) => {
  const userId = user.uid;
  return firebase.database()
  .ref(REF_ARTICLE).push(articleTemplate)
  .then((result) => {
    const articleId = result.key;
    const articleObject = {};
    articleObject[articleId] = true;
    firebase.database().ref(REF_USER)
    .child(userId).child(REF_ARTICLE)
    .update(articleObject);
    firebase.database().ref(REF_ARTICLE_SHALLOW)
    .update(articleObject);
    return Promise.resolve(articleId);
  })
  .then(articleId => articleId);
};

const readArticle = articleId => firebase.database().ref(REF_ARTICLE)
  .child(articleId).once('value')
  .then(snapshot => Promise.resolve(snapshot.val()));

const readAllArticles = () => {
  const ref = firebase.database().ref(REF_ARTICLE).orderByChild('views');
  return ref.once('value').then(snapshot => util.getListArticleFromSnap(snapshot));
};

const readArticlesByUser = (userId) => {
  const ref = firebase.database().ref(REF_ARTICLE).orderByChild('createUser').equalTo(userId);
  return ref.once('value').then(snapshot => util.getListArticleFromSnap(snapshot));
};

const updateArticle = ({ articleId, article }) =>
firebase.database().ref(REF_ARTICLE).child(articleId).update(article);


const updateArticleProperty = (articleId, article) =>
firebase.database().ref(REF_ARTICLE).child(articleId).update(article);

const setArticleCoverImage = (articleId, img) =>
firebase.database().ref(REF_ARTICLE).child(articleId).child('coverImage')
.set(img);

const getNumberOfArticles = () => {
  const url = `${firebaseConfig.databaseURL}/article.json?shallow=true`;
  return axios.get(url).then(response => response.data);
};

const getNumberOfArticlesByUser = (userId) => {
  const url = `${firebaseConfig.databaseURL}/user/${userId}/article.json?shallow=true`;
  return axios.get(url).then(response => response.data);
};

const getNumberOfArticlesByCategory = (categoryId) => {
  const url = `${firebaseConfig.databaseURL}/category/${categoryId}/article.json?shallow=true`;
  return axios.get(url).then(response => response.data);
};

const deleteArticle = articleId => firebase.database().ref(REF_ARTICLE).child(articleId).remove();

const uploadImage = (imageData) => {
  const config = {
    url: IMG_UPLOAD_URL,
    method: 'post',
    data: imageData,
    headers: {
      Authorization: imgUrlConfig.authorization,
      // Authorization: 'Client-ID 5b3be50a7c3a7ff',
    },
  };
  return axios(config)// get data
    .then(x => x.data)
    .then((x) => {
      const result = {
        height: x.data.height,
        width: x.data.width,
        type: x.data.type,
        link: x.data.link,
        name: x.data.link,
        size: x.data.size,
        url: x.data.link,
      };
      return Promise.resolve(result);
    });
};

// Likes
const likeArticle = (articleId, userId, liked) => {
  const likedUser = {};
  likedUser[userId] = liked;
  const likedArticle = {};
  likedArticle[articleId] = liked;
  return firebase.database().ref(REF_ARTICLE).child(articleId).child('likes')
  .update(likedUser)
  .then(() => firebase.database().ref(REF_USER).child(userId).child('likes')
  .update(likedArticle));
};

export default {
  uploadImage,
  readArticle,
  readAllArticles,
  readArticlesByUser,
  updateArticle,
  updateArticleProperty,
  deleteArticle,
  createTemplateArticle,
  setArticleCoverImage,
  likeArticle,
  getNumberOfArticles,
  getNumberOfArticlesByUser,
  getNumberOfArticlesByCategory,
};
