import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../../../providers/AuthContext";

const MyTeam = () => {
  const { user } = useContext(AuthContext);
  const [hrs, setHrs] = useState([]);
  const [colleagues, setColleagues] = useState([]);
  const [company, setCompany] = useState("");
  const [birthdays, setBirthdays] = useState([]);
  const [selectedCompany, setSelectedCompany] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user?.email) return;

    const loadData = async () => {
      setLoading(true);

      try {
        // Fetch team data
        const res = await axios.get(`http://localhost:5001/my-team/${user.email}`);
        if (res.data.success) {
          setHrs(res.data.hrs);
          setColleagues(res.data.colleagues);
          setCompany(res.data.company);
          setSelectedCompany(res.data.company);
        }

        // Fetch birthdays
        const resBirth = await axios.get(
          `http://localhost:5001/upcoming-birthdays?email=${user.email}`
        );
        setBirthdays(resBirth.data.birthdays || []);

      } catch (err) {
        console.error(err);
      }

      setLoading(false);
    };

    loadData();
  }, [user]);

  if (loading) return <p>Loading team...</p>;

  // Filter colleagues by selected company (future proof for multi-company)
  const filteredColleagues = colleagues.filter(
    (c) => c.companyName === selectedCompany
  );

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">My Team</h2>

      {/* Company Dropdown */}
      <div className="mb-4">
        <label className="font-semibold">Select Company:</label>
        <select
          className="select select-bordered ml-2"
          value={selectedCompany}
          onChange={(e) => setSelectedCompany(e.target.value)}
        >
          <option value={company}>{company}</option>
        </select>
      </div>

      {/* HR Section */}
      <h3 className="text-xl font-bold mb-2">My HR(s)</h3>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {hrs.length === 0 && <p>No HR assigned yet.</p>}

        {hrs.map((hr) => (
          <div key={hr.email} className="bg-white p-4 rounded-lg shadow text-center">
            <img
              src={hr.photo || "https://via.placeholder.com/150"}
              alt={hr.name}
              className="w-24 h-24 rounded-full mx-auto mb-4"
            />
            <h3 className="text-lg font-semibold">{hr.name}</h3>
            <p className="text-gray-500 text-sm">{hr.email}</p>
            <p className="text-gray-500 text-sm">{hr.position || "HR"}</p>
          </div>
        ))}
      </div>

      {/* Colleague Section */}
      <h3 className="text-xl font-bold mb-2">Colleagues</h3>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {filteredColleagues.length === 0 && <p>No colleagues found.</p>}

        {filteredColleagues.map((emp) => (
          <div key={emp.email} className="bg-white p-4 rounded-lg shadow text-center">
            <img
              src={emp.photo || "https://via.placeholder.com/150"}
              alt={emp.name}
              className="w-24 h-24 rounded-full mx-auto mb-4"
            />
            <h3 className="text-lg font-semibold">{emp.name}</h3>
            <p className="text-gray-500 text-sm">{emp.email}</p>
            <p className="text-gray-500 text-sm">{emp.position || "Employee"}</p>
          </div>
        ))}
      </div>

      {/* Birthdays */}
      {birthdays.length > 0 && (
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h3 className="text-xl font-bold mb-4">
            Upcoming Birthdays ({new Date().toLocaleString("default", { month: "long" })})
          </h3>
          <ul className="list-disc pl-6">
            {birthdays.map((emp) => (
              <li key={emp.email}>
                {emp.name} – {new Date(emp.dob).toLocaleDateString()}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default MyTeam;
