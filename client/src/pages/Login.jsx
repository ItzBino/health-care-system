import React, { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { 
  FaTimes, 
  FaEnvelope, 
  FaLock, 
  FaUserMd, 
  FaUserInjured,
  FaSignInAlt
} from "react-icons/fa";

const Login = ({ isOpen, onClose, onSwitchToRegister }) => {
  const { login, setUserRole, UserRole } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const onHandleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      const response = await login(formData);
      if (response) {
        onClose();
        navigate("/");
      }
    } catch (error) {
      alert(error.response?.data?.message || "Login failed");
    }
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop with blur */}
      <div className="fixed inset-0 z-50 overflow-y-auto">
        <div className="fixed inset-0 backdrop-blur-sm bg-black/30" onClick={onClose} />
        
        {/* Modal */}
        <div className="flex min-h-full items-center justify-center p-4">
          <div className="relative w-full max-w-md transform rounded-2xl bg-white shadow-xl transition-all">
            
            {/* Close button */}
            <button
              onClick={onClose}
              className="absolute right-4 top-4 text-gray-400 hover:text-gray-600 z-10"
            >
              <FaTimes size={20} />
            </button>

            {/* Header with Icon */}
            <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-t-2xl pt-8 pb-6">
              <div className="flex justify-center mb-4">
                <div className="w-20 h-20 rounded-full bg-white flex items-center justify-center">
                  <FaSignInAlt className="text-blue-600 text-3xl" />
                </div>
              </div>
              <h2 className="text-2xl font-bold text-center text-white">
                Welcome Back
              </h2>
              <p className="text-center text-blue-100 mt-2 text-sm">
                Sign in to continue to your account
              </p>
            </div>

            {/* Form */}
            <form onSubmit={onSubmitHandler} className="p-6 space-y-4">
              
              {/* Role Selection */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Login as
                </label>
                <div className="relative">
                  <select
                    value={UserRole}
                    onChange={(e) => setUserRole(e.target.value)}
                    className="w-full px-4 py-3 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none"
                  >
                    <option value="PATIENT">Patient</option>
                    <option value="DOCTOR">Doctor</option>
                  </select>
                  <div className="absolute left-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
                    {UserRole === "DOCTOR" ? (
                      <FaUserMd className="text-gray-400" />
                    ) : (
                      <FaUserInjured className="text-gray-400" />
                    )}
                  </div>
                </div>
              </div>

              {/* Email Input */}
              <div className="relative">
                <FaEnvelope className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  name="email"
                  type="email"
                  placeholder="Email Address"
                  value={formData.email}
                  onChange={onHandleChange}
                  className="w-full px-4 py-3 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              {/* Password Input */}
              <div className="relative">
                <FaLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  name="password"
                  type="password"
                  placeholder="Password"
                  value={formData.password}
                  onChange={onHandleChange}
                  className="w-full px-4 py-3 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              {/* Forgot Password Link */}
              <div className="text-right">
                <a href="#" className="text-sm text-blue-600 hover:underline">
                  Forgot Password?
                </a>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition duration-200 flex items-center justify-center gap-2"
              >
                <FaSignInAlt />
                Sign In
              </button>

              {/* Register Link */}
              <p className="text-center text-sm text-gray-600">
                Don't have an account?{" "}
                <button
                  type="button"
                  onClick={onSwitchToRegister}
                  className="text-blue-600 font-semibold hover:underline"
                >
                  Sign Up
                </button>
              </p>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
