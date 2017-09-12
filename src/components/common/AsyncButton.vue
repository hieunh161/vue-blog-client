<template>
  <div class="ui button" :class="className" >{{text}}</div>
</template>

<script>
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
      text: '',
      className: '',
      isLoading: false,
    };
  },
};
</script>