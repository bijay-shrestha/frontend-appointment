import {Axios} from "@frontend-appointment/core";
import {LoggedInAdminInfoActions} from "@frontend-appointment/action-module";
import {AdminInfoUtils,EnvironmentVariableGetter} from "@frontend-appointment/helpers";
import axios from 'axios'

export const fetchLoggedInAdminUserInfo = (path, data) => async dispatch => {
    dispatch(LoggedInAdminInfoActions.loggedInAdminInfoFetchPending());
    try {
        let adminInfoResponse = await Axios.put(path, data);
        await AdminInfoUtils.saveLoggedInAdminInfo(adminInfoResponse.data);
        dispatch(LoggedInAdminInfoActions.loggedInAdminInfoFetchSuccess(adminInfoResponse.data));
        return adminInfoResponse.data;
    } catch (e) {
        dispatch(LoggedInAdminInfoActions.loggedInAdminInfoFetchError(e));
    }
};

export const fetchLoggedInAdminIP = () => async () => {
    try{
       //const url1='https://www.cloudflare.com/cdn-cgi/trace'
       const apiKey = EnvironmentVariableGetter.IP_API_KEY;
       console.log("api key",apiKey)
       const url = "http://api.ipstack.com/check?access_key="+apiKey
       const adminIp = await axios.get(url);
       return adminIp.data.ip;
    }catch(e){
     console.log(e);
    }
}