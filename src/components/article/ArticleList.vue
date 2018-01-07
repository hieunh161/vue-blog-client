<template>
  <div class="ui main container">
    <div class="ui relaxed divided list" id="article-list">
      <loader v-if="allArticles.length === 0"></loader>
      <div class="ui three stackable cards">
        <div class="card"  v-for="item in allArticles" v-bind:key="item.key">
          <div>
            <div class="ui  image coverImage" v-if="item.coverImage" :style="{ backgroundImage: `url('${item.coverImage.url}')` }"></div>
            <div class="ui  image coverImage" v-if="!item.coverImage"  :style="{ backgroundImage: `url('https://i.imgur.com/I3QyKzY.png')` }"></div>
          </div>
          <div class="content">
            <div class="ui green header link">
                <router-link class="description" :to="`/article/${item.id}`">
                  {{item.title}}
                </router-link>
              </div>
              <div>
                <span class="right floated">
                  {{ item.content | minToRead }} min read
                </span>
                <i class="icon grey calendar"></i>
                {{item.createTimestamp | fromNow}}
              </div>
          </div>
          <div class="extra content">
            <div class="right floated meta">
              <div class="ui circular basic orange label">
                <i class="orange heart icon" :class="{ outline:!isLiked(item) }"></i>&nbsp;&nbsp;{{ getLikeNumber(item.likes) }}
              </div>
            </div>
            <img class="ui avatar image" :src="item.author.photoURL"> {{item.author.displayName}}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import _ from 'lodash';
import Loader from '../common/Loader';
import ArticleCard from './ArticleCard';

export default {
  mounted() {
    this.$store.dispatch('article/readAllArticles');
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
  },
  computed: {
    ...mapGetters('article', ['allArticles']),
    ...mapGetters('user', ['currentUser']),
  },
  components: {
    Loader,
    ArticleCard,
  },
};
</script>

<style scoped>
#article-list {
  text-align: left;
  margin-top: 24px;
}

.ui.tag {
  margin-right: 8px;
}

.coverImage {
  height: 200px;
  width: 100%;
  background-position: 50% 50%;
  background-size: cover;
  transition: filter .2s ease;
}

</style>
