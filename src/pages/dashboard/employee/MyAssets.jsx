import { useState, useEffect } from "react";
import axios from "axios";

const MyAssets = () => {
  const [assets, setAssets] = useState([]);
  const [search, setSearch] = useState("");
  const [filterType, setFilterType] = useState("All");
  const [loading, setLoading] = useState(false);

  const fetchAssets = async () => {
    setLoading(true);
    try {
      const res = await axios.get("http://localhost:5001/employee/assets", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`, // JWT token
        },
      });
      if (res.data.success) {
        setAssets(res.data.assets);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAssets();
  }, []);

  const filteredAssets = assets.filter((asset) => {
    const matchesSearch = asset.assetName
      .toLowerCase()
      .includes(search.toLowerCase());
    const matchesType =
      filterType === "All" ? true : asset.assetType === filterType;
    return matchesSearch && matchesType;
  });

  return (
    <div className="p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-4">My Assets</h2>

      {/* Search & Filter */}
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
      </div>

      {loading ? (
        <p>Loading assets...</p>
      ) : filteredAssets.length === 0 ? (
        <p>No assets assigned yet.</p>
      ) : (
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
              <tr key={asset._id} className="text-center">
                <td>
                  <img
                    src={asset.assetImage}
                    alt={asset.assetName}
                    className="w-16 h-16 object-cover mx-auto"
                  />
                </td>
                <td>{asset.assetName}</td>
                <td>{asset.assetType}</td>
                <td>{asset.companyName}</td>
                <td>
                  {new Date(asset.assignmentDate).toLocaleDateString()}
                </td>
                <td>
                  {asset.approvalDate
                    ? new Date(asset.approvalDate).toLocaleDateString()
                    : "-"}
                </td>
                <td>{asset.status}</td>
                <td>
                  {asset.assetType === "Returnable" &&
                  asset.status === "assigned" ? (
                    <button className="btn btn-sm btn-warning">
                      Return
                    </button>
                  ) : (
                    "-"
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default MyAssets;
