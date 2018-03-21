<template>
  <div class="ui main container">
    <div class="ui relaxed divided list" id="article-list">
      <scale-loader :color="loaderColor" v-if="allArticles.length === 0 && isLoadingFirst"></scale-loader>
      <div class="ui three stackable cards">
        <div class="card"  v-for="item in allArticles" v-bind:key="item.key">
          <router-link class="description" :to="`/article/${item.id}`">
            <div class="ui image coverImage" v-if="item.coverImage" :style="{ backgroundImage: `url('${item.coverImage.url}')` }"></div>
            <div class="ui image coverImage" v-if="!item.coverImage"  :style="{ backgroundImage: `url('https://i.imgur.com/I3QyKzY.png')` }"></div>
          </router-link>
          <div class="content">
            <div class="ui green header link">
              <router-link class="description" :to="`/article/${item.id}`">
                {{item.title}}
              </router-link>
            </div>
          </div>
          <div class="extra-content">
            <div  class="ui list">
              <div class="item">
                <div class="right floated content">
                  <div class="ui circular basic red label">
                    <i class="orange heart icon" :class="{ outline:!isLiked(item) }"></i>{{ getLikeNumber(item.likes) }}
                  </div>
                </div>
                <img class="ui large avatar image" :src="item.author.photoURL">
                <div class="content">
                  <a class="author">{{item.author.displayName}}</a>
                  <div class="infor description">{{item.createTimestamp | readableDate}}・{{ item.content | minToRead }} {{ $t('message.article_list.min_read') }}</div>
                </div>
              </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    <clip-loader :color="loaderColor" v-if="isLoading"></clip-loader>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import _ from 'lodash';
import ClipLoader from 'vue-spinner/src/ClipLoader';
import ScaleLoader from 'vue-spinner/src/ScaleLoader';
import Loader from '../common/Loader';

export default {
  data() {
    return {
      loaderColor: '#00B5AD',
      isLoadingFirst: false,
      isLoading: false,
    };
  },
  mounted() {
    // just load if there is no items
    if (this.allArticles.length === 0) {
      this.$np.start();
      this.isLoadingFirst = true;
      this.$store.dispatch('article/getNumberOfArticles')
      .then(() => this.$store.dispatch('article/readFirstArticles'))
      .then(() => {
        this.isLoadingFirst = false;
        this.$np.done();
      });
    }
    this.$(window).scroll(() => {
      if (this.$(window).scrollTop() + this.$(window).height() === this.getDocHeight()) {
        // in case of loading articles, we need waiting for synchronize store
        if (!this.isLoading && this.canLoadMore) {
          this.$np.start();
          this.isLoading = true;
          this.$store.dispatch('article/readMoreArticles')
          .then(() => {
            this.isLoading = false;
            this.$np.done();
          });
        }
      }
    });
  },
  methods: {
    getLikeNumber(likes) {
      if (likes) {
        // return default value when liked number is undefined
        return _.countBy(Object.values(likes)).true || 0;
      }
      return 0;
    },
    isLiked(item) {
      if (item.likes && this.currentUser) {
        return item.likes[this.currentUser.uid];
      }
      return false;
    },
    getDocHeight: () => Math.max(
      document.body.scrollHeight,
      document.documentElement.scrollHeight,
      document.body.offsetHeight,
      document.documentElement.offsetHeight,
      document.body.clientHeight,
      document.documentElement.clientHeight,
    ),
  },
  computed: {
    ...mapGetters('article', ['allArticles', 'canLoadMore']),
    ...mapGetters('user', ['currentUser']),
  },
  components: {
    Loader,
    ClipLoader,
    ScaleLoader,
  },
};
</script>

<style scoped>
#article-list {
  text-align: left;
  margin-top: 24px;
  min-height: calc(100vh);
}

.ui.tag {
  margin-right: 8px;
}

ul.ui.list ul, ol.ui.list ol, .ui.list .list {
  padding: 0 !important;
}

.ui.list .list > .item .header, .ui.list > .item .header {
  font-family: -apple-system,BlinkMacSystemFont,Segoe UI,Helvetica,Arial,sans-serif !important;
}

.coverImage {
  height: 200px;
  width: 100%;
  background-position: 50% 50%;
  background-size: cover;
  transition: filter .2s ease;
}

.infor {
  font-size: 12px;
}

.author {
  display: block;
  font-style: normal;
  color: #191919 !important;
  cursor: pointer;
  font-size: 14px;
}

.extra-content {
  padding: 0 14px 14px 14px;
}

.like {
  color: #FF6671;
}

</style>
