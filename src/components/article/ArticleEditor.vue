<template>
  <div id="article-edit-page">
    <loader v-if="isLoading"></loader>
    <div v-if="!isLoading">
      <div class="ui transparent massive left input fluid article-title">
        <input type="text" 
        v-model="article.title"
        v-on:keyup="updateTextEmptyWarning"
        placeholder="Untitled Post">
      </div>
      <div class="ui warning message" v-if="isShowTextEmptyWarning">
        <i class="close icon" @click="isShowTextEmptyWarning = false"></i>
        <div>
          Title is empty. Please add title before publish!
        </div>
      </div>
      <image-uploader class="article-cover-image"></image-uploader>
      <div class="article-action">
        <div class="ui button basic" :class='{loading:isSavingDraft}' @click="saveDraftArticle">Save Draft</div>
        <div class="ui button basic positive" v-if="article.status === 0" :class='{loading:isPublishingArticle}' @click="() => showPublishModal()">Publish</div>
        <div class="ui button basic positive" v-if="article.status !== 0" :class='{loading:isPublishingArticle}' @click="() => privateArticle()">Private</div>
        <div class="ui button basic positive" v-if="article.status !== 0" @click="viewArticle">View Article</div>
        <div class="ui button basic positive" @click="showUploadModal">Upload Image</div>
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
      <!-- Image Upload Modal -->
      <image-upload-modal :initImgs="article.images"></image-upload-modal>
      <!-- Publish Modal -->
      <div class="ui modal" id="publish-modal">
        <i class="close icon"></i>
        <div class="header">
          Ready to publish?
        </div>
        <div class="content">
          <p>Select category</p>
          <select class="ui selection dropdown article-category" v-model="article.category">
            <option v-for="category in categoriesName" v-bind:key="category">{{category}}</option>
          </select>
          <br>
          <p>Add Tag</p>
          <article-tag class="article-tag" :on-change="onChangeTags" :initTags="article.tags" placeholder="Add Tag"></article-tag>
        </div>
        <div class="actions">
          <div class="ui basic button orange" @click="hidePublishModal">Cancel</div>
          <div class="ui basic button positive" @click="publishArticle">Publish</div>
        </div>
      </div>
      <div class="page-footer"></div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapState } from 'vuex';
import { markdownEditor } from 'vue-simplemde';
import $ from 'jquery';
// import { mavonEditor } from 'mavon-editor';
// import 'mavon-editor/dist/css/index.css';
import AsyncButton from '../common/AsyncButton';
import ImageUploader from './ImageUploader';
import ArticleTag from './ArticleTag';
import Loader from '../common/Loader';
import ImageUploadModal from './ImageUploadModal';
import util from '../../services/util';
import { ARTICLE_STATUS } from '../../services/const';

export default {
  created() {
    // load data from api
    this.$store.dispatch('article/readArticle', { articleId: this.$route.params.id, router: this.$router });
    this.$store.dispatch('category/getListCategory');
  },
  data() {
    return {
      message: 'from parent',
      addTags: [],
      deleteTags: [],
      isShowTextEmptyWarning: false,
    };
  },
  methods: {
    showPublishModal() {
      // $('.ui.sidebar').sidebar('toggle');
      if (this.article.title) {
        $('#publish-modal').modal('show');
      } else {
        this.isShowTextEmptyWarning = true;
      }
    },
    updateTextEmptyWarning() {
      if (this.article.title) {
        this.isShowTextEmptyWarning = false;
      }
    },
    privateArticle() {
      this.article.status = 0;
      this.saveArticle();
    },
    publishArticle() {
      this.article.status = 1;
      this.saveArticle();
    },
    saveArticle() {
      this.updateArticle();
      this.$emit('uploadArticleToServer');
      this.$store.dispatch('article/publishArticle', { articleId: this.articleId, article: this.article, addTags: this.addTags, deleteTags: this.deleteTags });
    },
    saveDraftArticle() {
      this.updateArticle();
      this.$emit('uploadArticleToServer');
      this.$store.dispatch('article/saveDraft', { articleId: this.articleId, article: this.article, addTags: this.addTags, deleteTags: this.deleteTags });
    },
    updateArticle() {
      this.article.updateTimestamp = Date.now();
      this.article.updateUser = this.currentUser.uid;
      this.article.slugify = util.slugify(this.article.title);
      if (!this.article.category) {
        this.article.category = {};
      }
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
    hidePublishModal() {
      $('#publish-modal').modal('hide');
    },
    onChangeTags(tags, addTags, deleteTags) {
      this.article.tags = tags;
      this.addTags = addTags;
      this.deleteTags = deleteTags;
    },
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
    ...mapGetters('user', ['isAdmin', 'currentUserInfo', 'currentUser']),
    ...mapGetters('article', ['isLoading', 'articleId', 'isSavingDraft', 'isPublishingArticle']),
    ...mapGetters('category', ['categoriesName']),
    ...mapState('article', ['article']),
    isPublished() {
      return this.article.status === ARTICLE_STATUS.PUBLISH;
    },
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
  font-size: 36px !important;
}

.article-tag,
.article-category,
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

.ui.selection.dropdown {
  padding: 5px 11px;
}

.content p {
  margin: 0;
}
</style>