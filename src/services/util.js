export const getItemListFromSnapshot = (snapshot) => {
  const result = [];
  snapshot.forEach((item) => {
    result.push({ key: item.key, value: item.val() });
  });
  return Promise.resolve(result);
};

export default getItemListFromSnapshot;
