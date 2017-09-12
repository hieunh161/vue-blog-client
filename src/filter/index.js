import Vue from 'vue';
import moment from 'moment';

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

const formatDate = value => (value ? moment(String(value)).format('MM/DD/YYYY hh:mm') : '');

Vue.filter('currency', currency);
Vue.filter('relationship', relationship);
Vue.filter('formatDate', formatDate);
