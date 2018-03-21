<template>
  <div id="app">
    <div class="wrapper">
      <notifications group="notice" 
        position="bottom right"
        :duration="3000"
        :speed="500"/>
      <navbar class="page-header"></navbar>
      <router-view class="page-content"></router-view>
      <app-footer></app-footer>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import Navbar from '@/components/Navbar';
import AppFooter from '@/components/AppFooter';
// import Firebase from 'firebase';
import localStorage from './services/localStorage';
// import { auth } from 'firebase';

export default {
  name: 'app',
  computed: {
    ...mapState('user', ['user']),
  },
  components: {
    Navbar,
    AppFooter,
  },
  beforeCreate() {
    // get access_token from local storage
    const authUser = localStorage.get('authUser');
    if (authUser) {
      this.$store.dispatch('auth/setAuthUser', authUser);
    }
  },
};
</script>

<style>
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  overflow-x:hidden;
}

.wrapper {
  display: flex;
  min-height: calc(100vh);
  flex-direction: column;
}

.page-content {
  flex: 1;
}

a {
  color: #42b983;
}

html, body {
  height: 100%;
  margin: 0;
}

body {
  font-family: -apple-system,BlinkMacSystemFont,Segoe UI,Helvetica,Arial,sans-serif !important;
  background-color: #f7f7f7;
}

h1, h2, h3, h4, h5 {
  font-family: -apple-system,BlinkMacSystemFont,Segoe UI,Helvetica,Arial,sans-serif !important;
}
</style>
