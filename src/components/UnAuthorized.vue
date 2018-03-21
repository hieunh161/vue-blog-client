<template>
  <div class="container page-not-found">
    <div class="not-found header">{{ $t('message.unauthorized.error') }}</div>
    <div class="not-found content">{{ $t('message.unauthorized.title') }}</div>
    <div class="ui horizontal divider"> <i class="ui icon meh"></i>
    </div>
    <div class="not-found detail" v-html="$t('message.unauthorized.content')"></div>
  </div>
</template>

<script>
export default {
  name: 'unauthozired',
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
