const cloudinary = require('cloudinary');
cloudinary.config({cloud_name: "muhamad-ali", api_key: '951672748411472', api_secret: '9vyU1AhlQibDpUqojV6jTW9es3c'});

const UploadImage = async(req, res) => {
    try {
        const result = await cloudinary
            .uploader
            .upload(req.files
                ?.image
                    ?.path);
        res.json({url: result.secure_url, public_id: result.public_id})

    } catch (error) {
        console.log('error in image upload', error);

    }

};

module.exports = {
    UploadImage
}