<template>
  <div class="article-detail">
    <div class="sidebar" v-if="!isLoadingArtice && article" data-tooltip="Give heart" data-position="right center">
      <i class="ui icon huge heart orange link" :class="{outline:!isLiked}" @click="likeArticle"></i>
      <div class="sidebar-like">{{numberLiked}}</div>
    </div>
    <div class="ui main container content">
      <!-- progress bar -->
      <loader v-if="isLoadingArtice && !article"></loader>
      <!-- article content -->
      <div class="article" v-if="!isLoadingArtice && article">
        <div>
          <div class="article-header ui header">
            <h1 class="article-title">{{article.title}}</h1>
          </div>
          <div class="article-meta">
            <p>
              <span class="meta-attribute"><i class="ui icon calendar"></i>{{article.lastModified | formatDate}}</span>
              <span class="meta-attribute"><i class="ui icon wait"></i>{{article.content | minToRead}} min read</span>
              <span class="meta-attribute"><i class="ui icon unhide"></i> {{article.views}}</span>
            </p>
          </div>
          <div class="content">
            <!-- cover image -->
            <div class="coverImage">
              <img class="ui centered image" id="coverImage" :src="article.coverImage ? article.coverImage.url : ''"/>
            </div>
            <!-- article tag -->
            <div class="ui tiny horizontal list" v-if="article.tags">
              <div class="item" v-for="tag in Object.keys(article.tags)" v-bind:key="tag" >
                <div class="ui  label">{{tag}}</div>
              </div>
            </div>
            <div class="mrkdwn-body">
              <span v-html="article.content ? marked(article.content) : ''"></span>
            </div>
            <div>
            </div>
            <div class="meta-header">
              <div class="ui items">
                <div class="item">
                  <a class="ui tiny image avatar">
                    <img :src="article.author.photoURL">
                  </a>
                  <div class="content">
                    <a class="header">{{article.author.displayName}}</a>
                    <span v-if="!isMyArticle">
                      <span @click="followUser" v-if="!isFollowed" class="follow ui mini button basic green circular"><i class="user icon"></i>Follow</span>
                      <span @click="unfollowUser" v-if="isFollowed" class="follow ui mini button green circular"><i class="user icon"></i>Following</span>
                    </span>
                    <div class="description">
                      <p>{{article.author.description}}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <social-network :pageUrl="getPageUrl"></social-network>
            <!-- facebook comment -->
            <div class="fb-comments" data-href="my-blog-68afd.firebaseapp.com/article/-L2AhDoogBulzEAfSIoq" data-numposts="10"></div>
          </div>
        </div>
      </div>
      <!-- fallback when content not found -->
      <page-not-found v-if="!isLoadingArtice && !article"></page-not-found>
    </div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex';
import marked, { Renderer } from 'marked';
import highlightjs from 'highlight.js';
import Loader from '../common/Loader';
import PageNotFound from '../PageNotFound';
import SocialNetwork from '../common/SocialNetwork';
import { baseUrl } from '../../config';

export default {
  data() {
    return {
      isLoadingArtice: false,
    };
  },
  created() {
    const renderer = new Renderer();
    renderer.code = (code, language) => {
      // Check whether the given language is valid for highlight.js.
      const validLang = !!(language && highlightjs.getLanguage(language));
      // Highlight only if the language is valid.
      const highlighted = validLang ? highlightjs.highlight(language, code).value : code;
      // Render the highlighted code with `hljs` class.
      return `<pre><code class="hljs ${language}">${highlighted}</code></pre>`;
    };
    // Set the renderer to marked.
    marked.setOptions({ renderer });
    // load data from api
    this.$np.start();
    this.isLoadingArtice = true;
    this.$store.dispatch('article/readArticleByIdWithViewUpdate', { articleId: this.$route.params.id })
      .then(() => {
        this.isLoadingArtice = false;
        this.$np.done();
      });
  },
  mounted() {
  },
  computed: {
    ...mapGetters('article', ['article', 'articleId']),
    ...mapGetters('user', ['currentUser', 'currentUserInfo']),
    isLiked() {
      return this.article.likes ? this.article.likes[this.currentUser.uid] : false;
    },
    isMyArticle() {
      if (this.article && this.currentUser) {
        return this.article.author.uid === this.currentUser.uid;
      }
      return true;
    },
    isFollowed() {
      return this.currentUserInfo && this.currentUserInfo.followings ?
      this.currentUserInfo.followings[this.article.author.uid] : false;
    },
    numberLiked() {
      if (this.article.likes) {
        // return default value when liked number is undefined
        return this._.countBy(Object.values(this.article.likes)).true || 0;
      }
      return 0;
    },
    getPageUrl() {
      return `${baseUrl}${this.$route.path}`;
    },
  },
  methods: {
    marked: input => marked(input),
    likeArticle() {
      this.$store.dispatch('article/likeArticle',
        { articleId: this.articleId,
          userId: this.currentUser.uid,
          isLiked: !this.isLiked,
        });
    },
    followUser() {
      // follow article author
      this.$store.dispatch('user/followUser', { follower: this.currentUser.uid, following: this.article.author.uid, isFollowed: true });
    },
    unfollowUser() {
      // follow article author
      this.$store.dispatch('user/followUser', { follower: this.currentUser.uid, following: this.article.author.uid, isFollowed: false });
    },
  },
  components: {
    Loader,
    SocialNetwork,
    PageNotFound,
  },
};
</script>
<style scoped>
@import '../../assets/css/markdown.style.css';
@import '../../assets/css/atom-one-dark.css';

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
  font-size: 18px;
  line-height: 1.4;
  color: rgba(0,0,0,.84);
  font-family: -apple-system,BlinkMacSystemFont,Segoe UI,Helvetica,Arial,sans-serif;
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

.article-header{
  margin: 0 0 8px 0;
}

.article-meta{
  margin: 0 0 16px 0;
}

.meta-attribute {
  margin-right: 16px;
  color: rgba(0,0,0,.54);
  font-size: 13px;
  line-height: 1.4;
}

.article-title {
  margin-top: 1rem; 
  font-size: 3rem;
}

.coverImage {
  margin-bottom: 0px;
}

.meta-header {
  margin: 0 0 24px 0;
}

.description p {
  color: rgba(0,0,0,.54);
  font-size: 13px;
  line-height: 1.4;
}

.follow {
  margin-left: 20px;
}

.article-detail {
  background-color: #F7F7F7;
  min-height: calc(100vh - 144px);
}

@media (max-width: 1281px) {
  .sidebar {
    position: -webkit-sticky;
    position: sticky;
    top: calc(78vh);
    margin-left: calc(76vw);
    width: 80px;
    text-align: center;
    float: right;
    z-index: 999;
  }
  .sidebar-like {
    margin-top: 8px;
    font-size: 1.2em;
  }
}

@media (min-width:1281px) {
  .sidebar {
    position: -webkit-sticky;
    position: sticky;
    top: calc(35vh);
    margin-left: calc(6vw);
    width: 80px;
    text-align: center;
    float: left;
    z-index: 999;
  }
  .sidebar-like {
    margin-top: 8px;
    font-size: 1.2em;
  }
}

</style>