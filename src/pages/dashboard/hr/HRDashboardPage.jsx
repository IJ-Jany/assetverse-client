import { useEffect, useState } from "react";
import { PieChart, Pie, Cell, Tooltip, Legend, BarChart, Bar, XAxis, YAxis, ResponsiveContainer } from "recharts";
import axios from "axios";

const HRDashboardPage = () => {
  const [returnableData, setReturnableData] = useState([]);
  const [topAssets, setTopAssets] = useState([]);

  // Pie chart colors
  const COLORS = ["#0088FE", "#FF8042"];

  useEffect(() => {
    // 1️⃣ Fetch assets and requests for Pie chart
    const fetchReturnableStats = async () => {
      try {
        const res = await axios.get("http://localhost:5001/assets"); // update URL if needed
        const assets = res.data.assets;

        const returnable = assets.filter(a => a.availableQuantity > 0).length;
        const nonReturnable = assets.length - returnable;

        setReturnableData([
          { name: "Returnable", value: returnable },
          { name: "Non-Returnable", value: nonReturnable }
        ]);
      } catch (err) {
        console.error("Error fetching assets:", err);
      }
    };

    // 2️⃣ Fetch top 5 requested assets
    const fetchTopAssets = async () => {
      try {
        const res = await axios.get("http://localhost:5001/requests"); // all requests
        const requests = res.data.requests || res.data; // adapt if API returns different structure

        // Count requests per asset
        const counts = {};
        requests.forEach(req => {
          const name = req.assetName;
          counts[name] = (counts[name] || 0) + 1;
        });

        const sortedAssets = Object.entries(counts)
          .map(([name, value]) => ({ name, value }))
          .sort((a, b) => b.value - a.value)
          .slice(0, 5);

        setTopAssets(sortedAssets);
      } catch (err) {
        console.error("Error fetching requests:", err);
      }
    };

    fetchReturnableStats();
    fetchTopAssets();
  }, []);

  return (
    <div className="space-y-10">
      <h1 className="text-2xl font-bold mb-4">HR Dashboard</h1>

      <div className="flex flex-col md:flex-row gap-10">
        {/* Pie Chart */}
        <div className="bg-white p-6 rounded shadow-md flex-1">
          <h2 className="text-xl font-semibold mb-4">Returnable vs Non-returnable</h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={returnableData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={80}
                fill="#8884d8"
                label
              >
                {returnableData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Bar Chart */}
        <div className="bg-white p-6 rounded shadow-md flex-1">
          <h2 className="text-xl font-semibold mb-4">Top 5 Most Requested Assets</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={topAssets}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="value" fill="#82ca9d" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default HRDashboardPage;
