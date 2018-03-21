<template>
  <div>
    <div class="ui tiny modal" id="confirm-delete-category-modal">
      <i class="close icon"></i>
      <div class="header">
        {{ $t('message.common.confirm') }}
      </div>
      <div class="content">
        <div class="description">
          <p>{{ $t('message.confirm.delete_category', { category: category ? category.name : '' }) }}</p>
        </div>
      </div>
      <div class="actions">
        <div class="ui basic deny button">
          {{ $t('button.common.cancel') }}
        </div>
        <div class="ui red button" @click="deleteCategory">
          {{ $t('button.common.delete') }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    category: {
      type: Object,
      default: {
        name: '',
        priority: null,
      },
    },
  },
  methods: {
    deleteCategory() {
      if (this.category) {
        this.$np.start();
        this.$store.dispatch('category/deleteCategory', this.category.id)
          .then(() => {
            this.$np.done();
            this.$notify({
              group: 'notice',
              type: 'success',
              title: 'Message',
              text: 'Category is deleted successfully!',
            });
          });
        this.closeModal();
      }
    },
    closeModal() {
      this.$('#confirm-delete-category-modal').modal('hide');
    },
  },
};
</script>

<style>

</style>
