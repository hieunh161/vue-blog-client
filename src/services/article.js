import * as firebase from 'firebase';
import * as axios from 'axios';
import * as uuidv4 from 'uuid/v4';

const ARTICLE_REF = 'articles';
const USER_REF = 'users';

const createTemplateArticle = (metaData) => {
  const content = {
    author: {
      uid: metaData.uid,
      photoURL: metaData.photoURL,
      displayName: metaData.displayName,
      description: metaData.description,
    },
    title: 'Article Title',
    coverImage: {
      height: 400,
      width: 800,
      type: 'image/png',
      link: 'https://i.imgur.com/I3QyKzY.png',
      name: '',
      size: 37490,
      url: 'https://i.imgur.com/I3QyKzY.png',
    },
    content: 'Write an article',
    slugify: '',
    createdDate: Date.now(),
    modified: Date.now(),
    published: false,
    status: 0,
    views: 0,
    // {} will not be insert to firebase
    category: {},
    tags: {},
    comments: {},
    likes: {},
  };
  const articleId = uuidv4();
  const userArticle = {};
  userArticle[articleId] = true;
  return firebase.database().ref(ARTICLE_REF).child(articleId).set(content)
  .then(() => firebase.database().ref(USER_REF).child(metaData.uid).child('aricles')
  .update(userArticle))
  .then(() => articleId);
};

const readArticle = (articleId) => {
  const ref = firebase.database().ref(ARTICLE_REF).child(articleId);
  return ref.once('value').then(snapshot => Promise.resolve(snapshot.val()));
};

const getListArticleFromSnap = (snapshot) => {
  const result = [];
  snapshot.forEach((item) => {
    let article = {};
    article = item.val();
    article.id = item.key;
    result.push(article);
  });
  return Promise.resolve(result);
};

const readAllArticles = () => {
  const ref = firebase.database().ref(ARTICLE_REF).orderByChild('views');
  return ref.once('value').then(snapshot => getListArticleFromSnap(snapshot));
};

const readArticlesByUser = (userId) => {
  const ref = firebase.database().ref(ARTICLE_REF).orderByChild('author/uid').equalTo(userId);
  return ref.once('value').then(snapshot => getListArticleFromSnap(snapshot));
};

const updateArticle = ({ articleId, article }) =>
firebase.database().ref(ARTICLE_REF).child(articleId).update(article);

const updateArticleProperty = (articleId, data) =>
firebase.database().ref(ARTICLE_REF).child(articleId).update(data);

const setArticleCoverImage = (articleId, img) =>
firebase.database().ref(ARTICLE_REF).child(articleId).child('coverImage')
.set(img);

const deleteArticle = articleId => firebase.database().ref(ARTICLE_REF).child(articleId).remove();

const uploadImage = (formData) => {
  const config = {
    url: 'https://api.imgur.com/3/image.json',
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
  return firebase.database().ref(ARTICLE_REF).child(articleId).child('likes')
  .update(likedUser)
  .then(() => firebase.database().ref(USER_REF).child(userId).child('likes')
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
