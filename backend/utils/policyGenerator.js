function convertPatternToRegex(pattern) {
  let regexPattern = pattern;

  // Substituir {qualquer_coisa}(max-X) por \w{1,X}
  regexPattern = regexPattern.replace(/\{[^}]*\}\(max-(\d+)\)/g, ".{{1,$1}}");

  // Substituir {qualquer_coisa}(X) por \w{X}
  regexPattern = regexPattern.replace(/\{[^}]*\}\((\d+)\)/g, ".{{$1}}");

  // Substituir {qualquer_coisa} sem () por string literal
  regexPattern = regexPattern.replace(/\{([^}]*)\}/g, "$1");

  // Certificar-se de que a regex cobre o nome todo
  return `^${regexPattern}$`;
}

function generatePolicy(resourceType, pattern) {
  const regexPattern = convertPatternToRegex(pattern);

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
          "notMatch": regexPattern
        },
        "then": {
          "effect": "deny"
        }
      }
    }
  };
}

module.exports = { generatePolicy };