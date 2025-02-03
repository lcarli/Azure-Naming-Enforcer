const namingRules = {
    "Microsoft.AnalysisServices": {
      "Analysis Services Server": {
        scope: "Global",
        length: { min: 3, max: 63 },
        validCharacters: "Lowercase letters, numbers, and hyphens (-)",
        constraints: [
          "Must start with a letter",
          "Cannot contain consecutive hyphens",
          "Must end with a letter or number"
        ],
        pattern: /^[a-z][a-z0-9]*(?:-[a-z0-9]+)*$/
      }
    }
  };
  
  export default namingRules;  