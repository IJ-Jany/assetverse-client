import { FaFacebookF, FaInstagram, FaLinkedinIn, FaXTwitter } from "react-icons/fa6";
import { FaEnvelope, FaPhoneAlt } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="relative bg-gradient-to-r from-blue-50 to-purple-50 py-16 mt-24 overflow-hidden">


      <div className="absolute -top-10 -left-10 w-60 h-60 bg-blue-300 opacity-20 rounded-full blur-3xl"></div>
      <div className="absolute -bottom-16 -right-10 w-80 h-80 bg-purple-300 opacity-20 rounded-full blur-3xl"></div>

      <div className="relative container mx-auto px-6 lg:px-20">
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center md:text-left">


          <div className="flex flex-col items-center md:items-start">
            <h2 className="text-3xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
              AssetVerse
            </h2>
            <p className="text-gray-700 mt-3 max-w-xs">
              Smart, powerful, and streamlined corporate asset management designed to empower your business.
            </p>
          </div>

 
          <div className="flex flex-col items-center md:items-start">
            <h3 className="text-xl font-semibold mb-4 text-gray-800">Quick Links</h3>
            <ul className="space-y-2 text-gray-700">
              <li><a href="/" className="hover:text-blue-600 transition">Home</a></li>
              <li><a href="/about" className="hover:text-blue-600 transition">About</a></li>
              <li><a href="/services" className="hover:text-blue-600 transition">Services</a></li>
              <li><a href="/contact" className="hover:text-blue-600 transition">Contact</a></li>
            </ul>
          </div>

          <div className="flex flex-col items-center md:items-start">
            <h3 className="text-xl font-semibold mb-4 text-gray-800">Contact Info</h3>

            <p className="flex items-center justify-center md:justify-start gap-3 mb-2 text-gray-700">
              <FaEnvelope className="text-blue-600" /> contact@assetverse.com
            </p>

            <p className="flex items-center justify-center md:justify-start gap-3 mb-6 text-gray-700">
              <FaPhoneAlt className="text-blue-600" /> +123 456 7890
            </p>

            <div className="flex items-center justify-center md:justify-start gap-4">
              <a className="p-3 rounded-full bg-white shadow-md hover:shadow-lg hover:scale-110 transition text-blue-600">
                <FaFacebookF />
              </a>
              <a className="p-3 rounded-full bg-white shadow-md hover:shadow-lg hover:scale-110 transition text-black">
                <FaXTwitter />
              </a>
              <a className="p-3 rounded-full bg-white shadow-md hover:shadow-lg hover:scale-110 transition text-pink-500">
                <FaInstagram />
              </a>
              <a className="p-3 rounded-full bg-white shadow-md hover:shadow-lg hover:scale-110 transition text-blue-700">
                <FaLinkedinIn />
              </a>
            </div>
          </div>

        </div>
        <div className="text-center mt-12 pt-6 border-t border-gray-300">
          <p className="text-gray-600">
            © {new Date().getFullYear()} AssetVerse. All Rights Reserved.
          </p>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
