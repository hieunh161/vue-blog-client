<template>
  <div>
    <div class="ui green inverted menu attached" id="nav-bar">
      <div class="ui container">
        <a href="/" class="header item">
          <img class="logo" src="../assets/images/logo.png">
          Home
        </a>
        <!-- <router-link class="nav-link item"  to="/">Home</router-link>
        <router-link class="nav-link item"  to="/customer">Customer</router-link> -->
        <div class="right menu">
          <!-- <router-link to="/article/create" class="nav-link item">
            <i class="write icon"></i>
            Write a story
          </router-link> -->
          <div class="ui simple dropdown item">
            Article <i class="dropdown icon"></i>
            <div class="menu">
              <template-article></template-article>
              <router-link class="nav-link item"  :to="`/user/${currentUser ? currentUser.uid : ''}/article/`"><i class="archive icon"></i> My Articles</router-link>
            </div>
          </div>
          <router-link class="nav-link item"  to="/login" v-if="!isLoggedIn" ><i class="ui icon sign in"></i> Login</router-link>
          <div class="ui simple dropdown item" v-if="isLoggedIn">
            <img class="ui avatar image" :src= "avatar"/>
            <span>{{currentUser.displayName}}</span> <i class="dropdown icon"></i>
            <div class="menu">
              <router-link class="nav-link item"  to="/user"><i class="user icon"></i> User Profile</router-link>
              <div class="divider"></div>
              <router-link class="nav-link item"  to="/user" v-if="isAdmin"><i class="user icon"></i> Admin</router-link>
              <a v-on:click="logout" class="nav-link item" v-if="isLoggedIn"><i class="sign out icon"></i> Logout</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import TemplateArticle from './article/TemplateArticle';

export default {
  name: 'navbar',
  computed: {
    ...mapGetters('authenticate', ['isLoggedIn', 'avatar', 'currentUser', 'isAdmin']),
  },
  methods: {
    logout() {
      this.$store.dispatch('authenticate/logOut');
    },
  },
  components: {
    TemplateArticle,
  },
};
</script>

<style scoped>
#nav-bar {
  margin-top: 0px;
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