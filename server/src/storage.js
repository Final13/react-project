const multer = require('multer');

const workStorage = multer.diskStorage({
    destination: '../client/public/images/worksImages',
    filename(req, file, cb) {
        cb(null, `${new Date().getTime()}-${file.originalname.replace(/\s/g, '')}`);
    },
});

const productStorage = multer.diskStorage({
    destination: '../client/public/images/productsImages',
    filename(req, file, cb) {
        cb(null, `${new Date().getTime()}-${file.originalname.replace(/\s/g, '')}`);
    },
});

const workUpload = multer({ storage: workStorage });
const productUpload = multer({ storage: productStorage });

module.exports = { workUpload, productUpload };
