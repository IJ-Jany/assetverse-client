import { useContext, useState } from "react";
import { AuthContext } from "../../providers/AuthContext";
import { FaSignInAlt } from "react-icons/fa";
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
      await signIn(email, password); // AuthProvider handles ID token & JWT
      navigate("/");
    } catch (err) {
      console.error(err);
      setError(err.message);
    }
  };

  const handleGoogleLogin = async () => {
    setError("");
    try {
      await signInWithGoogle(); // AuthProvider handles ID token & JWT
      navigate("/");
    } catch (err) {
      console.error(err);
      setError(err.message);
    }
  };

  return (
    <section className="min-h-screen bg-gradient-to-r from-blue-100 to-purple-100 flex items-center justify-center px-6">
      <div className="w-full max-w-6xl bg-white rounded-2xl shadow-2xl p-10 grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* Left Side */}
        <div className="flex flex-col justify-center items-center text-center p-6 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl">
          <h2 className="text-4xl font-bold text-white mb-4">Welcome Back!</h2>
          <p className="text-gray-200 text-lg mb-8">
            Login to access your dashboard and manage your assets effortlessly.
          </p>
        </div>

        {/* Right Side (Form) */}
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

          <div className="text-center my-4">
            <span className="text-gray-500">OR</span>
          </div>

         {/* Google */}
<button onClick={handleGoogleLogin} className="btn bg-white text-black border-[#e5e5e5]">
  <svg aria-label="Google logo" width="16" height="16" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><g><path d="m0 0H512V512H0" fill="#fff"></path><path fill="#34a853" d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"></path><path fill="#4285f4" d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"></path><path fill="#fbbc02" d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"></path><path fill="#ea4335" d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"></path></g></svg>
  Login with Google
</button>

          <p className="text-center mt-6 text-gray-700">
            Don’t have an account?{" "}
            <Link
              to="/"
              className="text-blue-600 font-semibold hover:underline"
            >
              Join Now
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
};

export default Login;
