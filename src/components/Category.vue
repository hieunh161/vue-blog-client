<template>
  <div>
    <div>
      <div v-for="category in categories" v-bind:key="category.key">
        {{category.data.title}}
      </div>
    </div>
    <div class="ui form">
      <div class="field">
        <label>Add Category</label>
        <input type="text" v-model="category" name="category" placeholder="Add Category">
      </div>
      <button class="ui button" @click="addCategory">Add</button>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  data() {
    return {
      category: '',
      categoryList: [],
    };
  },
  mounted() {
    this.$store.dispatch('category/readCategory');
  },
  methods: {
    addCategory() {
      console.log(this.category);
      if (this.category && this.category !== '') {
        console.log('OK');
        this.$store.dispatch('category/createCategory', { category: this.category });
        this.category = '';
      }
    },
  },
  computed: {
    ...mapGetters('category', ['categories']),
    ...mapGetters('user', ['currentUser', 'currentUserInfo', 'isAdmin']),
  },
};
</script>

<style>

</style>
