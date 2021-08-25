import AWS from "aws-sdk";
import { s3DeleteDir } from "@zvs001/s3-utils";

// AWS Login
AWS.config.update({
  credentials: {
    accessKeyId: process.env.AWS_KEY,
    secretAccessKey: process.env.AWS_SECRET,
  },
});

let S3 = new AWS.S3();

// upload file functoin
export const uploadToS3 = async (file, id, folderName) => {
  const { filename, createReadStream } = await file;
  const readStream = createReadStream();
  const objectName = `${folderName}/${id}_${Date.now()}_${filename}`;
  // AWS Upload nned bucket, fileName, and just send
  const upload = await new AWS.S3()
    .upload({
      Bucket: "pocipe-uploads",
      // fileName
      Key: objectName,
      // obects privacy
      ACL: "public-read",
      // Body는 여러가지일 수 있음. 여기선 stream
      Body: readStream,
    })
    .promise();
  //console.log(upload);
  return decodeURI(upload.Location);
};

export const deleteInS3 = async file => {
  console.log(file);
  const Key = file.replace(
    "https://pocipe-uploads.s3.ap-northeast-2.amazonaws.com/",
    ""
  );
  // console.log(Key);
  await S3.deleteObject({
    Bucket: "pocipe-uploads",
    Key,
  }).promise();
};

export const deleteDirInS3 = async dir => {
  // console.log(dir);
  const Key = dir.replace(
    "https://pocipe-uploads.s3.ap-northeast-2.amazonaws.com/",
    ""
  );
  await s3DeleteDir(S3, {
    Bucket: "pocipe-uploads",
    Prefix: Key,
  });
};
