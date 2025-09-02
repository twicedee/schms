import multer from 'multer';
import path from 'path';
import fs from 'fs';
import sharp from 'sharp';


// Common configuration
const fileFilter = (req, file, cb) => {
  const filetypes = /jpeg|jpg|png|gif/;
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = filetypes.test(file.mimetype);
  if (extname && mimetype) return cb(null, true);
  cb('Error: Images Only!');
};

// Profile Pictures Config
const profilePicStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    const dir = path.join('uploads', 'profilePics');
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    cb(null, dir);
    
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});

// Student Photos Config
const studentPhotoStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    const dir = path.join('uploads', 'studentPhotos');
    fs.mkdirSync(dir, { recursive: true });
    cb(null, dir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, 'student-' + uniqueSuffix + path.extname(file.originalname));
  }
});

// Create middleware instances
export const uploadProfilePic = multer({
  storage: profilePicStorage,
  limits: { fileSize: 3 * 1024 * 1024 }, // 3MB
  fileFilter
});

export const uploadStudentPhoto = multer({
  storage: studentPhotoStorage,
  limits: { fileSize: 3 * 1024 * 1024 }, // 3MB
  fileFilter
});


const processImage = async (filePath) => {
  try {
    const processedImage = await sharp(filePath)
      .resize(800, 800, { fit: 'inside', withoutEnlargement: true })
      .jpeg({ quality: 80 })
      .toBuffer();
    
    fs.writeFileSync(filePath, processedImage);
    return filePath;
  } catch (error) {
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }
    throw error;

  }
};

export { processImage };