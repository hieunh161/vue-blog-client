import * as firebase from 'firebase';
// import * as uuidv4 from 'uuid/v4';

const getUserInfor = (userId) => {
  const ref = firebase.database().ref('user').child(userId);
  return ref.once('value').then((snapshot) => {
    console.log(snapshot.val());
    return Promise.resolve(snapshot.val());
  });
};

const createNewUser = (metaData) => {
  console.log(metaData);
  const userId = metaData.userId;
  return firebase.database().ref('article').child(userId).set({
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

export default {
  getUserInfor,
  createNewUser,
};
