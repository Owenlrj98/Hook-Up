const AWS = require('aws-sdk');

// Initialize S3
const s3 = new AWS.S3({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: process.env.AWS_REGION,
});

// Function to upload file to S3
const upload = async (file) => {
    const params = {
        Bucket: 'hookupimage',
        Key: `profile_pictures/${Date.now()}_${file.originalname}`,
        Body: file.buffer,
        ACL: 'public-read',
    };

    const result = await s3.upload(params).promise();
    return result.Location;
};

// Export the function
module.exports = { upload };
