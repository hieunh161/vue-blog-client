<template>
  <div id="article-edit-page">
    <!-- loading -->
    <div class="ui center aligned grid loading-spinner" v-if="isisLoading">
      <circle-loader></circle-loader>
    </div>
    <!-- article content -->
    <div v-if="!isisLoading && selectedArticle">
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
        <div class="ui button basic" :class='{loading:isSavingDraft}' @click="save">{{ $t('button.article_edit.save') }}</div>
        <div class="ui button basic positive" v-if="!isPublished" :class='{loading:isPublishing}' @click="() => showPublishModal()">{{ $t('button.article_edit.publish') }}</div>
        <div class="ui button basic positive" v-if="isPublished" :class='{loading:isPublishing}' @click="() => showPublishModal()">Change Meta Data</div>
        <div class="ui button basic positive" v-if="isPublished" :class='{loading:isPrivating}' @click="() => privateArticle()">{{ $t('button.article_edit.private') }}</div>
        <div class="ui button basic positive" v-if="isPublished" @click="viewArticle">{{ $t('button.article_edit.view_article') }}</div>
        <div class="ui button basic positive" @click="showUploadModal(0)">{{ $t('button.article_edit.upload_image') }}</div>
        <div class="ui button basic positive" @click="showUploadModal(1)">{{ $t('button.article_edit.upload_image') }}</div>
        <div class="ui green horizontal label" v-if="isPublished">Published</div>
        <div class="ui red horizontal label" v-if="!isPublished">Private</div>
      </div>
      <markdown-editor
        class="article-editor"
        language="en" 
        value="write a story"
        v-model="selectedArticle.content">
      </markdown-editor>
      <!-- Image Upload Modal -->
      <image-upload-modal :types="types" :initImgs="selectedArticle.images"></image-upload-modal>
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
          <article-tag class="article-tag" :on-change="onChangeTags" :initTags="filterName(selectedArticle.tags)" placeholder="Add Tag"></article-tag>
        </div>
        <div class="actions">
          <div class="ui basic button red" @click="hidePublishModal">{{ $t('button.common.cancel') }}</div>
          <div class="ui basic button positive" @click="publishArticle">{{ $t('button.article_edit.publish') }}</div>
        </div>
      </div>
    </div>
    <!-- fallback when no items found -->
    <!-- fallback when content not found -->
    <page-not-found v-if="!isisLoading && !selectedArticle"></page-not-found>
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

// TODO: bug v-if make dimmer not work when back and forth

export default {
  created() {
    // load data from api
    nprogress.start();
    this.isisLoading = true;
    this.$store.dispatch('category/readCategories');
    this.$store.dispatch('article/readArticleById', { articleId: this.$route.params.id })
      .then(() => {
        this.originalCategory = this.article.category;
        this.isisLoading = false;
        nprogress.done();
      });
  },
  data() {
    return {
      isisLoading: false,
      addTags: [],
      deleteTags: [],
      isShowTextEmptyWarning: false,
      originalCategory: {},
      isSavingDraft: false,
      isPublishing: false,
      isPrivating: false,
      types: 0,
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
      this.selectedArticle.status_id = ARTICLE_STATUS.DRAFT;
      this.selectedArticle.slugify = util.slugify(this.selectedArticle.title);
      this.$np.start();
      this.isPrivating = true;
      return this.$store.dispatch('article/save', this.selectedArticle)
        .then(() => {
          this.isPrivating = false;
          this.$np.done();
          this.$notify({
            group: 'notice',
            type: 'success',
            title: 'Message',
            text: 'Private article successfully',
          });
        });
    },
    filterName(tags) {
      if (!tags) return {};
      const filteredTags = {};
      tags.forEach((element) => {
        filteredTags[element.name] = true;
      });
      return filteredTags;
    },
    publishArticle() {
      this.selectedArticle.status_id = ARTICLE_STATUS.PUBLISH;
      this.selectedArticle.slugify = util.slugify(this.selectedArticle.title);
      // add tags
      this.selectedArticle.addTags = this.addTags;
      this.selectedArticle.deleteTags = this.deleteTags;
      console.log(this.selectedArticle);
      this.$np.start();
      this.isPublishing = true;
      return this.$store.dispatch('article/save', this.selectedArticle)
        .then(() => {
          this.isPublishing = false;
          this.$np.done();
          this.$notify({
            group: 'notice',
            type: 'success',
            title: 'Message',
            text: 'Publish article successfully',
          });
          // clear tags
          this.$emit('saveTag');
        });
    },
    save() {
      this.$np.start();
      this.isSavingDraft = true;
      this.selectedArticle.slugify = util.slugify(this.selectedArticle.title);
      return this.$store.dispatch('article/save', this.selectedArticle)
        .then(() => {
          this.isSavingDraft = false;
          this.$np.done();
          this.$notify({
            group: 'notice',
            type: 'success',
            title: 'Message',
            text: 'save article successfully',
          });
        });
    },
    viewArticle() {
      // view article when article in publish state only
      if (this.selectedArticle.status_id === 2) {
        this.$router.push(`/article/${this.selectedArticle.id}`);
      }
    },
    showUploadModal(types) {
      this.types = types;
      console.log(this.types);
      // this.$emit('showUploadModal', types);
      this.$('#modal_image_upload').modal('show');
    },
    showLocalUploadModal() {
      console.log('clicked');
      this.$emit('showLocalUploadModal');
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
    ...mapGetters('article', ['articleId', 'selectedArticle']),
    ...mapGetters('category', ['categories']),
    ...mapState('article', ['article']),
    isPublished() {
      return this.selectedArticle.status_id === ARTICLE_STATUS.PUBLISH;
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

.loading-spinner {
  margin: 40px;
}
</style>