import * as axios from 'axios';
import { articleCategoryUrl } from '../config';

const articlesCategory = (categoryId, page) => axios.get(`${articleCategoryUrl}${categoryId}?page=${page}`);

export default {
  articlesCategory,
};
