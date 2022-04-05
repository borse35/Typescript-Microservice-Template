const express = require('express');
const router = express.Router();

router.use('/sample-internal-request', require('./SampleInternalRequestController'));

export = router;