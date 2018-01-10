<template>
  <div>
    <div>
      <table class="ui celled table" v-if="!isLoadingCategory">
        <thead>
          <tr>
            <th>{{ $t('message.category.title') }}</th>
            <th>{{ $t('message.category.last_modified') }}</th>
            <th>{{ $t('message.category.action') }}</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="category in categories" v-bind:key="category.key">
            <td>{{category.value.title}}</td>
            <td>{{category.value.modified | formatDate}}</td>
            <td>
              <a @click="() => showUpdateCategory(category)"><i class="ui icon large circular edit positive"></i></a>
              <a @click="() => showConfirmDeleteModal(category)"><i class="ui icon large circular red remove"></i></a>
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
      <button class="ui button circular basic positive" v-if="!isShowAddCategoryForm" @click="isShowAddCategoryForm = !isShowAddCategoryForm">{{ $t('message.category.add_form') }}</button>
      <button class="ui button circular basic positive" v-if="isShowAddCategoryForm" @click="isShowAddCategoryForm = !isShowAddCategoryForm">{{ $t('message.category.hide_form') }}</button>
    </div>
    <!-- <confirm-modal></confirm-modal> -->
    <!-- modal -->
    <div class="ui modal">
      <i class="close icon"></i>
      <div class="header">
        {{ $t('message.common.confirm') }}
      </div>
      <div class="content">
        <div class="description">
          <p>{{ $t('message.confirm.delete_category', { category: selectedCategory ? selectedCategory.value.title : '' }) }}</p>
        </div>
      </div>
      <div class="actions">
        <div class="ui basic deny circular button">
          {{ $t('button.common.cancel') }}
        </div>
        <div class="ui orange circular button" @click="deleteCategory">
          {{ $t('button.common.delete') }}
        </div>
      </div>
    </div>
    <div v-if="isShowAddCategoryForm">
      <div class="ui divider"></div>
      <div class="ui header">{{ $t('message.category.add') }}</div>
      <div class="ui form">
        <div class="field">
          <!-- <label>Add Category</label> -->
          <input type="text" v-model="addedCategory" name="category" placeholder="Add Category">
        </div>
        <button class="ui button positive circular" @click="addCategory">{{ $t('button.common.add') }}</button>
      </div>
    </div>
    <div v-if="isShowUpdateCategoryForm">
      <div class="ui divider"></div>
      <div class="ui header">{{ $t('message.category.update') }}</div>
      <div class="ui form">
        <div class="field">
          <!-- <label>Update Category</label> -->
          <input type="text" v-model="updatedCategory.value.title" name="category" placeholder="Add Category">
        </div>
        <button class="ui button basic circular" @click="isShowUpdateCategoryForm = false">{{ $t('button.common.cancel') }}</button>
        <button class="ui button positive circular" :class='{loading:isUpdatingCategory}' @click="updateCategory">{{ $t('button.common.update') }}</button>
      </div>
    </div>
    <!-- footer -->
    <footer class="footer"></footer>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  data() {
    return {
      isLoadingCategory: false,
      isUpdatingCategory: false,
      updatedCategory: '',
      categoryList: [],
      selectedCategory: null,
      addedCategory: null,
      isShowAddCategoryForm: false,
      isShowUpdateCategoryForm: false,
    };
  },
  mounted() {
    this.$np.start();
    this.isLoadingCategory = true;
    this.$store.dispatch('category/readCategory')
    .then(() => {
      this.isLoadingCategory = false;
      this.$np.done();
    });
  },
  methods: {
    addCategory() {
      if (this.addedCategory && this.addedCategory !== '') {
        this.$store.dispatch('category/createCategory', { category: this.addedCategory });
        this.addedCategory = '';
      }
    },
    updateCategory() {
      this.isUpdatingCategory = true;
      this.$store.dispatch('category/updateCategory', { category: this.updatedCategory })
      .then(() => { this.isUpdatingCategory = false; });
      this.$notify({ group: 'notice', title: 'Notification', text: 'Update category successfully', type: 'success' });
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
        this.$store.dispatch('category/deleteCategory', { categoryId: this.selectedCategory.key });
      }
    },
    openModal() {
      this.$('.modal').modal('show');
    },
    closeModal() {
      this.$('.modal').modal('close');
    },
  },
  computed: {
    ...mapGetters('category', ['categories']),
    ...mapGetters('user', ['currentUser', 'currentUserInfo', 'isAdmin']),
  },
  components: {
    // modal,
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
