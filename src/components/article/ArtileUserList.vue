<template>
  <div class="ui container user-article">
    <div class="ui pointing secondary menu" id="user-article-tab">
      <a class="item active" data-tab="draft" @click="changeTab(1)">Draft</a>
      <a class="item" data-tab="publish" @click="changeTab(2)">Publish</a>
    </div>
    <div class="ui tab active" data-tab="draft">
      <div class="ui four cards">
        <div class="card"  v-for="article in draftArticles" v-bind:key="article.title">
          <router-link class="description" :to="`/article/${article.id}`">
            <div class="ui image cover_image" v-if="article.cover_image" :style="{ backgroundImage: `url('${article.cover_image}')` }"></div>
            <div class="ui image cover_image" v-if="!article.cover_image"  :style="{ backgroundImage: `url('https://i.imgur.com/I3QyKzY.png')` }"></div>
          </router-link>
          <div class="content">
            <router-link class="header" :to="`/article/${article.id}`">{{ article.title | formatTitle }}</router-link>
            <div class="meta">
              <div class="ui teal horizontal label">{{article.category? article.category.name : ''}}</div>
              <div class="ui red horizontal label" v-if="article.status_id === 1">Draft</div>
              <div class="ui green horizontal label" v-if="article.status_id === 2">Publish</div>
            </div>
            <div class="description">
              {{article.content | description}}
            </div>
          </div>
          <div class="extra content">
            <div class="ui two buttons">
              <router-link class="ui basic green button" :to="`/article/${article.id}/edit`">{{ $t('button.common.update') }}</router-link>
              <div class="ui basic red button" @click="() => showConfirmDeleteModal(article)">{{ $t('button.common.delete') }}</div>
            </div>
          </div>
        </div>
       </div>
       
       <div class="ui tab relaxed divided list active" v-if="!isLoadingArtices">
        <!-- no items found -->
        <div class="ui message" v-if="draftArticles.length === 0">
          <div class="header">
            {{ $t('message.article_not_found.title') }}
          </div>
          <p>{{ $t('message.article_not_found.content') }}</p>
        </div>
      </div>
    </div>
    <div class="ui tab" data-tab="publish">
      <div class="ui four cards">
        <div class="card"  v-for="article in publishArticles" v-bind:key="article.title">
          <router-link class="description" :to="`/article/${article.id}`">
            <div class="ui image cover_image" v-if="article.cover_image" :style="{ backgroundImage: `url('${article.cover_image}')` }"></div>
            <div class="ui image cover_image" v-if="!article.cover_image"  :style="{ backgroundImage: `url('https://i.imgur.com/I3QyKzY.png')` }"></div>
          </router-link>
          <div class="content">
            <router-link class="header" :to="`/article/${article.id}`">{{ article.title | formatTitle }}</router-link>
            <div class="meta">
              <div class="ui teal horizontal label">{{article.category? article.category.name : ''}}</div>
              <div class="ui red horizontal label" v-if="article.status_id === 1">Draft</div>
              <div class="ui green horizontal label" v-if="article.status_id === 2">Publish</div>
            </div>
            <div class="description">
              {{article.content | description}}
            </div>
          </div>
          <div class="extra content">
            <div class="ui two buttons">
              <router-link class="ui basic green button" :to="`/article/${article.id}/edit`">{{ $t('button.common.update') }}</router-link>
              <div class="ui basic red button" @click="() => showConfirmDeleteModal(article)">{{ $t('button.common.delete') }}</div>
            </div>
          </div>
        </div>
       </div>
       <div class="ui tab relaxed divided list active" v-if="!isLoadingArtices">
        <!-- no items found -->
        <div class="ui message" v-if="publishArticles.length === 0">
          <div class="header">
            {{ $t('message.article_not_found.title') }}
          </div>
          <p>{{ $t('message.article_not_found.content') }}</p>
        </div>
      </div>
    </div>
    <!-- modal -->
    <div class="ui modal" id="user-article-delete">
      <i class="close icon"></i>
      <div class="header">
        {{ $t('message.common.confirm') }}
      </div>
      <div class="content">
        <div class="description">
          <p>{{ $t('message.confirm.delete_article', { article: selectedArticle ? selectedArticle.title : 'Untitled Post' }) }}</p>
        </div>
      </div>
      <div class="actions">
        <div class="ui positive button" @click="deleteArticle">
          Delete
        </div>
        <div class="ui basic red cancel button">
          Cancel
        </div>
      </div>
    </div>
    <!-- loading -->
    <div class="ui center aligned grid loading-spinner" v-if="isLoadingArtices">
      <circle-loader></circle-loader>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import nprogress from 'nprogress';
import { ARTICLE_STATUS } from '../../services/const';

const CircleLoader = () => import('../common/CircleLoader');

export default {
  data() {
    return {
      selectedArticle: null,
      isLoadingArtices: false,
    };
  },
  mounted() {
    this.$('#user-article-tab .item').tab();
  },
  created() {
    nprogress.start();
    this.isLoadingArtices = true;
    this.$store.dispatch('articleUser/loadTabContent', this.$route.params.id)
    .then(() => {
      this.isLoadingArtices = false;
      nprogress.done();
    });
  },
  computed: {
    // ...mapGetters('article', ['userArticles']),
    ...mapGetters('articleUser', ['publishArticles', 'draftArticles']),
  },
  methods: {
    showConfirmDeleteModal(article) {
      this.selectedArticle = article;
      this.openModal();
    },
    deleteArticle() {
      // delete physical
      this.$store.dispatch('article/deleteArticle', this.selectedArticle);
    },
    openModal() {
      this.$('#user-article-delete').modal('show');
    },
    closeModal() {
      this.$('#user-article-delete').modal('close');
    },
    isPublished: articleStatus => articleStatus === ARTICLE_STATUS.PUBLISH,
    changeTab(tab) {
      console.log('changeTab');
      this.$np.start();
      this.isLoadingArtices = true;
      this.$store.dispatch('articleUser/setTab', tab)
        .then(() => this.$store.dispatch('articleUser/loadTabContent', this.$route.params.id))
        .then(() => {
          this.isLoadingArtices = false;
          this.$np.done();
        });
    },
  },
  components: {
    CircleLoader,
  },
};
</script>

<style scoped>
.user-article {
  margin-top: 16px;
}

.loading-spinner {
  margin: 40px;
}

.cover_image {
  height: 140px;
  width: 100%;
  background-position: 50% 50%;
  background-size: cover;
  transition: filter .2s ease;
}
</style>
