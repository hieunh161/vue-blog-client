import * as firebase from 'firebase';

const CATEGORY_REF = 'category';

const createCategory = (category) => {
  const content = {
    title: category,
    createdDate: Date.now(),
    modified: Date.now(),
  };
  console.log(content);
  return firebase.database().ref(CATEGORY_REF).push(content);
};

const readCategory = () => firebase.database().ref(CATEGORY_REF).once('value', (snapshot) => {
  const result = [];
  snapshot.forEach((childSnapshot) => {
    const childKey = childSnapshot.key;
    const childData = childSnapshot.val();
    result.push({ key: childKey, data: childData });
  });
  console.log(result);
  return Promise.resolve(result);
});

const updateCategory = (category) => {
  console.log(category);
};

const deleteCategory = (category) => {
  console.log(category);
};

export default {
  createCategory,
  readCategory,
  updateCategory,
  deleteCategory,
};
