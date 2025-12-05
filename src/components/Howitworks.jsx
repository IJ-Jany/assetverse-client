import { FaUserTie, FaLaptop, FaCheckCircle } from "react-icons/fa";

const steps = [
  { icon: <FaUserTie />, title: "HR Registers Company", desc: "Add company details and start managing assets." },
  { icon: <FaLaptop />, title: "Employees Request Assets", desc: "Employees request assets and HR approves." },
  { icon: <FaCheckCircle />, title: "Track & Return", desc: "Easily track assignments and handle returns." },
];

const HowItWorks = () => {
  return (
    <section className="py-28 bg-white">
      <div className="container mx-auto px-6 lg:px-20">
        <h2 className="text-4xl md:text-5xl font-bold text-gray-800 text-center mb-16">
          How It Works
        </h2>

        <div className="relative flex flex-col md:flex-row justify-between items-center space-y-12 md:space-y-0 md:space-x-8">
          {steps.map((step, idx) => (
            <div key={idx} className="flex flex-col items-center text-center md:w-1/3 relative">
              {/* Connector Line */}
              {idx < steps.length - 1 && (
                <div className="hidden md:block absolute top-1/2 right-0 w-full h-1 bg-purple-300 z-0"></div>
              )}
              <div className="bg-purple-600 text-white text-5xl p-6 rounded-full mb-6 z-10">{step.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
              <p className="text-gray-600">{step.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
