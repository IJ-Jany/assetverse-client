import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../providers/AuthContext";
import axiosInstance from "../api/axios";
import { toast } from "react-toastify";

const AssetsPage = () => {
  const { user } = useContext(AuthContext);
  const [assets, setAssets] = useState([]);
  const [assignedAssets, setAssignedAssets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState(null);
  const [filterType, setFilterType] = useState("");

 // fetch all assets
  useEffect(() => {
    const fetchAssets = async () => {
      try {
        const res = await axiosInstance.get("/assets");
        setAssets(res.data);
      } catch (err) {
        console.error("Error fetching assets:", err);
      }
    };

    fetchAssets();
  }, []);

    // fetch assigned assets for the logged-in user
useEffect(() => {
  if (!user?.email) return;

  axiosInstance.get(`/assignedAssets/${user.email}`)
    .then(res => setAssignedAssets(res.data || []))
    .catch(err => console.error("Error fetching assigned assets:", err))
    .finally(() => setLoading(false));
}, [user?.email]);


  // Handle asset request
  const handleRequest = async (asset) => {
    try {
      const res = await axiosInstance.post("/requests", {
        assetId: asset._id,
        assetName: asset.productName,
        assetType: asset.productType,
        requesterName: user.displayName || user.name,
        requesterEmail: user.email,
        hrEmail: asset.hrEmail,
        companyName: asset.companyName,
        note: ""
      });

      if (res.data.success) {
        toast.success("Request sent successfully!");
        setAssets(prev =>
          prev.map(a =>
            a._id === asset._id ? { ...a, requested: true } : a
          )
        );
        setTimeout(() => setMessage(null), 3000);
      }
    } catch (err) {
      toast.error("Failed to request asset");
      console.error(err);
      setTimeout(() => setMessage(null), 3000);
    }
  };

  // Handle asset return
  const handleReturn = async (asset) => {
    try {
      const res = await axiosInstance.post("/assignedAssets/return", {
        assignedAssetId: asset.assigned._id
      });

      if (res.data.success) {
        setMessage({ type: "success", text: "Asset returned successfully!" });
        setAssets(prev =>
          prev.map(a =>
            a._id === asset._id
              ? { ...a, requested: false, assigned: null }
              : a
          )
        );
        setTimeout(() => setMessage(null), 3000);
      }
    } catch (err) {
      setMessage({ type: "error", text: "Failed to return asset" });
      console.error(err);
      setTimeout(() => setMessage(null), 3000);
    }
  };

  if (loading) return <p className="text-center mt-10">Loading assets...</p>;

  const filteredAssets = assets.filter(asset =>
    !filterType || asset.productType === filterType
  );

  return (
    <div className="p-6">
      <div className="mb-4 max-w-xs">
        <select
          value={filterType}
          onChange={e => setFilterType(e.target.value)}
          className="select select-bordered w-full"
        >
          <option value="">All Types</option>
          <option value="Returnable">Returnable</option>
          <option value="Non-returnable">Non-returnable</option>
        </select>
      </div>
      {message && (
        <p
          className={`p-3 rounded mb-4 ${
            message.type === "success"
              ? "bg-green-100 text-green-700"
              : "bg-red-100 text-red-700"
          }`}
        >
          {message.text}
        </p>
      )}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredAssets.map(asset => (
          <div
            key={asset._id}
            className="bg-white rounded-xl shadow-lg p-4 flex flex-col justify-between hover:shadow-xl transition-shadow duration-300"
          >
            <img
              src={asset.productImage || "https://via.placeholder.com/150"}
              alt={asset.productName}
              className="h-40 w-full object-cover rounded-md"
            />
            <h3 className="font-semibold text-lg mt-2">{asset.productName}</h3>
            <p className="text-gray-500 text-sm">Type: {asset.productType}</p>
            <p className="text-gray-500 text-sm">Available: {asset.availableQuantity}</p>

            
            {asset.assigned && asset.assigned.status === "assigned" && asset.productType === "Returnable" ? (
              <button
                onClick={() => handleReturn(asset)}
                className="mt-3 btn w-full bg-yellow-500 hover:bg-yellow-600 text-white rounded-md"
              >
                Return
              </button>
            ) : (
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
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default AssetsPage;
