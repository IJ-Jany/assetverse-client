import React, { useEffect, useState } from "react";
import { FaUser, FaEnvelope, FaBirthdayCake } from "react-icons/fa";

const mockProfile = {
  name: "John Doe",
  email: "john@example.com",
  dob: "1990-05-15",
  photo: "https://randomuser.me/api/portraits/men/32.jpg",
  role: "Employee",
};

const Profile = () => {
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    // Simulate fetching profile from API
    setTimeout(() => {
      setProfile(mockProfile);
    }, 500);
  }, []);

  if (!profile) return <p className="p-6 text-gray-500">Loading profile...</p>;

  return (
    <div className="p-6 flex flex-col items-center">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md text-center">
        <img
          src={profile.photo}
          alt={profile.name}
          className="w-32 h-32 rounded-full mx-auto border-4 border-blue-600 mb-4"
        />
        <h1 className="text-2xl font-bold text-gray-700 mb-2">{profile.name}</h1>
        <p className="text-gray-500 mb-1 flex items-center justify-center gap-2">
          <FaEnvelope /> {profile.email}
        </p>
        <p className="text-gray-500 mb-1 flex items-center justify-center gap-2">
          <FaBirthdayCake /> {profile.dob}
        </p>
        <p className="text-gray-600 font-semibold mt-2">{profile.role}</p>
      </div>
    </div>
  );
};

export default Profile;
