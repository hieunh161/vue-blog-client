<template>
  <div class="ui container mb-grid" id="container">
    <div v-if="isAdmin" class="content">
      <div class="ui vertical menu" id="menu">
          <a class="active item">
            Category
          </a>
          <a class="item">
            Settings
          </a>
      </div>
    </div>
    <div id="content">
      <category></category>
    </div>
    <!-- <div id="content2">this is category</div> -->
    <div v-if="!isAdmin">
      NG
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
