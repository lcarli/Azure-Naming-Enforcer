export default function ResourceTable({ resources }) {
  return (
    <div className="w-full max-w-4xl mt-4">
      {resources.length > 0 && (
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-blue-600 text-white">
              <th className="border border-gray-300 px-4 py-2">Resource Type</th>
              <th className="border border-gray-300 px-4 py-2">Naming Pattern</th>
            </tr>
          </thead>
          <tbody>
            {resources.map((res, index) => (
              <tr key={index} className="bg-white hover:bg-gray-100">
                <td className="border border-gray-300 px-4 py-2">{res.resourceType}</td>
                <td className="border border-gray-300 px-4 py-2">{res.pattern}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}