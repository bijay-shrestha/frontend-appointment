import Axios from 'axios';

export const getPresignedUrlForPutOperation = async (fileName) => {
    try {
        let presignedUrl = await Axios.get(`http://localhost:8080/presignedUrl?name=${file}`)
        return presignedUrl;
    }catch (e) {
        console.log("PRESIGNED PUT ERROR:::::::",e)
        throw e
    }
}

export const getPresignedUrlForImage = async (fileName) => {
    try {
        let url =  await Axios.get(`http://localhost:8080/getPresignedUrl?name=${fileName}`);
        return url;
    }catch (e) {
        console.log("PRESIGNED GET ERROR:::::::",e)
        throw e
    }
}

export const getObjectFromMinio = async (fileUri) => {
    try {
        let url =  await Axios.get(`http://localhost:8080/getObjectFromMinio?fileUri=${fileUri}`);
        return url;
    }catch (e) {
        console.log("PRESIGNED GET OBJECT ERROR:::::::",e)
        throw e
    }
}
