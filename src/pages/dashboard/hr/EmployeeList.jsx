import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../../../providers/AuthContext";
import { toast } from "react-toastify";

const EmployeeList = () => {
  const { user } = useContext(AuthContext); 
  const [employees, setEmployees] = useState([]);

  // NEW STATE FOR X/Y
  const [countInfo, setCountInfo] = useState({ current: 0, limit: 0 });

  useEffect(() => {
    if (!user) return;

    axios
      .get(`http://localhost:5001/hr/team-members/${user.email}`)
      .then((res) => {
        if (res.data.success) {
          setEmployees(res.data.employees);

          // NEW: get count & package limit
          setCountInfo({
            current: res.data.currentCount,
            limit: res.data.packageLimit,
          });

          toast.success("Employees loaded", { autoClose: 800 });
        }
      })
      .catch((err) => {
        console.error(err);
        toast.error("Failed to fetch employees");
      });
  }, [user]);

  const handleRemove = async (id) => {
    if (!window.confirm("Remove this employee from your team?")) {
      toast.info("Action cancelled");
      return;
    }

    try {
      const res = await axios.put(
        `http://localhost:5001/hr/remove-employee/${id}`,
        { hrEmail: user.email }
      );

      if (res.data.success) {
        setEmployees((prev) => prev.filter((emp) => emp._id !== id));

        // NEW: update count automatically
        setCountInfo((prev) => ({ ...prev, current: prev.current - 1 }));

        toast.success("Employee removed from team!", { autoClose: 1000 });
      } else {
        toast.error("Failed to remove employee");
      }
    } catch (err) {
      console.error(err);
      toast.error("Error removing employee");
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-2 text-gray-700">My Employees</h1>

      {/* NEW: X / Y EMPLOYEES USED */}
      <p className="text-lg font-semibold text-gray-700 mb-4">
        {countInfo.current} / {countInfo.limit} employees used.
      </p>

      <p className="mb-4 text-gray-600">
        {employees.length} employees assigned to you.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {employees.map((emp) => (
          <div
            key={emp._id}
            className="bg-white rounded-lg shadow p-4 flex flex-col items-center hover:shadow-lg transition"
          >
            <img
              src={emp.photo || "/default-avatar.png"}
              alt={emp.name}
              className="w-24 h-24 rounded-full mb-3"
            />

            <h3 className="font-bold text-lg">{emp.name}</h3>
            <p className="text-sm text-gray-500">{emp.email}</p>

            <p className="text-sm text-gray-500">
              Joined: {emp.joinDate ? new Date(emp.joinDate).toLocaleDateString() : "N/A"}
            </p>

            <p className="text-sm text-gray-600">Assets: {emp.assetsCount}</p>

            <button
              onClick={() => handleRemove(emp._id)}
              className="mt-3 px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700 transition"
            >
              Remove from Team
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EmployeeList;
