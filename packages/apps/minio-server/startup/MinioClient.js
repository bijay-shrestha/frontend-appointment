const Minio = require('minio');
const configGetter = require('../utils/MinioConfigGetter')

module.exports = () => {
    let minioPort = configGetter("minio-port");
    // console.log("Minio port",minioPort);
    try {
        const client = new Minio.Client({
            endPoint: configGetter("minio-endpoint"),
            port: minioPort ? minioPort : '',
            useSSL: configGetter("minio-use-ssl") === "false" ? false : true,
            accessKey: configGetter("minio-access-key"),
            secretKey: configGetter("minio-secret-key")
        });
        return client;
    } catch (e) {
        console.log(e);
    }
}
