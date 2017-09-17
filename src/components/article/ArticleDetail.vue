<template>
  <div>
    <div class="ui container">
      <div class="header">
        <h1>{{article.title}}</h1>
      </div>
      <div class="content">
        {{article.content}}
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex';

export default {
  mounted() {
    // load data from api
    this.$store.dispatch('article/readArticle',
      { articleId: this.$route.params.id, router: this.$router });
  },
  computed: {
    ...mapGetters('article', ['article']),
  },
};
</script>
<style>
.content {
  text-align: center;
}
</style>