module.exports = (object) => {
  let paramsString = '';
  for (let key in object) {
    if (object[key]) {
      paramsString += `${key}=${object[key]}&`;
    }
  }
  return paramsString;
};
