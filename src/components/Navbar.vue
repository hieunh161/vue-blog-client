<template>
  <div>
    <router-link class="nav-link"  to="/">Home</router-link>
    <router-link class="nav-link"  to="/login" v-if="!isLoggedIn" >Login</router-link>
    <button v-on:click="logout" v-if="isLoggedIn">Logout</button>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex';

export default {
  name: 'navbar',
  computed: {
    ...mapState(['user']),
    ...mapGetters({ isLoggedIn: 'authenticate/isLoggedIn' }),
  },
  methods: {
    logout() {
      this.$store.dispatch('authenticate/logOut');
    },
  },
};
</script>