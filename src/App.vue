<template>
  <div id="app">
    <!-- <navbar class="page-header"></navbar> -->
    <router-view class="page-content"></router-view>
    <!-- <app-footer class="page-footer"></app-footer> -->
  </div>
</template>

<script>
import { mapState } from 'vuex';
import Navbar from '@/components/Navbar';
import AppFooter from '@/components/AppFooter';
import Firebase from 'firebase';

export default {
  name: 'app',
  computed: {
    ...mapState('authenticate', ['user']),
  },
  components: {
    Navbar,
    AppFooter,
  },
  beforeCreate() {
    Firebase.auth().onAuthStateChanged((user) => {
      // initially user = null, after auth it will be either <fb_user> or false
      this.$store.commit('authenticate/setUser', user || false);
      if (user) {
        this.$store.dispatch('authenticate/getUserInfo', user);
      }
      if (user && this.$route.path === '/login') {
        this.$router.replace('/');
      } else if (!user && this.$route.path !== '/login') {
        this.$router.replace('/login');
      }
    });
  },
};
</script>

<style>
/* @import '../node_modules/bulma/css/bulma.css'; */
body {
  height: 100%;
}
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

a {
  color: #42b983;
}

.page-footer {
  position:absolute; 
  bottom: 0px;
}

body {
  font-family: 'Roboto', sans-serif;
  background-color: #f7f7f7;
}
</style>
