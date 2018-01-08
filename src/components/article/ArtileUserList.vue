<template>
  <div class="ui container user-article">
    <!-- <h1>User Articles</h1> -->
    <div class="ui relaxed divided list">
      <div class="item" v-for="article in userArticles" v-bind:key="article.title">
        <img class="ui small image" v-if="article.coverImage" :src="article.coverImage.url"/>
        <img class="ui small image" v-if="!article.coverImage" src="https://i.imgur.com/I3QyKzY.png"/>
        <div class="content">
          <router-link :to="`/article/${article.id}`">{{ article.title }}</router-link>
          <div class="description">Updated {{article.modifyTimestamp | fromNow}}</div>
          <br/>
          <div class="ui brown basic horizontal label small" v-if="!isPublished(article.status)">Draft</div>
          <div class="ui green basic horizontal label small" v-if="isPublished(article.status)">Public</div>
          <router-link class="ui green basic horizontal label small" :to="`/article/${article.id}/edit`">Edit</router-link>
          <div class="ui button red basic horizontal label small" @click="() => showConfirmDeleteModal(article)">Delete</div>
        </div>
      </div>
    </div>
    <!-- modal -->
    <div class="ui modal">
      <i class="close icon"></i>
      <div class="header">
        Confirm
      </div>
      <div class="content">
        <div class="description">
          <p>Do you want to delete {{selectedArticle ? selectedArticle.title : ''}} category?</p>
        </div>
      </div>
      <div class="actions">
        <div class="ui basic red deny circular button">
          Cancel
        </div>
        <div class="ui positive circular button" @click="deleteArticle">
          Yes
        </div>
      </div>
    </div>
    <!-- fallback when no items found -->
    <div class="ui message" v-if="!userArticles || userArticles.length === 0">
      <div class="header">
        No items found
      </div>
      <p>You haven't written any posts yet. Select 'Create New' from the menu to start one.</p>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import * as $ from 'jquery';
import NprogressContainer from 'vue-nprogress/src/NprogressContainer';
import Loader from '../common/Loader';
import { ARTICLE_STATUS } from '../../services/const';

export default {
  data() {
    return {
      selectedArticle: null,
    };
  },
  mounted() {
    this.$store.dispatch('article/readArticlesByUser', this.$route.params.id);
  },
  computed: {
    ...mapGetters('article', ['userArticles']),
  },
  methods: {
    showConfirmDeleteModal(article) {
      this.selectedArticle = article;
      this.openModal();
    },
    deleteArticle() {
      // delete physical
      // this.$store.dispatch('article/readArticlesByUser', this.$route.params.id);
    },
    openModal: () => $('.modal').modal('show'),
    closeModal: () => $('.modal').modal('close'),
    isPublished: articleStatus => articleStatus === ARTICLE_STATUS.PUBLISH,
  },
  components: {
    Loader,
    NprogressContainer,
  },
};
</script>

<style scoped>
.user-article {
  margin-top: 16px;
}
</style>
