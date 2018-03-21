<template>
  <div>
    <div class="ui header">{{ $t('message.category.add') }}</div>
    <form class="ui form" action="" @submit.prevent>
      <div class="two fields">
        <div class="six wide field">
          <input type="text" v-model="category.name" name="category name" placeholder="Category Name" @keydown.enter.prevent='addCategory'>
        </div>
        <div class="four wide field">
          <input type="number" v-model="category.priority" name="category priority" placeholder="Category Priority" @keydown.enter.prevent='addCategory'>
        </div>
      </div>
      <button type="" class="ui button positive" @click="addCategory">{{ $t('button.common.add') }}</button>
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
        priority: 10
      },
    },
  },
  data() {
    return {
      category: {
        name: '',
        priority: null,
      },
    };
  },
  methods: {
    addCategory(e) {
      e.preventDefault();
      if (this.category && this.category.name !== null
        && this.category.name !== '') {
        this.$store.dispatch('category/createCategory', this.addedCategory);
        this.category.name = '';
        this.category.priority = null;
      }
    },
  },
  computed: {
    ...mapGetters('category', ['categories']),
  },
};
</script>

<style>

</style>
