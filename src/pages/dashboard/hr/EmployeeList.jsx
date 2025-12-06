import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../../../providers/AuthContext";

const MyTeam = () => {
  const { user } = useContext(AuthContext);
  const [hrs, setHrs] = useState([]);

  useEffect(() => {
    if (!user?.email) return;

    axios.get(`http://localhost:5001/team-hrs/${user.email}`)
      .then(res => setHrs(res.data.hrs || []))
      .catch(err => console.error(err));
  }, [user]);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">My HR Team</h1>

      {hrs.length === 0 ? (
        <p>No HRs assigned yet.</p>
      ) : (
        <ul className="space-y-3">
          {hrs.map(hr => (
            <li key={hr.email} className="p-4 border rounded-lg shadow">
              <p><strong>Name:</strong> {hr.name}</p>
              <p><strong>Email:</strong> {hr.email}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default MyTeam;
