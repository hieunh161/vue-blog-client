<template>
  <div>
    <button @click="loginFacebook" class="ui facebook button">
      <i class="facebook icon"></i>
      Facebook
    </button>
    <button @click="loginGoogle" class="ui google plus button">
      <i class="google plus icon"></i>
      Google Plus
    </button>
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