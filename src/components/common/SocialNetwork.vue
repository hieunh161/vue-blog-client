<template>
  <social-sharing inline-template>
    <div>
      <network network="facebook" class="ui circular button facebook">
        <i class="fa fa-fw fa-facebook"></i> Facebook
      </network>
      <network network="googleplus" class="ui circular button google plus">
        <i class="fa fa-fw fa-google-plus"></i> Google +
      </network>
      <network network="twitter" class="ui twitter circular button">
        <i class="fa fa-fw fa-twitter"></i> Twitter
      </network>
    </div>
  </social-sharing>
</template>

<script>
export default {
  props: {
    pageUrl: {
      type: String,
      required: true,
    },
  },
  data() {
  },
};
</script>

<style scoped>
network {
  margin: 10px 0;
}
</style>
