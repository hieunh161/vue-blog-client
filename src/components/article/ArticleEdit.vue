<template>
  <div id="article-edit-page">
    <div class="ui active inverted dimmer" v-if="isLoading">
      <div class="ui text loader">Loading Article...</div>
    </div>
    <div class="ui transparent massive left input fluid large-font">
      <input type="text" 
      v-model="article.title"
      placeholder="Title...">
    </div>
    <image-uploader></image-uploader>
    <br>
    <div>
      <div class="ui button basic" @click="saveArticle">Save Draft</div>
      <div class="ui button basic positive" @click="publicArticle">Public Article</div>
      <async-button 
        :text="'Async Button'"
        :className="'basic positive'"></async-button>
    </div>
    <br>
    <markdown-editor
      language="en" 
      value="write a story"
      v-model="article.content">
    </markdown-editor>
    <!-- <mavon-editor
      v-model="article.content"
      value="# Write your story..."
      language="en"
      style="height: 100%"></mavon-editor> -->
     
  </div>
</template>

<script>
import { mapGetters, mapState } from 'vuex';
import { mavonEditor } from 'mavon-editor';
import { markdownEditor } from 'vue-simplemde';
import 'mavon-editor/dist/css/index.css';
import AsyncButton from '../common/AsyncButton';
import ImageUploader from './ImageUploader';

export default {
  data() {
    return {
      // article: {},
    };
  },
  methods: {
    showSuccess(file, response) {
      console.log('A file was successfully uploaded');
      console.log(response);
    },
    saveArticle() {
      console.log(this.articleId);
      this.article.lastModified = Date.now();
      this.$store.dispatch('article/updateArticle', { articleId: this.articleId, article: this.article });
    },
    publicArticle() {
      this.article.lastModified = Date.now();
      this.article.status = 1;
      this.$store.dispatch('article/updateArticle', { articleId: this.articleId, article: this.article });
    },
  },
  mounted() {
    // load data from api
    this.$store.dispatch('article/readArticle',
      { articleId: this.$route.params.id, router: this.$router });
  },
  components: {
    AsyncButton,
    ImageUploader,
    markdownEditor,
    mavonEditor,
  },
  computed: {
    ...mapGetters('authenticate', ['isAdmin', 'currentUserInfo']),
    ...mapGetters('article', ['isLoading', 'articleId']),
    ...mapState('article', ['article']),
  },
};
</script>

<style scoped>
.editor {
  margin: auto;
  width: 95%;
  height: 580px;
}

.large-font {
  font-size: 40px !important;
}

#article-edit-page {
  margin: 0px 20px 0px 20px;
}

</style>