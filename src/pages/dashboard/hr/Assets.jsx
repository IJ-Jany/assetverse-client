import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../../../providers/AuthContext";
import { FaEdit, FaTrash, FaUpload } from "react-icons/fa";
import { toast } from "react-toastify";

const Assets = () => {
  const { user } = useContext(AuthContext);
  const [assets, setAssets] = useState([]);
  const [search, setSearch] = useState("");

  const [editModalOpen, setEditModalOpen] = useState(false);
  const [selectedAsset, setSelectedAsset] = useState(null);
  const [updatedImage, setUpdatedImage] = useState(null);

  const imgbbKey = import.meta.env.VITE_IMGBB_KEY;

  // FETCH ASSETS
  useEffect(() => {
    if (!user?.email) return;

    axios
      .get(`http://localhost:5001/assets/${user.email}`)
      .then((res) => setAssets(res.data))
      .catch((err) => console.error(err));
  }, [user]);


  // DELETE ASSET
  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this asset?")) return;

    try {
      await axios.delete(`http://localhost:5001/assets/${id}`);
      setAssets((prev) => prev.filter((asset) => asset._id !== id));
      toast.success("Asset deleted!");
    } catch (err) {
      console.error(err);
      toast.error("Failed to delete!");
    }
  };


  // OPEN EDIT MODAL
  const handleEdit = (asset) => {
    setSelectedAsset(asset);
    setUpdatedImage(null);
    setEditModalOpen(true);
  };


  // SUBMIT EDIT
  const handleEditSubmit = async (e) => {
    e.preventDefault();

    try {
      let updatedImageURL = selectedAsset.productImage;

      if (updatedImage) {
        const formData = new FormData();
        formData.append("image", updatedImage);

        const uploadRes = await fetch(
          `https://api.imgbb.com/1/upload?key=${imgbbKey}`,
          { method: "POST", body: formData }
        );

        const uploadData = await uploadRes.json();
        updatedImageURL = uploadData.data.url;
      }

      const updatedData = {
        productName: selectedAsset.productName,
        productType: selectedAsset.productType,
        productQuantity: Number(selectedAsset.productQuantity),
        productImage: updatedImageURL,
      };

      await axios.put(
        `http://localhost:5001/assets/${selectedAsset._id}`,
        updatedData
      );

      toast.success("Asset updated!");

      // Update UI
      setAssets((prev) =>
        prev.map((a) =>
          a._id === selectedAsset._id ? { ...a, ...updatedData } : a
        )
      );

      setEditModalOpen(false);

    } catch (err) {
      console.error(err);
      toast.error("Failed to update asset!");
    }
  };


  const filteredAssets = assets.filter((asset) =>
    asset.productName.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6 text-gray-700">My Company Assets</h1>

      {/* Search */}
      <input
        type="text"
        placeholder="Search asset..."
        className="border p-2 rounded-lg mb-4 w-full md:w-1/3"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {/* Asset Table */}
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
                  {/* Edit */}
                  <button
                    className="bg-blue-500 text-white px-3 py-1 rounded-lg hover:bg-blue-600"
                    onClick={() => handleEdit(asset)}
                  >
                    <FaEdit />
                  </button>

                  {/* Delete */}
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


      {/* EDIT MODAL */}
      {editModalOpen && (
        <div className="fixed inset-0 bg-gray-400 flex justify-center items-center">

          <div className="bg-white p-6 rounded-xl w-96 shadow-xl">
            <h2 className="text-xl font-bold mb-4">Edit Asset</h2>

            <form onSubmit={handleEditSubmit} className="space-y-3">

              <input
                type="text"
                className="input input-bordered w-full"
                value={selectedAsset.productName}
                onChange={(e) =>
                  setSelectedAsset({ ...selectedAsset, productName: e.target.value })
                }
                required
              />

              <input
                type="number"
                min={1}
                className="input input-bordered w-full"
                value={selectedAsset.productQuantity}
                onChange={(e) =>
                  setSelectedAsset({ ...selectedAsset, productQuantity: e.target.value })
                }
                required
              />

              <select
                className="select select-bordered w-full"
                value={selectedAsset.productType}
                onChange={(e) =>
                  setSelectedAsset({ ...selectedAsset, productType: e.target.value })
                }
              >
                <option value="Returnable">Returnable</option>
                <option value="Non-returnable">Non-returnable</option>
              </select>

              <input
                type="file"
                accept="image/*"
                className="file-input file-input-bordered w-full"
                onChange={(e) => setUpdatedImage(e.target.files[0])}
              />

              <div className="flex justify-end gap-3 mt-4">
                <button
                  type="button"
                  className="btn bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-md hover:scale-105 transition duration-300"
                  onClick={() => setEditModalOpen(false)}
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="btn bg-blue-600 text-white"
                >
                  <FaUpload /> Update
                </button>
              </div>

            </form>
          </div>

        </div>
      )}
    </div>
  );
};

export default Assets;
