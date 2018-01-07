<template>
  <div>
    <div class="ui main container">
      <loader v-if="!article.content"></loader>
      <div class="article ui segment" v-if="article.content">
        <div class="article-header">
          <h1 id="article-title">{{article.title}}</h1>
        </div>
        <div class="article-meta">
          <p>
            <span class="meta-attribute"><i class="ui icon calendar"></i>{{article.lastModified | formatDate}}</span>
            <span class="meta-attribute"><i class="ui icon wait"></i>{{article.content | minToRead}} min read</span>
            <span class="meta-attribute"><i class="ui icon unhide"></i> {{article.views}}</span>
            <span class="meta-attribute">
              <i class="ui icon thumbs up teal link" :class="{outline:!isLiked}" @click="likeArticle"></i>
              {{numberLiked}}
            </span>
          </p>
        </div>
        <div class="content">
          <div class="coverImage">
            <img class="ui big centered image" id="coverImage" :src="article.coverImage ? article.coverImage.url : ''"/>
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
                  <div v-if="!isMyArticle">
                    <div @click="followUser" v-if="!isFollowed" class="follow ui mini button basic green circular"><i class="user icon"></i>Follow</div>
                    <div @click="unfollowUser" v-if="isFollowed" class="follow ui mini button green circular"><i class="user icon"></i>Following</div>
                  </div>
                  <div class="description">
                    <p>{{article.author.description}}</p>
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
import _ from 'lodash';
import Loader from '../common/Loader';
import SocialNetwork from '../common/SocialNetwork';

marked.setOptions({
  highlight: code => hljs.highlightAuto(code).value,
});

export default {
  created() {
  },
  mounted() {
    // load data from api
    this.$store.dispatch('article/readArticle',
      { articleId: this.$route.params.id, router: this.$router });
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
      return this.currentUserInfo.followings ?
      this.currentUserInfo.followings[this.article.author.uid] : false;
    },
    numberLiked() {
      if (this.article.likes) {
        // return default value when liked number is undefined
        return _.countBy(Object.values(this.article.likes)).true || 0;
      }
      return 0;
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
  margin: 0 0 24px 0;
}

.meta-attribute {
  margin-right: 16px;
  color: rgba(0,0,0,.54);
  font-size: 13px;
  line-height: 1.4;
}
#article-title {
  font-size: 3rem;
}

.coverImage {
  margin-bottom: 32px;
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

</style>