<template>
  <div>
    <div>
      <table class="ui celled table" v-if="!isLoadingCategory">
        <thead>
          <tr>
            <th>{{ $t('message.common.id') }}</th>
            <th>{{ $t('message.category.title') }}</th>
            <th>{{ $t('message.common.priority') }}</th>
            <th>{{ $t('message.category.last_modified') }}</th>
            <th>{{ $t('message.category.action') }}</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="category in categories" v-bind:key="category.key">
            <td>{{category.id}}</td>
            <td>{{category.name}}</td>
            <td>{{category.priority}}</td>
            <td>{{category.updated_at}}</td>
            <td>
              <a @click="() => showUpdateCategory(category)"><i class="ui icon large edit positive"></i></a>
              <a @click="() => showConfirmDeleteModal(category)"><i class="ui icon large red remove"></i></a>
            </td>
          </tr>
        </tbody>
      </table>
      <div class="ui center aligned grid loading" v-if="isLoadingCategory">
        <circle-loader></circle-loader>
      </div>
      
      <button class="ui button basic positive" v-if="!isShowAddCategoryForm" @click="isShowAddCategoryForm = !isShowAddCategoryForm">{{ $t('message.category.add_form') }}</button>
      <button class="ui button basic positive" v-if="isShowAddCategoryForm" @click="isShowAddCategoryForm = !isShowAddCategoryForm">{{ $t('message.category.hide_form') }}</button>
    </div>
    <!-- modal -->
    <category-delete :category="selectedCategory"></category-delete>
    <div v-if="isShowAddCategoryForm">
      <div class="ui divider"></div>
      <category-add></category-add>
    </div>
    <div v-if="isShowUpdateCategoryForm">
      <div class="ui divider"></div>
      <category-update :category="selectedCategory"></category-update>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

const CategoryAdd = () => import('./CategoryAdd.vue');
const CategoryUpdate = () => import('./CategoryUpdate.vue');
const CategoryDelete = () => import('./CategoryDelete.vue');
const CircleLoader = () => import('../common/CircleLoader.vue');
const SquareLoader = () => import('../common/SquareLoader.vue');

export default {
  data() {
    return {
      isLoadingCategory: false,
      selectedCategory: null,
      isShowAddCategoryForm: false,
      isShowUpdateCategoryForm: false,
    };
  },
  mounted() {
    this.$np.start();
    this.isLoadingCategory = true;
    this.$store.dispatch('category/readCategories')
    .then(() => {
      this.isLoadingCategory = false;
      this.$np.done();
    });
  },
  methods: {
    showUpdateCategory(category) {
      this.isShowUpdateCategoryForm = true;
      this.selectedCategory = category;
    },
    showConfirmDeleteModal(category) {
      this.selectedCategory = category;
      this.openModal();
    },
    openModal() {
      this.$('#confirm-delete-category-modal').modal('show');
    },
  },
  computed: {
    ...mapGetters('category', ['categories']),
  },
  components: {
    CategoryAdd,
    CategoryUpdate,
    CategoryDelete,
    CircleLoader,
    SquareLoader,
  },
};
</script>

<style scoped>
a:hover {
  cursor : pointer;
} 
.footer {
  margin-bottom: 50px;
}
#categoryLoader{
  height: 100px;
}
.loading {
  margin: 40px;
}
</style>
