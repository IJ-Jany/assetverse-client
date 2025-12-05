import { FaShieldAlt, FaTachometerAlt, FaUsers, FaClipboardCheck } from "react-icons/fa";
import { motion } from "framer-motion";

const benefits = [
  {
    icon: <FaShieldAlt className="text-4xl text-blue-600" />,
    title: "Prevent Asset Loss",
    description: "Keep track of all company assets and ensure accountability, reducing the risk of lost or misplaced items.",
  },
  {
    icon: <FaTachometerAlt className="text-4xl text-purple-600" />,
    title: "Streamline Processes",
    description: "Simplify asset assignment, returns, and management with a clear, organized workflow.",
  },
  {
    icon: <FaUsers className="text-4xl text-green-600" />,
    title: "Empower Employees",
    description: "Employees can easily request, view, and return assets, improving transparency and productivity.",
  },
  {
    icon: <FaClipboardCheck className="text-4xl text-yellow-600" />,
    title: "Analytics & Reports",
    description: "Generate real-time reports to monitor asset usage and team efficiency across your organization.",
  },
];

const About = () => {
  return (
    <section className="py-28 bg-gray-50">
      <div className="container mx-auto px-6 lg:px-20 text-center">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-4xl md:text-5xl font-bold mb-6 text-gray-800"
        >
          Why Choose AssetVerse?
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: -10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-gray-600 max-w-2xl mx-auto mb-16 text-lg"
        >
          AssetVerse is designed to help companies manage their assets efficiently, increase accountability, and empower employees with a seamless asset management system.
        </motion.p>

        {/* Benefits Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {benefits.map((benefit, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              className="bg-white rounded-xl p-8 shadow-md hover:shadow-xl transition-shadow duration-300"
            >
              <div className="mb-4">{benefit.icon}</div>
              <h3 className="text-xl font-semibold mb-2 text-gray-800">{benefit.title}</h3>
              <p className="text-gray-600 text-sm">{benefit.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;
