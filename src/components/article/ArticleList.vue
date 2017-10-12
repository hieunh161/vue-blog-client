<template>
  <div class="ui main container">
    <div class="ui relaxed divided list" id="article-list">
      <loader v-if="allArticles.length === 0"></loader>
      <div class="ui link three column grid">
        <div class="column cards"  v-for="item in allArticles" v-bind:key="item.key">
          <div class="ui fluid card">
            <div class="content">
              <div class="right floated meta">{{item.createdDate | fromNow}}</div>
              <img class="ui avatar image" :src="item.author.photoURL"> {{item.author.displayName}}
            </div>
            <div class="image medium">
              <img :src="item.coverImage.url"/>
            </div>
            <div class="content">
              <div class="ui green header link">
                <router-link class="description" :to="`/article/${item.id}`">
                  {{item.title}}
                </router-link>
              </div>
              <div>
                <span class="right floated">
                  <i class="heart red like icon" :class="{ outline:!isLiked(item) }"></i>
                  {{ getLikeNumber(item.likes) }} likes
                </span>
                <i class="unhide icon"></i>
                {{item.views}} views
              </div>
            </div>
            <div class="extra content">
              <!-- tag -->
              <span v-for="(value, tag, index) in item.tags" v-bind:key="tag">
                <span class="ui label tag mini green">{{ tag }}</span>
              </span>
            </div>
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
</style>
