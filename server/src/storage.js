const multer = require('multer');

const storage = multer.diskStorage({
    destination: '../client/public/uploads',
    filename(req, file, cb) {
        cb(null, `${new Date().getTime()}-${file.originalname.replace(/\s/g, '')}`);
    },
});
const upload = multer({ storage });

module.exports = upload;
