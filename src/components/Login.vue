<template>
  <div class="ui container" id="login-page">
    <h1><i class="ui icon sign in"></i>SignIn</h1>
    <div @click="facebookLogin" class="ui fluid large facebook button">
      <i class="facebook icon"></i>
      Facebook
    </div>
    <div class="ui horizontal divider">OR</div>
    <div @click="googleLogin" class="ui fluid large google plus button">
      <i class="google plus icon"></i>
      Google Plus
    </div>
    
    <footer>
      <nav>
      <a href="index.html">トップページ</a> 
      <a href="about.html">このブログについて</a> 
      <a href="profile.html">作者の紹介</a> 
      </nav>
      <p>Copyright 2010</p>
    </footer>
  </div>
</template>

<script>
// import * as firebase from 'firebase';

export default {
  name: 'login',
  methods: {
    facebookLogin() {
      this.$store.dispatch('authenticate/loginWithFacebook');
    },
    googleLogin() {
      this.$store.dispatch('authenticate/loginWithGoogle');
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