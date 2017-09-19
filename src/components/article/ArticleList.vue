<template>
  <div class="ui container">
    <!-- <ul>
      <li v-for="item in userArticles" v-bind:key="item.title">
        <router-link :to="`/article/${item.id}/view`">{{ item.title }}</router-link>
        <div class="ui red basic horizontal label" v-if="item.status === 0">Draft</div>
        <div class="ui green basic horizontal label" v-if="item.status !== 0">Public</div>
        <router-link class="ui green basic horizontal label" :to="`/article/${item.id}/edit`">Edit</router-link>
      </li>
    </ul> -->
    <div class="ui relaxed divided list" id="article-list">
      <div class="ui card">
        <div class="content">
          <div class="right floated meta">14h</div>
          <img class="ui avatar image" src="/images/avatar/large/elliot.jpg"> Elliot
        </div>
        <div class="image">
          <img>
        </div>
        <div class="content">
          <span class="right floated">
            <i class="heart outline like icon"></i>
            17 likes
          </span>
          <i class="comment icon"></i>
          3 comments
        </div>
        <div class="extra content">
          <div class="ui large transparent left icon input">
            <i class="heart outline icon"></i>
            <input type="text" placeholder="Add Comment...">
          </div>
        </div>
      </div>
      <div class="item" v-for="item in allArticles" v-bind:key="item.key">
        <!-- <i class="large github middle aligned icon"></i> -->
        <img class="ui avatar image" :src="item.coverImage.url">
        <div class="content">
          <router-link :to="`/article/${item.id}`">{{ item.title }}</router-link>
          &nbsp;&nbsp;
          <div class="ui red basic horizontal label small" v-if="item.status === 0">Draft</div>
          <div class="ui green basic horizontal label" v-if="item.status !== 0">Public</div>
          <router-link class="ui green basic horizontal label" :to="`/article/${item.id}/edit`">Edit</router-link>
          <div class="description">Updated 10 mins ago</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  mounted() {
    this.$store.dispatch('article/readAllArticles');
  },
  computed: {
    ...mapGetters('article', ['allArticles']),
  },
};
</script>

<style scoped>
#article-list {
  text-align: left;
}
</style>
