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
  // const articleContent = {
  //   author: {
  //     id: 'id',
  //     photoURL: 'photoUrl',
  //     displayName: 'displayName',
  //   },
  //   title: 'title',
  //   content: data,
  //   slugify: 'slugify',
  //   category: 'category',
  //   tags: ['tag1', 'tag2'],
  //   createdDate: Date.now(),
  //   lastModified: Date.now(),
  //   status: 'DRAFT',
  //   comments: [''],
  //   views: 0,
  //   likes: 0,
  // };
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
  return ref.once('value').then((snapshot) => {
    console.log(snapshot.val());
    return Promise.resolve(snapshot.val());
  });
};

const editArticle = (article) => {
  console.log(article);
};

export default {
  loadArticles() {
    return Promise.resolve([]);
  },
  readArticle,
  createArticle,
  editArticle,
  createTemplateArticle,
};
