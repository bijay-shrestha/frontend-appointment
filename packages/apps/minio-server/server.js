const server = require("express")();

const compression = require("compression");

const cors = require('cors')
const allowedOrigins = [
    'http://localhost:3301',
    'http://localhost:3302',
    'https://uat-client-appointment.cogenthealth.com.np',
    'https://uat-admin-appointment.cogenthealth.com.np',
    'http://uat-admin.kube.cogenthealth.com.np',
    'http://uat-client.kube.cogenthealth.com.np'
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

server.use(compression())

const client = require('./startup/MinioClient')()

const configGetter = require('./utils/MinioConfigGetter')

server.get("/presignedUrl", async (req, res) => {
    try {
        const url = await client.presignedPutObject(configGetter('minio-bucket'), req.query.name,
            configGetter('minio-expiry'));
        // console.log("URL", url)
        return res.status(200).send(url);
    } catch (e) {

    }
});

server.get("/getPresignedUrl", async (req, res) => {
    try {
        const presignedUrl = await client.presignedUrl('GET', configGetter('minio-bucket'), req.query.name,
            configGetter('minio-expiry'))
        // console.log("Presigned", presignedUrl)
        return res.status(200).send(presignedUrl);
    } catch (e) {

    }
})

server.get("/getObjectFromMinio", async (req, res) => {
    try {
        let data = await client.getObject(configGetter('minio-bucket'), req.query.fileUri);
        if (data) {
            res.status(200);
            res.set({
                'Cache-Control': 'no-cache',
                'Content-Type': data.content_type,
                'Content-Length': data.file_length,
                'Content-Disposition': 'attachment; filename=' + data.file_name
            });
            data.pipe(res);
        } else {
            res.status(404).end();
        }
    } catch (e) {
        console.log("GET OBJECT ERROR", e, req.query.fileUri)
        // throw e
    }
})

server.get("/getPartialObject", async (req, res) => {
    try {
        let data = await client.getPartialObject(configGetter('minio-bucket'), req.query.fileUri,10,30);
        if (data) {
            res.status(200);
            res.set({
                'Cache-Control': 'no-cache',
                'Content-Type': data.content_type,
                'Content-Length': data.file_length,
                'Content-Disposition': 'attachment; filename=' + data.file_name
            });
            data.pipe(res);
        } else {
            res.status(404).end();
        }
    } catch (e) {
        console.log("GET OBJECT ERROR", e, req.query.fileUri)
        // throw e
    }
})

server.get('/getObjects', async (req, res) => {
    const stream = client.listObjects(configGetter('minio-bucket'), '', true)
    stream.on('data', function (obj) {
        console.log(obj)
    })
    stream.on('error', function (err) {
        console.log(err)
    })
})

// server.get("/", (req, res) => {
//   res.sendFile(__dirname + "./public/index.html");
// });

server.listen(8080);
