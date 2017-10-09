import * as firebase from 'firebase';

const updateTag = (tag) => {
  const tagRef = firebase.database().ref('tags');
  // update transaction and create data if not exist
  return tagRef.child(tag).transaction((currentTag) => {
    if (currentTag === null) {
      return {
        count: 1,
        modified: Date.now(),
      };
    }
    return Object.assign({}, currentTag, { count: currentTag.count + 1, modified: Date.now() });
  }, (err) => {
    if (err) {
      console.log(err);
    }
  });
};

// insert tag if not exist else update existing tag counter and last updated
const insertTags = (tags) => {
  const promises = [];
  Object.keys(tags).forEach((tag) => {
    promises.push(updateTag(tag));
  });
  return Promise.all(promises);
};

export default {
  insertTags,
  updateTag,
};
