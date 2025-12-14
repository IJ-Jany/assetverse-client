import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../../../providers/AuthContext";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const EmployeeList = () => {
  const { user } = useContext(AuthContext);
  const [employees, setEmployees] = useState([]);
  const [countInfo, setCountInfo] = useState({ current: 0, limit: 0 });
  const [loading, setLoading] = useState(true);

  const fetchEmployees = async () => {
    if (!user?.email || !user?.accessToken) return;
    setLoading(true);
    try {
      const res = await axios.get(
        `http://localhost:5001/hr/team-members/${user.email}`,
        { headers: { Authorization: `Bearer ${user.accessToken}` } }
      );

      if (res.data.success) {
        setEmployees(res.data.employees);
        setCountInfo({
          current: res.data.currentCount,
          limit: res.data.packageLimit,
        });
      }
    } catch (err) {
      console.error(err);
      toast.error("Failed to fetch employees");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, [user]);

const handleRemove = async (id) => {
  const confirmDelete = window.confirm("Are you sure you want to remove this employee?");
  if (!confirmDelete) return; // User clicked "Cancel"

  try {
    const res = await axios.delete(
      `http://localhost:5001/hr/remove-employee/${id}`,
      {
        headers: { Authorization: `Bearer ${user.accessToken}` },
        data: { hrEmail: user.email }
      }
    );

    if (res.data.success) {
      toast.success("Employee removed successfully!");
      fetchEmployees();
    } else {
      toast.error(res.data.message || "Failed to remove employee");
    }
  } catch (error) {
    console.error(error);
    toast.error("Something went wrong while removing employee");
  }
};



  if (loading) return <p className="p-6">Loading...</p>;

  return (
    <div className="p-6">
      <ToastContainer position="top-right" autoClose={3000} />
      <h1 className="text-3xl font-bold mb-2">My Employees</h1>
      <p className="text-lg font-semibold mb-4">
        {countInfo.current} / {countInfo.limit} employees used
      </p>

      {employees.length === 0 ? (
        <p>No employees assigned yet.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {employees.map((emp) => (
            <div
              key={emp._id}
              className="bg-white shadow rounded p-4 text-center"
            >
              <img
                src={emp.photo || "/default-avatar.png"}
                className="w-24 h-24 rounded-full mx-auto mb-3"
              />
              <h3 className="font-bold">{emp.name}</h3>
              <p className="text-sm text-gray-500">{emp.email}</p>
              <p className="text-sm">Assets: {emp.assetsCount}</p>

              <button
                onClick={() => handleRemove(emp._id)}
                className="mt-3 px-3 py-1 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded"
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default EmployeeList;
