const express = require('express');
const {deleteCat, getAll, add} = require('../controllers/catController');
const ExpressFormidable = require('express-formidable')

const {UploadImage} = require('../helpers/uploadImage');

const router = express.Router();

router.post('/', add);
router.get('/', getAll);
router.delete('/:id', deleteCat);
router.post('/upload', ExpressFormidable(), UploadImage)

module.exports = router;
