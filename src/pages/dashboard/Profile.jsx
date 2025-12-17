import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { AuthContext } from "../../providers/AuthContext";

const Profile = () => {
  const { user } = useContext(AuthContext);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  const [name, setName] = useState("");
  const [dob, setDob] = useState("");
  const [imagePreview, setImagePreview] = useState(null);
  const [profileImageFile, setProfileImageFile] = useState(null);

  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState(null);

  const IMGBB_KEY = import.meta.env.VITE_IMGBB_KEY;

useEffect(() => {
  if (!user?.email) return;

  const fetchProfile = async () => {
    try {
      const res = await axios.get(`https://asset-server.vercel.app/users/${user.email}`);
      const data = res.data.user;

      setProfile(data);
      setName(data.name || "");
      let dobValue = "";
      if (data.dateOfBirth) {
        const d = new Date(data.dateOfBirth);
        if (!isNaN(d)) {
          dobValue = d.toISOString().split("T")[0]; 
        }
      }
      setDob(dobValue);

   
      setImagePreview(data.photo || user.photoURL || null);

    } catch (err) {
      console.error("Fetch profile error:", err);
    } finally {
      setLoading(false);
    }
  };

  fetchProfile();
}, [user]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfileImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const uploadToImgBB = async (file) => {
    const form = new FormData();
    form.append("image", file);
    const response = await axios.post(`https://api.imgbb.com/1/upload?key=${IMGBB_KEY}`, form);
    return response.data.data.url;
  };

const handleSave = async () => {
  if (!profile) return;

  setSaving(true);
  setMessage(null);

  try {
    let uploadedImageUrl = profile.photo || null;
    if (profileImageFile) {
      const formData = new FormData();
      formData.append("image", profileImageFile);

      const uploadRes = await fetch(
        `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMGBB_KEY}`,
        { method: "POST", body: formData }
      );
      const uploadData = await uploadRes.json();

      if (uploadData.success) {
        uploadedImageUrl = uploadData.data.url;
      } else {
        throw new Error("Image upload failed");
      }
    }
    const updatedData = {
      name,
      photo: uploadedImageUrl,
      dateOfBirth: dob, 
    };
    await axios.put(`https://asset-server.vercel.app/users/${user.email}`, updatedData);
    setProfile(prev => ({ ...prev, ...updatedData }));
    setImagePreview(uploadedImageUrl);
    setMessage({ type: "success", text: "Profile updated successfully!" });

  } catch (err) {
    console.error(err.response?.data || err.message);
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
          <p className={`mb-4 px-4 py-2 rounded ${message.type === "success" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>
            {message.text}
          </p>
        )}

        <div className="flex justify-center mb-4">
          {imagePreview ? (
            <img src={imagePreview} alt={name} className="w-32 h-32 rounded-full border-4 border-primary object-cover" />
          ) : (
            <div className="w-32 h-32 rounded-full border-4 border-primary flex items-center justify-center text-gray-400">
              No Image
            </div>
          )}
        </div>

        <input type="file" accept="image/*" onChange={handleImageChange} className="mb-4 w-full" />

        <div className="mb-4">
          <label className="block font-medium mb-1">Full Name</label>
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} className="input input-bordered w-full" />
        </div>

        <div className="mb-4">
          <label className="block font-medium mb-1">Email</label>
          <input type="email" value={profile.email} readOnly className="input input-bordered w-full bg-gray-100 cursor-not-allowed" />
        </div>

        <div className="mb-4">
          <label className="block font-medium mb-1">Date of Birth</label>
          <input type="date" value={dob} onChange={(e) => setDob(e.target.value)} className="input input-bordered w-full" />
        </div>

        <p className="mb-4 badge badge-primary badge-outline">{profile.role}</p>

        <button className="btn btn-primary w-full" onClick={handleSave} disabled={saving}>
          {saving ? "Saving..." : "Update Profile"}
        </button>
      </div>
    </div>
  );
};

export default Profile;
