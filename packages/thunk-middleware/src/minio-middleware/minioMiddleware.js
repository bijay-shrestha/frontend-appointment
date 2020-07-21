import {Axios} from '@frontend-appointment/core'
import {CommonAPIConstants} from '@frontend-appointment/web-resource-key-constants'

const {FILE_UPLOAD_PATH, FILE_PRE_SIGNED_URI_FOR_DISPLAY, FILE_URI_FOR_DISPLAY} = CommonAPIConstants.FileResourceConstants

export const fetchPresignedUrlForGetOperation = async (fileUri) => {
    try {
        if (fileUri.split("/")[0] === "private") {
            const response = await Axios.put(FILE_PRE_SIGNED_URI_FOR_DISPLAY, {fileName: fileUri});
            return response.data
        } else
            return fileUri
    } catch (e) {
        console.log("IMAGE NOT FETCHED", e)
        // throw e
    }
}

export const fetchUrlForGetOperation = async (fileUri) => {
    try {
        if (fileUri.split("/")[0] === "private") {
            const response = await Axios.getWithRequestParams(FILE_URI_FOR_DISPLAY, {fileUri: fileUri});
            return response.data
        } else
            return fileUri
    } catch (e) {
        console.log("IMAGE NOT FETCHED", e)
        // throw e
    }
}

export const fetchPresignedUrlForPutOperation = async (path, data) => {
    try {
        const response = await Axios.put(path, data);
        return response.data
    } catch (e) {
        console.log("IMAGE NOT FETCHED", e)
        // throw e
    }
}

export const uploadImageInMinioServer = async (file, fileLocation) => {
    try {
        let url = await fetchPresignedUrlForPutOperation(FILE_UPLOAD_PATH, {fileName: fileLocation + "/" + file.name})
        await Axios.putMultipart(url, file)
        return fileLocation + "/" + file.name
    } catch (e) {
        throw e
    }
}

export const getDataListWithPresignedFileUri = async (dataList, imageFieldName) => {
    let dataWithPresignedImage = dataList.map(async data => {
        data[imageFieldName] = data[imageFieldName] && await fetchPresignedUrlForGetOperation(data[imageFieldName])
        return data
    })
    return Promise.all(dataWithPresignedImage)
}

export const getDataListWithFileUri = async (dataList, imageFieldName) => {
    let dataWithImageURl = dataList.map(async data => {
        data[imageFieldName] = await fetchUrlForGetOperation(FILE_URI_FOR_DISPLAY, data[imageFieldName])
        return data
    })
    return Promise.all(dataWithImageURl)
}

