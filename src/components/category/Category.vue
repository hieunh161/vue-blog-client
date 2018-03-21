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
      <div class="ui segment" id="categoryLoader" v-if="isLoadingCategory">
        <div class="ui active inverted dimmer">
          <div class="ui text loader">{{ $t('message.category.loading') }}</div>
        </div>
        <p></p>
      </div>
      <button class="ui button basic positive" v-if="!isShowAddCategoryForm" @click="isShowAddCategoryForm = !isShowAddCategoryForm">{{ $t('message.category.add_form') }}</button>
      <button class="ui button basic positive" v-if="isShowAddCategoryForm" @click="isShowAddCategoryForm = !isShowAddCategoryForm">{{ $t('message.category.hide_form') }}</button>
    </div>
    <!-- modal -->
    <div class="ui tiny modal" id="confirm-delete-modal">
      <i class="close icon"></i>
      <div class="header">
        {{ $t('message.common.confirm') }}
      </div>
      <div class="content">
        <div class="description">
          <p>{{ $t('message.confirm.delete_category', { category: selectedCategory ? selectedCategory.name : '' }) }}</p>
        </div>
      </div>
      <div class="actions">
        <div class="ui basic deny button">
          {{ $t('button.common.cancel') }}
        </div>
        <div class="ui orange button" @click="deleteCategory">
          {{ $t('button.common.delete') }}
        </div>
      </div>
    </div>
    <div v-if="isShowAddCategoryForm">
      <div class="ui divider"></div>
      <category-add></category-add>
    </div>
    <div v-if="isShowUpdateCategoryForm">
      <div class="ui divider"></div>
      <div class="ui header">{{ $t('message.category.update') }}</div>
      <div class="ui form">
        <div class="field">
          <input type="text" v-model="updatedCategory.name" name="category" placeholder="Add Category">
        </div>
        <button class="ui button basic" @click="isShowUpdateCategoryForm = false">{{ $t('button.common.cancel') }}</button>
        <button class="ui button positive" :class='{loading:isUpdatingCategory}' @click="updateCategory">{{ $t('button.common.update') }}</button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

const CategoryAdd = () => import('./CategoryAdd.vue');

export default {
  data() {
    return {
      isLoadingCategory: false,
      isUpdatingCategory: false,
      updatedCategory: {
        name: null,
        priority: null,
      },
      categoryList: [],
      selectedCategory: null,
      addedCategory: {
        name: null,
        priority: null,
      },
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
    updateCategory() {
      this.isUpdatingCategory = true;
      this.$store.dispatch('category/updateCategory', { category: this.updatedCategory })
      .then(() => { this.isUpdatingCategory = false; });
      this.$notify({ group: 'notice', name: 'Notification', text: 'Update category successfully', type: 'success' });
      this.isShowUpdateCategoryForm = false;
    },
    showUpdateCategory(category) {
      this.isShowUpdateCategoryForm = true;
      this.updatedCategory = category;
    },
    showConfirmDeleteModal(category) {
      this.selectedCategory = category;
      this.openModal();
    },
    deleteCategory() {
      if (this.selectedCategory) {
        this.$store.dispatch('category/deleteCategory', this.selectedCategory);
        this.closeModal();
      }
    },
    openModal() {
      this.$('#confirm-delete-modal').modal('show');
    },
    closeModal() {
      this.$('#confirm-delete-modal').modal('hide');
    },
  },
  computed: {
    ...mapGetters('category', ['categories']),
    ...mapGetters('user', ['currentUser', 'currentUserInfo', 'isAdmin']),
  },
  components: {
    CategoryAdd,
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
</style>
