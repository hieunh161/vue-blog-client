import * as firebase from 'firebase';
import * as axios from 'axios';
import util from './util';
import { REF_ARTICLE, REF_USER, IMG_UPLOAD_URL, REF_ARTICLE_SHALLOW } from './const';
import { imgUrlConfig, firebaseConfig } from '../config';

const getArticlesByStatus = (userId, status) => {
  firebase.database().ref(REF_ARTICLE)
    .orderBy('createUser')
    .startAt(userId)
    .endAt(userId)
    .orderBy('status')
    .startAt(status)
    .endAt(status)
    .then(result => util.getListArticleFromSnap(result));
};