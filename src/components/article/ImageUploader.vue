<template>
<div>
  <div class="container">
    <!--UPLOAD-->
    <form enctype="multipart/form-data" novalidate v-if="isInitial || isSaving">
      <div class="dropbox">
        <input type="file"
          :name="uploadFieldName" 
          :disabled="isSaving" 
          @change="filesChange($event.target.name, $event.target.files);"
          accept="image/*" class="input-file">
          <p v-if="isInitial">
            <i class="ui icon cloud upload"></i>
            Drag your file here to begin<br> or click to browse
          </p>
          <div v-if="isSaving">
            <div class="ui active centered inline loader">Uploading file...</div>
          </div>
      </div>
    </form>
      <div v-if="isSuccess">
        <p>
          <a href="javascript:void(0)" @click="reset()">Upload again</a>
        </p>
        <img :src="coverImage.url" class="img-responsive img-thumbnail" :alt="coverImage.originalName">
      </div>
      <!--FAILED-->
      <div v-if="isFailed">
        <h2>Uploaded failed.</h2>
        <p>
          <a href="javascript:void(0)" @click="reset()">Try again</a>
        </p>
        <pre>{{ uploadError }}</pre>
      </div>
  </div>
</div>
</template>

<!-- Javascript -->
<script>
import { mapGetters } from 'vuex';

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
      this.uploadError = null;
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
  },
  mounted() {
    this.reset();
  },
};
</script>

<!-- SASS styling -->
<style scoped>
.dropbox {
  outline: 2px dashed grey; /* the dash box */
  outline-offset: -10px;
  background: lightcyan;
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
  background: lightblue; /* when mouse over to the drop zone, change color */
}

.dropbox p {
  font-size: 1.2em;
  text-align: center;
  padding: 20px 0;
}
</style>