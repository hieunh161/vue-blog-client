<template>
  <div>
    <div class="ui main container">
      <loader v-if="!article.content"></loader>
      <div class="article ui segment" v-if="article.content">
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
          <div class="mrkdwn-body">
            <span v-html="article.content ? marked(article.content) : ''"></span>
          </div>
          <div>Views : {{article.views}} Likes: {{article.likes}}</div>
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
@import '../../assets/css/atom-one-dark.css';

.coverImage {
  margin-bottom: 48px;
}

.header {
  margin: 30px 0 30px 0;
}

#article-title {
  font-size: 3rem;
}

.article.ui.segment{
  margin: 24px;
  padding: 48px;
  text-align: left;
}

</style>