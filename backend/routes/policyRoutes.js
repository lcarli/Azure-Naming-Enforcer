const express = require("express");
const { generatePolicies } = require("../controllers/policyController");

const router = express.Router();

router.post("/generatePolicies", generatePolicies);

module.exports = router;