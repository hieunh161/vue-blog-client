import * as firebase from 'firebase';
import * as axios from 'axios';
import * as uuidv4 from 'uuid/v4';

const createTemplateArticle = (metaData) => {
  const content = {
    author: {
      id: metaData.uid,
      photoURL: metaData.photoURL,
      displayName: metaData.displayName,
    },
    title: 'Article Title',
    coverImage: '',
    content: 'Write an article',
    slugify: '',
    category: [''],
    tags: ['Tag'],
    createdDate: Date.now(),
    lastModified: Date.now(),
    status: 0,
    comments: [''],
    views: 0,
    likes: 0,
  };
  const articleId = uuidv4();
  return firebase.database().ref('article').child(articleId).set(content)
  .then(() => articleId);
};

const readArticle = (articleId) => {
  const ref = firebase.database().ref('article').child(articleId);
  return ref.once('value').then(snapshot => Promise.resolve(snapshot.val()));
};

const readArticlesByUser = (userId) => {
  const ref = firebase.database().ref('article').orderByChild('author/id').equalTo(userId);
  return ref.once('value').then((snapshot) => {
    const result = [];
    snapshot.forEach(item => result.push(item.val()));
    return Promise.resolve(result);
  });
};

const updateArticle = data => firebase.database().ref('article').child(data.articleId).set(data.article);

const setArticleCoverImage = (articleId, img) => firebase.database().ref('article').child(articleId).child('coverImage')
.set(img);

const deleteArticle = articleId => firebase.database().ref('article').child(articleId).remove();

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
      const result = Object.assign({}, x.data, { url: x.data.link });
      return Promise.resolve(result);
    });
};

export default {
  uploadImage,
  readArticle,
  readArticlesByUser,
  updateArticle,
  deleteArticle,
  createTemplateArticle,
  setArticleCoverImage,
};
