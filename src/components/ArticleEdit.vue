<template>
  <div>
    <div> Edit Article {{this.$route.params.id}} </div>
    <textarea v-model="article.content"></textarea>
    <button @click="saveArticle">Save</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      articleId: '',
      article: {},
    };
  },
  methods: {
    saveArticle() {
      console.log(this.article.content);
      this.article.lastModified = Date.now();
      this.$store.dispatch('article/updateArticle', { articleId: this.articleId, article: this.article }).then(
        () => console.log('save successful'),
      );
    },
  },
  mounted() {
    // load data from api
    this.articleId = this.$route.params.id;
    this.$store.dispatch('article/readArticle', this.articleId).then(
      (articleContent) => {
        if (articleContent) {
          this.article = articleContent;
        } else {
          this.$router.push({ path: 'page-not-found' });
        }
      });
  },
};
</script>