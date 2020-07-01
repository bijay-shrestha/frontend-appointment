import {APIUtils} from '@frontend-appointment/helpers'
import {Axios} from '@frontend-appointment/core'
import {fetchHmacTokenByAppointmentId} from '../hmac-middleware/hmacMiddleware';

export const genericThirdPartyApiCall = async (data,
                                               featureTypeCode,
                                               integrationType,
                                               clientId,
                                               constructedData,
                                               pathVariablePattern,
                                               pathVariableValue,
                                               hmacPath) => {

    let currentFeatureApiIntegrationDetails = integrationType.substring(0, 3) === "e-c" ?
        APIUtils.getCurrentClientFeatureApiIntegrationDetails(integrationType, featureTypeCode, clientId) :
        APIUtils.getCurrentAppointmentModeFeatureApiIntegrationDetails(
            integrationType,
            featureTypeCode,
            data.appointmentModeId,
            pathVariablePattern,
            pathVariableValue,
            hmacPath,
            clientId)

    let apiRequestBody = {
        featureCode: currentFeatureApiIntegrationDetails ?
            currentFeatureApiIntegrationDetails.featureCode : null,
        integrationChannelCode: currentFeatureApiIntegrationDetails ?
            currentFeatureApiIntegrationDetails.integrationChannelCode : null
    }
    if (currentFeatureApiIntegrationDetails &&
        APIUtils.checkIntegrationChannelIsFrontend(currentFeatureApiIntegrationDetails.integrationChannelCode)) {
        /********************************* CONSTRUCT AND EXECUTE API ***************************************************/
        let option = APIUtils.constructApiFromEcIntegration(
            featureTypeCode,
            currentFeatureApiIntegrationDetails,
            constructedData)
        let response = null;
        try {
            if (option) {
                if(featureTypeCode==='REFUND'){
                const hmacCode = await fetchHmacTokenByAppointmentId(hmacPath, constructedData.properties.appointmentId)
                option.requestOption.headers.signature = hmacCode;
                }
                console.log("====option",option)
                response = await Axios.dynamicMethod(option.requestOption)
                return {successResponse: response.data, apiRequestBody};
            }
        } catch (e) {
            throw e;
        }
        /***************************************************************************************************************/
    }
    return {successResponse: null, apiRequestBody}
}
