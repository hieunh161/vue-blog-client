<template>
  <div id="editor">
    <div class="ui button" @click="saveDraft">Save Draft</div>
    <div class="ui button" @click="saveDraft">Public</div>
    <markdown-editor
      language="en" 
      value="write a story"
      v-model="content">
    </markdown-editor>
  </div>
</template>
<script>
// import ArticleEditor from './ArticleEditor';
import { markdownEditor } from 'vue-simplemde';
import { mavonEditor } from 'mavon-editor';
import 'mavon-editor/dist/css/index.css';

export default {
  data() {
    return { content: '' };
  },
  components: {
    markdownEditor,
    mavonEditor,
  },
  methods: {
    saveDraft() {
      console.log(this.content);
      this.$store.dispatch('article/saveDraftArticle', this.content);
    },
  },
};
</script>
<style scoped>

</style>