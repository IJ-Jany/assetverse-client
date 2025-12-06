import { useEffect, useState, useContext } from "react";
import axios from "../../../api/axios";
import { AuthContext } from "../../../providers/AuthContext";

const AssetsList = () => {
  const [assets, setAssets] = useState([]);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    axios.get("/assets")
      .then(res => setAssets(res.data))
      .catch(err => console.error(err));
  }, []);

  const requestAsset = (asset) => {
    axios.post("/requests", {
      assetId: asset._id,
      assetName: asset.productName,
      assetType: asset.productType,
      requesterName: user.displayName,
      requesterEmail: user.email,
      hrEmail: asset.hrEmail,
      companyName: asset.companyName,
      note: ""
    }).then(res => {
      alert("Request submitted successfully!");
    }).catch(err => console.error(err));
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {assets.map(asset => (
        <div key={asset._id} className="bg-white shadow-md rounded-lg p-4 flex flex-col justify-between">
          <img src={asset.productImage} alt={asset.productName} className="h-40 w-full object-cover rounded-md mb-3" />
          <h3 className="font-bold text-lg">{asset.productName}</h3>
          <p>Type: {asset.productType}</p>
          <p>Available: {asset.availableQuantity}</p>
          <button
            disabled={asset.availableQuantity === 0}
            onClick={() => requestAsset(asset)}
            className="mt-3 btn bg-gradient-to-r from-blue-600 to-purple-600 text-white"
          >
            Request
          </button>
        </div>
      ))}
    </div>
  );
};

export default AssetsList;
