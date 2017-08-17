<template>
  <div>
    <div v-if="isLoading">
      Loading counter ...
      <loader></loader>
    </div>
    <div v-if="!isLoading">
      <p>{{ count }}</p>
      <p>
        <button @click="increment">+</button>
        <button @click="decrement">-</button>
      </p>
    </div>
  </div>
</template>

<script>
import Loader from './Loader';

export default {
  name: 'counter',
  created() {
    this.$store.dispatch('loadCounter');
  },
  data() {
    return {
      msg: 'Welcome to Your Vue.js App',
    };
  },
  computed: {
    count() {
      return this.$store.state.counter.count;
    },
    isLoading() {
      return this.$store.state.counter.isLoading;
    },
  },
  methods: {
    increment() {
      this.$store.commit('increment');
    },
    decrement() {
      this.$store.commit('decrement');
    },
  },
  components: {
    Loader,
  },
};
</script>