
module.exports = (object) => {
  let paramsString = '';
  for (key in object) {
    if (object[key]) {
      paramsString += `${key}=${object[key]}&`;
    }
  }
  return paramsString;
}