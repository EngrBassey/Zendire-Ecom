const multer = require('multer');

const storage = multer.diskStorage({
    destination: (_request, _response, cb) => {
        cb(null, 'uploads/');
    },
    filename: (request, _response, cb) => {
        cb(null, `${Date.now()}-${request.file.originalname}`);
    }
});

const upload = multer({ storage: storage });

module.exports = upload;
