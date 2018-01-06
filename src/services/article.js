import * as firebase from 'firebase';
import * as axios from 'axios';
import util from './util';
import { REF_ARTICLE, REF_USER, IMG_UPLOAD_URL, DEFAULT_COVER_IMAGE } from './const';

// const REF_ARTICLE = 'articles';
// const REF_USER = 'users';

const createTemplateArticle = (metaData) => {
  const articleTitle = 'Article Title';
  const articleContent = 'Write an article';
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
    title: articleTitle,
    coverImage: {
      height: 400,
      width: 800,
      type: 'image/png',
      link: DEFAULT_COVER_IMAGE,
      name: '',
      size: 37490,
      url: DEFAULT_COVER_IMAGE,
    },
    content: articleContent,
    slugify: util.slugify(articleTitle),
    createTimestamp: Date.now(),
    modifyTemestamp: Date.now(),
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
    const userArticle = {};
    userArticle[articleId] = true;
    firebase.database().ref(REF_USER)
    .child(metaData.uid).child(REF_ARTICLE)
    .update(userArticle);
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
  const ref = firebase.database().ref(REF_ARTICLE).orderByChild('author/uid').equalTo(userId);
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
      Authorization: 'Client-ID 5b3be50a7c3a7ff',
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
