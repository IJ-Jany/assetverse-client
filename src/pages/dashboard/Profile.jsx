import React, { useContext, useEffect, useState } from "react";
import { FaUser, FaEnvelope, FaBirthdayCake } from "react-icons/fa";
import axios from "axios";
import { AuthContext } from "../../providers/AuthContext";

const Profile = () => {
  const { user } = useContext(AuthContext);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [name, setName] = useState("");
  const [dob, setDob] = useState("");
  const [profileImage, setProfileImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [affiliations, setAffiliations] = useState([]);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState(null);

  useEffect(() => {
    if (user?.email) {
      // Fetch user profile
      axios
        .get(`http://localhost:5001/users/${user.email}`)
        .then((res) => {
          const data = res.data;
          setProfile(data);
          setName(data.name || "");
          setDob(data.dateOfBirth || "");
          setProfileImage(null); // no new upload yet
          setImagePreview(data.profileImage || "https://i.ibb.co/ZT0J0Xh/user.png");
          setLoading(false);
        })
        .catch((err) => {
          console.error(err.message);
          setLoading(false);
        });

      // Fetch affiliations
      axios
        .get(`http://localhost:5001/employeeAffiliations/${user.email}`)
        .then((res) => setAffiliations(res.data || []))
        .catch((err) => console.error(err.message));
    }
  }, [user]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfileImage(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSave = async () => {
    setSaving(true);
    setMessage(null);

    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("dateOfBirth", dob);
      if (profileImage) formData.append("profileImage", profileImage);

      const res = await axios.put(`http://localhost:5001/users/${user.email}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setProfile(res.data);
      setMessage({ type: "success", text: "Profile updated successfully!" });
    } catch (err) {
      console.error(err);
      setMessage({ type: "error", text: "Failed to update profile" });
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <p className="p-6 text-center text-gray-500">Loading profile...</p>;
  if (!profile) return <p className="p-6 text-center text-red-500">No profile found</p>;

  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200 py-10">
      <div className="card w-full max-w-lg bg-base-100 shadow-xl p-6">

        {message && (
          <p
            className={`mb-4 px-4 py-2 rounded ${
              message.type === "success" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
            }`}
          >
            {message.text}
          </p>
        )}

        {/* Profile Photo */}
        <div className="flex justify-center mb-4">
          <img
            src={imagePreview}
            alt={name}
            className="w-32 h-32 rounded-full border-4 border-primary object-cover"
          />
        </div>
        <input type="file" onChange={handleImageChange} className="mb-4 w-full" />

        {/* Name */}
        <div className="mb-4">
          <label className="block font-medium mb-1">Full Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="input input-bordered w-full"
          />
        </div>

        {/* Email (read-only) */}
        <div className="mb-4">
          <label className="block font-medium mb-1">Email</label>
          <input
            type="email"
            value={profile.email}
            readOnly
            className="input input-bordered w-full bg-gray-100 cursor-not-allowed"
          />
        </div>

        {/* Date of Birth */}
        <div className="mb-4">
          <label className="block font-medium mb-1">Date of Birth</label>
          <input
            type="date"
            value={dob}
            onChange={(e) => setDob(e.target.value)}
            className="input input-bordered w-full"
          />
        </div>

        {/* Role */}
        <p className="mb-4 badge badge-primary badge-outline">{profile.role.toUpperCase()}</p>

        {/* Company Affiliations */}
        <div className="mb-4">
          <h3 className="font-medium mb-2">Company Affiliations</h3>
          {affiliations.length > 0 ? (
            <ul className="list-disc pl-5">
              {affiliations.map((a) => (
                <li key={a._id}>
                  {a.companyName} ({a.hrEmail})
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500">No company affiliations</p>
          )}
        </div>

        {/* Save Button */}
        <button
          className="btn btn-primary w-full"
          onClick={handleSave}
          disabled={saving}
        >
          {saving ? "Saving..." : "Update Profile"}
        </button>
      </div>
    </div>
  );
};

export default Profile;
