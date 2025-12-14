import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../../../providers/AuthContext";
import { FaCheck, FaTimes } from "react-icons/fa";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Requests = () => {
  const { user } = useContext(AuthContext);
  const [requests, setRequests] = useState([]);


useEffect(() => {
  if (!user?.email) return;

  const fetchRequests = async () => {
    try {
      const token = await user.getIdToken(true);
      console.log("User email:", user.email);
      console.log("Firebase token:", token);

      const headers = { Authorization: `Bearer ${token}` };

      const res = await axios.get(
        `http://localhost:5001/hr-requests/${user.email}`,
        { headers }
      );
      console.log("HR Requests Response:", res.data);
      if (res.data.success) setRequests(res.data.requests);
    } catch (err) {
      console.error("FETCH ERROR:", err.response?.data || err.message);
    }
  };

  fetchRequests();
}, [user]);


  // ================= APPROVE =================
  const handleApprove = async (request) => {
    if (!window.confirm("Approve this request?")) return;

    try {
      const token = await user.getIdToken(true);
      const headers = { Authorization: `Bearer ${token}` };

      const res = await axios.put(
        `http://localhost:5001/requests/approve/${request._id}`,
        {},
        { headers }
      );

      if (!res.data.success) {
        toast.error("Failed to approve request");
        return;
      }

      setRequests((prev) =>
        prev.map((r) =>
          r._id === request._id ? { ...r, requestStatus: "approved" } : r
        )
      );

      toast.success("Request approved successfully!");
    } catch (err) {
      console.error(
        "APPROVE ERROR:",
        err.response?.status,
        err.response?.data || err.message
      );
      toast.error("Error approving request");
    }
  };
  const handleReject = async (id) => {
    if (!window.confirm("Reject this request?")) return;

    try {
      const token = await user.getIdToken(true);
      const headers = { Authorization: `Bearer ${token}` };

      const res = await axios.put(
        `http://localhost:5001/requests/reject/${id}`,
        {},
        { headers }
      );

      if (res.data.success) {
        setRequests((prev) =>
          prev.map((r) =>
            r._id === id ? { ...r, requestStatus: "rejected" } : r
          )
        );
        toast.success("Request rejected!");
      } else {
        toast.error("Failed to reject request");
      }
    } catch (err) {
      console.error(
        "REJECT ERROR:",
        err.response?.status,
        err.response?.data || err.message
      );
      toast.error("Error rejecting request");
    }
  };

  return (
    <div className="p-6">
      <ToastContainer position="top-right" autoClose={3000} />
      <h1 className="text-3xl font-bold mb-6">Asset Requests</h1>

      <div className="overflow-x-auto bg-white p-4 rounded shadow">
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
              <tr key={req._id} className="border-b">
                <td className="p-3">
                  {req.requesterName}
                  <br />
                  <small>{req.requesterEmail}</small>
                </td>
                <td className="p-3">{req.assetName}</td>
                <td className="p-3">
                  {new Date(req.requestDate).toLocaleDateString()}
                </td>
                <td className="p-3">{req.requestStatus}</td>
                <td className="p-3 flex gap-2">
                  {req.requestStatus === "pending" && (
                    <>
                      <button
                        onClick={() => handleApprove(req)}
                        className="bg-green-600 text-white px-3 py-2 rounded"
                      >
                        <FaCheck />
                      </button>
                      <button
                        onClick={() => handleReject(req._id)}
                        className="bg-red-600 text-white px-3 py-2 rounded"
                      >
                        <FaTimes />
                      </button>
                    </>
                  )}
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
