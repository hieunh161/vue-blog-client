<template>
  <div>
    <button v-on:click="loginFacebook">Login Facebook</button>
    <button v-on:click="loginGoogle">Login Google</button>
    <button v-on:click="loginAccount">Login Account</button>
  </div>
</template>

<script>
// import * as firebase from 'firebase';

export default {
  name: 'login',
  methods: {
    loginFacebook() {
      console.log('facebook');
      this.$store.dispatch('authenticate/loginFacebook');
    },
    loginGoogle() {
      console.log('google');
    },
    loginAccount() {
      console.log('account');
    },
  },
};
</script>