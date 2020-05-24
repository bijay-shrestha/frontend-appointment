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
    if(_stringParam)
    return path + '?' + _stringParam 
  }
  return path;
}

export const formApiFromECIntegrate = (featureTypeCode, type) => {
  const getApiIntegrate = localStorageSecurity.localStorageDecoder('adminInfo')
  const integrateApi = getApiIntegrate[type]
  //let apiFormed =[];
  let option = null
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
    const method= requestMethod.toLowerCase();
    const urlWithParams = convertObjectToRequestParam(url, '')
    if (featureCode === featureTypeCode)
     if(method.includes('post'))
      option = {
        method,
        headers: {...headers},
        data:JSON.parse(requestBody),
        url: urlWithParams,
        withCredentials:false
       
      }
     else
      option={
       method,
       headers,
       url:urlWithParams,
       withCredentials:false,
      } 
    return feature
  })
  return option
}
