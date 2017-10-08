<template>
  <div id="article-edit-page">
    <loader v-if="isLoading"></loader>
    <div v-if="!isLoading">
      <div class="ui transparent massive left input fluid large-font article-title">
        <input type="text" 
        v-model="article.title"
        placeholder="Title...">
      </div>
      <image-uploader class="article-cover-image"></image-uploader>
      <article-tag class="article-tag" :on-change="onChangeTags" :tags="article.tags" placeholder="Add Tag"></article-tag>
      <markdown-editor
        language="en" 
        value="write a story"
        v-model="article.content">
      </markdown-editor>
      <!-- <mavon-editor
        v-model="article.content"
        value="# Write your story..."
        language="en"
        style="height: 95%"></mavon-editor> -->
      <div class="article-action">
        <div class="ui button basic" @click="saveArticle">Save Draft</div>
        <div class="ui button basic positive" @click="publicArticle">Public Article</div>
        <async-button 
          :text="'Async Button'"
          :className="'basic positive'"></async-button>
      </div>
      <div class="page-footer"></div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapState } from 'vuex';
import { mavonEditor } from 'mavon-editor';
import { markdownEditor } from 'vue-simplemde';
import 'mavon-editor/dist/css/index.css';
import AsyncButton from '../common/AsyncButton';
import ImageUploader from './ImageUploader';
import ArticleTag from './ArticleTag';
import Loader from '../common/Loader';

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
      this.article.lastModified = Date.now();
      this.article.slugify = slugifyUrl(this.article.title);
      this.$store.dispatch('article/updateArticle', { articleId: this.articleId, article: this.article });
    },
    publicArticle() {
      this.article.status = 1;
      this.article.lastModified = Date.now();
      this.$store.dispatch('article/updateArticle', { articleId: this.articleId, article: this.article });
    },
    onChangeTags() {
      console.log(this.article.tags);
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
    ArticleTag,
    Loader,
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

.auto-textarea-wrapper .auto-textarea-input {
  font-family: -apple-system,BlinkMacSystemFont,Segoe UI,Helvetica,Arial,sans-serif !important;
}

.large-font {
  font-size: 40px !important;
}

.article-title {
  margin: 8px 0px;
}

.article-tag,
.article-cover-image {
  margin: 8px 0px;
}

.article-action{
  margin-bottom: 20px;
}

#article-edit-page {
  margin: 0px 20px 0px 24px;
}

.page-footer {
  height: 30px;
}

</style>