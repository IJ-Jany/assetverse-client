import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../../../providers/AuthContext";
import { FaBox, FaCalendarAlt } from "react-icons/fa";

const RequestAsset = () => {
  const { user } = useContext(AuthContext);
  const [assets, setAssets] = useState([]);
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState(null);

  // Fetch assets
  useEffect(() => {
    axios.get("http://localhost:5001/assets")
      .then(res => setAssets(res.data))
      .catch(err => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  // Fetch employee requests
  useEffect(() => {
    if (!user) return;
    axios.get(`http://localhost:5001/my-requests?email=${user.email}`)
      .then(res => setRequests(res.data))
      .catch(err => console.error(err));
  }, [user]);

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
        note: "",
      });

      if (res.data.success) {
        setMessage({ type: "success", text: "Request sent successfully!" });
        // Update local state
        setRequests(prev => [...prev, {
          assetName: asset.productName,
          requestStatus: "pending",
          requestDate: new Date()
        }]);
      }
    } catch (err) {
      setMessage({ type: "error", text: "Failed to request asset" });
      console.error(err);
    }
  };

  if (loading) return <p className="text-center mt-10">Loading assets...</p>;

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6 text-gray-700">Request Asset</h1>

      {message && (
        <p className={`p-3 rounded mb-4 ${
          message.type === "success" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
        }`}>{message.text}</p>
      )}

      {/* Asset List */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-8">
        {assets.map(asset => {
          const alreadyRequested = requests.some(r => r.assetName === asset.productName);
          return (
            <div key={asset._id} className="bg-white rounded-xl shadow-lg p-4 flex flex-col justify-between hover:shadow-xl transition-shadow duration-300">
              <img src={asset.productImage || "https://via.placeholder.com/150"} alt={asset.productName} className="h-40 w-full object-cover rounded-md"/>
              <h3 className="font-semibold text-lg mt-2">{asset.productName}</h3>
              <p className="text-gray-500 text-sm">Type: {asset.productType}</p>
              <p className="text-gray-500 text-sm">Available: {asset.availableQuantity}</p>
              <button
                disabled={asset.availableQuantity < 1 || alreadyRequested}
                onClick={() => handleRequest(asset)}
                className={`mt-3 btn w-full text-white rounded-md ${
                  asset.availableQuantity > 0 && !alreadyRequested
                  ? "bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                  : "bg-gray-300 cursor-not-allowed"
                }`}
              >
                {alreadyRequested ? "Requested" : "Request"}
              </button>
            </div>
          )
        })}
      </div>

      {/* My Requests */}
      <div className="bg-white p-6 rounded-xl shadow-lg">
        <h2 className="text-xl font-semibold mb-4 text-gray-700">Your Requests</h2>
        {requests.length === 0 ? (
          <p className="text-gray-500">No asset requests yet.</p>
        ) : (
          <ul className="space-y-4">
            {requests.map((req, index) => (
              <li key={index} className="flex justify-between items-center p-4 border rounded-lg hover:shadow-md transition-all duration-300">
                <span>
                  <strong>{req.assetName}</strong> - {new Date(req.requestDate).toLocaleDateString()}
                </span>
                <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                  req.requestStatus === "pending"
                    ? "bg-yellow-100 text-yellow-800"
                    : req.requestStatus === "approved"
                    ? "bg-green-100 text-green-800"
                    : "bg-red-100 text-red-800"
                }`}>
                  {req.requestStatus}
                </span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default RequestAsset;
