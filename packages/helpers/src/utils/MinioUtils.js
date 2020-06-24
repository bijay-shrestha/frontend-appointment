import {
    MINIO_BUCKET,
    MINIO_EXPIRY_TIME,
    // MINIO_ENDPOINT,
    // MINIO_PORT,
    // MINIO_ACCESS_KEY,
    // MINIO_SECRET_KEY,
    // MINIO_SSL_FLAG
} from './EnvironmentVariableGetter'

var Minio = require('minio');

var minio = new Minio.Client({
    endPoint: "192.168.175",
    port: 9000,
    // port: process.env.NODE_ENV === 'production' ? '' : MINIO_PORT,
    useSSL: false,
    accessKey: "minioadmin",
    secretKey: 'minioadmin'
});

const minioResponse = (url, subDirectory, fileName) => (
    {
        url,
        fileLocation: subDirectory + "/" + fileName
    })

export const getPresignedPutUrl = async (subDirectory, fileName) => {
    console.log("MINIO BUCKET+++++++++", MINIO_BUCKET)
    console.log("MINIO_BUCKET==========", `${MINIO_BUCKET}`)
    try {
        const url = await minio.presignedPutObject("cogent-appointment", `${subDirectory}/${fileName}`, Number(MINIO_EXPIRY_TIME));
        return minioResponse(url, subDirectory, fileName);
    } catch (e) {
        throw e
    }
}

export const getPresignedGetUrl = async (fileUri) => {
    try {
        return await minio.presignedUrl('GET', MINIO_BUCKET, fileUri, Number(MINIO_EXPIRY_TIME));
    } catch (e) {
        throw e
    }
}

export const getObjectFromMinio = async (fileUri) => {
    try {
        return await minio.getObject(MINIO_BUCKET, fileUri);
    } catch (e) {
        throw e
    }
}
