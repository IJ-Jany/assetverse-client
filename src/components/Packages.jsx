import { useEffect, useState } from "react";
import axios from "axios";

const Packages = () => {
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPackages = async () => {
      try {
        const { data } = await axios.get("http://localhost:5001/packages");
        setPackages(data);
      } catch (error) {
        console.error("Failed to fetch packages:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPackages();
  }, []);

  if (loading) return <p>Loading packages...</p>;

  return (
    <section className="p-10 bg-gray-100 min-h-screen">
      <h1 className="text-4xl font-bold mb-8 text-center">Our Packages</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {packages.map((pkg) => (
          <div key={pkg.name} className="bg-white rounded-xl shadow p-6">
            <h2 className="text-2xl font-bold mb-2">{pkg.name}</h2>
            <p className="text-gray-600 mb-2">Price: ${pkg.price} / month</p>
            <p className="text-gray-600 mb-4">Employee Limit: {pkg.employeeLimit}</p>

            <ul className="list-disc list-inside space-y-1">
              {pkg.features.map((feature, idx) => (
                <li key={idx}>{feature}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Packages;
