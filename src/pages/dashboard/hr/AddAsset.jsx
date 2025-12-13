import { useState, useContext } from "react";
import axios from "axios";
import { FaPlus, FaUpload } from "react-icons/fa";
import { AuthContext } from "../../../providers/AuthContext";
import { toast } from "react-toastify";

const AddAsset = () => {
  const { user } = useContext(AuthContext);

  const [productName, setProductName] = useState("");
  const [productImage, setProductImage] = useState(null);
  const [productType, setProductType] = useState("Returnable");
  const [productQuantity, setProductQuantity] = useState(1);

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);

  const imgbbKey = import.meta.env.VITE_IMGBB_KEY;

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user?.email) {
      setMessage({ type: "error", text: "HR email not found. Please login again." });
      return;
    }

    setLoading(true);
    setMessage(null);

    try {
      let uploadedImageURL = "";
      if (productImage) {
        const formData = new FormData();
        formData.append("image", productImage);

        const uploadRes = await fetch(
          `https://api.imgbb.com/1/upload?key=${imgbbKey}`,
          { method: "POST", body: formData }
        );

        const result = await uploadRes.json();
        uploadedImageURL = result.data.url;
      }

 
    const res = await axios.post(
  "http://localhost:5001/assets",
  {
    productName,
    productImage: uploadedImageURL,
    productType,
    productQuantity: Number(productQuantity),
    hrEmail: user.email,
    companyName: "AssetVerse",
  },
  {
    headers: {
      Authorization: `Bearer ${user.accessToken}`,
    },
  }
);

      if (res.data.success) {
        toast.success("Asset added successfully!"); 

        setMessage({ type: "success", text: "Asset added successfully!" });

     
        setProductName("");
        setProductImage(null);
        setProductQuantity(1);
        setProductType("Returnable");
      }

    } catch (err) {
      setMessage({
        type: "error",
        text: err.response?.data?.error || "Failed to add asset",
      });
      toast.error("Failed to add asset");
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
            message.type === "success"
              ? "bg-green-100 text-green-700"
              : "bg-red-100 text-red-700"
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
            className="input input-bordered w-full"
            required
          />
        </div>

        <div>
          <label className="block font-medium mb-1">Asset Image</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setProductImage(e.target.files[0])}
            className="file-input file-input-bordered w-full"
          />
          {productImage && (
            <p className="text-sm mt-1 text-gray-500">
              Selected: {productImage.name}
            </p>
          )}
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
          className="btn w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white flex items-center justify-center gap-2"
        >
          {loading ? (
            "Uploading & Adding..."
          ) : (
            <>
              <FaUpload /> Add Asset
            </>
          )}
        </button>
      </form>
    </div>
  );
};

export default AddAsset;
