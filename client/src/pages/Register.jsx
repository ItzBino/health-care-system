import React, { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { 
  X, 
  Camera, 
  User, 
  Mail, 
  Lock,
  Stethoscope,
  Heart,
  Shield,
  Eye,
  EyeOff,
  Check,
  AlertCircle,
  Loader2,
  UserCircle,
  Activity,
  ChevronDown
} from "lucide-react";

const Register = ({ isOpen, onClose, onSwitchToLogin }) => {
  const { register, setUserRole, userRole } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

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
    
    setLoading(true);
    setError("");
    
    try {
      const data = new FormData();
      data.append("name", formData.name);
      data.append("email", formData.email);
      data.append("password", formData.password);
      if (image) data.append("image", image);

      await register(data);
      onClose();
      onSwitchToLogin();
    } catch (error) {
      console.log(error);
      setError(error.response?.data?.error || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop with blur */}
      <div className="fixed inset-0 z-50 overflow-y-auto">
        <div 
          className="fixed inset-0 backdrop-blur-md bg-black/40 transition-opacity" 
          onClick={onClose}
        />
        
        {/* Modal */}
        <div className="flex min-h-full items-center justify-center p-4">
          <div className="relative w-full max-w-md transform rounded-2xl bg-white shadow-2xl transition-all animate-modalSlideIn">
            
            {/* Close button */}
            <button
              onClick={onClose}
              className="absolute right-4 top-4 p-2 rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-all z-10"
            >
              <X size={20} />
            </button>

            {/* Header with gradient and pattern */}
            <div className="relative bg-gradient-to-br from-blue-600 via-blue-600 to-indigo-700 rounded-t-2xl pt-8 pb-6 overflow-hidden">
              {/* Background pattern */}
              <div className="absolute inset-0 opacity-10">
                <div className="absolute -right-10 -top-10 w-40 h-40 rounded-full bg-white/20"></div>
                <div className="absolute -left-10 -bottom-10 w-40 h-40 rounded-full bg-white/20"></div>
              </div>
              
              {/* Profile Picture Upload */}
              <div className="relative flex justify-center">
                <div className="relative group">
                  <div className="w-28 h-28 rounded-full bg-white p-1 shadow-xl">
                    <div className="w-full h-full rounded-full overflow-hidden bg-gray-100 flex items-center justify-center">
                      {imagePreview ? (
                        <img 
                          src={imagePreview} 
                          alt="Profile" 
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <UserCircle className="text-gray-400 w-20 h-20" />
                      )}
                    </div>
                  </div>
                  <label 
                    htmlFor="image-upload" 
                    className="absolute bottom-0 right-0 bg-white text-blue-600 p-2.5 rounded-full cursor-pointer hover:bg-gray-50 shadow-lg transition-all transform hover:scale-110 group"
                  >
                    <Camera size={18} />
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
              <p className="text-center text-blue-100 text-sm mt-1">
                Join our healthcare community
              </p>
            </div>

            {/* Form */}
            <form onSubmit={onSubmitHandler} className="p-6 space-y-4">
              
              {/* Error Alert */}
              {error && (
                <div className="p-3 bg-red-50 border border-red-200 rounded-lg flex items-start gap-2">
                  <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-red-800">{error}</p>
                </div>
              )}

              {/* Role Selection - Enhanced */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  I want to register as
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setUserRole("PATIENT")}
                    className={`
                      relative p-4 rounded-xl border-2 transition-all
                      ${userRole === "PATIENT" 
                        ? "border-blue-500 bg-blue-50" 
                        : "border-gray-200 hover:border-gray-300 bg-white"
                      }
                    `}
                  >
                    <div className="flex flex-col items-center gap-2">
                      <div className={`
                        w-12 h-12 rounded-full flex items-center justify-center
                        ${userRole === "PATIENT" ? "bg-blue-100" : "bg-gray-100"}
                      `}>
                        <Heart className={`w-6 h-6 ${userRole === "PATIENT" ? "text-blue-600" : "text-gray-500"}`} />
                      </div>
                      <span className={`text-sm font-medium ${userRole === "PATIENT" ? "text-blue-700" : "text-gray-700"}`}>
                        Patient
                      </span>
                    </div>
                    {userRole === "PATIENT" && (
                      <div className="absolute top-2 right-2">
                        <div className="w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center">
                          <Check className="w-3 h-3 text-white" />
                        </div>
                      </div>
                    )}
                  </button>

                  <button
                    type="button"
                    onClick={() => setUserRole("DOCTOR")}
                    className={`
                      relative p-4 rounded-xl border-2 transition-all
                      ${userRole === "DOCTOR" 
                        ? "border-blue-500 bg-blue-50" 
                        : "border-gray-200 hover:border-gray-300 bg-white"
                      }
                    `}
                  >
                    <div className="flex flex-col items-center gap-2">
                      <div className={`
                        w-12 h-12 rounded-full flex items-center justify-center
                        ${userRole === "DOCTOR" ? "bg-blue-100" : "bg-gray-100"}
                      `}>
                        <Stethoscope className={`w-6 h-6 ${userRole === "DOCTOR" ? "text-blue-600" : "text-gray-500"}`} />
                      </div>
                      <span className={`text-sm font-medium ${userRole === "DOCTOR" ? "text-blue-700" : "text-gray-700"}`}>
                        Doctor
                      </span>
                    </div>
                    {userRole === "DOCTOR" && (
                      <div className="absolute top-2 right-2">
                        <div className="w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center">
                          <Check className="w-3 h-3 text-white" />
                        </div>
                      </div>
                    )}
                  </button>
                </div>
              </div>

              {/* Name Input */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Full Name
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    placeholder="Enter your full name"
                    value={formData.name}
                    name="name"
                    onChange={handleChange}
                    className="w-full px-4 py-3 pl-11 border border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:outline-none transition-all"
                    required
                  />
                </div>
              </div>

              {/* Email Input */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="email"
                    placeholder="Enter your email"
                    value={formData.email}
                    name="email"
                    onChange={handleChange}
                    className="w-full px-4 py-3 pl-11 border border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:outline-none transition-all"
                    required
                  />
                </div>
              </div>

              {/* Password Input */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Create a password"
                    value={formData.password}
                    name="password"
                    onChange={handleChange}
                    className="w-full px-4 py-3 pl-11 pr-11 border border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:outline-none transition-all"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              {/* Terms and Conditions */}
              <div className="flex items-start gap-2">
                <input
                  type="checkbox"
                  id="terms"
                  className="mt-1 w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  required
                />
                <label htmlFor="terms" className="text-xs text-gray-600">
                  I agree to the{" "}
                  <a href="#" className="text-blue-600 hover:underline">Terms of Service</a>
                  {" "}and{" "}
                  <a href="#" className="text-blue-600 hover:underline">Privacy Policy</a>
                </label>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className={`
                  w-full py-3 rounded-lg font-semibold transition-all
                  flex items-center justify-center gap-2
                  ${loading 
                    ? "bg-gray-400 cursor-not-allowed" 
                    : "bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-md hover:shadow-lg transform hover:scale-[1.02]"
                  }
                `}
              >
                {loading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Creating Account...
                  </>
                ) : (
                  <>
                    <Shield className="w-5 h-5" />
                    Create Account
                  </>
                )}
              </button>

              {/* Divider */}
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-gray-500">Or</span>
                </div>
              </div>

              {/* Login Link */}
              <p className="text-center text-sm text-gray-600">
                Already have an account?{" "}
                <button
                  type="button"
                  onClick={onSwitchToLogin}
                  className="text-blue-600 font-semibold hover:underline inline-flex items-center gap-1"
                >
                  Sign In
                  <ChevronDown className="w-4 h-4 rotate-[-90deg]" />
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