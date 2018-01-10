<template>
  <div class="ui container" id="login-page">
    <h1><i class="ui icon sign in"></i>{{ $t('message.login.title') }}</h1>
    <div @click="facebookLogin" class="ui fluid large facebook button circular">
      <i class="facebook icon"></i>
      {{ $t('message.login.facebook') }}
    </div>
    <div class="ui horizontal divider">{{ $t('message.login.or') }}</div>
    <div @click="googleLogin" class="ui fluid large google plus button circular">
      <i class="google plus icon"></i>
      {{ $t('message.login.google') }}
    </div>
  </div>
</template>

<script>
// import * as firebase from 'firebase';

export default {
  name: 'login',
  methods: {
    facebookLogin() {
      this.$store.dispatch('user/loginWithFacebook');
    },
    googleLogin() {
      this.$store.dispatch('user/loginWithGoogle');
    },
  },
};
</script>

<style scoped>
#login-page {
  width: 400px;
  margin-top: 150px;
  text-align: center;
}
</style>