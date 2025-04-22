import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

export default function ChartsView({ data }) {
  if (!data || typeof data !== "object" || Object.keys(data).length === 0) {
    return (
      <div className="alert alert-secondary text-center">
        No chart data available
      </div>
    );
  }

  const chartData = Object.entries(data).map(([key, value]) => ({
    name: key,
    value: Number(value),
  }));

  return (
    <div className="card shadow-sm rounded-3 p-4 mt-4">
      <h5 className="text-primary mb-4 text-center">📊 Spending Overview</h5>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={chartData} margin={{ top: 10, right: 30, left: 20, bottom: 40 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="name"
            angle={-45}
            textAnchor="end"
            height={70}
            tick={{ fontSize: 12 }}
          />
          <YAxis tick={{ fontSize: 12 }} />
          <Tooltip />
          <Legend wrapperStyle={{ fontSize: "12px" }} />
          <Bar dataKey="value" fill="#4c84ff" radius={[6, 6, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
