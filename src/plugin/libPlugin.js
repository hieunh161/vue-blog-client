import _ from 'lodash';
import $ from 'jquery';
import nprogress from 'nprogress';

const libPlugin = {};
/* eslint-disable no-param-reassign */
/* eslint-disable no-underscore-dangle */
/* eslint-disable no-unused-vars */
libPlugin.install = (Vue, options) => {
  Vue.prototype.$_ = _;
  Vue.prototype.$ = $;
  Vue.prototype.$np = nprogress;
};

export default libPlugin;
