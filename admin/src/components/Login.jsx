import React, { useContext, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import { 
  Lock, 
  Mail, 
  Eye, 
  EyeOff, 
  Shield, 
  Activity,
  Heart,
  Stethoscope,
  AlertCircle,
  Loader2,
  UserCog,
  CheckCircle,
  Building2,
  Sparkles
} from 'lucide-react';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [focusedInput, setFocusedInput] = useState('');
  
  const { checkAdmin } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    // Basic validation
    if (!email || !password) {
      setError('Please fill in all fields');
      return;
    }
    
    if (!email.includes('@')) {
      setError('Please enter a valid email address');
      return;
    }
    
    setIsLoading(true);
    
    try {
      await checkAdmin({ email, password });
      // handle successful login
    } catch (error) {
      console.log(error);
      setError('Invalid email or password. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden bg-linear-to-br from-blue-50 via-white to-indigo-50">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-pink-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
      </div>

      {/* Medical Icons Pattern */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-10 left-10 text-blue-200 opacity-20">
          <Stethoscope className="w-24 h-24" />
        </div>
        <div className="absolute bottom-10 right-10 text-purple-200 opacity-20">
          <Heart className="w-32 h-32" />
        </div>
        <div className="absolute top-1/3 right-20 text-indigo-200 opacity-20">
          <Activity className="w-20 h-20" />
        </div>
        <div className="absolute bottom-1/3 left-20 text-pink-200 opacity-20">
          <Shield className="w-28 h-28" />
        </div>
      </div>

      {/* Main Content */}
      <div className="relative min-h-screen flex flex-col justify-center items-center px-4 sm:px-6 lg:px-8 py-12">
        {/* Logo and Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-linear-to-br from-blue-600 to-indigo-600 rounded-2xl shadow-lg mb-6 transform hover:scale-105 transition-transform">
            <Shield className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">
            Admin Portal
          </h1>
          <p className="text-gray-600 text-sm sm:text-base">
            Healthcare Management System
          </p>
        </div>

        {/* Login Card */}
        <div className="w-full max-w-md">
          <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-xl overflow-hidden">
            {/* Card Header */}
            <div className="bg-linear-to-r from-blue-600 to-indigo-600 px-6 sm:px-8 py-6">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-white/20 backdrop-blur-sm rounded-xl">
                  <UserCog className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-white">Welcome Back</h2>
                  <p className="text-blue-100 text-sm">Sign in to your admin account</p>
                </div>
              </div>
            </div>

            {/* Card Body */}
            <div className="p-6 sm:p-8">
              {/* Error Alert */}
              {error && (
                <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
                  <div className="flex-1">
                    <p className="text-sm text-red-800">{error}</p>
                  </div>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Email Input */}
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Mail className={`h-5 w-5 transition-colors ${
                        focusedInput === 'email' ? 'text-blue-600' : 'text-gray-400'
                      }`} />
                    </div>
                    <input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      onFocus={() => setFocusedInput('email')}
                      onBlur={() => setFocusedInput('')}
                      className={`
                        block w-full pl-10 pr-3 py-3 border rounded-lg
                        transition-all duration-200 bg-gray-50
                        ${focusedInput === 'email' 
                          ? 'border-blue-500 ring-2 ring-blue-200 bg-white' 
                          : 'border-gray-300 hover:border-gray-400'
                        }
                        focus:outline-none
                      `}
                      placeholder="admin@healthcare.com"
                      required
                    />
                  </div>
                </div>

                {/* Password Input */}
                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                    Password
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Lock className={`h-5 w-5 transition-colors ${
                        focusedInput === 'password' ? 'text-blue-600' : 'text-gray-400'
                      }`} />
                    </div>
                    <input
                      id="password"
                      type={showPassword ? 'text' : 'password'}
                      value={password}
                      onChange={(e) => setPassword(e.target.value.trim())}
                      onFocus={() => setFocusedInput('password')}
                      onBlur={() => setFocusedInput('')}
                      className={`
                        block w-full pl-10 pr-12 py-3 border rounded-lg
                        transition-all duration-200 bg-gray-50
                        ${focusedInput === 'password' 
                          ? 'border-blue-500 ring-2 ring-blue-200 bg-white' 
                          : 'border-gray-300 hover:border-gray-400'
                        }
                        focus:outline-none
                      `}
                      placeholder="Enter your password"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute inset-y-0 right-0 pr-3 flex items-center"
                    >
                      {showPassword ? (
                        <EyeOff className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                      ) : (
                        <Eye className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                      )}
                    </button>
                  </div>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isLoading}
                  className={`
                    w-full py-3 px-4 rounded-lg font-medium
                    transition-all duration-200 transform
                    ${isLoading 
                      ? 'bg-gray-400 cursor-not-allowed' 
                      : 'bg-linear-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 hover:shadow-lg hover:scale-[1.02] active:scale-[0.98]'
                    }
                    text-white shadow-md
                    flex items-center justify-center gap-2
                  `}
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      <span>Signing in...</span>
                    </>
                  ) : (
                    <>
                      <Lock className="w-5 h-5" />
                      <span>Sign In</span>
                    </>
                  )}
                </button>
              </form>

              {/* Divider */}
              <div className="mt-6 relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-gray-500">Security Notice</span>
                </div>
              </div>

              {/* Security Features */}
              <div className="mt-6 grid grid-cols-2 gap-4">
                <div className="flex items-center gap-2 text-xs text-gray-600">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span>SSL Encrypted</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-gray-600">
                  <Shield className="w-4 h-4 text-blue-500" />
                  <span>HIPAA Compliant</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-gray-600">
                  <Lock className="w-4 h-4 text-purple-500" />
                  <span>2FA Enabled</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-gray-600">
                  <Activity className="w-4 h-4 text-orange-500" />
                  <span>24/7 Monitoring</span>
                </div>
              </div>
            </div>
          </div>

          {/* Footer Links */}
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              Need help? 
              <a href="#" className="ml-1 text-blue-600 hover:text-blue-700 font-medium">
                Contact IT Support
              </a>
            </p>
          </div>
        </div>

        {/* Bottom Info */}
        <div className="mt-8 text-center">
          <div className="flex items-center justify-center gap-6 text-xs text-gray-500">
            <a href="#" className="hover:text-gray-700">Privacy Policy</a>
            <span>•</span>
            <a href="#" className="hover:text-gray-700">Terms of Service</a>
            <span>•</span>
            <a href="#" className="hover:text-gray-700">Documentation</a>
          </div>
          <p className="mt-4 text-xs text-gray-400">
            © 2024 Healthcare Management System. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;