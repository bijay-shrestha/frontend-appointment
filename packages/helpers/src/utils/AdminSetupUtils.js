import {EnvironmentVariableGetter} from "./index";

export const addRemoveMacAddressObject = (hasMacBinding, macIdList) => {
    let tempArray = [...macIdList];
    if (hasMacBinding) {
        let macObj = {
            id: '',
            macId: '',
            errorMessage: '',
            isNew: true,
            status: 'Y'
        };
        tempArray.push(macObj);
    } else {
        tempArray = [];
    }
    return tempArray;
};

// export const getModuleAndProfileData = adminProfileResponseDTOS => {
//     return adminProfileResponseDTOS.map(module => {
//         return {
//             adminProfileId: module.adminProfileId,
//             id: module.applicationModuleId,
//             name: module.applicationModuleName,
//             isChecked: true,
//             isNew: false,
//             profileSelected: {label: module.profileName, value: module.profileId},
//             profileList: []
//         }
//     });
// };

export const getMacAddresses = (macAddressInfoResponseDTOS) => {
    return macAddressInfoResponseDTOS.map(macAdd => ({
        id: macAdd.id,
        macId: macAdd.macAddress,
        errorMessage: '',
        isNew: false,
        status: 'Y'
    }));
};

export const getBaseUrlForEmail = (hospitalList, hospital) => {
    let selectedHospital = hospitalList.find(dropdownData => dropdownData.value === hospital.value);
    let isCompany = Object.keys(selectedHospital).includes('isCompany') ? selectedHospital.isCompany : 'N';
    return isCompany === 'Y' ?
        EnvironmentVariableGetter.ADMIN_EMAIL_REDIRECT_URL :
        EnvironmentVariableGetter.CLIENT_EMAIL_REDIRECT_URL
    // EnvironmentVariableGetter.ADMIN_EMAIL_REDIRECT_URL.concat(":".concat(EnvironmentVariableGetter.ADMIN_PORT)) :
    // EnvironmentVariableGetter.CLIENT_EMAIL_REDIRECT_URL.concat(":".concat(EnvironmentVariableGetter.CLIENT_PORT));
};
