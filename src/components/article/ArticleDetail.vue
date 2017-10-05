<template>
  <div>
    <div class="ui main container">
      <loader v-if="!article.content"></loader>
      <div class="article ui segment" v-if="article.content">
        
        <div class="article-header">
          <h1 id="article-title">{{article.title}}</h1>
        </div>
        <div class="content">
          <div class="coverImage">
            <img class="ui big centered image" :src="article.coverImage ? article.coverImage.url : ''"></img>
          </div>
          <div class="mrkdwn-body">
            <span v-html="article.content ? marked(article.content) : ''"></span>
          </div>
          <div class="article-info">Views : {{article.views}} Likes: {{article.likes}}</div>
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
          <social-network :pageUrl="`https://medium.com/js-dojo/react-or-vue-which-javascript-ui-library-should-you-be-using-543a383608d`"></social-network>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex';
import hljs from 'highlight.js';
import marked from 'marked';
import Loader from '../common/Loader';
import SocialNetwork from '../common/SocialNetwork';
// const marked = require('marked');

export default {
  created() {
    marked.setOptions({
      highlight: (code, lang) => hljs.highlightAuto(code, [lang]).value,
    });
  },
  mounted() {
    // load data from api
    this.$store.dispatch('article/readArticle',
      { articleId: this.$route.params.id, router: this.$router });
  },
  computed: {
    ...mapGetters('article', ['article', 'articleId']),
    ...mapGetters('authenticate', ['currentUser', 'currentUserInfo']),
  },
  methods: {
    marked: input => marked(input),
  },
  components: {
    Loader,
    SocialNetwork,
  },
};
</script>
<style scoped>
@import '../../assets/css/markdown.style.css';
/* @import '../../assets/css/atom-one-dark.css'; */

@media only screen and (max-width: 767px) {
  .ui.container {
    width: auto !important;
    margin-left: 1em !important;
    margin-right: 1em !important;
  }
  .article.ui.segment{
    margin: 8px 0 0 0;
    padding: 16px;
    text-align: left;
  }
}

.mrkdwn-body {
  font-size: 21px;
  line-height: 1.58;
  color: rgba(0,0,0,.84);
  font-family: 'Roboto', sans-serif;
}

a.header {
  margin-top: 8px;
}

@media only screen and (min-width: 1200px) {
  .ui.container {
    width: 840px;
  }
  .article.ui.segment{
    margin: 24px;
    padding: 48px;
    text-align: left;
  }
}

.article-info {
  margin: 0 0 24px 0;
}

.coverImage {
  margin-bottom: 32px;
}
.meta-header {
  margin: 0 0 24px 0;
}
.article-header{
  margin: 0 0 24px 0;
}

#article-title {
  font-size: 3rem;
}

.description p {
  color: rgba(0,0,0,.54);
  font-size: 13px;
  line-height: 1.4;
}

</style>