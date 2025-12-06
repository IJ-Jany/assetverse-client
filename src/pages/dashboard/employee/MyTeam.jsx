import React, { useEffect, useState } from "react";
import { FaUserTie, FaEnvelope } from "react-icons/fa";

const mockTeam = [
  {
    id: 1,
    name: "Alice Johnson",
    role: "Frontend Developer",
    email: "alice@example.com",
    photo: "https://randomuser.me/api/portraits/women/68.jpg",
  },
  {
    id: 2,
    name: "Bob Smith",
    role: "Backend Developer",
    email: "bob@example.com",
    photo: "https://randomuser.me/api/portraits/men/45.jpg",
  },
  {
    id: 3,
    name: "Catherine Lee",
    role: "UI/UX Designer",
    email: "catherine@example.com",
    photo: "https://randomuser.me/api/portraits/women/22.jpg",
  },
  {
    id: 4,
    name: "David Brown",
    role: "QA Engineer",
    email: "david@example.com",
    photo: "https://randomuser.me/api/portraits/men/34.jpg",
  },
];

const MyTeam = () => {
  const [team, setTeam] = useState([]);

  useEffect(() => {
    // Simulate fetching team members from API
    setTimeout(() => {
      setTeam(mockTeam);
    }, 500);
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6 text-gray-700">My Team</h1>

      {team.length === 0 ? (
        <p className="text-gray-500">No team members found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {team.map((member) => (
            <div
              key={member.id}
              className="bg-white p-5 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300"
            >
              <div className="flex items-center gap-4 mb-4">
                <img
                  src={member.photo}
                  alt={member.name}
                  className="w-16 h-16 rounded-full object-cover border-2 border-blue-500"
                />
                <div>
                  <h2 className="text-xl font-bold text-gray-700">
                    {member.name}
                  </h2>
                  <p className="text-gray-500 flex items-center gap-1">
                    <FaUserTie /> {member.role}
                  </p>
                  <p className="text-gray-400 flex items-center gap-1 mt-1">
                    <FaEnvelope /> {member.email}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyTeam;
