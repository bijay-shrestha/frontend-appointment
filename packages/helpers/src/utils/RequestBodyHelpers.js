export const putObjectValueByKey = (keyArray, objValue) => {
  let newObj = {}
  keyArray.map(key => {
    newObj = {[key]: objValue[key]}
    return key
  })
  return newObj;
}
