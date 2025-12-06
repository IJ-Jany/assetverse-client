import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../../../providers/AuthContext";

const HRRequests = () => {
  const { user } = useContext(AuthContext);
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user?.email) return;

    axios.get(`http://localhost:5001/hr-requests/${user.email}`)
      .then(res => setRequests(res.data.requests || []))
      .catch(err => console.error(err))
      .finally(() => setLoading(false));
  }, [user]);

  const handleUpdate = async (id, status) => {
    try {
      await axios.patch(`http://localhost:5001/requests/update/${id}`, {
        status,
        hrEmail: user.email
      });

      setRequests(prev =>
        prev.map(r =>
          r._id === id ? { ...r, requestStatus: status } : r
        )
      );
    } catch (err) {
      console.error(err);
      alert("Failed to update request.");
    }
  };

  if (loading) return <p className="text-center mt-10">Loading requests...</p>;

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Employee Requests</h1>

      {requests.length === 0 ? (
        <p className="text-gray-500">No requests yet.</p>
      ) : (
        <div className="space-y-4">
          {requests.map(req => (
            <div
              key={req._id}
              className="p-4 border rounded-lg shadow hover:shadow-md transition"
            >
              <h2 className="font-bold text-lg">{req.assetName}</h2>
              <p><strong>Employee:</strong> {req.requesterName} ({req.requesterEmail})</p>
              <p><strong>Type:</strong> {req.assetType}</p>
              <p><strong>Date:</strong> {new Date(req.requestDate).toLocaleDateString()}</p>

              <div className="mt-3 flex gap-3">
                {req.requestStatus === "pending" ? (
                  <>
                    <button
                      onClick={() => handleUpdate(req._id, "approved")}
                      className="btn bg-green-600 text-white"
                    >
                      Approve
                    </button>
                    <button
                      onClick={() => handleUpdate(req._id, "rejected")}
                      className="btn bg-red-600 text-white"
                    >
                      Reject
                    </button>
                  </>
                ) : (
                  <span
                    className={`px-3 py-1 rounded-full text-sm ${
                      req.requestStatus === "approved"
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {req.requestStatus.toUpperCase()}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default HRRequests;
