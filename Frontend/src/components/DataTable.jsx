// Update in src/components/DataTable.js
const DataTable = ({ columns, data, onEdit, onDelete, renderActions }) => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white border">
        <thead>
          <tr className="bg-gray-100">
            {columns.map((col) => (
              <th key={col.key} className="p-2 border">{col.label}</th>
            ))}
            <th className="p-2 border">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row, index) => (
            <tr key={index} className="border-t">
              {columns.map((col) => (
                <td key={col.key} className="p-2 border">{row[col.key]}</td>
              ))}
              <td className="p-2 border">
                <button
                  onClick={() => onEdit(row)}
                  className="bg-blue-500 text-white px-2 py-1 rounded mr-2"
                >
                  Editar
                </button>
                <button
                  onClick={() => onDelete(row)}
                  className="bg-red-500 text-white px-2 py-1 rounded mr-2"
                >
                  Eliminar
                </button>
                {renderActions && renderActions(row)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DataTable;