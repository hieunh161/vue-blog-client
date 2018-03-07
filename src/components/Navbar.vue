<template>
  <div>
    <div class="ui menu attached inverted teal" id="nav-bar">
      <div class="ui container">
        <!-- left menu -->
        <router-link class="nav-link item"  to="/" ><img class="logo" src="../assets/images/logo.png"> {{ $t('message.app.title') }}</router-link>
        <!-- right menu -->
        <div class="right menu">
          <!-- <router-link class="nav-link item"  to="/login" v-if="!isLoggedIn" ><i class="ui icon sign in"></i> {{ $t('message.navbar.login') }}</router-link> -->
          <router-link class="nav-link item"  to="/login" v-if="!isLoggedIn" ><i class="ui icon sign in"></i> {{ $t('message.navbar.login') }}</router-link>
          <!-- dropdown menu -->
          <div class="ui simple dropdown item" v-if="isLoggedIn">
            <img class="ui avatar image" :src= "avatar"/>
            <span>{{currentUser.displayName}}</span> <i class="dropdown icon"></i>
            <div class="menu">
              <router-link class="nav-link item"  to="/user"><i class="user icon"></i> {{ $t('message.navbar.my_profile') }}</router-link>
              <router-link class="nav-link item"  :to="`/user/${currentUser ? currentUser.uid : ''}/article/`"><i class="archive icon"></i> {{ $t('message.navbar.my_article') }}</router-link>
              <article-template></article-template>
              <div class="divider"></div>
              <router-link class="nav-link item"  to="/dashboard" v-if="isAdmin"><i class="user icon"></i> {{ $t('message.navbar.admin') }}</router-link>
              <a v-on:click="logout" class="nav-link item" v-if="isLoggedIn"><i class="sign out icon"></i> {{ $t('message.navbar.logout') }}</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import ArticleTemplate from './article/ArticleTemplate';

export default {
  name: 'navbar',
  computed: {
    ...mapGetters('user', ['isLoggedIn', 'avatar', 'currentUser', 'isAdmin']),
  },
  methods: {
    logout() {
      this.$store.dispatch('user/logOut');
    },
  },
  components: {
    ArticleTemplate,
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