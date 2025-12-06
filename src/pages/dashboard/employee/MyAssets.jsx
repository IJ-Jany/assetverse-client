import React, { useEffect, useState } from "react";
import { MdLaptopMac, MdPhoneIphone, MdMonitor } from "react-icons/md";
import { FaFileAlt, FaHeadset } from "react-icons/fa";

const mockAssets = [
  {
    id: 1,
    name: "MacBook Pro",
    type: "Laptop",
    assignedDate: "2025-01-10",
    icon: <MdLaptopMac className="text-4xl text-white" />,
    status: "Assigned",
  },
  {
    id: 2,
    name: "iPhone 15",
    type: "Mobile",
    assignedDate: "2025-03-05",
    icon: <MdPhoneIphone className="text-4xl text-white" />,
    status: "Assigned",
  },
  {
    id: 3,
    name: "Dell Monitor",
    type: "Monitor",
    assignedDate: "2025-02-20",
    icon: <MdMonitor className="text-4xl text-white" />,
    status: "Assigned",
  },
  {
    id: 4,
    name: "Headset",
    type: "Accessory",
    assignedDate: "2025-04-01",
    icon: <FaHeadset className="text-4xl text-white" />,
    status: "Assigned",
  },
];

const Assets = () => {
  const [assets, setAssets] = useState([]);

  useEffect(() => {
    // Simulate fetching assets from API
    setTimeout(() => {
      setAssets(mockAssets);
    }, 500);
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6 text-gray-700">
        My Assets
      </h1>

      {assets.length === 0 ? (
        <p className="text-gray-500">No assets assigned yet.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {assets.map((asset) => (
            <div
              key={asset.id}
              className="bg-gradient-to-r from-blue-500 to-purple-600 p-5 rounded-xl shadow-lg hover:scale-105 transform transition-all duration-300"
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="w-16 h-16 flex items-center justify-center bg-white bg-opacity-20 rounded-full">
                  {asset.icon}
                </div>
                <div>
                  <h2 className="text-xl font-bold text-white">
                    {asset.name}
                  </h2>
                  <p className="text-sm text-white/80">{asset.type}</p>
                </div>
              </div>

              <div className="flex justify-between items-center text-white/90">
                <span>Assigned: {asset.assignedDate}</span>
                <span
                  className={`px-2 py-1 rounded-full text-xs ${
                    asset.status === "Assigned"
                      ? "bg-green-600"
                      : "bg-gray-400"
                  }`}
                >
                  {asset.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Assets;
