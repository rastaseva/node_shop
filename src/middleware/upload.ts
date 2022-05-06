import moment from 'moment';
import multer from 'multer';

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, './src/images/');
  },
  filename(req, file, cb) {
    const date = moment().format('DDMMYYYY-HHmmss SSS');
    cb(null, `${date}-${file.originalname}`);
  },
});
const types: string[] = ['image/jpg', 'image/png', 'image/jpeg'];

const fileFilter = (
  req: Express.Request,
  file: Express.Multer.File,
  cb: multer.FileFilterCallback
): void => {
  if (types.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const limits = {
  fileSize: 1024 * 1024 * 5,
};

const upload = multer({
  storage,
  fileFilter,
  limits,
});

export default upload;
