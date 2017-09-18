<template>
  <button @click="isLoading = !isLoading" class="ui button" :class="className" :disabled="isLoading">
    <i class="fa fa-spinner fa-pulse fa-fw" v-if="isLoading"></i> {{text}}
  </button>
</template>

<script>
import Loader from './Loader';

export default {
  props: {
    text: {
      type: String,
      required: true,
    },
    className: {
      type: String,
    },
  },
  data() {
    return {
      isLoading: false,
    };
  },
  methods: {
    changeLoading() {
      console.log('do something');
      this.isLoading = !this.isLoading;
      console.log(this.isLoading);
    },
  },
  components: {
    Loader,
  },
};
</script>