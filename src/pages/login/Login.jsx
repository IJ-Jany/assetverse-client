import { useContext, useState } from "react";
import { AuthContext } from "../../providers/AuthContext";
import { FaSignInAlt, FaGoogle } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const { signIn, signInWithGoogle } = useContext(AuthContext);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    const email = e.target.email.value;
    const password = e.target.password.value;

    try {
      await signIn(email, password);
      navigate("/");
    } catch (err) {
      setError(err.message);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      await signInWithGoogle();
      navigate("/");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <section className="min-h-screen bg-gradient-to-r from-blue-100 to-purple-100 flex items-center justify-center px-6">
      <div className="w-full max-w-6xl bg-white rounded-2xl shadow-2xl p-10 grid grid-cols-1 md:grid-cols-2 gap-10">

        {/* Left Illustration */}
        <div className="flex flex-col justify-center items-center text-center p-6 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl">
          <h2 className="text-4xl font-bold text-white mb-4">
            Welcome Back!
          </h2>
          <p className="text-gray-200 text-lg mb-8">
            Login to access your dashboard and manage your assets effortlessly.
          </p>
          <img
            src="https://cdni.iconscout.com/illustration/premium/thumb/login-authentication-illustration-download-in-svg-png-gif-file-formats--user-secure-student-education-pack-education-illustrations-6700750.png"
            alt="login"
            className="w-72 drop-shadow-xl"
          />
        </div>

        {/* Login Form */}
        <div className="p-6 flex flex-col justify-center">
          <h3 className="text-3xl font-bold text-gray-800 mb-6">
            Login to Your Account
          </h3>

          {error && (
            <p className="bg-red-100 text-red-600 px-4 py-2 rounded mb-4">
              {error}
            </p>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <input
              type="email"
              name="email"
              placeholder="Email Address"
              className="input input-bordered w-full"
              required
            />

            <input
              type="password"
              name="password"
              placeholder="Password"
              className="input input-bordered w-full"
              required
            />

            {/* Login Button */}
            <button
              type="submit"
              className="
                btn w-full mt-2
                bg-gradient-to-r from-blue-600 to-purple-600
                text-white font-semibold border-none shadow-md
                transition-all duration-300
                hover:scale-105 hover:shadow-lg
                hover:from-blue-700 hover:to-purple-700
                active:scale-95
              "
            >
              <FaSignInAlt className="mr-2 text-lg" />
              Login
            </button>
          </form>

          {/* Divider */}
          <div className="text-center my-4">
            <span className="text-gray-500">OR</span>
          </div>

          {/* Google Login Button */}
          <button
            onClick={handleGoogleLogin}
            className="
              btn w-full bg-white text-gray-700 border border-gray-300 shadow-sm
              hover:bg-gray-100 hover:shadow-md transition duration-300
            "
          >
            <FaGoogle className="mr-2 text-red-500 text-lg" />
            Continue with Google
          </button>

          {/* Register Link */}
          <p className="text-center mt-6 text-gray-700">
            Don’t have an account?{" "}
            <Link to="/register" className="text-blue-600 font-semibold hover:underline">
              Join Now
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
};

export default Login;
