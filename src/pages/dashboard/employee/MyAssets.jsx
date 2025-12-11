import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../../../providers/AuthContext";

const MyAssets = () => {
  const { user } = useContext(AuthContext);
  const [assets, setAssets] = useState([]);
  const [search, setSearch] = useState("");
  const [filterType, setFilterType] = useState("All");
  const [loading, setLoading] = useState(false);

  const fetchAssets = async () => {
    if (!user?.email) return;
    setLoading(true);
    try {
      const res = await axios.get(
        `http://localhost:5001/employee/assets/${user.email}`
      );
      console.log("Fetched assets:", res.data.assets);
      if (res.data.success) setAssets(res.data.assets);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAssets();
  }, [user]);
  const filteredAssets = assets.filter((asset) => {
    const matchesSearch = asset.assetName
      .toLowerCase()
      .includes(search.toLowerCase());
    const matchesType =
      filterType === "All" ? true : asset.assetType === filterType;
    return matchesSearch && matchesType;
  });
  const handlePrint = () => {
    const printContent = document.getElementById("printableAssets");
    const WinPrint = window.open("", "", "width=900,height=650");
    WinPrint.document.write(`
      <html>
        <head>
          <title>My Assets</title>
          <style>
            table { width: 100%; border-collapse: collapse; }
            th, td { border: 1px solid #ccc; padding: 8px; text-align: center; }
            th { background: #f4f4f4; }
            img { width: 50px; height: 50px; object-fit: cover; }
          </style>
        </head>
        <body>
          ${printContent.innerHTML}
        </body>
      </html>
    `);
    WinPrint.document.close();
    WinPrint.focus();
    WinPrint.print();
  };

 
  const handleReturn = async (assetId) => {
    if (!window.confirm("Are you sure you want to return this asset?")) return;
    try {
      const res = await axios.put(
        `http://localhost:5001/assets/return/${assetId}`
      );
      if (res.data.success) {
        alert("Asset returned successfully!");
        setAssets((prevAssets) =>
          prevAssets.map((a) =>
            a.assetId === assetId ? { ...a, status: "returned" } : a
          )
        );
      }
    } catch (err) {
      console.error(err);
      alert("Failed to return asset.");
    }
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-4">My Assets</h2>

      <div className="flex gap-4 mb-4">
        <input
          type="text"
          placeholder="Search by asset name..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="input input-bordered w-full"
        />
        <select
          value={filterType}
          onChange={(e) => setFilterType(e.target.value)}
          className="select select-bordered"
        >
          <option value="All">All Types</option>
          <option value="Returnable">Returnable</option>
          <option value="Non-returnable">Non-returnable</option>
        </select>
        <button onClick={handlePrint} className="btn btn-primary">
          Print
        </button>
      </div>

      {loading ? (
        <p>Loading assets...</p>
      ) : filteredAssets.length === 0 ? (
        <p>No assets assigned yet.</p>
      ) : (
        <div id="printableAssets">
          <table className="table-auto w-full border">
            <thead>
              <tr className="bg-gray-100">
                <th>Image</th>
                <th>Name</th>
                <th>Type</th>
                <th>Company</th>
                <th>Request Date</th>
                <th>Approval Date</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredAssets.map((asset) => (
                <tr key={asset.assetId} className="text-center">
                  <td>
                    <img
                      src={asset.assetImage || "/placeholder.png"}
                      alt={asset.assetName}
                      className="w-16 h-16 object-cover mx-auto"
                    />
                  </td>
                  <td>{asset.assetName}</td>
                  <td>{asset.assetType}</td>
                  <td>{asset.companyName || "-"}</td>
                  <td>
                    {asset.requestDate
                      ? new Date(asset.requestDate).toLocaleDateString()
                      : "-"}
                  </td>
                  <td>
                    {asset.approvalDate
                      ? new Date(asset.approvalDate).toLocaleDateString()
                      : "-"}
                  </td>
                  <td>{asset.status || "assigned"}</td>
                  <td>
                    {asset.assetType === "Returnable" &&
                    asset.status === "approved" ? (
                      <button
                        className="btn btn-sm btn-warning"
                        onClick={() => handleReturn(asset.assetId)}
                      >
                        Return
                      </button>
                    ) : asset.status === "returned" ? (
                      <span className="text-green-600 font-semibold">Returned</span>
                    ) : (
                      "-"
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default MyAssets;
