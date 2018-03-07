const save = (key, value) => {
  window.localStorage.setItem(key, JSON.stringify(value));
};

const remove = key => window.localStorage.removeItem(key);

const get = key => JSON.parse(window.localStorage.getItem(key));

export default {
  save,
  remove,
  get,
};

