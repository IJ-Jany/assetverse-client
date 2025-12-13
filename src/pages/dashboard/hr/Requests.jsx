import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../../../providers/AuthContext";
import { FaCheck, FaTimes } from "react-icons/fa";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Requests = () => {
  const { user } = useContext(AuthContext);
  const [requests, setRequests] = useState([]);


  const getToken = () => localStorage.getItem("access-token");

  useEffect(() => {
    if (!user) return;

    axios
      .get(`http://localhost:5001/hr-requests/${user.email}`, {
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      })
      .then((res) => {
        if (res.data.success) {
          setRequests(res.data.requests);
          toast.success("Requests loaded successfully!");
        } else {
          toast.error("Failed to load requests.");
        }
      })
      .catch((err) => {
        console.error(err);
        toast.error("Error fetching requests.");
      });
  }, [user]);

  const handleApprove = async (request) => {
    if (!confirm("Approve this request?")) return;

    try {
      const teamRes = await axios.get(
        `http://localhost:5001/hr/team-members/${user.email}`,
        {
          headers: {
            Authorization: `Bearer ${getToken()}`,
          },
        }
      );

      if (!teamRes.data.success) {
        toast.error("Failed to fetch team members.");
        return;
      }

      const teamSize = teamRes.data.currentCount;
      const packageLimit = teamRes.data.employeeLimit;

  
      if (teamSize >= packageLimit) {
        toast.error(
          `Cannot approve. Your package limit is ${packageLimit}. Upgrade your package.`
        );
        return;
      }
      const res = await axios.put(
        `http://localhost:5001/requests/approve/${request._id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${getToken()}`,
          },
        }
      );

      if (res.data.success) {
        await axios.post(
          "http://localhost:5001/assigned-users",
          {
            hrEmail: user.email,
            employeeEmail: request.requesterEmail,
            employeeName: request.requesterName,
            companyName: request.companyName,
            assetName: request.assetName,
            assignedDate: new Date(),
          },
          {
            headers: {
              Authorization: `Bearer ${getToken()}`,
            },
          }
        );
        setRequests((prev) =>
          prev.map((r) =>
            r._id === request._id ? { ...r, requestStatus: "approved" } : r
          )
        );

        toast.success("Request approved & employee assigned!");
      } else {
        toast.error("Failed to approve request.");
      }
    } catch (err) {
      console.error("Approve Error:", err);
      toast.error("Error approving request.");
    }
  };

  const handleReject = async (id) => {
    if (!confirm("Reject this request?")) return;

    try {
      const res = await axios.put(
        `http://localhost:5001/requests/reject/${id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${getToken()}`,
          },
        }
      );

      if (res.data.success) {
        setRequests((prev) =>
          prev.map((r) =>
            r._id === id ? { ...r, requestStatus: "rejected" } : r
          )
        );
        toast.success("Request rejected successfully!");
      } else {
        toast.error("Failed to reject request.");
      }
    } catch (err) {
      console.error(err);
      toast.error("Error rejecting request.");
    }
  };

  return (
    <div className="p-6">
      <ToastContainer position="top-right" autoClose={3000} />
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
                  {req.requestStatus === "pending" ? (
                    <>
                      <button
                        onClick={() => handleApprove(req)}
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
                  ) : (
                    <span>—</span>
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
