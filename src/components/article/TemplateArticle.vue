<template>
  <div class="nav-link item" @click="createTemplateArticle"><i class="write icon"></i>Create New</div>
</template>

<script>
export default {
  data() {
    return {
      isCreating: false,
    };
  },
  methods: {
    createTemplateArticle() {
      this.$store.dispatch('article/createTemplateArticle')
      .then((articleId) => {
        // redirect to edit page with created id
        console.log((`done create template Article ${articleId}`));
        this.$router.push({ path: `article/${articleId}/edit` });
      });
    },
  },
};
</script>