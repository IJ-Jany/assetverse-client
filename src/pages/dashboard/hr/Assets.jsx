import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../../../providers/AuthContext";
import { FaEdit, FaTrash } from "react-icons/fa";

const Assets = () => {
  const { user } = useContext(AuthContext);
  const [assets, setAssets] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    if (!user?.email) return;

    axios
      .get(`http://localhost:5001/assets/${user.email}`)
      .then((res) => setAssets(res.data))
      .catch((err) => console.error(err));
  }, [user]);

  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this asset?")) return;

    try {
      await axios.delete(`http://localhost:5001/assets/${id}`);
      setAssets((prev) => prev.filter((asset) => asset._id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  const filteredAssets = assets.filter((asset) =>
    asset.productName.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6 text-gray-700">My Company Assets</h1>

      <input
        type="text"
        placeholder="Search asset..."
        className="border p-2 rounded-lg mb-4 w-full md:w-1/3"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <div className="overflow-x-auto bg-white rounded-xl shadow-lg p-4">
        <table className="w-full table-auto">
          <thead>
            <tr className="border-b text-left">
              <th className="p-3">Image</th>
              <th className="p-3">Name</th>
              <th className="p-3">Type</th>
              <th className="p-3">Quantity</th>
              <th className="p-3">Date Added</th>
              <th className="p-3">Actions</th>
            </tr>
          </thead>

          <tbody>
            {filteredAssets.map((asset) => (
              <tr key={asset._id} className="border-b hover:bg-gray-50">
                <td className="p-3">
                  <img
                    src={asset.productImage || "https://via.placeholder.com/80"}
                    className="w-16 h-16 object-cover rounded"
                  />
                </td>

                <td className="p-3 font-semibold">{asset.productName}</td>

                <td className="p-3">{asset.productType}</td>

                <td className="p-3">
                  {asset.availableQuantity}/{asset.productQuantity}
                </td>

                <td className="p-3">
                  {new Date(asset.dateAdded).toLocaleDateString()}
                </td>

                <td className="p-3 flex gap-3">
                  <button
                    className="bg-blue-500 text-white px-3 py-1 rounded-lg hover:bg-blue-600"
                    onClick={() => alert("Edit popup আসবে চাইলে আমি বানিয়ে দেবো।")}
                  >
                    <FaEdit />
                  </button>

                  <button
                    className="bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-600"
                    onClick={() => handleDelete(asset._id)}
                  >
                    <FaTrash />
                  </button>
                </td>

              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Assets;
