<template>
  <div id="app">
    <navbar></navbar>
    <img src="./assets/logo.png">
    <router-view v-if="user !== null"></router-view>
    <div>User: {{user}}</div>
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
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
