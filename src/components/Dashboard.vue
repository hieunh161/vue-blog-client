<template>
  <div class="ui container mb-grid" id="container">
    <!-- <div v-if="isAdmin" class="content">
      <div class="ui vertical menu" id="menu">
          <a class="active item">
            {{ $t('message.category.title') }}
          </a>
          <a class="item">
            {{ $t('message.setting.title') }}
          </a>
      </div>
    </div> -->
    <div class="dashboard-menu ui pointing secondary menu" id="dashboard-menu">
      <a class="item" :class="{ active: isCategoryActive }" data-tab="category" @click="switchTabs('category')">Category</a>
      <a class="item" :class="{ active: isTagActive }" data-tab="tag" @click="switchTabs('tag')">Tag</a>
      <a class="item" :class="{ active: isRoleActive }" data-tab="role" @click="switchTabs('role')">Role</a>
    </div>
    <div class="ui tab segment" :class="{ active: isCategoryActive }" data-tab="category">
      <category></category>
    </div>
    <div class="ui tab segment" :class="{ active: isTagActive }" data-tab="tag">
      third
    </div>
    <div class="ui tab segment" :class="{ active: isRoleActive }" data-tab="role">
      second
    </div>
    <!-- <div id="content">
      <category></category>
    </div> -->
    <!-- <div id="content2">this is category</div> -->
    <!-- <div v-if="!isAdmin">
      <div class="ui active centered inline loader"></div>
    </div> -->
    <!-- <div class="ui tabular menu">
      <a class="item active">
        {{ $t('message.category.title') }}
      </a>
      <a class="item">
        {{ $t('message.setting.title') }}
      </a>
    </div> -->
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
// import Category from './Category';
const Category = () => import('./category/Category');

export default {
  data() {
    return {
      isCategoryActive: true,
      isTagActive: false,
      isRoleActive: false,
    };
  },
  mounted() {
    this.$('.dashboard-menu .menu .item').tab();
  },
  methods: {
    switchTabs(tab) {
      if (tab === 'category') {
        this.isCategoryActive = true;
        this.isTagActive = false;
        this.isRoleActive = false;
      } else if (tab === 'tag') {
        this.isCategoryActive = false;
        this.isTagActive = true;
        this.isRoleActive = false;
      } else {
        this.isCategoryActive = false;
        this.isTagActive = false;
        this.isRoleActive = true;
      }
    },
  },
  computed: {
    ...mapGetters('user', ['currentUser', 'currentUserInfo', 'isAdmin']),
  },
  components: {
    Category,
  },
};
</script>

<style scoped>
/* .mb-grid {
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
} */
</style>
