import * as firebase from 'firebase';
import * as axios from 'axios';
// import util from './util';
import { REF_CATEGORY, REF_ARTICLE } from './const';
import { categoryUrl } from '../config';

const createCategory = category => axios.post(categoryUrl, category);

const readCategories = () => axios.get(categoryUrl);

const updateCategory = category => axios.put(`${categoryUrl}/${category.id}`, category);

const updateArticleCategory = (categoryId, articleId, value) => firebase.database()
  .ref(REF_CATEGORY)
  .child(categoryId)
  .child(REF_ARTICLE)
  .child(articleId)
  .set(value);

const deleteCategory = id => axios.delete(`${categoryUrl}/${id}`);

const deleteArticleCategory = (categoryId, articleId) => firebase.database().ref(REF_CATEGORY)
  .child(categoryId).child(REF_ARTICLE)
  .child(articleId)
  .remove();

const createArticleCategory = (categoryId, articleId) => firebase.database().ref(REF_CATEGORY)
  .child(categoryId)
  .child(REF_ARTICLE)
  .child(articleId)
  .set(true);

export default {
  createCategory,
  createArticleCategory,
  readCategories,
  updateCategory,
  updateArticleCategory,
  deleteCategory,
  deleteArticleCategory,
};
