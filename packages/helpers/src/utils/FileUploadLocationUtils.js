import {MinioFileLocationConstants} from '@frontend-appointment/web-resource-key-constants'

const {CLIENT_FILE_LOCATION,COMPANY_FILE_LOCATION} = MinioFileLocationConstants.minioFileLocationConstants
export const getLocationPathForDoctorFileUpload = (hospitalCode, doctorNMCNumber) => {
    return CLIENT_FILE_LOCATION + "/" + hospitalCode + "/doctor/" + doctorNMCNumber + new Date().getTime()
}

export const getLocationPathForClientAdminFileUpload = (hospitalCode, fullName) => {
    return CLIENT_FILE_LOCATION + "/" + hospitalCode + "/admin/" + fullName + new Date().getTime()
}

export const getLocationPathForCompanyAdminFileUpload = (companyCode, fullName) => {
    return COMPANY_FILE_LOCATION + "/" + companyCode + "/admin/" + fullName + new Date().getTime()
}

export const getLocationPathForClientImageUpload = (hospitalCode,directoryName) => {
    return CLIENT_FILE_LOCATION + "/" + hospitalCode + "/" + directoryName
}

export const getLocationPathForCompanyImageUpload = (companyCode,directoryName) => {
    return COMPANY_FILE_LOCATION + "/" + companyCode + "/" + directoryName
}
