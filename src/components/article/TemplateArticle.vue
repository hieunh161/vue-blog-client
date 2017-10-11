<template>
  <div class="nav-link item" @click="createTemplateArticle"><i class="write icon"></i>Create New</div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  data() {
    return {
      isCreating: false,
    };
  },
  computed: {
    ...mapGetters({ user: 'user/currentUser' }),
  },
  methods: {
    createTemplateArticle() {
      this.$store.dispatch('article/createTemplateArticle', this.user)
      .then((articleId) => {
        // redirect to edit page with created id
        console.log((`done create template Article ${articleId}`));
        this.$router.push({ path: `/article/${articleId}/edit` });
      });
    },
  },
};
</script>