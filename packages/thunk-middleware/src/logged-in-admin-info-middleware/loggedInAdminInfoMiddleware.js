import {Axios} from "@frontend-appointment/core";
import {LoggedInAdminInfoActions} from "@frontend-appointment/action-module";
import {AdminInfoUtils, EnvironmentVariableGetter, LocalStorageSecurity} from "@frontend-appointment/helpers";
import axios from 'axios'
import {MinioMiddleware} from '../../index'

export const fetchLoggedInAdminUserInfo = (path, data) => async dispatch => {
    dispatch(LoggedInAdminInfoActions.loggedInAdminInfoFetchPending());
    try {
        let adminInfoResponse = await Axios.put(path, data);
        let dataWithFileUri = adminInfoResponse.data
        dataWithFileUri.fileLocation = dataWithFileUri.fileUri
        dataWithFileUri.fileUri = await MinioMiddleware.fetchPresignedUrlForGetOperation(dataWithFileUri.fileUri)
        await AdminInfoUtils.saveLoggedInAdminInfo(dataWithFileUri);
        dispatch(LoggedInAdminInfoActions.loggedInAdminInfoFetchSuccess(dataWithFileUri));
        return adminInfoResponse.data;
    } catch (e) {
        dispatch(LoggedInAdminInfoActions.loggedInAdminInfoFetchError(e));
    }
};

export const fetchLoggedInAdminIP = () => async () => {
    try {
        //const url1='https://www.cloudflare.com/cdn-cgi/trace'
        const apiKey = EnvironmentVariableGetter.IP_API_KEY;
        // console.log("api key",apiKey)
        const url = " https://api.ipdata.co/?api-key=" + apiKey
        const adminIp = await axios.get(url);
        return adminIp.data.ip;
    } catch (e) {
        console.log(e);
    }
}

export const uploadLoggedInAdminImage = async (path, data) => {
    try {
        await Axios.put(path, data);
        let adminData = LocalStorageSecurity.localStorageDecoder('adminInfo');
        adminData.fileUri = await MinioMiddleware.fetchUrlForGetOperation(data.avatar)
        await AdminInfoUtils.saveLoggedInAdminInfo(adminData);
        return true
    } catch (e) {
        throw e
    }
}
