<template>
  <div id="article-edit-page">
    <!--
    <mavon-editor
      v-model="article.content"
      value="# Write your story..."
      language="en"
      style="height: 100%"></mavon-editor>
      -->
    <div class="ui transparent massive left input fluid large-font">
      <input type="text" 
      v-model="article.title"
      placeholder="Title...">
    </div>
    <image-uploader></image-uploader>
    <br>
    <!--
    <dropzone id="myVueDropzone" 
      :headers="csrfHeader"
      url="https://api.imgur.com/3/upload" 
      v-on:vdropzone-success="showSuccess">
      -->
      <!-- Optional parameters if any! -->
      <input type="hidden" name="token" value="xxx">
    </dropzone>
    <markdown-editor
      language="en" 
      value="write a story"
      v-model="article.content">
    </markdown-editor>
    <div class="ui button basic" @click="saveArticle">Save Draft</div>
    <div class="ui button basic positive" @click="publicArticle">Public Article</div>
    <async-button 
      :text="'Async Button'"
      :className="'basic positive'"></async-button>
  </div>
</template>

<script>
import { mapGetters, mapState } from 'vuex';
import { mavonEditor } from 'mavon-editor';
import { markdownEditor } from 'vue-simplemde';
import Dropzone from 'vue2-dropzone';
import 'mavon-editor/dist/css/index.css';
import AsyncButton from '../common/AsyncButton';
import ImageUploader from './ImageUploader';

export default {
  data() {
    return {
      articleId: '',
      // article: {},
      csrfHeader: { Authorization: 'Client-ID b83be4684a2c869' },
    };
  },
  methods: {
    showSuccess(file, response) {
      console.log('A file was successfully uploaded');
      console.log(response);
    },
    saveArticle() {
      this.article.lastModified = Date.now();
      this.$store.dispatch('article/updateArticle', { articleId: this.articleId, article: this.article }).then(
        () => console.log('save successful'),
      );
    },
    publicArticle() {
      this.article.lastModified = Date.now();
      this.article.status = 1;
      this.$store.dispatch('article/updateArticle', { articleId: this.articleId, article: this.article }).then(
        () => console.log('save successful'),
      );
    },
  },
  mounted() {
    // load data from api
    this.articleId = this.$route.params.id;
    this.$store.dispatch('article/readArticle', this.articleId).then(
      (result) => {
        if (result) {
          // this.article = articleContent;
        } else {
          this.$router.push({ path: 'page-not-found' });
        }
      });
  },
  components: {
    AsyncButton,
    ImageUploader,
    Dropzone,
    markdownEditor,
    mavonEditor,
  },
  computed: {
    // ...mapGetters({ content: 'article/articleContent' }),
    ...mapGetters({ isAdmin: 'authenticate/isAdmin' }),
    ...mapGetters({ currentUserInfo: 'authenticate/currentUserInfo' }),
    // ...mapState({ article: state => (state.article.article ? state.article.article : {}) }),
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
  margin: 70px 20px 0px 20px;
}

</style>