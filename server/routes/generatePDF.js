const { Router } = require('express');

const {
    GenerateMethod1,
    GenerateMethod2,
    GenerateMethod3
} = require('../controllers/generatePDF');

const router = Router();

router.post('/generate/pdf/method/1', GenerateMethod1);
router.post('/generate/pdf/method/2', GenerateMethod2);
router.post('/generate/pdf/method/3', GenerateMethod3);

module.exports = router;