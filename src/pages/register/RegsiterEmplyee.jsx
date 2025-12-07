import { useContext, useState } from "react";
import { AuthContext } from "../../providers/AuthContext";
import { FaGoogle, FaUserPlus } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { saveOrUpdateUser } from "../../utils/index";

const RegisterEmployee = () => {
  const { createUser, signInWithGoogle, updateUserProfile } = useContext(AuthContext);
  const [error, setError] = useState("");
  const [uploading, setUploading] = useState(false);
  const navigate = useNavigate();

  const imgbbKey = import.meta.env.VITE_IMGBB_KEY;

  const { register, handleSubmit, formState: { errors } } = useForm();


  const onSubmit = async (data) => {
    setError("");
    setUploading(true);

    const { name, email, dob, password } = data;
    const imageFile = data.photo[0];

    let photoURL = "";

    try {
    
      if (imageFile) {
        const formData = new FormData();
        formData.append("image", imageFile);

        const uploadRes = await fetch(
          `https://api.imgbb.com/1/upload?key=${imgbbKey}`,
          { method: "POST", body: formData }
        );
        const uploadData = await uploadRes.json();

        if (!uploadData?.data?.url) {
          throw new Error("Image upload failed! Check your ImgBB key or try another image.");
        }

        photoURL = uploadData.data.url;
      }

      await createUser(email, password);

      await updateUserProfile(name, photoURL);

      await saveOrUpdateUser({
        name,
        email,
        photo: photoURL,
        dateOfBirth: dob,
        role: "employee",
        assignedHR: null
      });

      navigate("/");

    } catch (err) {
      setError(err.message);
    } finally {
      setUploading(false);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithGoogle();
      const user = result.user;

      await saveOrUpdateUser({
        name: user.displayName,
        email: user.email,
        photo: user.photoURL,
        dateOfBirth: "N/A",
        role: "employee",
        assignedHR: null
      });

      navigate("/");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <section className="min-h-screen bg-gradient-to-r from-blue-100 to-purple-100 flex items-center justify-center px-6">
      <div className="w-full max-w-6xl bg-white rounded-2xl shadow-2xl p-10 grid grid-cols-1 md:grid-cols-2 gap-10">

    
        <div className="flex flex-col justify-center items-center text-center p-6 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl">
          <h2 className="text-4xl font-bold text-white mb-4">Join as Employee</h2>
          <p className="text-gray-200 mb-8">
            Create your employee account and request assets easily.
          </p>
       
        </div>

  
        <div>
          <h3 className="text-3xl font-bold mb-6">Employee Registration</h3>

          {error && <p className="bg-red-100 text-red-600 px-4 py-2 rounded mb-4">{error}</p>}

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

          
            <input
              type="text"
              placeholder="Full Name"
              className="input input-bordered w-full"
              {...register("name", { required: "Name is required", minLength: { value: 3, message: "Minimum 3 characters" } })}
            />
            {errors.name && <p className="text-red-500 text-xs">{errors.name.message}</p>}

            <input
              type="email"
              placeholder="Email"
              className="input input-bordered w-full"
              {...register("email", { required: "Email is required", pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: "Enter a valid email" } })}
            />
            {errors.email && <p className="text-red-500 text-xs">{errors.email.message}</p>}

            <input
              type="file"
              accept="image/*"
              className="file-input file-input-bordered w-full"
              {...register("photo")}
            />

       
            <input
              type="date"
              className="input input-bordered w-full"
              {...register("dob", { required: "Date of Birth is required" })}
            />
            {errors.dob && <p className="text-red-500 text-xs">{errors.dob.message}</p>}

            <input
              type="password"
              placeholder="Password (min 6 chars)"
              className="input input-bordered w-full"
              {...register("password", { required: "Password is required", minLength: { value: 6, message: "Minimum 6 characters" } })}
            />
            {errors.password && <p className="text-red-500 text-xs">{errors.password.message}</p>}

            <button
              type="submit"
              className="btn w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-md hover:scale-105 transition duration-300"
              disabled={uploading}
            >
              <FaUserPlus className="mr-2" />
              {uploading ? "Creating Account..." : "Register as Employee"}
            </button>
          </form>

          <div className="text-center my-4 text-gray-500">OR</div>

               <button onClick={handleGoogleLogin} className="btn w-full bg-white text-black border-[#e5e5e5]">
  <svg aria-label="Google logo" width="16" height="16" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><g><path d="m0 0H512V512H0" fill="#fff"></path><path fill="#34a853" d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"></path><path fill="#4285f4" d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"></path><path fill="#fbbc02" d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"></path><path fill="#ea4335" d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"></path></g></svg>
  Login with Google
</button>

          <p className="text-center mt-6">
            Already have an account?{" "}
            <Link to="/login" className="text-blue-600 font-semibold">Login</Link>
          </p>
        </div>
      </div>
    </section>
  );
};

export default RegisterEmployee;
