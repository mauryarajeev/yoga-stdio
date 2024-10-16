const express = require('express');
const router = express.Router();

const {getuser, chooseplan} = require('../controllers/private');
const {protect} = require('../middleware/auth');

router.route("/getuser").get(protect, getuser);
router.route("/chooseplan").post(protect, chooseplan);

module.exports = router;