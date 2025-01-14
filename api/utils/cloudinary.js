import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs';

cloudinary.config({
    cloud_name: 'dmbub7ueu',
    api_key: '358957986459796',
    api_secret: 'U17pa71wOx0rXFXKh1GA4xCxeKc',
});

const uploadcloudinary = async (localfilepath) => {
    try {
        if (!localfilepath) {
            return null;
        }

        // Upload file to Cloudinary
        const response = await cloudinary.uploader.upload(localfilepath, {
            resource_type: 'auto',
        });

        
        await fs.promises.unlink(localfilepath);
        return response;
    } catch (error) {
        // Handle upload error
        console.error('Cloudinary Upload Error:', error);

        // Remove the file from the local server
        try {
            await fs.promises.unlink(localfilepath);
        } catch (unlinkError) {
            console.error('Error deleting local file:', unlinkError);
        }

        return { success: false, error: error.message };
    }
};

export default uploadcloudinary;
