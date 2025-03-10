import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import { Lock, Mail, ShieldAlert } from "lucide-react";
import { useContext } from "react";
import { AuthContext } from "../Context/AuthContext";
import { adminLogin } from "../services/operations/authAPI";
import { useNavigate } from "react-router-dom";

export const AdminLogin = () => {
  
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const {setAdmin,setToken} = useContext(AuthContext);

  const onSubmit = async(data) => {
    // console.log("Logging in with:", data);
    await adminLogin(data,navigate,setAdmin,setToken);
    // console.log(team,token);
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-6">
      {/* Left Section - Admin Panel Info */}
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
        className="hidden md:flex flex-col items-center justify-center w-1/3 h-[70vh] p-8 bg-[#1C398E] text-white rounded-l-2xl shadow-lg"
      >
        <ShieldAlert size={50} className="text-white" />
        <h3 className="text-xl font-semibold text-center">Admin Panel Access</h3>
        <p className="text-center text-sm opacity-80">
          Log in to manage users, tasks, and all aspects of the application.
        </p>
      </motion.div>

      {/* Login Form */}
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col justify-center w-full max-w-sm h-[70vh] bg-white shadow-lg rounded-r-2xl p-10"
      >
        <h2 className="text-2xl font-semibold text-center text-[#1C398E]">
          Admin Login
        </h2>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6 mt-6">
          {/* Email Input */}
          <div className="relative flex flex-col gap-1">
            <label htmlFor="email" className="text-sm font-medium text-gray-600">
              Email
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-3 text-gray-400" size={20} />
              <input
                id="email"
                type="email"
                {...register("email", { required: "Email is required" })}
                className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1C398E] transition"
                placeholder="Enter your Email"
              />
            </div>
            {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
          </div>

          {/* Password Input */}
          <div className="relative flex flex-col gap-1">
            <label htmlFor="password" className="text-sm font-medium text-gray-600">
              Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-3 text-gray-400" size={20} />
              <input
                id="password"
                type="password"
                {...register("password", { required: "Password is required" })}
                className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1C398E] transition"
                placeholder="Enter your Password"
              />
            </div>
            {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
          </div>

          {/* Login Button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            className="w-full bg-[#1C398E] text-white py-2 rounded-lg font-semibold hover:bg-[#142A6E] transition"
          >
            Login
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
};
