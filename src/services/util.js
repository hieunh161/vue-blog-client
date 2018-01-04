const getItemListFromSnapshot = (snapshot) => {
  const result = [];
  snapshot.forEach((item) => {
    result.push({ key: item.key, value: item.val() });
  });
  return Promise.resolve(result);
};

const getListArticleFromSnap = (snapshot) => {
  const result = [];
  snapshot.forEach((item) => {
    let article = {};
    article = item.val();
    article.id = item.key;
    result.push(article);
  });
  return Promise.resolve(result);
};

export default {
  getItemListFromSnapshot,
  getListArticleFromSnap,
};
