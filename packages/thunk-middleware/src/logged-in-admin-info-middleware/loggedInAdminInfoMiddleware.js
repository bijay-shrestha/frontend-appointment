import {Axios} from "@frontend-appointment/core";
import {LoggedInAdminInfoActions} from "@frontend-appointment/action-module";
import {AdminInfoUtils} from "@frontend-appointment/helpers";
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
       const adminIp = await axios.get("https://www.cloudflare.com/cdn-cgi/trace");
       console.log(adminIp.data)
       const splittedData = adminIp.data.split(/\n/)
       const splitAdminIp = splittedData[2].split('=')
       return splitAdminIp[1];
    }catch(e){
     console.log(e);
    }
}