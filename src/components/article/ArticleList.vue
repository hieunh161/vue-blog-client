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
                  <i class="heart outline red like icon"></i>
                  {{item.likes}} likes
                </span>
                <i class="comment icon"></i>
                {{item.comments.length}} comments
              </div>
            </div>
            <div class="extra content">
              <div class="ui large transparent left icon input">
                <i class="heart outline icon"></i>
                <input type="text" placeholder="Add Comment...">
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import Loader from '../common/Loader';

export default {
  mounted() {
    this.$store.dispatch('article/readAllArticles');
  },
  computed: {
    ...mapGetters('article', ['allArticles']),
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
</style>
