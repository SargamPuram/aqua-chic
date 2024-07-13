import AWS from 'aws-sdk';
import 'dotenv/config';

AWS.config.update({
    accessKeyId: process.env.AWS_ACCESS_KEY,
    secretAccessKey: process.env.AWS_SECRET_KEY,
    region: process.env.AWS_REGION
});

const s3 = new AWS.S3();

const uploadPhoto = async (file) => {
    if (!file) {
        throw new Error('No file provided');
    }

    console.log('Uploading file:', file.originalname);

    const params = {
        Bucket: process.env.S3_BUCKET_NAME,
        Key: `uploads/${Date.now()}_${file.originalname}`,
        Body: file.buffer,
        ContentType: file.mimetype,
        // Remove ACL from the params
    };

    try {
        const data = await s3.upload(params).promise();
        console.log('Upload successful:', data.Location);
        return data.Location;
    } catch (error) {
        console.error(`Failed to upload photo: ${error.message}`);
        throw new Error(`Failed to upload photo: ${error.message}`);
    }
};


const listPhotos = async () => {
    const params = {
        Bucket: process.env.S3_BUCKET_NAME,
        Prefix: 'uploads/'
    };

    try {
        const data = await s3.listObjectsV2(params).promise();
        return data.Contents.map(item => ({
            url: `https://${params.Bucket}.s3.${process.env.AWS_REGION}.amazonaws.com/${item.Key}`,
            key: item.Key
        }));
    } catch (error) {
        console.error(`Failed to list photos: ${error.message}`);
        throw new Error(`Failed to list photos: ${error.message}`);
    }
};

export { uploadPhoto, listPhotos };
