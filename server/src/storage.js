const multer = require('multer');

const uploadStorage = multer.diskStorage({
    destination: '../client/public/uploads',
    filename(req, file, cb) {
        cb(null, `${new Date().getTime()}-${file.originalname.replace(/\s/g, '')}`);
    },
});

const imageStorage = multer.diskStorage({
    destination: '../client/public/images',
    filename(req, file, cb) {
        cb(null, `${new Date().getTime()}-${file.originalname.replace(/\s/g, '')}`);
    },
});

const upload = multer({ storage: uploadStorage });
const imageUpload = multer({ storage: imageStorage });

module.exports = { upload, imageUpload };
