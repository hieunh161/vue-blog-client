<template>
  <div>
    <div class="ui menu attached inverted teal" id="nav-bar">
      <div class="ui container">
        <!-- left menu -->
        <router-link class="nav-link item"  to="/" ><img class="logo" src="../assets/images/logo.png"> {{ $t('message.app.title') }}</router-link>
        <!-- right menu -->
        <div class="right menu">
          <!-- <router-link class="nav-link item"  to="/login" v-if="!isLoggedIn" ><i class="ui icon sign in"></i> {{ $t('message.navbar.login') }}</router-link> -->
          <a class="nav-link item"  v-if="!isLoggedIn" @click="accountLogin"><i class="ui icon sign in"></i> {{ $t('message.navbar.login') }}</a>
          <!-- dropdown menu -->
          <div class="ui simple dropdown item" v-if="isLoggedIn">
            <img class="ui avatar image" :src= "authUser.photoUrl"/>
            <span>{{ authUser.displayName }}</span> <i class="dropdown icon"></i>
            <div class="menu">
              <router-link class="nav-link item"  to="/user"><i class="user icon"></i> {{ $t('message.navbar.my_profile') }}</router-link>
              <router-link class="nav-link item"  :to="`/user/${authUser ? authUser.userId : ''}/article/`"><i class="archive icon"></i> {{ $t('message.navbar.my_article') }}</router-link>
              <article-new></article-new>
              <div class="divider"></div>
              <router-link class="nav-link item"  to="/dashboard" v-if="isAdmin"><i class="user icon"></i> {{ $t('message.navbar.admin') }}</router-link>
              <a v-on:click="logout" class="nav-link item" v-if="isLoggedIn"><i class="sign out icon"></i> {{ $t('message.navbar.logout') }}</a>
            </div>
          </div>
        </div>
      </div>
    </div>
    <login-modal></login-modal>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

const ArticleNew = () => import('./article/ArticleNew');
const LoginModal = () => import('./LoginModal');

export default {
  name: 'navbar',
  computed: {
    ...mapGetters('user', ['avatar', 'currentUser']),
    ...mapGetters('auth', ['authUser', 'isLoggedIn', 'isAdmin']),
  },
  methods: {
    logout() {
      this.$store.dispatch('auth/logout');
    },
    accountLogin() {
      this.$('#login-modal').modal('show');
    },
  },
  components: {
    // ArticleTemplate,
    LoginModal,
    ArticleNew,
  },
};
</script>

<style scoped>
#nav-bar {
  margin-top: 0px;
}
.item {
  border: none !important;
}
.ui.menu .item img.logo {
  margin-right: 1.5em;
}
.main.container {
  margin-top: 7em;
}
.wireframe {
  margin-top: 2em;
}
.ui.footer.segment {
  margin: 5em 0em 0em;
  padding: 5em 0em;
}
</style>