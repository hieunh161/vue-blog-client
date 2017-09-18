import * as firebase from 'firebase';

const getUserInfor = (userId) => {
  const ref = firebase.database().ref('user').child(userId);
  return ref.once('value').then((snapshot) => {
    console.log(snapshot.val());
    return Promise.resolve(snapshot.val());
  });
};

const createNewUser = (user) => {
  console.log(user);
  const userId = user.uid;
  return firebase.database().ref('user').child(userId).set({
    userId: 'userId',
    role: 0,
  })
  .then(
    (success) => {
      console.log(success);
      return Promise.resolve(userId);
    },
    (error) => {
      console.log(error);
      return Promise.resolve(userId);
    },
  );
};

const getLocalUserInfo = (user) => {
  const userRef = firebase.database().ref('user');
  return userRef.child(user.uid).transaction((currentUserData) => {
    if (currentUserData === null) {
      return {
        description: 'A member of sharing community',
        name: user.displayName,
        role: 0,
      };
    }
    return currentUserData;
  }).then(result => Promise.resolve(result.snapshot.val()));
};

const signInWithFacebook = () => {
  const provider = new firebase.auth.FacebookAuthProvider();
  return firebase.auth().signInWithPopup(provider);
};

const signInWithGoogle = () => {
  const provider = new firebase.auth.GoogleAuthProvider();
  return firebase.auth().signInWithPopup(provider);
};

export default {
  getUserInfor,
  createNewUser,
  signInWithFacebook,
  signInWithGoogle,
  getLocalUserInfo,
};
