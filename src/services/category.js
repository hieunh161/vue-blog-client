import * as firebase from 'firebase';
import util from './util';
import { REF_CATEGORY, REF_ARTICLE } from './const';

const createCategory = category => firebase.database().ref(REF_CATEGORY)
  .push(category);

const createArticleCategory = (categoryId, articleId) => firebase.database().ref(REF_CATEGORY)
  .child(categoryId)
  .child(REF_ARTICLE)
  .child(articleId)
  .set(true);

const readCategories = () => firebase.database().ref(REF_CATEGORY)
  .once('value').then(snapshot => util.getItemListFromSnapshot(snapshot));

const updateCategory = category => firebase.database().ref(REF_CATEGORY)
  .child(category.key).update(category);

const updateArticleCategory = (categoryId, articleId, value) => firebase.database()
  .ref(REF_CATEGORY)
  .child(categoryId)
  .child(REF_ARTICLE)
  .child(articleId)
  .set(value);

const deleteCategory = categoryId => firebase.database().ref(REF_CATEGORY)
  .child(categoryId).remove();

const deleteArticleCategory = (categoryId, articleId) => firebase.database().ref(REF_CATEGORY)
  .child(categoryId).child(REF_ARTICLE)
  .child(articleId)
  .remove();

export default {
  createCategory,
  createArticleCategory,
  readCategories,
  updateCategory,
  updateArticleCategory,
  deleteCategory,
  deleteArticleCategory,
};
