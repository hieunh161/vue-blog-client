<template>
  <div class="container page-not-found">
    <div class="not-found header">404</div>
    <div class="not-found content">Page Not Found</div>
    <div class="ui horizontal divider"> <i class="ui icon meh"></i>
    </div>
    <div class="not-found detail">We are sorry but the page you are looking for does not exist.</div>
    <div class="not-found detail">Click <a href="/">here</a> to back to main menu</div>
  </div>
</template>

<script>
export default {
  name: 'page-not-found',
};
</script>

<style scoped>
.page-not-found {
  text-align: center;
}

.not-found.header {
  margin-top: 120px;
  font-size: 100px;
}

.not-found.content {
  margin: 60px;
  font-size: 36px;
}

.not-found.detail {
  margin: 30px;
  font-size: 24px;
}
</style>
