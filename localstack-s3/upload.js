const AWS = require("aws-sdk");
// const fs = require('fs')

const KEY_ID = "nxserverless"
const SECRET_KEY = "nxserverless"

const BUCKET_NAME = "nxboy";

const s3 = new AWS.S3({
  region: "us-east-1",
  accessKeyId: KEY_ID,
  secretAccessKey: SECRET_KEY,
  endpoint: 'http://localhost:4566', // This is the localstack EDGE_PORT
  s3ForcePathStyle: true,
});

const params = {
  Bucket: BUCKET_NAME
}

s3.createBucket(params,(err, data)=>{
  if(err){
    console.log(err)
  }
  else{
    console.log("Bucket created successfully", data.Location);
  }
})

// const uploadFile = (filename) => {
//   const filecontent = fs.readFileSync(filename);

//   const params = {
//     Bucket: BUCKET_NAME,
//     Key: "",
//     Body: filecontent,
//     ContentType: ""
//   }

//   s3.upload(params,(err, data)=>{
//     if(err){
//       console.log(err)
//     }
//     else{
//       console.log("File uploaded successfully", data.Location)
//     }
//   })
// }

// uploadFile("")