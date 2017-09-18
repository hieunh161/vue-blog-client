<template>
  <div>
    <div class="ui container">
      <div class="article">
        <div class="meta-header">
          <div class="ui items">
            <div class="item">
              <a class="ui tiny image avatar">
                <img :src="currentUser.photoURL">
              </a>
              <div class="content">
                <a class="header">{{currentUser.displayName}}</a>
                <div class="description">
                  <p>{{currentUserInfo ? currentUserInfo.description : ''}}</p>
                  <p>{{article.lastModified | formatDate}} : {{article.content | minToRead}} min read</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="header">
          <h1 id="article-title">{{article.title}}</h1>
        </div>
        <div class="content">
          <div class="coverImage">
            <img class="ui medium centered image" :src="article.coverImage ? article.coverImage.url : ''"></img>
          </div>
          <div v-html="compiledMarkdown"></div>
          {{article.content | parseMarked}}
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters, mapState } from 'vuex';
// import marked from 'marked';
const marked = require('marked');

export default {
  mounted() {
    // load data from api
    this.$store.dispatch('article/readArticle',
      { articleId: this.$route.params.id, router: this.$router });
  },
  computed: {
    ...mapState('article', ['article']),
    ...mapGetters('authenticate', ['currentUser', 'currentUserInfo']),
    compiledMarkdown: () => {
      console.log(this.article);
      return (this.article ? marked(this.article.content, { sanitize: true }) : '');
    },
  },
};
</script>
<style>
.coverImage {
  margin-bottom: 40px;
}

.header {
  margin: 30px 0 30px 0;
}

#article-title {
  font-size: 3rem;
}

.article{
  margin: 20px 140px 20px 140px;
  text-align: left;
}
</style>