<template>
  <div>
    <h1>List</h1>
    <div>{{displayName}}</div>
    <div>{{currentUser.uid}}</div>
    <button @click="showUser">Add item</button>
    <div>{{test}}</div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex';

export default {
  mounted() {
    console.log(this.currentUser);
  },
  data() {
    return {
      test: '',
    };
  },
  computed: {
    ...mapGetters({ currentUser: 'authenticate/currentUser' }),
    ...mapGetters({ displayName: 'authenticate/displayName' }),
  },
  methods: {
    showUser() {
      console.log(this.currentUser);
      this.test = this.currentUser.email;
    },
  },
};
</script>
<style>
</style>