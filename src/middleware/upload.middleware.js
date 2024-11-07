const multer = require("multer");
const multerS3 = require("multer-s3");
const { s3 } = require("../config/aws.config");

const upload = multer({
  storage: multerS3({
    s3: s3,
    contentType: multerS3.AUTO_CONTENT_TYPE,

    bucket: process.env.AWS_S3_BUCKET,
    metadata: (req, file, cb) => {
      cb(null, { fieldName: file.fieldname });
    },
    key: (req, file, cb) => {
      cb(null, `${Date.now().toString()}-${file.originalname}`);
    },
    limits: {
      fileSize: 5 * 1024 * 1024, // 5MB limit
    },
    fileFilter: (req, file, cb) => {
      // Add file type validation if needed
      const allowedMimes = ["image/jpeg", "image/png", "image/gif"];
      if (allowedMimes.includes(file.mimetype)) {
        cb(null, true);
      } else {
        cb(new Error("Invalid file type"), false);
      }
    },
  }),
});

module.exports = upload;
