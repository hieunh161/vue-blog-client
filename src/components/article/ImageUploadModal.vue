<template>
  <div class="ui modal" id="modal_image_upload">
    <i class="close icon"></i>
    <div class="header">{{ $t('message.upload_image.upload_modal_title') }}</div>
    <div class="content">
      <form enctype="multipart/form-data" id="theform" novalidate v-if="!isSaving">
        <div class="dropbox" :class="{dragover:isDragOver}">
          <input type="file"
            :name="uploadFieldName" 
            :disabled="isSaving" 
            @change="filesChange($event.target.name, $event.target.files);"
            @dragenter="() => onDragOver(true)"
            @dragover="() => onDragOver(true)"
            @dragleave="() => onDragOver(false)"
            @dragend="() => onDragOver(false)"
            accept="image/*" class="input-file">
            <p v-if="isInitial" v-html="$t('message.upload_image.upload_modal_hint')"></p>
        </div>
      </form>
      <!-- <div class="progressbar" v-if="isSaving">
        <div class="ui active centered inline loader">Uploading file...</div>
      </div> -->
      <loader v-if="isSaving"></loader>
      <div v-if="uploadedLink !== ''">
        <div class="ui divider"></div>
        <img class="ui middle aligned small image center" :src="uploadedLink" >
        <span>{{uploadedLink}}</span>
      </div>
    </div>
    <div class="actions">
      <div class="ui red basic button" @click="closeUploadModal">{{ $t('button.common.close') }}</div>
    </div>
  </div>
</template>

<script>
import * as axios from 'axios';
import Loader from '../common/Loader';

const STATUS_INITIAL = 0;
const STATUS_SAVING = 1;
const STATUS_SUCCESS = 2;
const STATUS_FAILED = 3;

/* global $:true */
export default {
  props: {
    initImages: {
      type: Object,
      default: () => {},
    },
  },
  created() {
    this.$parent.$on('showUploadModal', this.showUploadModal);
  },
  data() {
    return {
      // article: {},
      message: 'files',
      uploadFieldName: 'image',
      uploadStatus: STATUS_INITIAL,
      uploadedLink: '',
      isDragOver: false,
    };
  },
  computed: {
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
    showUploadModal() {
      $('#modal_image_upload').modal('show');
    },
    closeUploadModal() {
      $('#modal_image_upload').modal('hide');
    },
    filesChange(fieldName, fileList) {
      // handle file changes
      const formData = new FormData();
      if (!fileList.length) return;
      // append the files to FormData
      this.uploadStatus = STATUS_SAVING;
      Array
        .from(Array(fileList.length).keys())
        .map(x => formData.append(fieldName, fileList[x], fileList[x].name));
      this.save(formData);
      // setTimeout(() => { this.uploadStatus = STATUS_INITIAL; }, 3000);
    },
    onDragOver(status) {
      this.isDragOver = status;
      console.log(this.isDragOver);
    },
    save(formData) {
      const config = {
        url: 'https://api.imgur.com/3/image.json',
        method: 'post',
        data: formData,
        headers: {
          Authorization: 'Client-ID 5b3be50a7c3a7ff',
        },
      };
      return axios(config)// get data
        .then(x => x.data)
        .then((x) => {
          const result = Object.assign({}, x.data, { url: x.data.link });
          console.log(result);
          this.uploadedLink = x.data.link;
          this.uploadStatus = STATUS_INITIAL;
          return Promise.resolve(x.data);
        });
    },
  },
  components: {
    Loader,
  },
};
</script>

<style scoped>
.dropbox {
  outline: 2px dashed grey; /* the dash box */
  outline-offset: -10px;
  /* background: lightcyan; */
  color: dimgray;
  padding: 10px 10px;
  min-height: 100px; /* minimum height */
  position: relative;
  cursor: pointer;
}

.input-file {
  opacity: 0; /* invisible but it's there! */
  width: 100%;
  height: 100px;
  position: absolute;
  cursor: pointer;
}

.dropbox:hover {
  background: EAEAEA;
}

.dropbox p {
  font-size: 1.2em;
  text-align: center;
  padding: 20px 0;
}

</style>
