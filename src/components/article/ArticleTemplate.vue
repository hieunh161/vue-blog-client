<template>
  <div class="nav-link item" @click="createTemplateArticle"><i class="write icon"></i>{{ $t('message.navbar.create_new') }}</div>
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
    ...mapGetters('user', ['currentUser', 'currentUserInfo']),
  },
  methods: {
    createTemplateArticle() {
      this.$store.dispatch('article/createTemplateArticle', {
        uid: this.currentUser.uid,
        photoURL: this.currentUser.photoURL,
        displayName: this.currentUser.displayName,
        description: this.currentUserInfo.description,
      })
      .then((articleId) => {
        // redirect to edit page with created id
        console.log((`done create template Article ${articleId}`));
        this.$router.push({ path: `/article/${articleId}/edit` });
      });
    },
  },
};
</script>