const { Router } = require('express');

const router = Router();

router.use(require('./generatePDF'));

module.exports = router;