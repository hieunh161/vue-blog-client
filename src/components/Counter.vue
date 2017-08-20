<template>
  <div>
    <div v-if="isLoading">
      Loading ...
      <loader></loader>
    </div>
    <div v-if="!isLoading">
      <p>{{ count }}</p>
      <p>
        <button @click="increment">+</button>
        <button @click="decrement">-</button>
      </p>
      <progressive-img class="ui large rounded image"
        :blur="10"
        placeholder="https://scontent-nrt1-1.xx.fbcdn.net/v/t1.0-9/18839071_286508268425274_2831750220322310106_n.jpg?oh=83c2bc65dda91a3dce04903bd8437602&oe=5A2D20B3"
        src="https://scontent-nrt1-1.xx.fbcdn.net/v/t1.0-9/18839071_286508268425274_2831750220322310106_n.jpg?oh=83c2bc65dda91a3dce04903bd8437602&oe=5A2D20B3" />
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