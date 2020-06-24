const Minio = require('minio');
const configGetter = require('../utils/MinioConfigGetter')
module.exports= () => {

    try{
    const client = new Minio.Client({
        endPoint: configGetter("minio-endpoint"),
        port: configGetter("minio-port"),
        useSSL: configGetter("minio-use-ssl")==="false"?false:true,
        accessKey: configGetter("minio-access-key"),
        secretKey:configGetter("minio-secret-key")
    });
    return client;
  }catch(e){
      console.log(e);
  }
}