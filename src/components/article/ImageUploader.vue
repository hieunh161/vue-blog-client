<template>
<div>
  <div class="container">
    <!-- upload -->
    <form enctype="multipart/form-data" novalidate v-if="!coverImage || isReupload && !isUploading">
      <div class="dropbox">
        <input type="file"
          :disabled="isUploading" 
          name="image"
          @change="filesChange($event.target.name, $event.target.files);"
          accept="image/*" class="input-file">
          <p class="hint-message" v-html="$t('message.upload_image.upload_hint')"></p>
      </div>
    </form>
    <!-- cancel -->
    <a v-if="isReupload && !isUploading" class="ui red basic" href="javascript:void(0)" @click="isReupload = false">Cancel Upload</a>
    <!-- loading -->
    <div class="ui center aligned grid loading" v-if="isUploading">
      <circle-loader></circle-loader>
    </div>
    <!-- dislay image -->
    <div v-if="coverImage && !isReupload && !isUploading">
      <div class="ui medium image" id="image-dimmer">
        <div class="ui dimmer">
          <div class="content">
            <div class="center">
              <div class="ui teal button" @click="showPreviewImageModal">{{ $t('button.upload_image.preview') }}</div>
              <h5><a href="javascript:void(0)" @click="isReupload = true">{{ $t('message.upload_image.change_cover_image') }}</a></h5>
            </div>
          </div>
        </div>
        <img v-if="coverImage" class="ui image" :src="coverImage">
      </div>
    </div>
    <!-- preview modal -->
    <div class="ui basic fullscreen modal" id="preview-image-modal">
      <i class="close icon"></i>
      <img class="ui centered image" v-if="coverImage" :src="coverImage">
      <div class="actions">
        <div class="ui cancel basic red button" @click="hidePreviewImageModal">{{ $t('button.common.cancel') }}</div>
      </div>
    </div>
  </div>
</div>
</template>

<!-- Javascript -->
<script>
import { mapGetters } from 'vuex';

const CircleLoader = () => import('../common/CircleLoader');

export default {
  data() {
    return {
      isReupload: false,
      isUploading: false,
    };
  },
  computed: {
    ...mapGetters('file', ['uploadImage']),
    ...mapGetters('article', ['coverImage']),
  },
  methods: {
    filesChange(fieldName, fileList) {
      if (!fileList.length) return;
      this.$np.start();
      this.isUploading = true;
      const formData = new FormData();
      Array.from(Array(fileList.length).keys())
        .map(x => formData.append(fieldName, fileList[x], fileList[x].name));
      this.$store.dispatch('file/uploadImage', formData)
      .then(() => {
        // update link
        if (this.uploadImage) this.$store.dispatch('article/updateCoverImage', this.uploadImage.link);
        this.$np.done();
        this.isUploading = false;
        this.isReupload = false;
        this.$notify({
          group: 'notice',
          type: 'success',
          title: 'Message',
          text: 'Image is uploaded successfully!',
        });
      });
    },
    showPreviewImageModal() {
      this.$('#preview-image-modal').modal('show');
    },
    hidePreviewImageModal() {
      this.$('#preview-image-modal').modal('hide');
    },
  },
  mounted() {
    this.$('#image-dimmer').dimmer({ on: 'hover' });
  },
  components: {
    CircleLoader,
  },
};
</script>

<!-- SASS styling -->
<style scoped>
.dropbox {
  outline: 2px dashed grey; /* the dash box */
  outline-offset: -10px;
  /* background: lightcyan; */
  color: dimgray;
  padding: 10px 10px;
  min-height: 80px; /* minimum height */
  position: relative;
  cursor: pointer;
}

.dropbox:hover {
  background: #EAEAEA; /* when mouse over to the drop zone, change color */
}

.input-file {
  opacity: 0; /* invisible but it's there! */
  width: 50%;
  height: 80px;
  position: absolute;
  cursor: pointer;
}

.dropbox p {
  font-size: 1.2em;
  text-align: center;
  padding: 10px 0;
}

.hint-message {
  font-size: 15px !important;
}

.loading {
  margin: 40px;
}
</style>