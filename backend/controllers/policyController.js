const { generatePolicy } = require("../utils/policyGenerator");

const generatePolicies = (req, res) => {
  const { resources } = req.body;

  if (!Array.isArray(resources) || resources.length === 0) {
    return res.status(400).json({ error: "Invalid request. Resources array is required." });
  }

  const policies = resources.map((res) => {
    // Se customNaming estiver ativado, usamos o pattern como está (mas ainda aplicamos regex)
    const pattern = res.customNaming ? res.pattern : `${res.abbreviation}-${res.pattern}`;
    return {
      resourceType: res.selectedResource,
      policy: generatePolicy(res.selectedResource, pattern)
    };
  });

  res.json({ policies });
};

module.exports = { generatePolicies };