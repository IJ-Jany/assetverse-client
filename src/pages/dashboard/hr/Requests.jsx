import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../../../providers/AuthContext";
import { FaCheck, FaTimes } from "react-icons/fa";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Swal from "sweetalert2";

const Requests = () => {
  const { user } = useContext(AuthContext);
  const [requests, setRequests] = useState([]);
  useEffect(() => {
    if (!user?.email) return;

    const fetchRequests = async () => {
      try {
        const headers = { Authorization: `Bearer ${user.accessToken}` };

        const res = await axios.get(
          `https://asset-server.vercel.app/hr-requests/${user.email}`,
          { headers }
        );

        if (res.data.success) setRequests(res.data.requests);
        else toast.error(res.data.message || "Failed to fetch requests");
      } catch (err) {
        console.error("FETCH ERROR:", err.response?.data || err.message);
        toast.error("Error fetching requests");
      }
    };

    fetchRequests();
  }, [user]);
  const handleApprove = async (request) => {
    const result = await Swal.fire({
      title: "Approve this request?",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Yes, approve",
      cancelButtonText: "Cancel",
    });

    if (!result.isConfirmed) return;

    try {
      const headers = { Authorization: `Bearer ${user.accessToken}` };

      const res = await axios.put(
        `https://asset-server.vercel.app/requests/approve/${request._id}`,
        {},
        { headers }
      );

      if (!res.data.success) {
        toast.error(res.data.message || "Failed to approve request");
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
      toast.error(err.response?.data?.message || "Error approving request");
    }
  };

  const handleReject = async (request) => {
    const result = await Swal.fire({
      title: "Reject this request?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, reject",
      cancelButtonText: "Cancel",
    });

    if (!result.isConfirmed) return;

    try {
      const headers = { Authorization: `Bearer ${user.accessToken}` };

      const res = await axios.put(
        `https://asset-server.vercel.app/requests/reject/${request._id}`,
        {},
        { headers }
      );

      if (!res.data.success) {
        toast.error(res.data.message || "Failed to reject request");
        return;
      }

      setRequests((prev) =>
        prev.map((r) =>
          r._id === request._id ? { ...r, requestStatus: "rejected" } : r
        )
      );

      toast.success("Request rejected successfully!");
    } catch (err) {
      console.error(
        "REJECT ERROR:",
        err.response?.status,
        err.response?.data || err.message
      );
      toast.error(err.response?.data?.message || "Error rejecting request");
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
                        onClick={() => handleReject(req)}
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
