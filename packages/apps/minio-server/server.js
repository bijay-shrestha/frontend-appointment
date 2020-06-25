const server = require("express")();

const cors = require('cors')
const allowedOrigins = [
    'http://localhost:3301',
    'http://localhost:3302',
    'https://uat-client-appointment.cogenthealth.com.np',
    'https://uat-admin-appointment.cogenthealth.com.np'
]
server.use(cors({
    origin: (origin, callback) => {
        // allow requests with no origin
        // (like mobile apps or curl requests)
        if (!origin) return callback(null, true)
        console.log(origin);
        if (allowedOrigins.indexOf(origin) === -1) {
            const msg = 'The CORS policy for this site does not ' +
                'allow access from the specified Origin.';
            return callback(new Error(msg), false)
        }
        return callback(null, true)
    }
}));

const client = require('./startup/MinioClient')()

const configGetter = require('./utils/MinioConfigGetter')

server.get("/presignedUrl", async (req, res) => {
    try {
        const url = await client.presignedPutObject(configGetter('minio-bucket'), req.query.name,
            configGetter('minio-expiry'));
        console.log("URL", url)
        return res.status(200).send(url);
    } catch (e) {

    }
});

server.get("/getPresignedUrl", async (req, res) => {
    try {
        const presignedUrl = await client.presignedUrl('GET', configGetter('minio-bucket'), req.query.name,
            configGetter('minio-expiry'))
        console.log("Presigned", presignedUrl)
        return res.status(200).send(presignedUrl);
    } catch (e) {

    }
})

server.get("/getObjectFromMinio", async (req, res) => {
    try {
        return await client.getObject(configGetter('minio-bucket'), req.query.fileUri);
    } catch (e) {
        throw e
    }
})

// server.get("/", (req, res) => {
//   res.sendFile(__dirname + "./public/index.html");
// });

server.listen(8080);
