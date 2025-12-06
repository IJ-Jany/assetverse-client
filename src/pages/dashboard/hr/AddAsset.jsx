import { useState } from "react";
import axios from "axios";
import { FaPlus } from "react-icons/fa";

const AddAsset = ({ hrEmail, companyName }) => {
  const [productName, setProductName] = useState("");
  const [productImage, setProductImage] = useState("");
  const [productType, setProductType] = useState("Returnable");
  const [productQuantity, setProductQuantity] = useState(1);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    try {
      const res = await axios.post("http://localhost:5001/assets", {
        productName,
        productImage,
        productType,
        productQuantity,
        hrEmail,
        companyName
      });

      if (res.data.success) {
        setMessage({ type: "success", text: "Asset added successfully!" });
        setProductName("");
        setProductImage("");
        setProductQuantity(1);
        setProductType("Returnable");
      }
    } catch (err) {
      setMessage({ type: "error", text: err.response?.data?.error || "Failed to add asset" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-lg max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-blue-700 flex items-center gap-2">
        <FaPlus /> Add New Asset
      </h2>

      {message && (
        <p
          className={`mb-4 px-4 py-2 rounded ${
            message.type === "success" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
          }`}
        >
          {message.text}
        </p>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block font-medium mb-1">Asset Name *</label>
          <input
            type="text"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
            placeholder="Laptop, Chair..."
            className="input input-bordered w-full"
            required
          />
        </div>

        <div>
          <label className="block font-medium mb-1">Asset Image URL</label>
          <input
            type="text"
            value={productImage}
            onChange={(e) => setProductImage(e.target.value)}
            placeholder="https://..."
            className="input input-bordered w-full"
          />
        </div>

        <div>
          <label className="block font-medium mb-1">Asset Type *</label>
          <select
            value={productType}
            onChange={(e) => setProductType(e.target.value)}
            className="select select-bordered w-full"
          >
            <option value="Returnable">Returnable</option>
            <option value="Non-returnable">Non-returnable</option>
          </select>
        </div>

        <div>
          <label className="block font-medium mb-1">Quantity *</label>
          <input
            type="number"
            value={productQuantity}
            onChange={(e) => setProductQuantity(e.target.value)}
            min={1}
            className="input input-bordered w-full"
            required
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="btn w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold hover:from-blue-700 hover:to-purple-700"
        >
          {loading ? "Adding..." : "Add Asset"}
        </button>
      </form>
    </div>
  );
};

export default AddAsset;
