import React from "react";

export default function DataTable({ columns, data, onEdit, onDelete }) {
  return (
    <div className="overflow-x-auto bg-white rounded-lg border border-gray-200 shadow-sm">
      <table className="w-full text-left text-sm">
        <thead>
          <tr className="border-b text-gray-500 text-xs uppercase">
            {columns.map((col) => (
              <th key={col.key} className="py-3 px-4">
                {col.header}
              </th>
            ))}
            <th className="py-3 px-4 text-right">Ações</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row) => (
            <tr
              key={row.id}
              className="border-b hover:bg-gray-50 transition-colors"
            >
              {columns.map((col) => (
                <td key={col.key} className="py-3 px-4">
                  {row[col.key]}
                </td>
              ))}
              <td className="py-3 px-4 text-right">
                <div className="flex justify-end gap-2">
                  <button
                    onClick={() => onEdit(row)}
                    className="text-gray-500 hover:text-indigo-600"
                  >
                    <span className="material-symbols-outlined text-base">
                      edit
                    </span>
                  </button>
                  <button
                    onClick={() => onDelete(row)}
                    className="text-gray-500 hover:text-red-600"
                  >
                    <span className="material-symbols-outlined text-base">
                      delete
                    </span>
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
