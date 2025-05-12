const express = require('express');
const router = express.Router();
import customerController from "../controllers/customer.controller";

router.post('/register',customerController);
router.post('/logout', customerController);

module.exports = router;





