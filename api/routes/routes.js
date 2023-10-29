const express = require("express");
const router = express.Router();
const controllersApp = require('../controlers/controlersApp')
const controllersApi = require('../controlers/controlersApi')

router.post('/receive-approval',controllersApp.handlePushRes);

router.post('/saveTokenUserInfo',controllersApi.createUser);
module.exports = router;


