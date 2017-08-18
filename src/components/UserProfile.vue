<template>
  <div>
    <h1>AUTHEN SUCCESS</h1>
    <button class="ui btn button">LogOut</button>
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
import { mapState } from 'vuex';

export default {
  name: 'user-profile',
  computed: {
    ...mapState(['user']),
  },
  mounted() {
    /* global $:true */
    $('.progress').progress();
  },
};
</script>