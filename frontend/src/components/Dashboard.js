import React, { useState, useEffect } from "react";
import axios from "axios";
import TableView from "./TableView";
import ChartsView from "./ChartsView";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function Dashboard() {
  const [file, setFile] = useState(null);
  const [tableData, setTableData] = useState([]);
  const [chartData, setChartData] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const token = localStorage.getItem("token");
  const navigate = useNavigate();

   // Function to get CSRF token from cookies
   function getCSRFToken() {
    const matches = document.cookie.match(/csrftoken=([^;]+)/);
    return matches ? matches[1] : null;
  }
    
  useEffect(() => {
    if (!token) {
      toast.warning("You must be logged in!");
      navigate("/");
    } else {
      loadData();
    }
    // eslint-disable-next-line
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    toast.success("Logged out successfully!");
    navigate("/");
  };

  const uploadFile = async () => {
    if (!file) {
      setError("Please select a file first.");
      return;
    }

    setLoading(true);
    const formData = new FormData();
    formData.append("file", file);

    const csrfToken = document.cookie.match(/csrftoken=([\w-]+)/)?.[1];

    try {
      await axios.post("/api/dashboard/upload/", formData, {
        headers: {'Authorization: `Bearer ${token}`, X-CSRFToken': csrfToken, },
      });
      toast.success("File uploaded successfully!");
      loadData();
    } catch (err) {
      toast.error("File upload failed. Please try again.");
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
      console.log("Table data:", tableRes.data); 
      setTableData(tableRes.data);
    } catch (err) {
        if (err.response && err.response.status === 401) {
            toast.warning("Your session has expired. Please log in again.");
            localStorage.removeItem("token");
            navigate("/");
          } else {
            toast.error("Failed to load data. Please try again.");
          }
          setError("Failed to load data. Please try again.");
        } finally {
          setLoading(false);
        }
      };

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <h2>Diocese of DE Dashboard</h2>
        <button onClick={handleLogout} className="logout-button">
         Logout
        </button>
      </div>

      {loading && <p>Loading...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}

      <input type="file" onChange={(e) => setFile(e.target.files[0])} />
      <button onClick={uploadFile} disabled={loading}>
        {loading ? "Uploading..." : "Upload CSV"}
      </button>

      <TableView data={tableData} />
      <ChartsView data={chartData} />
    </div>
  );
}
