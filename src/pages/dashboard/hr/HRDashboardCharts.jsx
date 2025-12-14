import React, { useEffect, useState, useContext } from "react";
import {
  PieChart,
  Pie,
  Cell,
  Legend,
  Tooltip,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  ResponsiveContainer,
} from "recharts";
import axios from "axios";
import useRole from "../../../hooks/useRole";
import { AuthContext } from "../../../providers/AuthContext";

const HRDashboardCharts = ({ email }) => {
  const { user } = useContext(AuthContext);
  const { role, loading: roleLoading } = useRole(email);

  const [returnData, setReturnData] = useState([]);
  const [topAssets, setTopAssets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // 🎨 Project theme colors
  const PIE_COLORS = ["#93c5fd", "#c4b5fd"]; // blue-300, purple-300
  const BAR_COLOR = "#2563eb"; // blue-600

  useEffect(() => {
    if (!user?.accessToken || role !== "hr") {
      setLoading(false);
      return;
    }

    const fetchCharts = async () => {
      try {
        setLoading(true);

        const config = {
          headers: {
            Authorization: `Bearer ${user.accessToken}`,
          },
        };

        const returnRes = await axios.get(
          "http://localhost:5001/returnable-assets",
          config
        );

        const topRes = await axios.get(
          "http://localhost:5001/top-assets",
          config
        );

        setReturnData(returnRes.data || []);
        setTopAssets(topRes.data || []);
      } catch (err) {
        console.error("Chart fetch error:", err);
        setError("Failed to load chart data");
      } finally {
        setLoading(false);
      }
    };

    fetchCharts();
  }, [user, role]);

  if (roleLoading || loading)
    return <p className="text-center p-4">Loading charts...</p>;

  if (error)
    return <p className="text-center p-4 text-red-500">{error}</p>;

  if (role !== "hr")
    return <p className="text-center p-4">Charts available for HR only.</p>;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
      {/* ===== Pie Chart ===== */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-1 rounded-xl">
        <div className="bg-white p-4 sm:p-6 shadow rounded-lg">
          <h2 className="text-lg sm:text-xl font-semibold mb-4 text-center">
            Returnable vs Non-returnable
          </h2>

          <ResponsiveContainer width="100%" height={260}>
            <PieChart>
              <Pie
                data={returnData}
                dataKey="value"
                nameKey="name"
                outerRadius={90}
                label
              >
                {returnData.map((_, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={PIE_COLORS[index % PIE_COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* ===== Bar Chart ===== */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-1 rounded-xl">
        <div className="bg-white p-4 sm:p-6 shadow rounded-lg">
          <h2 className="text-lg sm:text-xl font-semibold mb-4 text-center">
            Top 5 Most Requested Assets
          </h2>

          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={topAssets}>
              <XAxis
                dataKey="assetName"
                tick={{ fontSize: 12 }}
                interval={0}
              />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="requests" fill={BAR_COLOR} radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default HRDashboardCharts;
