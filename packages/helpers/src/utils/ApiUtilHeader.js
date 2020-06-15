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
    if (_stringParam) return path + '?' + _stringParam
  }
  return path
}

export const getIntegrationValue = type => {
  const integrate = localStorageSecurity.localStorageDecoder('adminInfo')
  return integrate[type]
}

export const putObjectValueByKey = (keyArray, objValue) => {
  let newObj = {}
  keyArray.map(key => {
    newObj = {...newObj,[key]: objValue[key]}
    return key
  })
  return newObj
}

export const constructApiFromEcIntegration = (
  featureTypeCode,
  integratedData,
  dataPassed
) => {
  let option = {}
  integratedData.features.map(feature => {
    const {apiInfo,featureCode,integrationChannelCode}=feature;
    if(checkIntegrationChannelIsFrontend(integrationChannelCode)){
      option = constructOptionForApi(apiInfo,featureTypeCode,featureCode,dataPassed)
      option.integrationChannelCode=integrationChannelCode
    }
    else{
      option.integrationChannelCode=integrationChannelCode
    }
    return feature
  })
  return option
}

export const checkIntegrationChannelIsFrontend = integrationChannelType =>
  integrationChannelType === 'BACK' ? false : true

export const constructOptionForApi = (apiInfo, featureTypeCode,featureCode, dataPassed) => {
  let option=null,data = null
  const {
    requestMethod,
    requestBody,
    headers,
    queryParameters,
    url
  } = apiInfo
  const method = requestMethod.toLowerCase()
  const urlWithParams = convertObjectToRequestParam(url, queryParameters)
  if (featureTypeCode === featureCode)
    if (method.includes('post')) {
      data=putObjectValueByKey(requestBody,dataPassed)
    }
    option=constructOption(method,headers,urlWithParams,data);

  return {requestOption:option};
}

const constructOption = (method, headers, urlWithParams, data) => {
  return method.includes('post')
    ? {
        method,
        headers: {...headers},
        url: urlWithParams,
        withCredentials: false,
        data
      }
    : {
        method,
        headers,
        url: urlWithParams,
        withCredentials: false
      }
}
