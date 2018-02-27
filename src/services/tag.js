import * as firebase from 'firebase';
import { REF_TAG } from './const';

const updateTag = (tag, articleId, isAdded) => {
  const tagRef = firebase.database().ref(REF_TAG);
  // update transaction and create data if not exist
  return tagRef.child(tag).transaction((currentTag) => {
    // default value
    if (!currentTag) {
      const articles = {};
      articles[articleId] = isAdded;
      return { count: 1, modifyTimestamp: Date.now(), articles };
    }
    // update value if exist
    const articles = currentTag.articles;
    if (articles) articles[articleId] = isAdded;
    const count = isAdded ? currentTag.count + 1 : currentTag.count - 1;
    return { count, modifyTimestamp: Date.now(), articles };
  }, (err) => {
    if (err) {
      console.log(err);
    }
  });
};

// insert tag if not exist else update existing tag counter and last updated
const updateTags = (tags, articleId, isAdded) => {
  const promises = [];
  tags.forEach((tag) => {
    promises.push(updateTag(tag, articleId, isAdded));
  });
  return Promise.all(promises);
};

const deleteArticleFromTag = (tagId, articleId) => {
  const tagRef = firebase.database().ref(REF_TAG);
  return tagRef.child(tagId).child('article').child(articleId).remove();
};

const deleteArticleFromTags = (tags, articleId) => {
  const promises = [];
  tags.forEach((tag) => {
    promises.push(deleteArticleFromTag(tag, articleId));
  });
  return Promise.all(promises);
};

export default {
  updateTags,
  deleteArticleFromTags,
};
