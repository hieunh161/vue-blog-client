<template>
  <div>
    <button v-on:click="loginFacebook">Login Facebook</button>
    <button v-on:click="loginGoogle">Login Google</button>
    <button v-on:click="loginAccount">Login Account</button>
  </div>
</template>

<script>
import * as firebase from 'firebase';

export default {
  name: 'login',
  methods: {
    loginFacebook() {
      console.log('facebook');
      const provider = new firebase.auth.FacebookAuthProvider();
      firebase.auth().signInWithPopup(provider)
      .then((result) => {
        const token = result.credential.accessToken;
        const user = result.user;
        console.log(token);
        console.log(user);
      }).catch((error) => {
        console.log(error.code);
        console.log(error.message);
      });
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