export default function TableView({ data }) {
    if (!data.length) return null;
    const headers = Object.keys(data[0]);
    return (
      <table border="1">
        <thead>
          <tr>{headers.map((h) => <th key={h}>{h}</th>)}</tr>
        </thead>
        <tbody>
          {data.map((row, i) => (
            <tr key={i}>
              {headers.map((h) => <td key={h}>{row[h]}</td>)}
            </tr>
          ))}
        </tbody>
      </table>
    );
  }
  