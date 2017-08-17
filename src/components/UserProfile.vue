<template>
  <div>
    <h1>AUTHEN SUCCESS</h1>
  </div>
</template>

<script>
import * as firebase from 'firebase';

export default {
  name: 'user-profile',
  created() {
    this.user = firebase.auth().currentUser;
    if (this.user) {
      this.name = this.user.displayName;
      this.email = this.user.email;
      this.photo = this.user.photoURL;
      this.userId = this.user.uid;
    }
  },
};
</script>