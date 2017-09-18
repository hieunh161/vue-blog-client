import Vue from 'vue';
import moment from 'moment';
import * as marked from 'marked';

const currency = (money) => {
  const i = Math.floor(Math.log(money) / Math.log(1000));
  return `${(money / (1000 ** i)).toFixed(2)}${['$', 'K', 'M', 'B', 'T', 'C'][i]}`;
};

const relationship = (point) => {
  const relationshipLevel = ['First Contact', 'Transactional', 'Collaborative', 'Partner', 'Strategy Partner'];
  if (point > 5 || point < 0) {
    return 'None';
  }
  return relationshipLevel[point - 1];
};

const formatDate = value => (value ? moment(value).format('YYYY-MM-DD') : '');

const minToRead = article => (article ? Math.ceil(article.split(' ').length / 184) : 0);

const parseMarked = input => marked(input, { sanitize: true });

const slugifyUrl = (str, separator) => {
  const slug = str
    .toLowerCase()
    .replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, 'a')
    .replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, 'e')
    .replace(/ì|í|ị|ỉ|ĩ/g, 'i')
    .replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, 'o')
    .replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, 'u')
    .replace(/ỳ|ý|ỵ|ỷ|ỹ/g, 'y')
    .replace(/đ/g, 'd')
    .replace(/\s+/g, '-')
    .replace(/[^A-Za-z0-9_-]/g, '')
    .replace(/-+/g, '-');
  if (separator) {
    return slug.replace(/-/g, separator);
  }
  return slug;
};

Vue.filter('currency', currency);
Vue.filter('relationship', relationship);
Vue.filter('formatDate', formatDate);
Vue.filter('minToRead', minToRead);
Vue.filter('parseMarked', parseMarked);
Vue.filter('slugifyUrl', slugifyUrl);
