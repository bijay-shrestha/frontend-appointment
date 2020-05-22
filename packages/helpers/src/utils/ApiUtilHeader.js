import {localStorageSecurity} from './localStorageUtils'

const convertObjectToRequestParam = (path, paramObject) => {
  if (paramObject) {
    let _stringParam = ''
    let _arrayOfKeyAndValue = Object.entries(paramObject)
    console.log('====', _arrayOfKeyAndValue)
    let _arrayLength = _arrayOfKeyAndValue.length - 1
    _arrayOfKeyAndValue.forEach((value, key) => {
      _stringParam = _stringParam + value[0] + '=' + value[1]
      if (key !== _arrayLength) {
        _stringParam = _stringParam + '&'
      }
    })
    return path + '?' + _stringParam
  }
  return path;
}

export const formApiFromECIntegrate = (featureTypeCode, type) => {
  const getApiIntegrate = localStorageSecurity.localStorageDecoder('adminInfo')
  const integrateApi = getApiIntegrate[type]
  //let apiFormed =[];
  let option = {}
  integrateApi.features.map(feature => {
    const {
      featureCode,
      requestMethod,
      requestBody,
      headers,
      queryParameters,
      url
    } = feature
    console.log('requestBody', requestBody)
    const data = requestBody
    const urlWithParams = convertObjectToRequestParam(url, queryParameters)
    if (featureCode === featureTypeCode)
      option = {
        method: requestMethod,
        headers: {...headers},
        data,
        url: urlWithParams
      }
    return feature
  })
  return option
}
