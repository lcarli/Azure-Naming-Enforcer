function generatePolicy(resourceType, pattern) {
    return {
      "properties": {
        "displayName": `Enforce naming convention for ${resourceType}`,
        "policyType": "Custom",
        "mode": "All",
        "metadata": {
          "category": "Naming Conventions"
        },
        "parameters": {},
        "policyRule": {
          "if": {
            "field": "name",
            "notMatch": pattern
          },
          "then": {
            "effect": "deny"
          }
        }
      }
    };
  }
  
  module.exports = { generatePolicy };  