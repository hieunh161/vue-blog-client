<template>
  <div>
    <div class="ui green fixed inverted menu">
      <div class="ui container">
        <a href="#" class="header item">
          <img class="logo" src="../assets/images/logo.png">
          Customer Manager
        </a>
        <router-link class="nav-link item"  to="/">Home</router-link>
        <div class="ui simple dropdown item">
          Service <i class="dropdown icon"></i>
          <div class="menu">
            <router-link class="nav-link item"  to="/customer">Customer</router-link>
            <a class="item" href="#">Link Item</a>
            <div class="divider"></div>
            <div class="header">Header Item</div>
            <div class="item">
              <i class="dropdown icon"></i>
              Sub Menu
              <div class="menu">
                <a class="item" href="#">Link Item</a>
                <a class="item" href="#">Link Item</a>
              </div>
            </div>
            <a class="item" href="#">Link Item</a>
          </div>
        </div>
        <div class="right menu">
          <router-link class="nav-link item"  to="/login" v-if="!isLoggedIn" >Login</router-link>
          <div class="ui simple dropdown item" v-if="isLoggedIn">
            <img class="ui avatar image" :src= "avatar"/>
            <span>{{displayName}}</span> <i class="dropdown icon"></i>
            <div class="menu">
              <router-link class="nav-link item"  to="/user"><i class="user icon"></i> User Profile</router-link>
              <div class="divider"></div>
              <a v-on:click="logout" class="nav-link item" v-if="isLoggedIn"><i class="sign out icon"></i> Logout</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'navbar',
  computed: {
    ...mapGetters({ isLoggedIn: 'authenticate/isLoggedIn' }),
    ...mapGetters({ avatar: 'authenticate/avatar' }),
    ...mapGetters({ displayName: 'authenticate/displayName' }),
  },
  methods: {
    logout() {
      this.$store.dispatch('authenticate/logOut');
    },
  },
};
</script>

<style scoped>
  .ui.menu .item img.logo {
    margin-right: 1.5em;
  }
  .main.container {
    margin-top: 7em;
  }
  .wireframe {
    margin-top: 2em;
  }
  .ui.footer.segment {
    margin: 5em 0em 0em;
    padding: 5em 0em;
  }
</style>