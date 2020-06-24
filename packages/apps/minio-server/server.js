const Minio = require("minio");

const server = require("express")();

var client = new Minio.Client({
    endPoint: "192.168.1.75",
    port: 9000,
    useSSL: false,
    accessKey: "minioadmin",
    secretKey: "minioadmin"
});


server.get("/presignedUrl", async (req, res) => {
    try {
        const url = await client.presignedPutObject("test-sabu", req.query.name, 60);
        console.log("URL", url)
        return res.status(200).send(url);
    } catch (e) {

    }
});

server.get("/getPresignedUrl", async (req, res) => {
    try {
        const presignedUrl = await client.presignedUrl('GET', 'test-sabu', req.query.name, 60)
        console.log("Presigned", presignedUrl)
        return res.status(200).send(presignedUrl);
    } catch (e) {

    }
})

server.get("/getObjectFromMinio", async (req, res) => {
    console.log("request================",req.query)
    try {
        let res = await client.getObject("test-sabu", req.query.fileUri);
        console.log("Response=============",res);
        return res;
    } catch (e) {
        throw e
    }
})

// server.get("/", (req, res) => {
//   res.sendFile(__dirname + "./public/index.html");
// });

server.listen(8080);
