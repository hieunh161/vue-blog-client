<template>
  <div>
    <router-link class="nav-link"  to="/">Home</router-link>
    <router-link class="nav-link"  to="/login">Login</router-link>
    <div>LoggedIn {{this.$store.getters.isLoggedIn}}</div>
    <button v-on:click="logout">Logout</button>
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'navbar',
  computed: {
    ...mapState(['user']),
  },
  methods: {
    logout() {
      this.$store.dispatch('authenticate/logOut');
    },
  },
};
</script>