const express1 = require('express');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });
const router1 = express1.Router();
const uploadFiles = require('../../controller/fileUploadController');

const fileUploadRouter = router1.post('/', upload.single('file'), uploadFiles.uploadFile);

module.exports = fileUploadRouter;