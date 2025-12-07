import { useState } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";

const faqs = [
  { q: "Can employees belong to multiple companies?", a: "Yes, employees can request assets from multiple companies and get affiliated." },
  { q: "How is the asset quantity managed?", a: "Available quantity decreases when assigned and increases when returned (for returnable items)." },
  { q: "Can HR upgrade the package anytime?", a: "Yes, HR can upgrade packages using Stripe integration to increase employee limits." },
];

const Faq = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggle = (idx) => setOpenIndex(openIndex === idx ? null : idx);

  return (
    <section className="py-8 bg-gradient-to-r from-blue-50 to-purple-50">
      <div className="container mx-auto px-6 lg:px-20">
        <h2 className="text-center text-3xl md:text-4xl lg:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 leading-tight pb-6">
          Frequently Asked Questions
        </h2>

        <div className="space-y-4 max-w-3xl mx-auto">
          {faqs.map((faq, idx) => (
            <div
              key={idx}
              className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition-shadow duration-300 cursor-pointer"
              onClick={() => toggle(idx)}
            >
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold">{faq.q}</h3>
                {openIndex === idx ? <FaChevronUp /> : <FaChevronDown />}
              </div>
              {openIndex === idx && <p className="mt-4 text-gray-600">{faq.a}</p>}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Faq;
