import { Link } from "react-router-dom";
import logo from "../assets/logo.png"; 

const Logo = () => {
  return (
    <Link to="/" className="flex items-center gap-2">
      <img
        src={logo}
        alt="AssetVerse Logo"
        className="lg:w-20 lg:h-15  w-24 h-15 md:w-10 md:h-10 object-contain rounded-md"
      />
    </Link>
  );
};

export default Logo;
