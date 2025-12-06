import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { FaBox, FaCalendarAlt } from "react-icons/fa";

const mockAssets = [
  { id: 1, name: "Laptop", available: true },
  { id: 2, name: "Monitor", available: true },
  { id: 3, name: "Keyboard", available: false },
  { id: 4, name: "Mouse", available: true },
];

const RequestAsset = () => {
  const [requests, setRequests] = useState([]);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = (data) => {
    // Simulate sending request to backend
    setRequests((prev) => [...prev, { ...data, status: "Pending" }]);
    reset();
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6 text-gray-700">Request Asset</h1>

      {/* Request Form */}
      <div className="bg-white p-6 rounded-xl shadow-lg mb-8">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="grid grid-cols-1 sm:grid-cols-2 gap-6"
        >
          {/* Select Asset */}
          <div>
            <label className="block mb-2 font-semibold text-gray-600 flex items-center gap-2">
              <FaBox /> Asset
            </label>
            <select
              {...register("asset", { required: "Select an asset" })}
              className="input input-bordered w-full"
            >
              <option value="">-- Choose an asset --</option>
              {mockAssets.map((asset) => (
                <option
                  key={asset.id}
                  value={asset.name}
                  disabled={!asset.available}
                >
                  {asset.name} {asset.available ? "" : "(Not Available)"}
                </option>
              ))}
            </select>
            {errors.asset && (
              <p className="text-red-500 text-xs mt-1">{errors.asset.message}</p>
            )}
          </div>

          {/* Request Date */}
          <div>
            <label className="block mb-2 font-semibold text-gray-600 flex items-center gap-2">
              <FaCalendarAlt /> Date
            </label>
            <input
              type="date"
              {...register("date", { required: "Select a date" })}
              className="input input-bordered w-full"
            />
            {errors.date && (
              <p className="text-red-500 text-xs mt-1">{errors.date.message}</p>
            )}
          </div>

          <div className="sm:col-span-2">
            <button
              type="submit"
              className="btn w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700 transition-all duration-300"
            >
              Submit Request
            </button>
          </div>
        </form>
      </div>

      {/* Request List */}
      <div className="bg-white p-6 rounded-xl shadow-lg">
        <h2 className="text-xl font-semibold mb-4 text-gray-700">Your Requests</h2>
        {requests.length === 0 ? (
          <p className="text-gray-500">No asset requests yet.</p>
        ) : (
          <ul className="space-y-4">
            {requests.map((req, index) => (
              <li
                key={index}
                className="flex justify-between items-center p-4 border rounded-lg hover:shadow-md transition-all duration-300"
              >
                <span>
                  <strong>{req.asset}</strong> - {req.date}
                </span>
                <span
                  className={`px-3 py-1 rounded-full text-sm font-semibold ${
                    req.status === "Pending"
                      ? "bg-yellow-100 text-yellow-800"
                      : req.status === "Approved"
                      ? "bg-green-100 text-green-800"
                      : "bg-red-100 text-red-800"
                  }`}
                >
                  {req.status}
                </span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default RequestAsset;
