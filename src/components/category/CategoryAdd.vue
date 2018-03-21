<template>
  <div>
    <div class="ui header">{{ $t('message.category.add') }}</div>
    <div class="ui warning message" v-if="!formValidation.isValid">
      <i class="close icon" @click="clearValidation"></i>
      <div>Required data is not input</div>
      <ul>
        <li v-for="error in formValidation.errors" v-bind:key="error">{{ error }}</li>
      </ul>
    </div>
    <form class="ui form" action="" @submit.prevent>
      <div class="two fields">
        <div class="six wide field">
          <input type="text" v-model="category.name" name="category name" placeholder="Category Name" @keydown.enter.prevent='addCategory'>
        </div>
        <div class="four wide field">
          <input type="number" v-model="category.priority" name="category priority" placeholder="Category Priority" @keydown.enter.prevent='addCategory'>
        </div>
      </div>
      <button type="submit" class="ui button positive" @click="addCategory">{{ $t('button.common.add') }}</button>
    </form>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  data() {
    return {
      category: {
        name: '',
        priority: null,
      },
      formValidation: {
        isValid: true,
        errors: [],
      },
    };
  },
  methods: {
    addCategory(e) {
      this.clearValidation();
      if (e) e.preventDefault();
      if (this.category.name === null || this.category.name === '') {
        this.formValidation.isValid = false;
        this.formValidation.errors.push('Category name is requried');
      }
      if (this.category.priority === null || this.category.priority <= 0) {
        this.formValidation.isValid = false;
        this.formValidation.errors.push('Category priority is requried and must greater than 0');
      }
      if (this.formValidation.isValid) {
        this.$np.start();
        this.$store.dispatch('category/createCategory', this.category)
          .then(() => {
            this.$np.done();
            // show notification
            this.$notify({
              group: 'notice',
              type: 'success',
              title: 'Message',
              text: `Category ${this.category.name} is created successfully!`,
            });
            this.category.name = '';
            this.category.priority = null;
          });
      }
    },
    clearValidation() {
      this.formValidation.isValid = true;
      this.formValidation.errors = [];
    },
  },
  computed: {
    ...mapGetters('category', ['categories']),
  },
};
</script>

<style>

</style>
