import React, { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { 
  FaTimes, 
  FaUserCircle, 
  FaCamera, 
  FaUser, 
  FaEnvelope, 
  FaLock,
  FaUserMd,
  FaUserInjured
} from "react-icons/fa";

const Register = ({ isOpen, onClose, onSwitchToLogin }) => {
  const { register, setUserRole, UserRole } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    try {
      const data = new FormData();
      data.append("name", formData.name);
      data.append("email", formData.email);
      data.append("password", formData.password);
      data.append("role", UserRole);
      if (image) data.append("image", image);

      await register(data);
      alert("Registration successful");
      onClose();
    } catch (error) {
      console.log(error);
      alert(error.response?.data?.error || "Registration failed");
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

            {/* Profile Picture Upload - At the top */}
            <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-t-2xl pt-8 pb-6">
              <div className="flex justify-center">
                <div className="relative">
                  <div className="w-28 h-28 rounded-full bg-white p-1">
                    <div className="w-full h-full rounded-full overflow-hidden bg-gray-100 flex items-center justify-center">
                      {imagePreview ? (
                        <img 
                          src={imagePreview} 
                          alt="Profile" 
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <FaUserCircle className="text-gray-400 text-6xl" />
                      )}
                    </div>
                  </div>
                  <label 
                    htmlFor="image-upload" 
                    className="absolute bottom-0 right-0 bg-white text-blue-600 p-2 rounded-full cursor-pointer hover:bg-gray-50 shadow-lg transition-colors"
                  >
                    <FaCamera size={18} />
                    <input
                      id="image-upload"
                      type="file"
                      name="image"
                      onChange={handleFileChange}
                      accept="image/*"
                      className="hidden"
                    />
                  </label>
                </div>
              </div>
              <h2 className="text-2xl font-bold text-center text-white mt-4">
                Create Account
              </h2>
            </div>

            {/* Form */}
            <form onSubmit={onSubmitHandler} className="p-6 space-y-4">
              
              {/* Role Selection */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Register as
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

              {/* Name Input */}
              <div className="relative">
                <FaUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Full Name"
                  value={formData.name}
                  name="name"
                  onChange={handleChange}
                  className="w-full px-4 py-3 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              {/* Email Input */}
              <div className="relative">
                <FaEnvelope className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="email"
                  placeholder="Email Address"
                  value={formData.email}
                  name="email"
                  onChange={handleChange}
                  className="w-full px-4 py-3 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              {/* Password Input */}
              <div className="relative">
                <FaLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="password"
                  placeholder="Password"
                  value={formData.password}
                  name="password"
                  onChange={handleChange}
                  className="w-full px-4 py-3 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition duration-200"
              >
                Register
              </button>

              {/* Login Link */}
              <p className="text-center text-sm text-gray-600">
                Already have an account?{" "}
                <button
                  type="button"
                  onClick={onSwitchToLogin}
                  className="text-blue-600 font-semibold hover:underline"
                >
                  Login
                </button>
              </p>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
