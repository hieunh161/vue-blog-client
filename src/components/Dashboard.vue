<template>
  <div class="ui container mb-grid" id="container">
    <div v-if="isAdmin" class="content">
      <div class="ui vertical menu" id="menu">
          <a class="active item">
            {{ $t('message.category.title') }}
          </a>
          <a class="item">
            {{ $t('message.setting.title') }}
          </a>
      </div>
    </div>
    <div id="content">
      <category></category>
    </div>
    <!-- <div id="content2">this is category</div> -->
    <div v-if="!isAdmin">
      <div class="ui active centered inline loader"></div>
    </div>
    <div class="ui tabular menu">
      <a class="item active">
        {{ $t('message.category.title') }}
      </a>
      <a class="item">
        {{ $t('message.setting.title') }}
      </a>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import Category from './Category';

export default {
  computed: {
    ...mapGetters('user', ['currentUser', 'currentUserInfo', 'isAdmin']),
  },
  components: {
    Category,
  },
};
</script>

<style scoped>
.mb-grid {
  margin-top: 24px;
}
#container {
  display: grid;
  grid-template-rows: auto;
  grid-template-columns: 250px;
  grid-template-areas:
      "areaMenu areaContent"
      "areaMenu areaContent2";
}
#menu {
  grid-area: areaMenu;
}
#content {
  grid-area: areaContent;
}
#content2 {
  grid-area: areaContent2;
}
</style>
