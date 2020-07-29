const { Router } = require('express');

const {
    GenerateMethod1
} = require('../controllers/generatePDF');

const router = Router();

router.post('/generate/pdf/method/1', GenerateMethod1);

module.exports = router;