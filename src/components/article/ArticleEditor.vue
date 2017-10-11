<template>
  <div id="article-edit-page">
    <loader v-if="isLoading"></loader>
    <div v-if="!isLoading">
      <div class="ui transparent massive left input fluid article-title">
        <input type="text" 
        v-model="article.title"
        placeholder="Title...">
      </div>
      <image-uploader class="article-cover-image"></image-uploader>
      <article-tag class="article-tag" :on-change="onChangeTags" :initTags="article.tags" placeholder="Add Tag"></article-tag>
      <div class="article-action">
        <div class="ui button basic" :class='{loading:isSavingDraft}' @click="saveArticle">Save Draft</div>
        <div class="ui button basic positive" v-if="article.status === 0" :class='{loading:isPublishingArticle}' @click="() => publishArticle(1)">Publish Article</div>
        <div class="ui button basic positive" v-if="article.status !== 0" :class='{loading:isPublishingArticle}' @click="() => publishArticle(0)">Private Article</div>
        <div class="ui button basic positive" v-if="article.status !== 0" @click="viewArticle">View Article</div>
        <div class="ui button basic positive" @click="showUploadModal">Upload Image To Imgur</div>
      </div>
      <markdown-editor
        class="article-editor"
        language="en" 
        value="write a story"
        v-model="article.content">
      </markdown-editor>
      <!-- <mavon-editor
        v-model="article.content"
        value="# Write your story..."
        language="en"
        style="height: 95%"></mavon-editor> -->
      <!-- modal upload file -->
      <image-upload-modal :initImgs="article.images"></image-upload-modal>
      <div class="page-footer"></div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapState } from 'vuex';
import { markdownEditor } from 'vue-simplemde';
// import { mavonEditor } from 'mavon-editor';
// import 'mavon-editor/dist/css/index.css';
import AsyncButton from '../common/AsyncButton';
import ImageUploader from './ImageUploader';
import ArticleTag from './ArticleTag';
import Loader from '../common/Loader';
import ImageUploadModal from './ImageUploadModal';

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
      message: 'from parent',
      addTags: [],
      deleteTags: [],
    };
  },
  methods: {
    saveArticle() {
      this.article.lastModified = Date.now();
      this.article.slugify = slugifyUrl(this.article.title);
      this.$emit('uploadArticleToServer');
      this.$store.dispatch('article/saveDraft', { articleId: this.articleId, article: this.article, addTags: this.addTags, deleteTags: this.deleteTags });
    },
    publishArticle(status) {
      this.article.status = status;
      this.article.lastModified = Date.now();
      this.article.slugify = slugifyUrl(this.article.title);
      this.$emit('uploadArticleToServer');
      this.$store.dispatch('article/publishArticle', { articleId: this.articleId, article: this.article, addTags: this.addTags, deleteTags: this.deleteTags });
    },
    viewArticle() {
      // view article when article in publish state only
      if (this.article.status === 1) {
        this.$router.push(`/article/${this.articleId}`);
      }
    },
    showUploadModal() {
      this.$emit('showUploadModal');
    },
    onChangeTags(tags, addTags, deleteTags) {
      this.article.tags = tags;
      this.addTags = addTags;
      this.deleteTags = deleteTags;
    },
  },
  mounted() {
    // load data from api
    this.$store.dispatch('article/readArticle', { articleId: this.$route.params.id, router: this.$router });
  },
  components: {
    AsyncButton,
    ImageUploader,
    ImageUploadModal,
    markdownEditor,
    // mavonEditor,
    ArticleTag,
    Loader,
  },
  computed: {
    ...mapGetters('user', ['isAdmin', 'currentUserInfo']),
    ...mapGetters('article', ['isLoading', 'articleId', 'isSavingDraft', 'isPublishingArticle']),
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

.article-editor {
  margin-bottom: 24px;
}

.article-title {
  margin: 8px 0px;
  font-size: 40px !important;
}

.article-tag,
.article-cover-image {
  margin: 8px 0px;
}

.article-action{
  margin-bottom: 8px;
}

#article-edit-page {
  margin: 0px 20px 0px 24px;
}

.page-footer {
  height: 30px;
}

</style>