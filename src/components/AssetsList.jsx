import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../providers/AuthContext";

const AssetsPage = () => {
  const { user } = useContext(AuthContext); // logged-in employee
  const [assets, setAssets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState(null);

  // Fetch all assets from DB
  useEffect(() => {
    axios.get("http://localhost:5001/assets")
      .then(res => setAssets(res.data))
      .catch(err => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  // Handle request click
  const handleRequest = async (asset) => {
    try {
      const res = await axios.post("http://localhost:5001/requests", {
        assetId: asset._id,
        assetName: asset.productName,
        assetType: asset.productType,
        requesterName: user.displayName,
        requesterEmail: user.email,
        hrEmail: asset.hrEmail,
        companyName: asset.companyName,
        note: ""
      });

      if (res.data.success) {
        setMessage({ type: "success", text: "Request sent successfully!" });

        // Optional: disable the button for this asset in UI
        setAssets(prev =>
          prev.map(a => a._id === asset._id
            ? { ...a, requested: true }
            : a
          )
        );
      }
    } catch (err) {
      setMessage({ type: "error", text: "Failed to request asset" });
      console.error(err);
    }
  };

  if (loading) return <p className="text-center mt-10">Loading assets...</p>;

  return (
    <div className="p-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      
      {message && (
        <p className={`p-3 rounded ${
          message.type === "success" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
        }`}>{message.text}</p>
      )}

      {assets.map(asset => (
        <div key={asset._id} className="bg-white rounded-xl shadow-lg p-4 flex flex-col justify-between hover:shadow-xl transition-shadow duration-300">
          <img
            src={asset.productImage || "https://via.placeholder.com/150"}
            alt={asset.productName}
            className="h-40 w-full object-cover rounded-md"
          />
          <h3 className="font-semibold text-lg mt-2">{asset.productName}</h3>
          <p className="text-gray-500 text-sm">Type: {asset.productType}</p>
          <p className="text-gray-500 text-sm">Available: {asset.availableQuantity}</p>
          <button
            disabled={asset.availableQuantity < 1 || asset.requested}
            onClick={() => handleRequest(asset)}
            className={`mt-3 btn w-full text-white rounded-md ${
              asset.availableQuantity > 0 && !asset.requested
              ? "bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
              : "bg-gray-300 cursor-not-allowed"
            }`}
          >
            {asset.requested ? "Requested" : "Request"}
          </button>
        </div>
      ))}
    </div>
  );
};

export default AssetsPage;
