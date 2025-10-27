import React, { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { 
  X, 
  Mail, 
  Lock,
  Stethoscope,
  Heart,
  LogIn,
  Eye,
  EyeOff,
  Check,
  AlertCircle,
  Loader2,
  ChevronRight,
  KeyRound,
  UserCircle,
  Shield,
  Activity
} from "lucide-react";

const Login = ({ isOpen, onClose, onSwitchToRegister }) => {
  const { login, setUserRole, userRole } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const onHandleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (error) setError("");
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    
    try {
      const response = await login(formData);
      if (response) {
        onClose();
        navigate("/");
      }
    } catch (error) {
      setError(error.response?.data?.message || "Invalid email or password");
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
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-32 rounded-full bg-white/10"></div>
              </div>
              
              {/* Icon and Title */}
              <div className="relative">
                <div className="flex justify-center mb-4">
                  <div className="w-20 h-20 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center ring-4 ring-white/20">
                    <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center">
                      <LogIn className="text-blue-600 w-8 h-8" />
                    </div>
                  </div>
                </div>
                <h2 className="text-2xl font-bold text-center text-white">
                  Welcome Back
                </h2>
                <p className="text-center text-blue-100 mt-2 text-sm">
                  Sign in to access your healthcare account
                </p>
              </div>
            </div>

            {/* Form */}
            <form onSubmit={onSubmitHandler} className="p-6 space-y-4">
              
              {/* Error Alert */}
              {error && (
                <div className="p-3 bg-red-50 border border-red-200 rounded-lg flex items-start gap-2 animate-shake">
                  <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-red-800">{error}</p>
                </div>
              )}

              {/* Role Selection - Enhanced */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  I am signing in as
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setUserRole("PATIENT")}
                    className={`
                      relative p-4 rounded-xl border-2 transition-all group
                      ${userRole === "PATIENT" 
                        ? "border-blue-500 bg-blue-50 shadow-md" 
                        : "border-gray-200 hover:border-gray-300 bg-white hover:shadow-sm"
                      }
                    `}
                  >
                    <div className="flex flex-col items-center gap-2">
                      <div className={`
                        w-12 h-12 rounded-full flex items-center justify-center transition-all
                        ${userRole === "PATIENT" 
                          ? "bg-gradient-to-br from-blue-500 to-blue-600 shadow-lg" 
                          : "bg-gray-100 group-hover:bg-gray-200"
                        }
                      `}>
                        <Heart className={`w-6 h-6 ${userRole === "PATIENT" ? "text-white" : "text-gray-500"}`} />
                      </div>
                      <span className={`text-sm font-medium ${userRole === "PATIENT" ? "text-blue-700" : "text-gray-700"}`}>
                        Patient
                      </span>
                    </div>
                    {userRole === "PATIENT" && (
                      <div className="absolute top-2 right-2">
                        <div className="w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center animate-scaleIn">
                          <Check className="w-3 h-3 text-white" />
                        </div>
                      </div>
                    )}
                  </button>

                  <button
                    type="button"
                    onClick={() => setUserRole("DOCTOR")}
                    className={`
                      relative p-4 rounded-xl border-2 transition-all group
                      ${userRole === "DOCTOR" 
                        ? "border-blue-500 bg-blue-50 shadow-md" 
                        : "border-gray-200 hover:border-gray-300 bg-white hover:shadow-sm"
                      }
                    `}
                  >
                    <div className="flex flex-col items-center gap-2">
                      <div className={`
                        w-12 h-12 rounded-full flex items-center justify-center transition-all
                        ${userRole === "DOCTOR" 
                          ? "bg-gradient-to-br from-blue-500 to-blue-600 shadow-lg" 
                          : "bg-gray-100 group-hover:bg-gray-200"
                        }
                      `}>
                        <Stethoscope className={`w-6 h-6 ${userRole === "DOCTOR" ? "text-white" : "text-gray-500"}`} />
                      </div>
                      <span className={`text-sm font-medium ${userRole === "DOCTOR" ? "text-blue-700" : "text-gray-700"}`}>
                        Doctor
                      </span>
                    </div>
                    {userRole === "DOCTOR" && (
                      <div className="absolute top-2 right-2">
                        <div className="w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center animate-scaleIn">
                          <Check className="w-3 h-3 text-white" />
                        </div>
                      </div>
                    )}
                  </button>
                </div>
              </div>

              {/* Email Input */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email Address
                </label>
                <div className="relative group">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 group-focus-within:text-blue-500 transition-colors" />
                  <input
                    name="email"
                    type="email"
                    placeholder="Enter your email"
                    value={formData.email}
                    onChange={onHandleChange}
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
                <div className="relative group">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 group-focus-within:text-blue-500 transition-colors" />
                  <input
                    name="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    value={formData.password}
                    onChange={onHandleChange}
                    className="w-full px-4 py-3 pl-11 pr-11 border border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:outline-none transition-all"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              {/* Remember Me & Forgot Password */}
              <div className="flex items-center justify-between">
                <label className="flex items-center cursor-pointer group">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  />
                  <span className="ml-2 text-sm text-gray-600 group-hover:text-gray-800">
                    Remember me
                  </span>
                </label>
                <a 
                  href="#" 
                  className="text-sm text-blue-600 hover:text-blue-700 font-medium flex items-center gap-1 group"
                >
                  <KeyRound className="w-3 h-3 group-hover:rotate-12 transition-transform" />
                  Forgot Password?
                </a>
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
                    : "bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-md hover:shadow-lg transform hover:scale-[1.02] active:scale-[0.98]"
                  }
                `}
              >
                {loading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Signing in...
                  </>
                ) : (
                  <>
                    <LogIn className="w-5 h-5" />
                    Sign In
                  </>
                )}
              </button>

              {/* Divider */}
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-gray-500">New to our platform?</span>
                </div>
              </div>

              {/* Register Link */}
              <div className="text-center">
                <p className="text-sm text-gray-600">
                  Don't have an account?{" "}
                  <button
                    type="button"
                    onClick={onSwitchToRegister}
                    className="text-blue-600 font-semibold hover:text-blue-700 inline-flex items-center gap-1 group"
                  >
                    Create Account
                    <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </button>
                </p>
              </div>

              {/* Security Notice */}
              <div className="flex items-center justify-center gap-4 pt-2 text-xs text-gray-500">
                <span className="flex items-center gap-1">
                  <Shield className="w-3 h-3" />
                  Secure Login
                </span>
                <span className="flex items-center gap-1">
                  <Activity className="w-3 h-3" />
                  HIPAA Compliant
                </span>
              </div>
            </form>
          </div>
        </div>
      </div> 
    </>
  );
};

export default Login;