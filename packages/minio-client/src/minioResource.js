import Axios from 'axios';

const MINIO_SERVER_BASE_URL = process.env.REACT_APP_MINIO_SERVER_BASE_URL || '';

export const getPresignedUrlForPutOperation = async (fileName) => {
    try {
        let presignedUrl = await Axios.get(`${MINIO_SERVER_BASE_URL}/presignedUrl?name=${fileName}`)
        return presignedUrl;
    } catch (e) {
        console.log("PRESIGNED PUT ERROR:::::::", e)
        throw e
    }
}

export const getPresignedUrlForImage = async (fileName) => {
    try {
        let url = await Axios.get(`${MINIO_SERVER_BASE_URL}/getPresignedUrl?name=${fileName}`);
        return url.data;
    } catch (e) {
        console.log("PRESIGNED GET ERROR:::::::", e)
        throw e
    }
}

export const getObjectFromMinio = async (fileUri) => {
    try {
        let url = await Axios.get(`${MINIO_SERVER_BASE_URL}/getObjectFromMinio?fileUri=${fileUri}`);
        return url;
    } catch (e) {
        console.log("PRESIGNED GET OBJECT ERROR:::::::", e)
        throw e
    }
}


export const getPartialObjectFromMinio = async (fileUri) => {
    try {
        let url = await Axios.get(`${MINIO_SERVER_BASE_URL}/getPartialObject?fileUri=${fileUri}`);
        return url;
    } catch (e) {
        console.log("PRESIGNED GET OBJECT ERROR:::::::", e)
        throw e
    }
}

export const uploadFileToMinioServerAtGivenLocation = async (file, fileLocation) => {
    try {
        const urlToUpload = await getPresignedUrlForPutOperation(fileLocation.concat("/").concat(file.name));
        await Axios.put(urlToUpload.data, file)
        return (fileLocation + "/" + file.name)
    } catch (e) {
        throw e
    }
}

export const getObjects = async () => {
    try {
        let url = await Axios.get(`${MINIO_SERVER_BASE_URL}/getObjects`);
        return url;
    } catch (e) {
        console.log("PRESIGNED GET OBJECT ERROR:::::::", e)
        throw e
    }
}

