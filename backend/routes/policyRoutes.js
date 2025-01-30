const express = require("express");
const { generatePoliciesJSON, generatePoliciesZIP } = require("../controllers/policyController");

const router = express.Router();

router.post("/generatePolicies", generatePoliciesJSON);
router.post("/downloadPolicies", generatePoliciesZIP);

module.exports = router;