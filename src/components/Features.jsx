import { FaLaptop, FaChartLine, FaLock, FaUsers, FaHeadset, FaFileAlt } from "react-icons/fa";

const features = [
  {
    icon: <FaLaptop className="text-4xl text-blue-600" />,
    title: "Easy Asset Tracking",
    description: "Manage and monitor company assets efficiently from a single platform.",
  },
  {
    icon: <FaChartLine className="text-4xl text-purple-600" />,
    title: "Real-Time Analytics",
    description: "Gain insights into asset usage, requests, and inventory status in real-time.",
  },
  {
    icon: <FaLock className="text-4xl text-red-500" />,
    title: "Secure & Reliable",
    description: "Ensure data privacy and secure tracking of all company assets.",
  },
  {
    icon: <FaUsers className="text-4xl text-green-500" />,
    title: "Employee Management",
    description: "Easily manage employees, their asset requests, and affiliations with companies.",
  },
  {
    icon: <FaHeadset className="text-4xl text-yellow-500" />,
    title: "Priority Support",
    description: "Get assistance quickly whenever you need help managing assets.",
  },
  {
    icon: <FaFileAlt className="text-4xl text-pink-500" />,
    title: "Detailed Reports",
    description: "Generate printable reports for audits, compliance, and management reviews.",
  },
];

const FeaturesSection = () => {
  return (
    <section className="py-8 bg-white">
      <div className="container mx-auto px-6 lg:px-20 text-center">
        <h2 className="text-center text-3xl md:text-4xl lg:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 leading-tight pb-2">Features That Empower You</h2>
        <p className="text-gray-600 max-w-2xl mx-auto mb-8 text-lg">
          AssetVerse provides powerful tools to manage your company assets and employees efficiently.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {features.map((feature, idx) => (
            <div
              key={idx}
              className="bg-gray-50 rounded-xl p-8 shadow hover:shadow-lg transition-shadow duration-300 text-center"
            >
              <div className="mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold mb-2 text-gray-800">{feature.title}</h3>
              <p className="text-gray-600 text-sm">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
