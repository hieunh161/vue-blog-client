<template>
  <div class="editor">
    <h1>Article Editor</h1>
    <mavon-editor
      v-model="content"
      value="# Write your story..."
      language="en"
      style="height: 100%"></mavon-editor>
  </div>
</template>
<script>
// Local Registration
import { mavonEditor } from 'mavon-editor';
import 'mavon-editor/dist/css/index.css';

export default {
  components: {
    mavonEditor,
  },
  data() {
    return { content: '' };
  },
};
</script>
<style>
.editor {
  margin: auto;
  width: 95%;
  height: 580px;
}
</style>