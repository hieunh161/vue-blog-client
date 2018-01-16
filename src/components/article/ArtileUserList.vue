<template>
  <div class="ui container user-article">
    <!-- <h1>User Articles</h1> -->
    <div class="ui pointing secondary menu">
      <a class="item active" data-tab="draft">Draft</a>
      <a class="item" data-tab="publish">Publish</a>
    </div>
    <!-- <div class="ui tab segment active" data-tab="draft">
      Draft tab
    </div>
    <div class="ui tab segment" data-tab="publish">
      Publish tab
    </div> -->
    <div class="ui tab relaxed divided list active" v-if="!isLoadingArtices" data-tab="draft">
      <div class="item" v-for="article in draftArticles" v-bind:key="article.title">
        <img class="ui small image" v-if="article.coverImage" :src="article.coverImage.url"/>
        <img class="ui small image" v-if="!article.coverImage" src="https://i.imgur.com/I3QyKzY.png"/>
        <div class="content">
          <router-link :to="`/article/${article.id}`">{{ article.title }}</router-link>
          <div class="description">Updated {{article.modifyTimestamp | fromNow}}</div>
          <br/>
          <div class="ui brown basic horizontal label small" v-if="!isPublished(article.status)">{{ $t('message.article.status.draft') }}</div>
          <div class="ui green basic horizontal label small" v-if="isPublished(article.status)">{{ $t('message.article.status.publish') }}</div>
          <router-link class="ui green basic horizontal label small" :to="`/article/${article.id}/edit`">{{ $t('button.common.update') }}</router-link>
          <div class="ui button red basic horizontal label small" @click="() => showConfirmDeleteModal(article)">{{ $t('button.common.delete') }}</div>
        </div>
      </div>
    </div>
    <div class="ui tab relaxed divided list" v-if="!isLoadingArtices" data-tab="publish">
      <div class="item" v-for="article in publishArticles" v-bind:key="article.title">
        <img class="ui small image" v-if="article.coverImage" :src="article.coverImage.url"/>
        <img class="ui small image" v-if="!article.coverImage" src="https://i.imgur.com/I3QyKzY.png"/>
        <div class="content">
          <router-link :to="`/article/${article.id}`">{{ article.title }}</router-link>
          <div class="description">Updated {{article.modifyTimestamp | fromNow}}</div>
          <br/>
          <div class="ui brown basic horizontal label small" v-if="!isPublished(article.status)">{{ $t('message.article.status.draft') }}</div>
          <div class="ui green basic horizontal label small" v-if="isPublished(article.status)">{{ $t('message.article.status.publish') }}</div>
          <router-link class="ui green basic horizontal label small" :to="`/article/${article.id}/edit`">{{ $t('button.common.update') }}</router-link>
          <div class="ui button red basic horizontal label small" @click="() => showConfirmDeleteModal(article)">{{ $t('button.common.delete') }}</div>
        </div>
      </div>
    </div>
    <!-- <div class="ui relaxed divided list" v-if="!isLoadingArtices">
      <div class="item" v-for="article in articles" v-bind:key="article.title">
        <img class="ui small image" v-if="article.coverImage" :src="article.coverImage.url"/>
        <img class="ui small image" v-if="!article.coverImage" src="https://i.imgur.com/I3QyKzY.png"/>
        <div class="content">
          <router-link :to="`/article/${article.id}`">{{ article.title }}</router-link>
          <div class="description">Updated {{article.modifyTimestamp | fromNow}}</div>
          <br/>
          <div class="ui brown basic horizontal label small" v-if="!isPublished(article.status)">{{ $t('message.article.status.draft') }}</div>
          <div class="ui green basic horizontal label small" v-if="isPublished(article.status)">{{ $t('message.article.status.publish') }}</div>
          <router-link class="ui green basic horizontal label small" :to="`/article/${article.id}/edit`">{{ $t('button.common.update') }}</router-link>
          <div class="ui button red basic horizontal label small" @click="() => showConfirmDeleteModal(article)">{{ $t('button.common.delete') }}</div>
        </div>
      </div>
    </div> -->
    <!-- modal -->
    <div class="ui modal">
      <i class="close icon"></i>
      <div class="header">
        {{ $t('message.common.confirm') }}
      </div>
      <div class="content">
        <div class="description">
          <p>{{ $t('message.confirm.delete_article', { article: selectedArticle ? selectedArticle.title : '' }) }}></p>
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
    <loader v-if="isLoadingArtices"></loader>
    <div class="ui message" v-if="!isLoadingArtices && !articles || articles.length === 0">
      <div class="header">
        {{ $t('message.article_not_found.title') }}
      </div>
      <p>{{ $t('message.article_not_found.content') }}</p>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
// import * as $ from 'jquery';
import nprogress from 'nprogress';
import Loader from '../common/Loader';
import { ARTICLE_STATUS } from '../../services/const';

export default {
  data() {
    return {
      selectedArticle: null,
      isLoadingArtices: false,
    };
  },
  mounted() {
    this.$('.menu .item').tab();
  },
  created() {
    nprogress.start();
    this.isLoadingArtices = true;
    this.$store.dispatch('articleUser/getArticlesByUser', this.$route.params.id)
    .then(() => {
      nprogress.done();
      this.isLoadingArtices = false;
    });
  },
  computed: {
    ...mapGetters('article', ['userArticles']),
    ...mapGetters('articleUser', ['publishArticles', 'draftArticles', 'articles']),
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
    openModal: () => this.$('.modal').modal('show'),
    closeModal: () => this.$('.modal').modal('close'),
    isPublished: articleStatus => articleStatus === ARTICLE_STATUS.PUBLISH,
  },
  components: {
    Loader,
  },
};
</script>

<style scoped>
.user-article {
  margin-top: 16px;
}
</style>
