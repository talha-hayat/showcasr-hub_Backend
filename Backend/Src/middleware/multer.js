import multer from 'multer';
import { storage } from '../Config/cloudinry.js';

const upload = multer({ storage });

export default upload;
