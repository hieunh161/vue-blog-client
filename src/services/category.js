import * as firebase from 'firebase';
import util from './util';
import { REF_CATEGORY } from './const';

const createCategory = category => firebase.database().ref(REF_CATEGORY)
  .push(category);

const readCategories = () => firebase.database().ref(REF_CATEGORY)
  .once('value').then(snapshot => util.getItemListFromSnapshot(snapshot));

const updateCategory = category => firebase.database().ref(REF_CATEGORY)
  .child(category.key).update({
    title: category.value.title,
    modifyTimestamp: Date.now(),
  });

const deleteCategory = categoryId => firebase.database().ref(REF_CATEGORY)
  .child(categoryId).remove();

export default {
  createCategory,
  readCategories,
  updateCategory,
  deleteCategory,
};
