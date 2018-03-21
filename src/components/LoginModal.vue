<template>
  <div class="ui tiny modal inverted" id="login-modal">
    
    <i class="close icon"></i>
    <div class="header center teal">{{ $t('message.login.title') }}</div>
    <div class="content">
      <div class="ui form">
        <div class="field">
          <label>Username</label>
          <div class="ui left icon input">
            <input type="text" placeholder="Username" v-model="login.username">
            <i class="user icon"></i>
          </div>
        </div>
        <div class="field">
          <label>Password</label>
          <div class="ui left icon input">
            <input type="password" placeholder="Password" id="loginPassword" v-model="login.password">
            <i class="lock icon"></i>
          </div>
        </div>
        <div class="field">
          <div class="ui checkbox">
            <input type="checkbox" name="showPassword" @click="togglePasswordInvisibility">
            <label>Show Password</label>
          </div>
        </div>
        <div class="ui button submit teal" :class="{loading: isLogging}" @click="accountLogin">Login</div>
      </div>
      <div class="ui warning message" v-if="isShowError">
        <i class="close icon" @click="isShowError = false"></i>
        <div>{{ authResult.error_message }}</div>
      </div>
      <div class="ui horizontal divider">OR</div>
      <div class="ui two column relaxed stackable grid">
        <div class="column">
          <div @click="facebookLogin" class="ui fluid facebook button">
            <i class="facebook icon"></i>
            {{ $t('message.login.facebook') }}
          </div>
        </div>
        <div class="column">
          <div @click="googleLogin" class="ui fluid google plus button">
            <i class="google plus icon"></i>
            {{ $t('message.login.google') }}
          </div>
        </div>
      </div>
      <br/>
      <!-- {{authUser}} -->
      You dont have any account yet? <router-link class="nav-link"  :to="`/sign-up`">{{ $t('message.login.sign_up') }}</router-link>
    </div>
  </div>
</template>

<script>
import store from '../store';

export default {
  data() {
    return {
      isLogging: false,
      login: {
        username: 'hieunh161@gmail.com',
        password: 'password',
      },
      authUser: store.getters['auth/authUser'],
      authResult: store.getters['auth/authResult'],
      isShowError: false,
    };
  },
  methods: {
    togglePasswordInvisibility() {
      const loginPassword = this.$('#loginPassword').get(0);
      loginPassword.type = loginPassword.type === 'password' ? 'text' : 'password';
    },
    accountLogin() {
      this.isShowError = false;
      this.isLogging = true;
      this.$store.dispatch('auth/login', { username: this.login.username, password: this.login.password })
        .then(() => {
          this.isLogging = false;
          if (this.authResult.error_message) {
            this.isShowError = true;
          } else {
            console.log('hide');
            this.$('#login-modal').modal('hide');
          }
        });
    },
    facebookLogin() {
      this.isShowError = false;
      console.log('facebookLogin');
    },
    googleLogin() {
      this.isShowError = false;
      console.log('googleLogin');
    },
    hide() {
      // this.$(this).modal('hide').dequeue();
      this.$('#login-modal').modal('hide');
    },
  },
};
</script>

<style scoped>
.submit {
  width: 160px;
}

@media only screen and (max-width: 500px) {
  .submit {
    width: 100%;
  }
}
</style>
