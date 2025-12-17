import { useEffect, useState } from "react";
import axios from "axios";

const Packages = () => {
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPackages = async () => {
      try {
        const { data } = await axios.get("https://asset-server.vercel.app/packages");
        setPackages(data);
      } catch (error) {
        console.error("Failed to fetch packages:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPackages();
  }, []);

  if (loading) return <p className="text-center py-8 text-lg">Loading packages...</p>;

  return (
    <section className="bg-base-200 py-8  px-4">
      <h1 className="text-4xl md:text-5xl font-extrabold mb-12 text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
        Our Packages
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
        {packages.map((pkg) => (
          <div
            key={pkg.name}
            className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-2xl transition-shadow duration-300 flex flex-col justify-between"
          >
            <div className="mb-6">
              <h2 className="text-2xl font-bold mb-2 text-gray-800">{pkg.name}</h2>
              <p className="text-gray-600 text-lg mb-1">
                Price: <span className="font-semibold">${pkg.price} / month</span>
              </p>
              <p className="text-gray-600 text-lg">
                Employee Limit: <span className="font-semibold">{pkg.employeeLimit}</span>
              </p>
            </div>
            <ul className="list-disc list-inside ">
              {pkg.features.map((feature, idx) => (
                <li key={idx} className="text-gray-700">
                  {feature}
                </li>
              ))}
            </ul>

            <button className="mt-auto bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold py-3 rounded-xl w-full hover:scale-105 transition-transform duration-300 shadow-md hover:shadow-lg">
              Choose Plan
            </button>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Packages;
