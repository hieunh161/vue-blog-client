<template>
  <div id="article-edit-page">
    <!-- loading -->
    <div class="ui center aligned grid loading" v-if="isLoadingArticle">
      <circle-loader></circle-loader>
    </div>
    <!-- article content -->
    <div v-if="!isLoadingArticle && selectedArticle">
      <div class="ui transparent massive left input fluid article-title">
        <input type="text" 
        v-model="selectedArticle.title"
        v-on:keyup="updateTextEmptyWarning"
        placeholder="Untitled Post">
      </div>
      <div class="ui warning message" v-if="isShowTextEmptyWarning">
        <i class="close icon" @click="isShowTextEmptyWarning = false"></i>
        <div>{{ $t('warning.article_edit.empty_title') }}</div>
      </div>
      <image-uploader class="article-cover-image"></image-uploader>
      <div class="article-action">
        <div class="ui button basic" :class='{loading:isSavingDraft}' @click="saveDraft">{{ $t('button.article_edit.save_draft') }}</div>
        <div class="ui button basic positive" v-if="!isPublishingArticle" :class='{loading:isPublishingArticle}' @click="() => showPublishModal()">{{ $t('button.article_edit.publish') }}</div>
        <div class="ui button basic positive" v-if="isPublishingArticle" :class='{loading:isPublishingArticle}' @click="() => privateArticle()">{{ $t('button.article_edit.private') }}</div>
        <div class="ui button basic positive" v-if="isPublishingArticle" @click="viewArticle">{{ $t('button.article_edit.view_article') }}</div>
        <div class="ui button basic positive" @click="showUploadModal">{{ $t('button.article_edit.upload_image') }}</div>
      </div>
      <markdown-editor
        class="article-editor"
        language="en" 
        value="write a story"
        v-model="selectedArticle.content">
      </markdown-editor>
      <!-- Image Upload Modal -->
      <image-upload-modal :initImgs="selectedArticle.images"></image-upload-modal>
      <!-- Publish Modal -->
      <div class="ui modal" id="publish-modal">
        <i class="close icon"></i>
        <div class="header">{{ $t('message.article_edit.publish_header') }}</div>
        <div class="content">
          <p>{{ $t('message.article_edit.select_category') }}</p>
          <select class="ui selection dropdown article-category" v-model="selectedArticle.category_id">
            <option v-for="category in categories" :value="category.id" v-bind:key="category.id">{{category.name}}</option>
          </select>
          <br>
          <p>{{ $t('message.article_edit.add_tag') }}</p>
          <article-tag class="article-tag" :on-change="onChangeTags" :initTags="article.tags" placeholder="Add Tag"></article-tag>
        </div>
        <div class="actions">
          <div class="ui basic button red" @click="hidePublishModal">{{ $t('button.common.cancel') }}</div>
          <div class="ui basic button positive" @click="publishArticle">{{ $t('button.article_edit.publish') }}</div>
        </div>
      </div>
    </div>
    <!-- fallback when no items found -->
    <!-- fallback when content not found -->
    <page-not-found v-if="!isLoadingArticle && !selectedArticle"></page-not-found>
  </div>
</template>

<script>
import { mapGetters, mapState } from 'vuex';
import { markdownEditor } from 'vue-simplemde';
import nprogress from 'nprogress';
import util from '../../services/util';
import { ARTICLE_STATUS } from '../../services/const';

const ImageUploader = () => import('./ImageUploader');
const ArticleTag = () => import('./ArticleTag');
const Loader = () => import('../common/Loader');
const ImageUploadModal = () => import('./ImageUploadModal');
const PageNotFound = () => import('../PageNotFound');
const CircleLoader = () => import('../common/CircleLoader');

export default {
  created() {
    // load data from api
    nprogress.start();
    this.isLoadingArticle = true;
    this.$store.dispatch('category/readCategories');
    this.$store.dispatch('article/readArticleById', { articleId: this.$route.params.id })
      .then(() => {
        this.originalCategory = this.article.category;
        this.isLoadingArticle = false;
        nprogress.done();
      });
  },
  data() {
    return {
      isLoadingArticle: false,
      addTags: [],
      deleteTags: [],
      isShowTextEmptyWarning: false,
      originalCategory: {},
    };
  },
  methods: {
    showPublishModal() {
      if (this.selectedArticle.title) {
        this.$('#publish-modal').modal('show');
      } else {
        this.isShowTextEmptyWarning = true;
      }
    },
    updateTextEmptyWarning() {
      if (this.selectedArticle.title) {
        this.isShowTextEmptyWarning = false;
      }
    },
    privateArticle() {
      this.selectedArticle.status = ARTICLE_STATUS.DRAFT;
      this.saveArticle();
    },
    publishArticle() {
      this.article.status = ARTICLE_STATUS.PUBLISH;
      this.saveArticle();
    },
    saveArticle() {
      this.updateArticle();
      this.$emit('uploadArticleToServer');
      this.$store.dispatch('article/publishArticle', {
        articleId: this.articleId,
        article: this.article,
        addTags: this.addTags,
        deleteTags: this.deleteTags,
        oldCategory: this.originalCategory,
        newCategory: this.article.category,
      });
    },
    saveDraft() {
      console.log('save');
      this.selectedArticle.slugify = util.slugify(this.selectedArticle.title);
      // this.updateArticle();
      // this.$emit('uploadArticleToServer');
      // {
      //   articleId: this.articleId,
      //   article: this.article,
      //   addTags: this.addTags,
      //   deleteTags: this.deleteTags,
      //   oldCategory: this.originalCategory,
      //   newCategory: this.article.category,
      // }
      this.$store.dispatch('article/saveDraft', this.selectedArticle);
    },
    updateArticle() {
      this.selectedArticle.slugify = util.slugify(this.selectedArticle.title);
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
      this.$('#publish-modal').modal('hide');
    },
    onChangeTags(tags, addTags, deleteTags) {
      this.article.tags = tags;
      this.addTags = addTags;
      this.deleteTags = deleteTags;
    },
  },
  components: {
    ImageUploader,
    ImageUploadModal,
    markdownEditor,
    CircleLoader,
    ArticleTag,
    Loader,
    PageNotFound,
  },
  computed: {
    ...mapGetters('user', ['isAdmin', 'currentUserInfo', 'currentUser']),
    ...mapGetters('article', ['isLoading', 'articleId', 'isSavingDraft', 'isPublishingArticle', 'selectedArticle']),
    ...mapGetters('category', ['categories']),
    ...mapState('article', ['article']),
    // ...mapGetters('article', ['selectedArticle']),
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

.ui.selection.dropdown {
  padding: 5px 11px;
}

.content p {
  margin: 0;
}

.loading {
  margin: 40px;
}
</style>