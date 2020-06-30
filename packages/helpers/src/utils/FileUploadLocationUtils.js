import {MinioFileLocationConstants} from '@frontend-appointment/web-resource-key-constants'

const {CLIENT_FILE_LOCATION} = MinioFileLocationConstants.minioFileLocationConstants
export const getLocationPathForDoctorFileUpload = (hospitalCode, doctorNMCNumber) => {
    return CLIENT_FILE_LOCATION + "/" + hospitalCode + "/doctor/" + doctorNMCNumber + new Date().getTime()
}
