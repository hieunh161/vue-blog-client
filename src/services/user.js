import * as firebase from 'firebase';

const USER_REF = 'users';

const getUserInfor = (userId) => {
  const ref = firebase.database().ref(USER_REF).child(userId);
  return ref.once('value').then(snapshot => snapshot.val());
};

const getLocalUserInfo = (user) => {
  const userRef = firebase.database().ref(USER_REF);
  return userRef.child(user.uid).transaction((currentUserData) => {
    if (currentUserData === null) {
      return {
        description: 'A member of sharing community',
        name: user.displayName,
        role: 0,
      };
    }
    return currentUserData;
  }).then(result => result.snapshot.val());
};

const signInWithFacebook = () => {
  const provider = new firebase.auth.FacebookAuthProvider();
  return firebase.auth().signInWithPopup(provider);
};

const signInWithGoogle = () => {
  const provider = new firebase.auth.GoogleAuthProvider();
  return firebase.auth().signInWithPopup(provider);
};

// follow service
const followUser = (follower, following, isFollowed) => {
  const followerUser = {};
  followerUser[following] = isFollowed;
  const followingUser = {};
  followingUser[follower] = isFollowed;
  const userRef = firebase.database().ref(USER_REF);
  return userRef.child(follower).child('followings').update(followerUser)
  .then(() => userRef.child(following).child('followers').update(followingUser));
};

export default {
  getUserInfor,
  signInWithFacebook,
  signInWithGoogle,
  getLocalUserInfo,
  followUser,
};
