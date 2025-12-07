import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../../../providers/AuthContext";
import { FaCheck, FaTimes } from "react-icons/fa";

const Requests = () => {
  const { user } = useContext(AuthContext);
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    if (!user) return;
    axios
      .get(`http://localhost:5001/hr-requests/${user.email}`)
      .then((res) => {
        if (res.data.success) setRequests(res.data.requests);
      })
      .catch((err) => console.error(err));
  }, [user]);

  // Approve request
  const handleApprove = async (id) => {
    if (!confirm("Approve this request?")) return;

    try {
      const res = await axios.put(
        `http://localhost:5001/requests/approve/${id}`
      );

      if (res.data.success) {
        setRequests((prev) =>
          prev.map((r) =>
            r._id === id ? { ...r, requestStatus: "approved" } : r
          )
        );
      }
    } catch (err) {
      console.error(err);
    }
  };

  // Reject request
  const handleReject = async (id) => {
    if (!confirm("Reject this request?")) return;

    try {
      const res = await axios.put(
        `http://localhost:5001/requests/reject/${id}`
      );

      if (res.data.success) {
        setRequests((prev) =>
          prev.map((r) =>
            r._id === id ? { ...r, requestStatus: "rejected" } : r
          )
        );
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6 text-gray-700">Asset Requests</h1>

      <div className="overflow-x-auto bg-white p-4 rounded-xl shadow-lg">
        <table className="w-full">
          <thead>
            <tr className="border-b">
              <th className="p-3">Employee</th>
              <th className="p-3">Asset</th>
              <th className="p-3">Date</th>
              <th className="p-3">Status</th>
              <th className="p-3">Actions</th>
            </tr>
          </thead>

          <tbody>
            {requests.map((req) => (
              <tr key={req._id} className="border-b hover:bg-gray-50">
                <td className="p-3">
                  {req.requesterName} <br />
                  <small className="text-gray-500">{req.requesterEmail}</small>
                </td>

                <td className="p-3">{req.assetName}</td>

                <td className="p-3">
                  {new Date(req.requestDate).toLocaleDateString()}
                </td>

                <td className="p-3">
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-semibold 
                      ${
                        req.requestStatus === "pending"
                          ? "bg-yellow-100 text-yellow-700"
                          : req.requestStatus === "approved"
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }
                    `}
                  >
                    {req.requestStatus}
                  </span>
                </td>

                <td className="p-3 flex gap-3">
                  {req.requestStatus === "pending" && (
                    <>
                      <button
                        onClick={() => handleApprove(req._id)}
                        className="bg-green-600 text-white px-3 py-2 rounded-lg hover:bg-green-700"
                      >
                        <FaCheck />
                      </button>

                      <button
                        onClick={() => handleReject(req._id)}
                        className="bg-red-600 text-white px-3 py-2 rounded-lg hover:bg-red-700"
                      >
                        <FaTimes />
                      </button>
                    </>
                  )}

                  {req.requestStatus !== "pending" && <span>—</span>}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Requests;
