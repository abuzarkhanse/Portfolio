const express = require('express');
const router = express.Router();
const { initiatePayment, handleIPN } = require('../controllers/payfastController');

router.post('/pay', initiatePayment);
router.post('/ipn', handleIPN);

module.exports = router;