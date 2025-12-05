import { FaEnvelope, FaPhone, FaPaperPlane } from "react-icons/fa";

const Contact = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    // You can integrate this with your backend API or Firebase
    alert("Message sent successfully!");
  };

  return (
    <section className="py-8 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
      <div className="container mx-auto px-3 lg:px-8">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-4">
          Contact Us
        </h2>
        <p className="text-center text-gray-200 mb-12">
          Have questions or need help? Send us a message, call, or email us directly.
        </p>

        <div className="flex flex-col lg:flex-row gap-12">
          {/* Left: Contact Info */}
          <div className="lg:w-1/3 space-y-8">
            <div className="flex items-center gap-4">
              <FaEnvelope className="text-3xl text-white" />
              <div>
                <p className="font-semibold">Email Us</p>
                <a href="mailto:contact@assetverse.com" className="text-gray-200 hover:text-white">
                  contact@assetverse.com
                </a>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <FaPhone className="text-3xl text-white" />
              <div>
                <p className="font-semibold">Call Us</p>
                <a href="tel:+1234567890" className="text-gray-200 hover:text-white">
                  +123 456 7890
                </a>
              </div>
            </div>
          </div>

          {/* Right: Contact Form */}
          <div className="lg:w-2/3 bg-white text-gray-800 p-8 rounded-xl shadow-lg">
            <h3 className="text-2xl font-bold mb-6">Send us a message</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="flex flex-col md:flex-row gap-4">
                <input
                  type="text"
                  placeholder="Your Name"
                  className="input input-bordered w-full"
                  required
                />
                <input
                  type="email"
                  placeholder="Your Email"
                  className="input input-bordered w-full"
                  required
                />
              </div>
              <input
                type="text"
                placeholder="Subject"
                className="input input-bordered w-full"
                required
              />
              <textarea
                placeholder="Your Message"
                className="textarea textarea-bordered w-full"
                rows="6"
                required
              ></textarea>
              <button
                type="submit"
                className="btn bg-gradient-to-r from-blue-600 to-purple-600 text-white w-full flex items-center justify-center gap-2 hover:scale-105 transition-transform duration-300"
              >
                <FaPaperPlane /> Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
