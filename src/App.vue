<template>
  <div id="app">
    <navbar></navbar>
    <router-view v-if="user !== null"></router-view>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import Navbar from '@/components/Navbar';
import Firebase from 'firebase';

export default {
  name: 'app',
  computed: {
    ...mapState('authenticate', ['user']),
  },
  components: {
    Navbar,
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

#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  /* margin-top: 60px; */
}
body {
  font-family: 'Roboto', sans-serif;
  background-color: #f7f7f7;
}
</style>
