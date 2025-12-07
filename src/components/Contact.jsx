import { FaEnvelope, FaPhone, FaPaperPlane } from "react-icons/fa";
import { toast } from "react-toastify";

const Contact = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    toast.success("Message sent successfully!");
  };

  return (
    <section className="py-8 bg-gradient-to-br from-gray-100 via-white to-gray-200">

      <div className="container mx-auto px-4 lg:px-8">
        <h2 className="text-center text-3xl md:text-4xl lg:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 leading-tight">Contact Us</h2>
        <p className="text-center text-gray-600 mb-10">
          Have questions or need help? Send us a message, call, or email us directly.
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="space-y-6">
            <div className="bg-white shadow-lg rounded-xl p-6 flex items-center gap-4">
              <FaEnvelope className="text-primary text-2xl" />
              <div>
                <p className="font-semibold">Email</p>
                <a href="mailto:contact@assetverse.com" className="text-gray-600 hover:text-primary">
                  contact@assetverse.com
                </a>
              </div>
            </div>
            <div className="bg-white shadow-lg rounded-xl p-6 flex items-center gap-4">
              <FaPhone className="text-primary text-2xl" />
              <div>
                <p className="font-semibold">Call</p>
                <a href="tel:+1234567890" className="text-gray-600 hover:text-primary">
                  +123 456 7890
                </a>
              </div>
            </div>
          </div>
          <div className="lg:col-span-2 bg-white shadow-lg rounded-xl p-8">
            <h3 className="text-2xl font-bold mb-6">Send us a message</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
  className="btn btn-primary w-full flex items-center justify-center gap-2 hover:scale-105 transition-transform duration-300 bg-gradient-to-r from-blue-600 to-purple-600"
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
