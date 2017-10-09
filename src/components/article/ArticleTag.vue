
<template>
  <div @click="focusNewTag()" v-bind:class="{'read-only': readOnly}" class="ui small input ">
    <span v-for="(value, tag, index) in tags" v-bind:key="tag" class="ui label  basic article-tag">
      <span>{{ tag }}</span>
      <i class="delete icon" v-if="!readOnly" @click.prevent.stop="remove(tag)"></i>
    </span>
    <input v-if="!readOnly" 
      v-bind:placeholder="placeholder" class="article-new-tag"
      type="text" v-model="newTag"
      v-on:keydown.enter.188.tab.prevent.stop="addNew(newTag)"/>
  </div>
</template>

<script>
import Vue from 'vue';
import _ from 'lodash';

/*eslint-disable*/
const validators = {
  email: new RegExp(/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/),
  url : new RegExp(/^(https?|ftp|rmtp|mms):\/\/(([A-Z0-9][A-Z0-9_-]*)(\.[A-Z0-9][A-Z0-9_-]*)+)(:(\d+))?\/?/i),
  text : new RegExp(/^[a-zA-Z]+$/),
  digits : new RegExp(/^[\d() \.\:\-\+#]+$/),
  isodate : new RegExp(/^\d{4}[\/\-](0?[1-9]|1[012])[\/\-](0?[1-9]|[12][0-9]|3[01])$/),
};
/*eslint-enable*/
export default {
  name: 'InputTag',
  props: {
    initTags: {
      type: Object,
      default: () => {},
    },
    placeholder: {
      type: String,
      default: '',
    },
    onChange: {
      type: Function,
    },
    readOnly: {
      type: Boolean,
      default: false,
    },
    validate: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      newTag: '',
      firstChange: true,
      tags: this.initTags,
      initialTags: {},
    };
  },
  methods: {
    focusNewTag() {
      if (!this.readOnly) {
        this.$el.querySelector('.article-new-tag').focus();
      }
    },
    saveInitState() {
      if (this.firstChange) {
        this.firstChange = false;
        this.initialTags = _.cloneDeep(this.tags);
      }
    },
    addNew(tag) {
      if (!this.tags) {
        this.tags = {};
      }
      this.saveInitState();
      const isValid = tag && !_.has(this.tags, tag) && this.validateIfNeeded(tag);
      if (isValid) {
        Vue.set(this.tags, tag, true);
        this.tagChange();
      }
      this.newTag = '';
    },
    validateIfNeeded(tagValue) {
      if (this.validate === '' || this.validate === undefined) {
        return true;
      } else if (Object.keys(validators).indexOf(this.validate) > -1) {
        return validators[this.validate].test(tagValue);
      }
      return true;
    },
    remove(tag) {
      this.saveInitState();
      Vue.delete(this.tags, tag);
      this.tagChange();
    },
    tagChange() {
      if (this.onChange) {
        // console.log(this.initTags);
        // // avoid passing the observer
        const addTags = _.difference(Object.keys(this.tags), Object.keys(this.initialTags));
        const deleteTags = _.difference(Object.keys(this.initialTags), Object.keys(this.tags));
        // console.log(addTags);
        // console.log(deleteTags);
        this.onChange(this.tags, addTags, deleteTags);
      }
    },
  },
};
</script>

<style scoped>
.article-tag {
  margin-right: 4px;
  font-size: 14px;
  font-style: normal;
  font-weight: normal;
}
</style>