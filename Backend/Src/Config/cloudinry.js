import { v2 as cloudinary } from 'cloudinary';
import { CloudinaryStorage } from 'multer-storage-cloudinary'
    
// Configuration
cloudinary.config({ 
     cloud_name: 'dnlffbrmd', 
     api_key: '961472639614454', 
     api_secret: process.env.CLOUDINARY_API // Click 'View API Keys' above to copy your API secret
});


const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
      folder: 'images',
      allowed_type: ['jpg', 'png', 'jpeg'],
      // format: async (req, file) => 'png',  supports promises as well
      // public_id: (req, file) => 'computed-filename-using-request',
    },
});

export {
    cloudinary,
    storage
}