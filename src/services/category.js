import * as firebase from 'firebase';
import util from './util';

const CATEGORY_REF = 'category';

const createCategory = (category) => {
  const content = {
    title: category,
    createdDate: Date.now(),
    modified: Date.now(),
  };
  return firebase.database().ref(CATEGORY_REF).push(content);
};

const readCategory = () => firebase.database().ref(CATEGORY_REF)
.once('value').then(snapshot => util.getItemListFromSnapshot(snapshot));

const updateCategory = (category) => {
  const content = {
    title: category.value.title,
    modified: Date.now(),
  };
  return firebase.database().ref(CATEGORY_REF).child(category.key).update(content);
};

const deleteCategory = (categoryId) => {
  console.log(categoryId);
  return firebase.database().ref(CATEGORY_REF).child(categoryId).remove();
};

export default {
  createCategory,
  readCategory,
  updateCategory,
  deleteCategory,
};
