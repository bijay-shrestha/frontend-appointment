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
