<template>
  <div class="ui fluid card">
    <div class="content">
      <div class="right floated meta">{{article.createdDate | fromNow}}</div>
      <img class="ui avatar image" :src="article.author.photoURL"> {{article.author.displayName}}
    </div>
    <div class="image medium">
      <img v-if="article.coverImage" :src="article.coverImage.url"/>
      <img v-if="!article.coverImage" src="https://i.imgur.com/I3QyKzY.png"/>
    </div>
    <div class="content">
      <div class="ui green header link">
        <router-link class="description" :to="`/article/${article.id}`">
          {{article.title}}
        </router-link>
      </div>
      <div>
        <span class="right floated">
          <i class="heart red like icon" :class="{ outline:!isLiked(article) }"></i>
          {{ getLikeNumber(article.likes) }} likes
        </span>
        <i class="unhide icon"></i>
        {{article.views}} views
      </div>
    </div>
    <div class="extra content">
      <!-- tag -->
      <span v-for="(value, tag, index) in article.tags" v-bind:key="tag">
        <span class="ui label mini green">{{ tag }}</span>
      </span>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import _ from 'lodash';

export default {
  props: {
    article: {
      type: Object,
    },
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
    ...mapGetters('user', ['currentUser']),
  },
};
</script>

<style>

</style>
