<template>
  <div class="ui container">
    <h1>User Articles</h1>
    <!-- <ul>
      <li v-for="item in userArticles" v-bind:key="item.title">
        <router-link :to="`/article/${item.id}/view`">{{ item.title }}</router-link>
        <div class="ui red basic horizontal label" v-if="item.status === 0">Draft</div>
        <div class="ui green basic horizontal label" v-if="item.status !== 0">Public</div>
        <router-link class="ui green basic horizontal label" :to="`/article/${item.id}/edit`">Edit</router-link>
      </li>
    </ul> -->
    <div class="ui relaxed divided list">
      <div class="item" v-for="item in userArticles" v-bind:key="item.title">
        <!-- <i class="large github middle aligned icon"></i> -->
        <img class="ui avatar image" :src="item.coverImage.url">
        <div class="content">
          <router-link :to="`/article/${item.id}/view`">{{ item.title }}</router-link>
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
    this.$store.dispatch('article/readArticlesByUser', this.$route.params.id);
  },
  computed: {
    ...mapGetters('article', ['userArticles']),
  },
};
</script>

<style scoped>

</style>
