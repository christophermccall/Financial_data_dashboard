import React from "react";

export default function TableView({ data }) {
  if (!Array.isArray(data) || data.length === 0) {
    return (
      <div className="alert alert-warning text-center">
        No table data available
      </div>
    );
  }

  return (
    <div className="table-responsive shadow rounded-3 overflow-hidden">
      <table className="table table-hover table-bordered align-middle mb-0">
        <thead className="table-primary text-center">
          <tr>
            <th scope="col"> Date</th>
            <th scope="col"> Category</th>
            <th scope="col"> Amount</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row, index) => (
            <tr key={index}>
              <td>{row.date}</td>
              <td>{row.category}</td>
              <td>${parseFloat(row.amount).toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
