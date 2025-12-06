import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../../../providers/AuthContext";

const MyTeam = () => {
  const { user } = useContext(AuthContext);
  const [team, setTeam] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user?.email) {
      axios
        .get(`http://localhost:5001/team/${user.email}`)
        .then((res) => {
          if (res.data.success) {
            setTeam(res.data.team);
          }
        })
        .catch((err) => console.error(err))
        .finally(() => setLoading(false));
    }
  }, [user]);

  if (loading) return <p>Loading your team...</p>;

  if (!team.length) return <p>No HR assigned yet or no approved assets.</p>;

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">My HRs</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {team.map((hr) => (
          <div
            key={hr.email}
            className="bg-white p-4 rounded-lg shadow hover:shadow-lg transition-all"
          >
            <img
              src={hr.photo || "https://via.placeholder.com/150"}
              alt={hr.name}
              className="w-24 h-24 rounded-full mx-auto mb-4"
            />
            <h3 className="text-lg font-semibold text-center">{hr.name}</h3>
            <p className="text-center text-gray-500 text-sm">{hr.email}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyTeam;
