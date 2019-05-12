<template>
  <div class="ui modal" id="modal_image_upload">
    <i class="close icon"></i>
    <div class="header" v-if="types === 0">Upload File To Server</div>
    <div class="header" v-if="types === 1">{{ $t('message.upload_image.upload_modal_title') }}</div>
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
      <div class="ui center aligned grid loading-spinner" v-if="isSaving">
        <circle-loader></circle-loader>
      </div>
      <div v-if="uploadedLink !== ''">
        <div class="ui divider"></div>
        <img class="ui middle aligned small image center" :src="uploadedLink" >
        <div class="" @click="copyLink(uploadedLink)">Copy Link</div>
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
import { UPLOAD_STATUS } from '../../services/const';

const CircleLoader = () => import('../common/CircleLoader');

export default {
  props: {
    initImages: {
      type: Object,
      default: () => {},
    },
    // 0 : local server, 1: imgUrl
    types: {
      type: Number,
      default: 0,
    },
  },
  data() {
    return {
      // article: {},
      message: 'files',
      uploadFieldName: 'image',
      uploadStatus: UPLOAD_STATUS.INITIAL,
      uploadedLink: '',
      isDragOver: false,
    };
  },
  computed: {
    isInitial() {
      return this.uploadStatus === UPLOAD_STATUS.INITIAL;
    },
    isSaving() {
      return this.uploadStatus === UPLOAD_STATUS.SAVING;
    },
    isSuccess() {
      return this.uploadStatus === UPLOAD_STATUS.SUCCESS;
    },
    isFailed() {
      return this.uploadStatus === UPLOAD_STATUS.FAILED;
    },
  },
  methods: {
    showUploadModal() {
      this.$('#modal_image_upload').modal('show');
    },
    closeUploadModal() {
      this.$('#modal_image_upload').modal('hide');
    },
    filesChange(fieldName, fileList) {
      // handle file changes
      const formData = new FormData();
      if (!fileList.length) return;
      // append the files to FormData
      this.uploadStatus = UPLOAD_STATUS.SAVING;
      Array
        .from(Array(fileList.length).keys())
        .map(x => formData.append(fieldName, fileList[x], fileList[x].name));
      if (this.types === 1) {
        this.save(formData);
      } else if (this.types === 0) {
        this.saveToLocal(formData);
      }
    },
    onDragOver(status) {
      this.isDragOver = status;
    },
    saveToLocal(formData) {
      const config = {
        url: 'http://localhost:8000/api/v1/image',
        method: 'post',
        data: formData,
        // headers: {
        //   Authorization: 'Client-ID 5b3be50a7c3a7ff',
        // },
      };
      return axios(config)
        .then((result) => {
          console.log(result);
          this.uploadedLink = `http://localhost:8000${result.data.path}`;
          this.uploadStatus = UPLOAD_STATUS.INITIAL;
        })
        .catch((err) => {
          console.log(err);
          this.uploadStatus = UPLOAD_STATUS.INITIAL;
        });
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
          Object.assign({}, x.data, { url: x.data.link });
          this.uploadedLink = x.data.link;
          this.uploadStatus = UPLOAD_STATUS.INITIAL;
          return Promise.resolve(x.data);
        });
    },
    copyLink(copyLink) {
      console.log(copyLink);
      /* Get the text field */
      const copyText = document.createElement('textarea');
      copyText.text = copyLink;
      // Chrome
      copyText.value = copyLink;
      // FF
      copyText.textContent = copyLink;
      document.body.appendChild(copyText);
      /* Select the text field */
      copyText.focus();
      copyText.select();
      /* Copy the text inside the text field */
      const successful = document.execCommand('Copy');
      console.log(successful);
      copyText.parentElement.removeChild(copyText);
      this.$notify({
        group: 'notice',
        type: 'success',
        title: 'Message',
        text: `${copyLink} is copied to clipboard!`,
      });
    },
  },
  components: {
    CircleLoader,
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

.dropbox:hover, .dragover {
  background: #EAEAEA;
}

.dropbox p {
  font-size: 1.2em;
  text-align: center;
  padding: 20px 0;
}

</style>
