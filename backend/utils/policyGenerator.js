function convertPatternToRegex(pattern) {
  let regexPattern = pattern;
  regexPattern = regexPattern.replace(/\{[^}]*\}\(max-(\d+)\)/g, ".{1,$1}");
  regexPattern = regexPattern.replace(/\{[^}]*\}\((\d+)\)/g, ".{$1}");
  regexPattern = regexPattern.replace(/\{([^}]*)\}/g, "$1");

  return `^${regexPattern}$`;
}

function generatePolicy(resource) {
  const { name, type, pattern } = resource;
  const regexPattern = convertPatternToRegex(pattern);

  return {
    "properties": {
      "displayName": `Enforce naming convention for ${name}`,
      "policyType": "Custom",
      "mode": "All",
      "metadata": {
        "category": "Naming Conventions"
      },
      "parameters": {},
      "policyRule": {
        "if": {
          "allOf": [
            {
              "field": "type",
              "equals": type
            },
            {
              "field": "name",
              "notMatch": regexPattern
            }
          ]
        },
        "then": {
          "effect": "deny"
        }
      }
    }
  };
}

module.exports = { generatePolicy };