export default function TableView({ data }) {
    if (!Array.isArray(data)) {
      return <p>No table data available</p>;
    }
  
    return (
      <table>
        <thead>
          <tr>
            <th>Date</th>
            <th>Category</th>
            <th>Amount</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row, index) => (
            <tr key={index}>
              <td>{row.date}</td>
              <td>{row.category}</td>
              <td>{row.amount}</td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  }
  