import { FaStar, FaBuilding, FaUsers, FaCheckCircle } from "react-icons/fa";

const testimonials = [
  {
    name: "John Doe",
    position: "HR Manager, TechCorp",
    message: "AssetVerse has completely transformed the way we manage company assets. Easy, fast, and reliable!",
  },
  {
    name: "Sarah Lee",
    position: "Operations Lead, FinTech Inc.",
    message: "The auto-affiliation and asset request workflow save us so much time. Highly recommended!",
  },
  {
    name: "Michael Smith",
    position: "Admin, StartUp Hub",
    message: "Clear visibility into our assets and employee requests. The dashboard is intuitive and professional.",
  },
];

const stats = [
  { icon: <FaBuilding className="text-4xl text-blue-600" />, value: "100+", label: "Companies Trust Us" },
  { icon: <FaUsers className="text-4xl text-purple-600" />, value: "500+", label: "Employees Managed" },
  { icon: <FaCheckCircle className="text-4xl text-green-500" />, value: "1200+", label: "Assets Tracked" },
];

const Testimonials = () => {
  return (
    <section className="py-8 bg-gray-50">
      <div className="container mx-auto px-6 lg:px-20 text-center">
        <h2 className="text-4xl md:text-5xl font-extrabold mb-12 text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">Trusted by Leading Companies</h2>
        <p className="text-gray-600 max-w-2xl mx-auto mb-16 text-lg">
          Companies across industries rely on AssetVerse to efficiently manage their assets and employees.
        </p>

        {/* Testimonials */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          {testimonials.map((t, idx) => (
            <div
              key={idx}
              className="bg-white p-8 rounded-xl shadow hover:shadow-lg transition-shadow duration-300"
            >
              <div className="mb-4 flex justify-center">
                <FaStar className="text-yellow-400 text-3xl" />
              </div>
              <p className="text-gray-700 italic mb-4">"{t.message}"</p>
              <h3 className="text-lg font-semibold text-gray-800">{t.name}</h3>
              <p className="text-gray-500 text-sm">{t.position}</p>
            </div>
          ))}
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 text-center">
          {stats.map((s, idx) => (
            <div key={idx} className="flex flex-col items-center">
              <div className="mb-4">{s.icon}</div>
              <h3 className="text-3xl font-bold text-gray-800">{s.value}</h3>
              <p className="text-gray-600">{s.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
