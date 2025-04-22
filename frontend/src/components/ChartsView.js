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
  if (!Array.isArray(data) || data.length === 0) {
    return (
      <div className="alert alert-secondary text-center">
        No chart data available
      </div>
    );
  }

  // 🔁 Group and sum amounts by category
  const grouped = data.reduce((acc, item) => {
    const category = item.category || "Uncategorized";
    const amount = parseFloat(item.amount);
    if (!isNaN(amount)) {
      acc[category] = (acc[category] || 0) + amount;
    }
    return acc;
  }, {});

  // 🔄 Convert to recharts-friendly array
  const chartData = Object.entries(grouped).map(([category, total]) => ({
    name: category,
    value: Number(total.toFixed(2)),
  }));

  return (
    <div className="card shadow-sm rounded-3 p-4 mt-4">
      <h5 className="text-primary mb-4 text-center"> Spending by Category</h5>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={chartData} margin={{ top: 10, right: 30, left: 20, bottom: 40 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="name"
            angle={-45}
            textAnchor="end"
            height={80}
            tick={{ fontSize: 12 }}
          />
          <YAxis tick={{ fontSize: 12 }} />
          <Tooltip formatter={(value) => `$${value}`} />
          <Legend wrapperStyle={{ fontSize: "12px" }} />
          <Bar dataKey="value" fill="#4c84ff" radius={[6, 6, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}