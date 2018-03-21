import * as firebase from 'firebase';
import * as axios from 'axios';
import util from './util';
import { REF_ARTICLE, REF_USER, IMG_UPLOAD_URL, REF_ARTICLE_SHALLOW } from './const';
import { imgUrlConfig, firebaseConfig, articleUrl } from '../config';
// import { articleUrl } from '../config';

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

const readArticle = articleId => axios.get(`${articleUrl}/${articleId}`);
// firebase.database().ref(REF_ARTICLE)
//   .child(articleId).once('value')
//   .then(snapshot => Promise.resolve(snapshot.val()));

const readAllArticles = () => {
  const ref = firebase.database().ref(REF_ARTICLE);
  return ref.once('value').then(snapshot => util.getListArticleFromSnap(snapshot));
};

const readArticlesByUser = (userId) => {
  const ref = firebase.database().ref(REF_ARTICLE).orderByChild('createUser').equalTo(userId);
  return ref.once('value').then(snapshot => util.getListArticleFromSnap(snapshot));
};

const readFirstArticle = (numberArticlePerPage) => {
  const ref = firebase.database().ref(REF_ARTICLE).limitToFirst(numberArticlePerPage);
  return ref.once('value').then(snapshot => util.getListArticleFromSnap(snapshot));
};

// problem about last index
const readMoreArticles = (lastItem, numberArticlePerPage) => {
  const ref = firebase.database().ref(REF_ARTICLE)
    .startAt(null, lastItem).limitToFirst(numberArticlePerPage + 1);
  return ref.once('value').then(snapshot => util.getListArticleFromSnapExceptItem(snapshot, lastItem));
};

const updateArticle = ({ articleId, article }) =>
firebase.database().ref(REF_ARTICLE).child(articleId).update(article);

const updateArticleProperty = (articleId, article) =>
firebase.database().ref(REF_ARTICLE).child(articleId).update(article);

const updateArticleCoverImage = (articleId, img) =>
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

const createNew = article => axios.post(articleUrl, article);

export default {
  createTemplateArticle,
  readArticle,
  readAllArticles,
  readFirstArticle,
  readMoreArticles,
  readArticlesByUser,
  updateArticle,
  updateArticleProperty,
  uploadImage,
  deleteArticle,
  updateArticleCoverImage,
  likeArticle,
  getNumberOfArticles,
  getNumberOfArticlesByUser,
  getNumberOfArticlesByCategory,
  // new
  createNew,
};
