<template>
  <div>
    <h1>Article User List</h1>
    <ul>
      <li v-for="item in userArticles" v-bind:key="item.title">
        {{ item.title }}
      </li>
    </ul>
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
