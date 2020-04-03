import {LocalStorageSecurity} from "./index";

export const saveLoggedInAdminInfo = (adminInfo) => {
    LocalStorageSecurity.localStorageEncoder('adminInfo', adminInfo);
};
