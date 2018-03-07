<template>
  <div>
    <button @click="showLoginModal">Login</button>
    
    home
    access_token: {{authUser.access_token}}
    <login-modal></login-modal>
    <!-- {{ response }} -->
    <!-- <article-list class="ui container"></article-list> -->
  </div>
</template>

<script>
import * as axios from 'axios';
import { mapGetters } from 'vuex';
import ArticleList from './article/ArticleList';
import LoginModal from './LoginModal';

export default {
  name: 'home',
  created() {
    // axios.get('http://localhost:8000/api/user')
    //     .then(responnse => console.log(responnse));
    const postData = {
      grant_type: 'password',
      client_id: 4,
      client_secret: 'G4l4IGOqF5SlCANPasxS5PpM7baKfcTRYGXUXmKt',
      username: 'hieunh161@gmail.com',
      password: 'password',
      scope: '',
    };
    axios.post('http://localhost:8000/oauth/token', postData)
      .then((response) => {
        console.log(response.data);
        // const header = {
        //   Accept: 'application/json',
        //   Authorization: `Bearer ${response.data.access_token}`,
        // };
        // set global config for axios header
        axios.defaults.headers.common.Accept = 'application/json';
        axios.defaults.headers.common.Authorization = `Bearer ${response.data.access_token}`;
        axios.get('http://localhost:8000/api/v1/user-list')
        .then(res => console.log(res.data));
      });
  },
  data() {
    return {
      response: '',
    };
  },
  methods: {
    showLoginModal() {
      this.$('#login-modal').modal('show');
    },
  },
  components: {
    ArticleList,
    LoginModal,
  },
  computed: {
    ...mapGetters('auth', ['authUser']),
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}


</style>
