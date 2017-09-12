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
    <br>
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
import { mapGetters } from 'vuex';
import { mavonEditor } from 'mavon-editor';
import { markdownEditor } from 'vue-simplemde';
import 'mavon-editor/dist/css/index.css';
import AsyncButton from '../common/AsyncButton';

export default {
  data() {
    return {
      articleId: '',
      article: {},
    };
  },
  methods: {
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
      (articleContent) => {
        if (articleContent) {
          this.article = articleContent;
        } else {
          this.$router.push({ path: 'page-not-found' });
        }
      });
  },
  components: {
    AsyncButton,
    markdownEditor,
    mavonEditor,
  },
  computed: {
    ...mapGetters({ isAdmin: 'authenticate/isAdmin' }),
    ...mapGetters({ currentUserInfo: 'authenticate/currentUserInfo' }),
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