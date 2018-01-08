<template>
<div>
  <div class="container">
    <!-- upload -->
    <form enctype="multipart/form-data" novalidate v-if="isInitial || isSaving">
      <div class="dropbox">
        <input type="file"
          :disabled="isSaving" 
          name="image"
          @change="filesChange($event.target.name, $event.target.files);"
          accept="image/*" class="input-file">
          <p v-if="isInitial" class="hint-message" v-html="$t('message.upload_image.upload_hint')"></p>
          <p v-if="isSaving" class="ui active centered inline loader">
            {{ $t('message.upload_image.uploading') }}
          </p>
      </div>
    </form>
      <div v-if="isSuccess">
        <div class="ui medium image" id="image-dimmer">
          <div class="ui dimmer">
            <div class="content">
              <div class="center">
                <div class="ui teal button" @click="showPreviewImageModal">{{ $t('button.upload_image.preview') }}</div>
                <h5><a href="javascript:void(0)" @click="reset()">{{ $t('message.upload_image.change_cover_image') }}</a></h5>
              </div>
            </div>
          </div>
          <img v-if="coverImage" class="ui image" :src="coverImage.url">
        </div>
      </div>
      <!-- failed -->
      <div v-if="isFailed">
        <h2>{{ $t('message.upload_image.upload_failed') }}</h2>
        <p>
          <a href="javascript:void(0)" @click="reset()">{{ $t('message.upload_image.try_again') }}</a>
        </p>
        <pre>{{ uploadError }}</pre>
      </div>
      <div class="ui basic fullscreen modal" id="preview-image-modal">
        <i class="close icon"></i>
        <img class="ui centered image" v-if="coverImage" :src="coverImage.url">
        <div class="actions">
          <div class="ui basic orange button" @click="hidePreviewImageModal">{{ $t('button.common.cancel') }}</div>
        </div>
      </div>
  </div>
</div>
</template>

<!-- Javascript -->
<script>
import { mapGetters } from 'vuex';
import $ from 'jquery';

const STATUS_INITIAL = 0;
const STATUS_SAVING = 1;
const STATUS_SUCCESS = 2;
const STATUS_FAILED = 3;

export default {
  data() {
    return {
      uploadFieldName: 'image',
    };
  },
  computed: {
    ...mapGetters({ uploadStatus: 'article/uploadStatus' }),
    ...mapGetters({ coverImage: 'article/coverImage' }),
    isInitial() {
      return this.uploadStatus === STATUS_INITIAL;
    },
    isSaving() {
      return this.uploadStatus === STATUS_SAVING;
    },
    isSuccess() {
      return this.uploadStatus === STATUS_SUCCESS;
    },
    isFailed() {
      return this.uploadStatus === STATUS_FAILED;
    },
  },
  methods: {
    reset() {
      this.$store.dispatch('article/updateUploadStatus', STATUS_INITIAL);
    },
    save(formData) {
      this.$store.dispatch('article/uploadImage', formData);
    },
    filesChange(fieldName, fileList) {
      // handle file changes
      const formData = new FormData();
      if (!fileList.length) return;
      // append the files to FormData
      Array
        .from(Array(fileList.length).keys())
        .map(x => formData.append(fieldName, fileList[x], fileList[x].name));
      this.save(formData);
    },
    showPreviewImageModal() {
      $('#preview-image-modal').modal('show');
    },
    hidePreviewImageModal() {
      $('#preview-image-modal').modal('hide');
    },
  },
  mounted() {
    // this.reset();
    $('#image-dimmer').dimmer({ on: 'hover' });
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

.input-file {
  opacity: 0; /* invisible but it's there! */
  width: 50%;
  height: 80px;
  position: absolute;
  cursor: pointer;
}

.dropbox:hover {
  background: #EAEAEA; /* when mouse over to the drop zone, change color */
}

.dropbox p {
  font-size: 1.2em;
  text-align: center;
  padding: 10px 0;
}

.hint-message {
  font-size: 15px !important;
}

</style>