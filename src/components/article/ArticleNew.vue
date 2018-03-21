<template>
  <div class="nav-link item" @click="createNewArticle">
    <i class="write icon"></i>
    {{ $t('message.navbar.create_new') }}
  </div>
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
    ...mapGetters('auth', ['authUser']),
    ...mapGetters('article', ['selectedArticle']),
  },
  methods: {
    createNewArticle() {
      // console.log(this.authUser.userId);
      this.$store.dispatch('article/createNew', this.authUser.userId)
      .then(() => {
        // redirect to edit page with created id
        console.log((`done create template Article ${this.selectedArticle.id}`));
        this.$router.push({ path: `/article/${this.selectedArticle.id}/edit` });
      });
    },
  },
};
</script>