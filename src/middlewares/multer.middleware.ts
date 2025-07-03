import { v2 as cloudinary } from 'cloudinary';
import multer from 'multer';
import { CloudinaryStorage } from 'multer-storage-cloudinary';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const postImageStorage = new CloudinaryStorage({
  cloudinary,
  params: async () => ({
    folder: 'your-app-images',
    allowed_formats: ['jpg', 'jpeg', 'png', 'gif'],
    public_id: `${Date.now()}-${Math.floor(Math.random() * 1000)}`,
  }),
});

const avatarStorage = new CloudinaryStorage({
  cloudinary,
  params: async () => ({
    folder: 'avatars',
    allowed_formats: ['jpg', 'jpeg', 'png'],
    public_id: `avatar-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
  }),
});

export const uploadPostImage = multer({ storage: postImageStorage });
export const uploadAvatarImage = multer({ storage: avatarStorage });
