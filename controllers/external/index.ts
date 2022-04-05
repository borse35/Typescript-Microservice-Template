const express = require('express');
const router = express.Router();

router.use('/sample-external-request', require('./SampleExternalRequestController'));

export = router;