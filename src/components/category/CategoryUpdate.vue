<template>
  <div>
    <div class="ui header">{{ $t('message.category.update') }}</div>
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
          <input type="text" v-model="category.name" name="category name" placeholder="Category Name" @keydown.enter.prevent='updateCategory'>
        </div>
        <div class="four wide field">
          <input type="number" v-model="category.priority" name="category priority" placeholder="Category Priority" @keydown.enter.prevent='updateCategory'>
        </div>
      </div>
      <button type="submit" class="ui button positive" @click="updateCategory">{{ $t('button.common.update') }}</button>
    </form>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  props: {
    category: {
      type: Object,
      default: {
        name: '',
        priority: null,
      },
    },
  },
  data() {
    return {
      formValidation: {
        isValid: true,
        errors: [],
      },
    };
  },
  methods: {
    updateCategory(e) {
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
        this.$store.dispatch('category/updateCategory', this.category)
          .then(() => {
            this.$np.done();
            this.$notify({
              group: 'notice',
              type: 'success',
              title: 'Message',
              text: 'Category is updated successfully!',
            });
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
