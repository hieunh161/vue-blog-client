<template>
  <div class="container page-not-found">
    <div class="not-found header">{{ $t('message.page_not_found.error') }}</div>
    <div class="not-found content">{{ $t('message.page_not_found.title') }}</div>
    <div class="ui horizontal container divider"> <i class="ui icon meh"></i>
    </div>
    <div class="not-found detail" v-html="$t('message.page_not_found.content')"></div>
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
  font-size: 140px;
  font-weight: 600;
}

.not-found.content {
  margin: 80px 0 30px 0;
  font-size: 36px;
}

.not-found.detail {
  margin: 30px;
  font-size: 24px;
}
</style>
