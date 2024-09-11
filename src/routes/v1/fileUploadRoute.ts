// import express from 'express';
const express1 = require('express');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });
const router1 = express1.Router();
const uploadFiles = require('../../controller/FileUploadController');

const fileUploadRouter = router1.post('/upload', upload.single('file'), function (req: any, res: any) { uploadFiles });

module.exports = fileUploadRouter;