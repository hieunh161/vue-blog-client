<template>
  <div class="ui main container">
    <!-- featured -->
    <div class="ui three stackable cards" v-if="articles.length !== 0" id="category-articles">
      <div class="card "  v-for="item in articles" v-bind:key="item.key">
        <router-link class="description" :to="`/article/${item.id}`">
          <div class="ui image cover_image" v-if="item.cover_image" :style="{ backgroundImage: `url('${item.cover_image}')` }"></div>
          <div class="ui image cover_image" v-if="!item.cover_image"  :style="{ backgroundImage: `url('https://i.imgur.com/I3QyKzY.png')` }"></div>
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
                <div class="ui circular basic orange label">
                  <i class="orange heart icon" :class="{ outline:!isLiked(item) }"></i>{{ getLikeNumber(item.likes) }}
                </div>
              </div>
              <img class="ui large avatar image" :src="item.author.photo_url">
              <div class="content">
                <a class="author">{{item.author.displayName}}</a>
                <div class="infor description">{{item.created_at | readableDate}}・{{ item.content | minToRead }} {{ $t('message.article_list.min_read') }}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- loading -->
    <div class="ui center aligned grid loading-spinner" v-if="isLoading">
      <circle-loader></circle-loader>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

const CircleLoader = () => import('../common/CircleLoader');

export default {
  data() {
    return {
      isLoading: false,
    };
  },
  mounted() {
    // just load if there is no items
    // if (this.articles.length === 0) {
    this.$np.start();
    this.isLoading = true;
    this.$store.dispatch('articleCategory/loadArticles', this.$route.params.id)
    .then(() => {
      this.isLoading = false;
      this.$np.done();
    });
    // }
    this.$(window).scroll(() => {
      if (this.$(window).scrollTop() + this.$(window).height() === this.getDocHeight()) {
        // in case of loading articles, we need waiting for synchronize store
        if (!this.isLoading && this.canLoadMore) {
          this.$np.start();
          this.isLoading = true;
          this.$store.dispatch('articleCategory/loadMore')
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
        return this._.countBy(Object.values(likes)).true || 0;
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
    ...mapGetters('articleCategory', ['articles', 'canLoadMore']),
  },
  components: {
    CircleLoader,
  },
};
</script>

<style scoped>
#category-articles {
  text-align: left;
  margin-top: 16px;
  /* min-height: calc(100vh); */
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

.cover_image {
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

.loading-spinner {
  margin: 40px;
}

.read-more {
  margin-top: 16px;
}

</style>
