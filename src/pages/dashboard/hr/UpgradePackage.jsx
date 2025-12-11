import React, { useEffect, useState } from "react";
import axios from "axios";

const UpgradePackage = ({ hrEmail }) => {
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedPackage, setSelectedPackage] = useState(null);
  const [message, setMessage] = useState(null);

  useEffect(() => {
    axios.get("http://localhost:5001/packages")
      .then((res) => {
        setPackages(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err.message);
        setLoading(false);
      });
  }, []);

  const handleSelect = (pkgId) => {
    setSelectedPackage(pkgId);
    setMessage(null);
  };

  const handleConfirm = async () => {
    if (!selectedPackage) {
      setMessage({ text: "Please select a package." });
      return;
    }

    try {
      const selectedPkg = packages.find((p) => p._id === selectedPackage);

      const paymentInfo = {
        hrEmail,
        packageId: selectedPkg._id,
        name: selectedPkg.name,
        price: selectedPkg.price,
      };

      const result = await axios.post(
        "http://localhost:5001/create-checkout-session",
        paymentInfo
      );

     if (result.data?.url) {
  window.location.href = result.data.url;
}
 else {
        setMessage({ type: "error", text: "Payment redirect failed." });
      }
    } catch (err) {
      console.error(err);
      setMessage({ type: "error", text: "Payment session failed." });
    }
  };

  if (loading) {
    return <p className="text-center p-6 text-gray-500">Loading packages...</p>;
  }

  return (
    <div className="min-h-screen bg-base-200 flex flex-col items-center py-10">
      <h1 className="text-3xl font-bold mb-6">Upgrade Your HR Package</h1>

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

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-5xl">
        {packages.map((pkg) => (
          <div
            key={pkg._id}
            className={`card shadow-xl p-6 border-2 cursor-pointer transition-all 
              ${
                selectedPackage === pkg._id
                  ? "border-primary scale-105 bg-primary/10"
                  : "border-gray-200"
              }`}
            onClick={() => handleSelect(pkg._id)}
          >
            <h2 className="text-2xl font-bold mb-2">{pkg.name}</h2>

            <p className="text-4xl font-bold text-primary mb-4">
              ${pkg.price}
              <span className="text-base text-gray-500"> / month</span>
            </p>

            <ul className="mb-4 space-y-2">
              {pkg.features.map((f, i) => (
                <li key={i} className="text-gray-700 flex items-center gap-2">
                  ✔ {f}
                </li>
              ))}
            </ul>

            <button
              className={`btn w-full ${
                selectedPackage === pkg._id ? "btn-primary" : "btn-outline"
              }`}
            >
              {selectedPackage === pkg._id ? "Selected" : "Choose Package"}
            </button>
          </div>
        ))}
      </div>

      <button className="btn btn-primary mt-8 px-12" onClick={handleConfirm}>
        Confirm Upgrade
      </button>
    </div>
  );
};

export default UpgradePackage;
