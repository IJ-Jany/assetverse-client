import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../../../providers/AuthContext";

const RequestAsset = () => {
  const { user } = useContext(AuthContext);

  const [assets, setAssets] = useState([]);
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const limit = 10;

  // 🔐 auth header
  const getAuthHeader = async () => {
    const token = await user.getIdToken();
    return {
      Authorization: `Bearer ${token}`,
    };
  };

  // ================= LOAD REQUESTS =================
  const loadRequests = async () => {
    if (!user?.email) return;
    try {
      const headers = await getAuthHeader();
      const res = await axios.get(
        `http://localhost:5001/my-requests?email=${user.email}`,
        { headers }
      );
      setRequests(res.data || []);
    } catch (err) {
      console.error("LOAD REQUESTS ERROR:", err.response?.data || err.message);
    }
  };

  // ================= LOAD ASSETS =================
  const loadAssets = async () => {
    setLoading(true);
    try {
      const res = await axios.get(
        `http://localhost:5001/assets?page=${page}&limit=${limit}`
      );
      setAssets(res.data.assets || []);
      setTotalPages(res.data.totalPages || 1);
    } catch (err) {
      console.error("LOAD ASSETS ERROR:", err.response?.data || err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user?.email) {
      loadAssets();
      loadRequests();
    }
  }, [user, page]);

  // ================= REQUEST ASSET =================
  const handleRequest = async (asset) => {
    try {
      const headers = await getAuthHeader();

      const res = await axios.post(
        "http://localhost:5001/requests",
        {
          assetId: asset._id,
          assetName: asset.productName,
          assetType: asset.productType,
          requesterName: user.displayName,
          requesterEmail: user.email,
          hrEmail: asset.hrEmail,
          companyName: asset.companyName,
          note: "",
        },
        { headers }
      );

      if (res.data.success) {
        setMessage({
          type: "success",
          text: "Request sent successfully!",
        });
        loadRequests(); // 🔥 always sync from server
      }
    } catch (err) {
      console.error("REQUEST ERROR:", err.response?.data || err.message);
      setMessage({
        type: "error",
        text: err.response?.data?.message || "Failed to request asset",
      });
    }
  };

  if (loading) {
    return <p className="text-center mt-10">Loading assets...</p>;
  }

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Request Asset</h1>

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

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {assets.map((asset) => {
          const alreadyRequested = requests.some(
            (r) => r.assetId?.toString() === asset._id
          );

          return (
            <div key={asset._id} className="bg-white p-4 shadow rounded">
              <img
                src={asset.productImage || "https://via.placeholder.com/150"}
                alt={asset.productName}
                className="h-40 w-full object-cover"
              />

              <h3 className="mt-2 font-semibold">{asset.productName}</h3>
              <p>Type: {asset.productType}</p>
              <p>Available: {asset.availableQuantity}</p>

              <button
                disabled={alreadyRequested}
                onClick={() => handleRequest(asset)}
                className="btn btn-primary w-full mt-3"
              >
                {alreadyRequested ? "Requested" : "Request"}
              </button>
            </div>
          );
        })}
      </div>

      {/* PAGINATION */}
      <div className="flex justify-center mt-6 gap-2">
        <button
          onClick={() => page > 1 && setPage(page - 1)}
          disabled={page === 1}
          className="px-3 py-1 border rounded disabled:opacity-50"
        >
          Previous
        </button>

        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i + 1}
            onClick={() => setPage(i + 1)}
            className={`px-3 py-1 border rounded ${
              page === i + 1 ? "bg-blue-500 text-white" : ""
            }`}
          >
            {i + 1}
          </button>
        ))}

        <button
          onClick={() => page < totalPages && setPage(page + 1)}
          disabled={page === totalPages}
          className="px-3 py-1 border rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default RequestAsset;
