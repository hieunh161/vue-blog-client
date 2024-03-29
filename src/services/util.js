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

const getListArticleFromSnapExceptItem = (snapshot, exceptItem) => {
  const result = [];
  snapshot.forEach((item) => {
    let article = {};
    if (item.key !== exceptItem) {
      article = item.val();
      article.id = item.key;
      result.push(article);
    }
  });
  return Promise.resolve(result);
};

const slugify = (input, separator) => {
  if (!input) return '';
  const str = input
    .toLowerCase()
    .replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, 'a')
    .replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, 'e')
    .replace(/ì|í|ị|ỉ|ĩ/g, 'i')
    .replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, 'o')
    .replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, 'u')
    .replace(/ỳ|ý|ỵ|ỷ|ỹ/g, 'y')
    .replace(/đ/g, 'd')
    .replace(/\s+/g, '-')
    .replace(/[^A-Za-z0-9_-]/g, '')
    .replace(/-+/g, '-');
  if (separator) {
    return str.replace(/-/g, separator);
  }
  return str;
};

export default {
  getItemListFromSnapshot,
  getListArticleFromSnap,
  getListArticleFromSnapExceptItem,
  slugify,
};
