import * as firebase from 'firebase';
import * as uuidv4 from 'uuid/v4';

const createTemplateArticle = (metaData) => {
  console.log(metaData);
  const articleContent = {
    author: {
      id: 'id',
      photoURL: 'photoUrl',
      displayName: 'displayName',
    },
    title: 'Article Title',
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
  return firebase.database().ref('article').child(articleId).set(articleContent)
  .then(
    (success) => {
      console.log(success);
      return Promise.resolve(articleId);
    },
    (error) => {
      console.log(error);
    },
  );
};

const createArticle = (data) => {
  const articleId = uuidv4();
  return firebase.database().ref('article').child(articleId).set(data)
  .then(
    (success) => {
      console.log(success);
      return Promise.resolve(articleId);
    },
    (error) => {
      console.log(error);
      return Promise.resolve(articleId);
    },
  );
};

const readArticle = (articleId) => {
  console.log(articleId);
  const ref = firebase.database().ref('article').child(articleId);
  return ref.once('value').then(snapshot => Promise.resolve(snapshot.val()));
};

const readArticlesByUser = (userId) => {
  console.log(userId);
  const ref = firebase.database().ref('article');
  return ref.orderByChild('author/id')
    .equalTo(userId)
    .on('child_added')
    .then(snapshot => Promise.resolve(snapshot.val()));
};

const updateArticle = data => firebase.database().ref('article').child(data.articleId).set(data.article)
  .then(
    () => Promise.resolve(data.articleId),
    (error) => {
      console.log(error);
      return Promise.resolve(data.articleId);
    },
  );

const deleteArticle = articleId => firebase.database().ref('article').child(articleId).remove()
  .then(() => Promise.resolve(articleId));

export default {
  loadArticles() {
    return Promise.resolve([]);
  },
  createArticle,
  readArticle,
  readArticlesByUser,
  updateArticle,
  deleteArticle,
  createTemplateArticle,
};
