const { generatePolicy } = require("../utils/policyGenerator");
const JSZip = require("jszip");
const fs = require("fs");
const path = require("path");

// Gera as policies e retorna como JSON (para exibir no frontend)
const generatePoliciesJSON = (req, res) => {
  const { resources } = req.body;

  if (!Array.isArray(resources) || resources.length === 0) {
    return res.status(400).json({ error: "Invalid request. Resources array is required." });
  }

  const policies = resources.map((res) => {
    const pattern = res.customNaming ? res.pattern : `${res.abbreviation}-${res.pattern}`;
    return {
      resourceType: res.selectedResource,
      policy: generatePolicy(res.selectedResource, pattern)
    };
  });

  res.json({ policies });
};

// Gera as policies e retorna como ZIP (para download)
const generatePoliciesZIP = async (req, res) => {
  const { resources } = req.body;

  if (!Array.isArray(resources) || resources.length === 0) {
    return res.status(400).json({ error: "Invalid request. Resources array is required." });
  }

  const zip = new JSZip();

  resources.forEach((res) => {
    const pattern = res.customNaming ? res.pattern : `${res.abbreviation}-${res.pattern}`;
    const policy = generatePolicy(res.selectedResource, pattern);

    zip.file(`${res.selectedResource.replace(/\s+/g, "_")}.json`, JSON.stringify(policy, null, 2));
  });

  zip.generateAsync({ type: "nodebuffer" }).then((content) => {
    res.set({
      "Content-Type": "application/zip",
      "Content-Disposition": "attachment; filename=azure_policies.zip"
    });
    res.send(content);
  });
};

module.exports = { generatePoliciesJSON, generatePoliciesZIP };