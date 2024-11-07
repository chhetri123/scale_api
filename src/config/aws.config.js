const AWS = require("aws-sdk");
require("dotenv").config();
const logger = require("../utils/logger");

AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
});

const s3 = new AWS.S3();

const testS3Connection = async () => {
  try {
    await s3.listBuckets().promise();
    logger.info("✅ S3 Connection Successful");
  } catch (error) {
    logger.error("❌ S3 Connection Failed:", error);
    throw error;
  }
};

module.exports = {
  s3,
  testS3Connection,
};
