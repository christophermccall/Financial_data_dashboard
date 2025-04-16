import React, { useState, useEffect } from "react";
import axios from "axios";
import TableView from "./TableView";
import ChartsView from "./ChartsView";

export default function Dashboard() {
  const [file, setFile] = useState(null);
  const [tableData, setTableData] = useState([]);
  const [chartData, setChartData] = useState({});
  const [loading, setLoading] = useState(false); // For loading state
  const [error, setError] = useState(null); // For error state

  const token = localStorage.getItem("token");

  const uploadFile = async () => {
    if (!file) {
      setError("Please select a file first.");
      return;
    }
    console.log(file);
    setLoading(true);
    const formData = new FormData();
    formData.append("file", file);
    try {
      await axios.post("/api/dashboard/upload/", formData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      loadData(); // Reload data after successful upload
    } catch (err) {
      setError("File upload failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const loadData = async () => {
    setLoading(true);
    try {
      const tableRes = await axios.get("/api/dashboard/table/", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const chartRes = await axios.get("/api/dashboard/chart/", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTableData(tableRes.data);
      setChartData(chartRes.data);
    } catch (err) {
      setError("Failed to load data. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>Diocese of DE Dashboard</h2>

      {/* Display loading spinner while data is loading */}
      {loading && <p>Loading...</p>}
      
      {/* Display error message if any */}
      {error && <p style={{ color: 'red' }}>{error}</p>}

      {/* File upload */}
      <input type="file" onChange={(e) => setFile(e.target.files[0])} />
      <button onClick={uploadFile} disabled={loading}>
        {loading ? "Uploading..." : "Upload CSV"}
      </button>

      {/* Display Table and Chart */}
      <TableView data={tableData} />
      <ChartsView data={chartData} />
    </div>
  );
}
