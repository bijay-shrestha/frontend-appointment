import {localStorageSecurity} from './localStorageUtils'
import {EnvironmentVariableGetter} from './index'

const {REACT_APP_MODULE_CODE, CLIENT_MODULE_CODE} = EnvironmentVariableGetter;

const convertObjectToRequestParam = (path, paramObject) => {
    if (paramObject) {
        let _stringParam = ''
        let _arrayOfKeyAndValue = Object.entries(paramObject)

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
        newObj = {...newObj, [key]: objValue[key]}
        return key
    })
    return newObj
}

export const findIfUrlContainsPathVariableAndReplaceWithValue = (url, pathVariablePattern, value) => {
    if (url.includes(pathVariablePattern)) {
        return url.replace(pathVariablePattern, value);
    }
    return url;
}

// export const constructApiFromEcIntegration = (
//     featureTypeCode,
//     integratedData,
//     dataPassed
// ) => {
//     let option = {}
//     integratedData.features.map(feature => {
//         const {apiInfo, featureCode, integrationChannelCode} = feature;
//         if (checkIntegrationChannelIsFrontend(integrationChannelCode)) {
//             option = constructOptionForApi(apiInfo, featureTypeCode, featureCode, dataPassed)
//             option.integrationChannelCode = integrationChannelCode
//         } else {
//             option.integrationChannelCode = integrationChannelCode
//         }
//         return feature
//     })
//     return option
// }

export const constructApiFromEcIntegration = (
    featureTypeCode,
    currentIntegratedFeature,
    dataPassed
) => {
    let option
    const {apiInfo, featureCode, integrationChannelCode} = currentIntegratedFeature;
    option = constructOptionForApi(apiInfo, featureTypeCode, featureCode, dataPassed)
    option.integrationChannelCode = integrationChannelCode

    return option
}

export const checkIntegrationChannelIsFrontend = integrationChannelType => integrationChannelType === 'BACK' ? false : true

export const constructOptionForApi = (apiInfo, featureTypeCode, featureCode, dataPassed) => {
    let option, data = null
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
        if (method.includes('post') || method.includes('put')) {
            data = putObjectValueByKey(requestBody, dataPassed)
        }
    option = constructOption(method, headers, urlWithParams, data);

    return {requestOption: option};
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


const getCurrentFeatureIntegrationDetails = (apiIntegrateData, featureTypeCode) => {
    return apiIntegrateData.features.find(feature => feature.featureCode === featureTypeCode)
}

export const getCurrentClientFeatureApiIntegrationDetails = (integrationType, featureTypeCode, clientId) => {
    let isClientModule = REACT_APP_MODULE_CODE === CLIENT_MODULE_CODE;
    let currentFeatureApiIntegrationDetails
    const apiIntegrateData = getIntegrationValue('apiIntegration')[integrationType]
    if (isClientModule) {
        currentFeatureApiIntegrationDetails = apiIntegrateData.length && getCurrentFeatureIntegrationDetails(apiIntegrateData[0], featureTypeCode)
    } else {
        const selectedClientApiIntegrationDetails = apiIntegrateData.length && apiIntegrateData.find(apiIntegration =>
            apiIntegration.clientId === clientId);
        currentFeatureApiIntegrationDetails = selectedClientApiIntegrationDetails && getCurrentFeatureIntegrationDetails(
            selectedClientApiIntegrationDetails, featureTypeCode)
    }
    return currentFeatureApiIntegrationDetails
}

export const getCurrentAppointmentModeFeatureApiIntegrationDetails = (integrationType,
                                                                      featureTypeCode,
                                                                      appointmentModeId,
                                                                      pathVariablePattern,
                                                                      pathVariableValue) => {
    // let isClientModule = REACT_APP_MODULE_CODE === CLIENT_MODULE_CODE;
    let currentFeatureApiIntegrationDetails
    const apiIntegrateData = getIntegrationValue('apiIntegration')[integrationType]
    // if (isClientModule) {
    //     currentFeatureApiIntegrationDetails = apiIntegrateData.length && getCurrentFeatureIntegrationDetails(apiIntegrateData[0], featureTypeCode)
    // } else {
    const selectedAppointmentModeApiIntegrationDetails = apiIntegrateData.length && apiIntegrateData.find(apiIntegration =>
        apiIntegration.appointmentModeId === appointmentModeId);
    currentFeatureApiIntegrationDetails = selectedAppointmentModeApiIntegrationDetails && getCurrentFeatureIntegrationDetails(
        selectedAppointmentModeApiIntegrationDetails, featureTypeCode)
    // }
    if (currentFeatureApiIntegrationDetails && checkIntegrationChannelIsFrontend(currentFeatureApiIntegrationDetails.integrationChannelCode)) {
        let apiUrl = currentFeatureApiIntegrationDetails.apiInfo.url;
        currentFeatureApiIntegrationDetails.apiInfo.url = apiUrl ?
            findIfUrlContainsPathVariableAndReplaceWithValue(apiUrl, pathVariablePattern, pathVariableValue) : apiUrl
    }
    return currentFeatureApiIntegrationDetails
}

