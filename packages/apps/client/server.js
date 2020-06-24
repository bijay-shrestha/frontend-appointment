const Minio = require("minio");

var client = new Minio.Client({
    // endPoint: 'play.min.io',
    // port: 9000,
    // useSSL: true,
    // accessKey: 'Q3AM3UQ867SPQQA43P2F',
    // secretKey: 'zuf+tfteSlswRu7BJ86wekitnifILbZam1KYY3TG'
  endPoint: "192.168.1.75",
  port: 9000,
  useSSL: false,
  accessKey: "minioadmin",
  secretKey: "minioadmin"
});

// Instantiate an `express` server and expose an endpoint called `/presignedUrl` as a `GET` request that
// accepts a filename through a query parameter called `name`. For the implementation of this endpoint,
// invoke [`presignedPutObject`](https://docs.min.io/docs/javascript-client-api-reference#presignedPutObject)
// on the `Minio.Client` instance to generate a pre-signed URL, and return that URL in the response:

// express is a small HTTP server wrapper, but this works with any HTTP server
const server = require("express")();

server.get("/presignedUrl", async (req, res) => {
  console.log("REquest quesry name", req.query);
  try {
    const url = await client.presignedPutObject("test-sabu", req.query.name, 60);
    console.log("URL", url)
    return res.status(200).send(url);
  } catch (e) {

  }
});

server.get("/getPresignedUrl",async (req,res)=>{
  try{
   const presignedUrl = await client.presignedUrl('GET', 'test-sabu', req.query.name, 60)
    console.log("Presigned",presignedUrl)
    return res.status(200).send(presignedUrl);
  }catch(e){

  }  
})



// server.get("/", (req, res) => {
//   res.sendFile(__dirname + "./public/index.html");
// });

server.listen(8080);
