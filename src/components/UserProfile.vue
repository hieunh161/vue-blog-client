<template>
  <div id="user-profile">
     <progressive-img class="ui small circular image"
        :blur="10"
        placeholder=""
        :src= "avatar" />
    <h1>{{displayName}}</h1>
    <div class="ui container">
      <div class="ui labeled button" tabindex="0">
        <div class="ui red button">
          <i class="heart icon"></i> Like
        </div>
        <a class="ui basic red left pointing label">
          1,048
        </a>
      </div>
      <div class="ui labeled button" tabindex="0">
        <div class="ui basic blue button">
          <i class="fork icon"></i> Forks
        </div>
        <a class="ui basic left pointing blue label">
          1,048
        </a>
      </div>
      <div class="ui yellow progress" data-percent="60">
        <div class="bar"></div>
      </div>
      <div class="ui olive progress" data-percent="30">
        <div class="bar"></div>
      </div>
      <div class="ui green progress" data-percent="85">
        <div class="bar"></div>
      </div>
    </div>
  </div>
</template>

<script>
// import * as firebase from 'firebase';
import { mapState, mapGetters } from 'vuex';

export default {
  name: 'user-profile',
  computed: {
    ...mapState(['user']),
    ...mapGetters({ avatar: 'user/avatar' }),
    ...mapGetters({ displayName: 'user/displayName' }),
  },
  mounted() {
    /* global $:true */
    $('.progress').progress();
  },
};
</script>

<style scoped>
#user-profile {
  text-align: center;
}
</style>