import Minio from 'minio'
import {MINIO_ACCESS_KEY,MINIO_BUCKET,MINIO_ENDPOINT,MINIO_EXPIRY_TIME,MINIO_SECRET_KEY,MINIO_SSL_FLAG,MINIO_PORT} from './EnvironmentVariableGetter'
const minio = new Minio.Client({
  endPoint: MINIO_ENDPOINT,
  port:process.env.NODE_ENV==='production'?'':MINIO_PORT,
  useSSL: MINIO_SSL_FLAG,
  accessKey: MINIO_ACCESS_KEY,
  secretKey: MINIO_SECRET_KEY
});


export const getPresignedPutUrl = async (subDirectory,name) =>{
    try {
        const url = await minio.presignedPutObject(`${MINIO_BUCKET}`,`${subDirectory}/${name}`, MINIO_EXPIRY_TIME);
        console.log("URL", url)
        return url;
  } catch (e) {
    throw e
  }

}

export const getPresignedGetUrl = async (subDirectory,name) =>{
    try{
        const presignedUrl = await minio.presignedUrl('GET', `${MINIO_BUCKET}`, `${subDirectory}/${name}`, MINIO_EXPIRY_TIME)
        console.log("Presigned",presignedUrl)
        return presignedUrl;
  }catch(e){
     throw e;
  }
}
