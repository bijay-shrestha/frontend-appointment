import {APIUtils} from '@frontend-appointment/helpers'
import {Axios} from '@frontend-appointment/core'


export const genericThirdPartyApiCall = async (data, featureTypeCode, integrationType, clientId, constructedData) => {
    let currentFeatureApiIntegrationDetails = APIUtils.getCurrentFeatureApiIntegrationDetails(integrationType, featureTypeCode, clientId)
    let apiRequestBody = {
        featureCode: currentFeatureApiIntegrationDetails ?
            currentFeatureApiIntegrationDetails.featureCode : null,
        integrationChannelCode: currentFeatureApiIntegrationDetails ?
            currentFeatureApiIntegrationDetails.integrationChannelCode : null
    }
    if (currentFeatureApiIntegrationDetails &&
        APIUtils.checkIntegrationChannelIsFrontend(currentFeatureApiIntegrationDetails.integrationChannelCode)) {
        /********************************* CONSTRUCT AND EXECUTE API ***************************************************/
        const option = APIUtils.constructApiFromEcIntegration(
            featureTypeCode, currentFeatureApiIntegrationDetails, constructedData)
        let response = null;
        try {
            if (option) {
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
