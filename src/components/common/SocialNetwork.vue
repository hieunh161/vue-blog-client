<template>
  <social-sharing :url="pageUrl" inline-template>
    <div>
      <network network="facebook" class="ui circular button facebook">
        <i class="fa fa-fw fa-facebook"></i> Facebook
      </network>
      <network network="googleplus" class="ui circular button google plus">
        <i class="fa fa-fw fa-google-plus"></i> Google +
      </network>
      <network network="linkedin" class="ui circular button linkedin">
        <i class="fa fa-fw fa-linkedin"></i> LinkedIn
      </network>
      <network network="reddit" class="ui circular button reddit">
        <i class="fa fa-fw fa-reddit"></i> Reddit
      </network>
      <network network="twitter" class="ui twitter circular button">
        <i class="fa fa-fw fa-twitter"></i> Twitter
      </network>
      <network network="vk" class="ui vk circular button">
        <i class="fa fa-vk"></i> VKontakte
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
    return {
      url: 'https://my-blog-68afd.firebaseapp.com/article/',
    };
  },
};
</script>

<style scoped>

</style>
