import { useState } from "react";
import resources from "./resources";

export default function App() {
  const [resourcesList, setResourcesList] = useState([]);
  const [firstPolicy, setFirstPolicy] = useState(null);
  const [policiesGenerated, setPoliciesGenerated] = useState(false);

  const addResource = () => {
    setResourcesList([...resourcesList, { selectedResource: "", abbreviation: "", pattern: "", customNaming: false }]);
  };

  const updateResource = (index, field, value) => {
    const updatedList = [...resourcesList];
    updatedList[index][field] = value;

    if (field === "selectedResource") {
      const resource = resources.find((r) => r.name === value);
      if (resource) {
        updatedList[index].abbreviation = resource.abbreviation;
      }
    }

    setResourcesList(updatedList);
  };

  const generatePolicies = async () => {
    try {
      const response = await fetch("https://azurenamingenforcer.azurewebsites.net/api/generatePolicies", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ resources: resourcesList }),
      });

      const data = await response.json();
      if (data.policies.length > 0) {
        setFirstPolicy(data.policies[0]);
        setPoliciesGenerated(true);
      }
    } catch (error) {
      console.error("Error generating policies:", error);
    }
  };

  const downloadPolicies = async () => {
    try {
      const response = await fetch("https://azurenamingenforcer.azurewebsites.net/api/downloadPolicies", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ resources: resourcesList }),
      });

      if (response.ok) {
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = "azure_policies.zip";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }
    } catch (error) {
      console.error("Error downloading policies:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 text-black flex flex-col items-center p-6">
      <header className="w-full bg-blue-800 text-white text-center p-4 text-lg font-bold">
        Azure Naming Enforcer
      </header>

      <div className="bg-white shadow-md rounded-lg p-4 w-full text-gray-700 text-center">
        <h2 className="text-lg font-bold">How to Use</h2>
        <p>
          Select a resource type from the dropdown. The recommended abbreviation appears in the second column.
          Complete the naming pattern using Azure best practices.
        </p>
        <p>
          Check "Custom Naming" in a row to disable the abbreviation and manually define the entire naming pattern.
        </p>
        <div className="flex justify-center mt-2 space-x-6">
          <div>
            <h3 className="text-md font-semibold">Example Patterns</h3>
            <ul className="list-none">
              <li><b>Default Mode:</b> <code>vm-max-3-env(3)-app(3)</code></li>
              <li><b>Custom Naming:</b> <code>mycustomname-xyz</code></li>
            </ul>
          </div>
          <div>
            <h3 className="text-md font-semibold">Pattern Guide</h3>
            <ul className="list-none">
              <li><code>(max-3)</code> → Up to 3 characters</li>
              <li><code>(3)</code> → Exactly 3 characters</li>
              <li><code>{'{env}'}(max-4)</code> → Customizable (max 4 chars)</li>
            </ul>
          </div>
        </div>
      </div>

      <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700 mt-6 mb-4" onClick={addResource}>
        Add Resource
      </button>

      {resourcesList.length > 0 && (
        <div className="w-full max-w-4xl">
          <table className="w-full border-collapse border border-gray-300 text-left">
            <thead>
              <tr className="bg-blue-600 text-white">
                <th className="border border-gray-300 px-4 py-2">Resource Type</th>
                <th className="border border-gray-300 px-4 py-2">Abbreviation</th>
                <th className="border border-gray-300 px-4 py-2">Naming Pattern</th>
              </tr>
            </thead>
            <tbody>
              {resourcesList.map((res, index) => (
                <tr key={index} className="bg-white text-black">
                  <td className="border border-gray-300 px-4 py-2">
                    <select
                      className="p-2 border rounded w-48"
                      value={res.selectedResource}
                      onChange={(e) => updateResource(index, "selectedResource", e.target.value)}
                    >
                      <option value="">Select a Resource</option>
                      {resources.map((resource) => (
                        <option key={resource.name} value={resource.name}>
                          {resource.name}
                        </option>
                      ))}
                    </select>
                  </td>

                  <td className="border border-gray-300 px-4 py-2 text-center">
                    {!res.customNaming ? `${res.abbreviation}-` : "Custom Naming Enabled"}
                  </td>

                  <td className="border border-gray-300 px-4 py-2 flex items-center">
                    <input
                      type="text"
                      placeholder="Enter naming pattern"
                      className="p-2 border rounded w-full"
                      value={res.pattern}
                      onChange={(e) => updateResource(index, "pattern", e.target.value)}
                    />
                    <input
                      type="checkbox"
                      className="ml-2"
                      checked={res.customNaming}
                      onChange={() => updateResource(index, "customNaming", !res.customNaming)}
                    />
                    <span className="ml-1 text-sm text-gray-600">Custom</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

     {resourcesList.length > 0 && (
        <div className="flex gap-4 mt-6">
          <button className="bg-green-500 text-white px-6 py-2 rounded hover:bg-green-700" onClick={generatePolicies}>
            Generate Policies
          </button>

          {policiesGenerated && (
            <button className="bg-gray-500 text-white px-6 py-2 rounded hover:bg-gray-700" onClick={downloadPolicies}>
              Download Policies
            </button>
          )}
        </div>
      )}

      {firstPolicy && (
        <div className="mt-6 p-4 bg-white text-black shadow-lg rounded w-full max-w-4xl">
          <h2 className="text-xl font-semibold mb-2">Example Policy</h2>
          <pre className="bg-gray-100 p-4 rounded text-sm overflow-x-auto">{JSON.stringify(firstPolicy, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}