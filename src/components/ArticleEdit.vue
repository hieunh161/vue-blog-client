<template>
  <div>
    <div> Edit Article {{this.$route.params.id}} </div>
    <div>{{content}}</div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      content: 'ABC',
    };
  },
  mounted() {
    // load data from api
    this.$store.dispatch('article/readArticle', this.$route.params.id).then(
      (articleContent) => {
        console.log(articleContent);
        this.content = articleContent.content;
      });
  },
};
</script>