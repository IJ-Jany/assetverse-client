import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../../../providers/AuthContext";

const EmployeeList = () => {
  const { user } = useContext(AuthContext); // logged in HR
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    if (!user) return;

    axios.get(`http://localhost:5001/hr/team-members/${user.email}`)
      .then(res => {
        if (res.data.success) setEmployees(res.data.employees);
      })
      .catch(err => console.error(err));
  }, [user]);

  const handleRemove = async (id) => {
    if (!window.confirm("Remove this employee from your team?")) return;

    try {
    
      await axios.put(`http://localhost:5001/hr/remove-employee/${id}`, { hrEmail: user.email });

      setEmployees(prev => prev.filter(emp => emp._id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6 text-gray-700">My Employees</h1>

      <p className="mb-4">
        {employees.length} employees assigned to you.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {employees.map(emp => (
          <div key={emp._id} className="bg-white rounded-lg shadow p-4 flex flex-col items-center">
            <img src={emp.photo || "/default-avatar.png"} alt={emp.name} className="w-24 h-24 rounded-full mb-3"/>
            <h3 className="font-bold">{emp.name}</h3>
            <p className="text-sm text-gray-500">{emp.email}</p>
            <p className="text-sm text-gray-500">Joined: {new Date(emp.joinDate).toLocaleDateString()}</p>
            <p className="text-sm text-gray-500">Assets: {emp.assetsCount}</p>

            <button
              onClick={() => handleRemove(emp._id)}
              className="mt-3 px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700"
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
