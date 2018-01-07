<template>
  <div>
    <article-list class="ui container"></article-list>
  </div>
</template>

<script>
import ArticleList from './article/ArticleList';

export default {
  name: 'home',
  data() {
    return {
    };
  },
  components: {
    ArticleList,
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}


</style>
