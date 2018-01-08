import * as firebase from 'firebase';
import * as axios from 'axios';
import util from './util';
import { REF_ARTICLE, REF_USER, IMG_UPLOAD_URL, REF_ARTICLE_SHALLOW } from './const';
import { imgUrlConfig } from '../config';

const createTemplateArticle = (metaData) => {
  const articleContent = 'Start writing here...';
  const content = {
    // userId,
    // userPhotoURL,
    // userDisplayName,
    // userDescription,
    author: {
      uid: metaData.uid,
      photoURL: metaData.photoURL,
      displayName: metaData.displayName,
      description: metaData.description,
    },
    title: '',
    coverImage: {},
    // {
    //   height: 400,
    //   width: 800,
    //   type: 'image/png',
    //   link: DEFAULT_COVER_IMAGE,
    //   name: '',
    //   size: 37490,
    //   url: DEFAULT_COVER_IMAGE,
    // },
    content: articleContent,
    slugify: '',
    createTimestamp: Date.now(),
    modifyTemestamp: Date.now(),
    createUser: metaData.uid,
    updateUser: metaData.uid,
    published: false,
    status: 0,
    views: 0,
    // {} will not be insert to firebase
    category: {},
    tags: {},
    comments: {},
    likes: {},
    isDelete: false,
  };
  return firebase.database().ref(REF_ARTICLE).push(content)
  .then((result) => {
    const articleId = result.key;
    const articleObject = {};
    articleObject[articleId] = true;
    firebase.database().ref(REF_USER)
    .child(metaData.uid).child(REF_ARTICLE)
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


const updateArticleProperty = (articleId, data) =>
firebase.database().ref(REF_ARTICLE).child(articleId).update(data);

const setArticleCoverImage = (articleId, img) =>
firebase.database().ref(REF_ARTICLE).child(articleId).child('coverImage')
.set(img);

const deleteArticle = articleId => firebase.database().ref(REF_ARTICLE).child(articleId).remove();

const uploadImage = (formData) => {
  const config = {
    url: IMG_UPLOAD_URL,
    method: 'post',
    data: formData,
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
};
