 /**
	 * This function used to Resize Image and Upload on Amazon S3
	 * @author Didijobs <rgy713>
	 */
const AWS = require("aws-sdk");
const Sharp = require("sharp");
const randomstring = require("randomstring");

let ImageHelper = {};
ImageHelper.LOCATIONS = {
  PRODUCTS: "products/",
  USER: "user/",
};

//Create instance for S3
ImageHelper.s3Instance = new AWS.S3({
  accessKeyId: process.env.AWS_KEY_ID,
  secretAccessKey: process.env.AWS_ACCESS_KEY,
});
ImageHelper.getImagePath = (name, location) => {
  if (name) {
    name = `${process.env.S3_URL}${location}${name}`;
  } else {
    name = "";
  }

  return name;
};
ImageHelper.uploadImage = (
  file,
  localtion = ImageHelper.LOCATIONS.PRODUCTS
) => {
  return new Promise((resolve, reject) => {
    const randomString = randomstring.generate({
      length: 12,
      charset: "alphabetic",
    });
    const fileName =
      randomString + "_" + file.name.replace(/[^a-zA-Z.0-9-_]/g, "");

    const s3Params = {
      Bucket: process.env.BUCKET_NAME,
      Key: localtion + fileName,
      Body: file.data,
      ACL: "public-read",
      CacheControl: "max-age=86400",
      ContentType: file.mimetype,
    };
    //Upload image on S3
    ImageHelper.s3Instance.upload(s3Params, function (err, data) {
      if (err) {
        reject(err);
      } else {
        resolve(fileName);
      }
    });
  });
};
ImageHelper.resizeAndUpload = (
  file,
  sizes,
  localtion = ImageHelper.LOCATIONS.USER
) => {
  return new Promise(async (resolve, reject) => {
    const randomString = randomstring.generate({
      length: 12,
      charset: "alphabetic",
    });
    const fileName =
      randomString + "_" + file.name.replace(/[^a-zA-Z.0-9-_]/g, "");
    let mailFilePath = localtion + fileName;
    let result = false;

    let s3Params = {
      Bucket: process.env.BUCKET_NAME,
      ACL: "public-read",
      CacheControl: "max-age=86400",
      ContentType: file.mimetype,
    };

    if (localtion === ImageHelper.LOCATIONS.USER) {
      //in case of user the image file path is different
      mailFilePath = ImageHelper.LOCATIONS.USER + fileName;
    }

    s3Params.Key = mailFilePath;
    s3Params.Body = file.data;

    //uploading main file on s3
    await ImageHelper.s3Instance.upload(s3Params, function (err, data) {
      if (err) {
        console.log(err);
        result = false;
      } else {
        result = fileName;
      }
    });
    //Resize images in different sizes
    if (sizes.length) {
      await sizes.map((single) => {
        Sharp(file.data)
          .resize(single.width, single.height)
          .toBuffer()
          .then(async (image) => {
            s3Params.Body = image;
            s3Params.Key =
              localtion +
              "s" +
              single.width +
              "x" +
              single.height +
              "/" +
              fileName;
            //Upload in image in s3
            ImageHelper.s3Instance.upload(s3Params, function (err, data) {
              if (err) {
                result = false;
                reject(err);
              } else {
                result = fileName;
                resolve(fileName);
              }
            });
          })
          .catch((error) => {
            reject(error);
          });
      });
    } else {
      reject(false);
    }
  });
};

module.exports = ImageHelper;
