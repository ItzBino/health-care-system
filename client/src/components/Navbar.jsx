import React, { useState, useRef, useEffect } from "react";
import {
  Menu,
  X,
  ChevronDown,
  User,
  Settings,
  LogOut,
  Heart,
  Bell,
  Home,
  Stethoscope,
  Users,
  Info,
  Phone,
  Shield,
  Activity,
  Calendar,
  FileText,
  Loader2,
  ChevronRight,
  UserCircle,
  BellRing,
  HelpCircle
} from "lucide-react";
import { NavLink, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const Navbar = ({ setShowRegister }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [notifications, setNotifications] = useState(3); // Mock notification count
  const { user, logout, loading, token } = useContext(AuthContext);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsProfileDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Navigation items with icons
  const navItems = [
    { name: "Home", href: "/", icon: Home },
    { name: "Services", href: "/services", icon: Activity },
    { name: "Doctors", href: "/doctors", icon: Stethoscope },
    { name: "About", href: "/about", icon: Info },
    { name: "Contact", href: "/contact", icon: Phone },
  ];

  // Dropdown menu items
  const dropdownItems = [
    {
      name: "My Profile",
      icon: UserCircle,
      description: "View and edit profile",
      onClick: () => navigate("/profile"),
      color: "blue"
    },
    {
      name: "Settings",
      icon: Settings,
      description: "Account settings",
      onClick: () => navigate("/settings"),
      color: "gray"
    },
    {
      name: "Sign Out",
      icon: LogOut,
      description: "Logout from account",
      onClick: () => logout(),
      color: "red",
      divider: true
    },
  ];

  // Get user role badge color
  const getRoleBadge = () => {
    const role = user?.role || "PATIENT";
    const badges = {
      DOCTOR: { bg: "bg-blue-100", text: "text-blue-700", label: "Doctor" },
      PATIENT: { bg: "bg-green-100", text: "text-green-700", label: "Patient" },
    };
    return badges[role] || badges.PATIENT;
  };

  if (loading) {
    return (
      <nav className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-center items-center h-16">
            <Loader2 className="w-6 h-6 text-blue-600 animate-spin" />
          </div>
        </div>
      </nav>
    );
  }

  return (
    <>
      <nav className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled 
          ? "bg-white/95 backdrop-blur-md shadow-lg" 
          : "bg-white shadow-md"
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16 lg:h-20">
            {/* Logo Section */}
            <div className="flex items-center">
              <NavLink to="/" className="flex items-center group">
                <div className="relative">
                  <div className="absolute inset-0 bg-blue-600 rounded-xl blur-lg group-hover:blur-xl opacity-30 transition-all"></div>
                  <div className="relative bg-gradient-to-br from-blue-600 to-indigo-600 p-2 rounded-xl shadow-md group-hover:shadow-lg transition-all">
                    <Heart className="h-6 w-6 text-white" />
                  </div>
                </div>
                <div className="ml-3">
                  <span className="text-xl font-bold text-gray-800">
                    Nova<span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">Med</span>
                  </span>
                  <p className="text-xs text-gray-500 hidden lg:block">Healthcare Excellence</p>
                </div>
              </NavLink>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-1">
              {navItems.map((item) => (
                <NavLink
                  key={item.name}
                  to={item.href}
                  className={({ isActive }) => `
                    relative px-4 py-2 rounded-lg font-medium text-sm
                    transition-all duration-200 group
                    ${isActive 
                      ? "text-blue-600 bg-blue-50" 
                      : "text-gray-600 hover:text-blue-600 hover:bg-gray-50"
                    }
                  `}
                >
                  {({ isActive }) => (
                    <>
                      <span className="flex items-center gap-2">
                        <item.icon className="w-4 h-4" />
                        {item.name}
                      </span>
                      {isActive && (
                        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1/2 h-0.5 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full"></div>
                      )}
                    </>
                  )}
                </NavLink>
              ))}
            </div>

            {/* Right Section - Profile/Login */}
            <div className="hidden lg:flex items-center space-x-3">
              {token ? (
                <>
                  {/* Notification Bell */}
                  <button className="relative p-2.5 rounded-lg hover:bg-gray-100 transition-all group">
                    <Bell className="h-5 w-5 text-gray-600 group-hover:text-blue-600 transition-colors" />
                    {notifications > 0 && (
                      <>
                        <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
                        <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full"></span>
                      </>
                    )}
                  </button>

                  {/* Profile Dropdown */}
                  <div className="relative" ref={dropdownRef}>
                    <button
                      onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)}
                      className={`
                        flex items-center space-x-3 px-3 py-2 rounded-xl
                        transition-all duration-200
                        ${isProfileDropdownOpen 
                          ? "bg-blue-50 shadow-md" 
                          : "hover:bg-gray-100"
                        }
                      `}
                    >
                      <div className="relative">
                        {user?.image ? (
                          <img
                            className="h-10 w-10 rounded-full object-cover border-2 border-gray-200"
                            src={user.image}
                            alt="Profile"
                          />
                        ) : (
                          <div className="h-10 w-10 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center">
                            <User className="h-5 w-5 text-white" />
                          </div>
                        )}
                        <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></div>
                      </div>
                      <div className="hidden xl:block text-left">
                        <p className="text-sm font-semibold text-gray-800">{user?.name || "User"}</p>
                        <p className="text-xs text-gray-500">Welcome back</p>
                      </div>
                      <ChevronDown className={`h-4 w-4 text-gray-500 transition-transform duration-200 ${
                        isProfileDropdownOpen ? "rotate-180" : ""
                      }`} />
                    </button>

                    {/* Enhanced Dropdown Menu */}
                    {isProfileDropdownOpen && (
                      <div className="absolute right-0 mt-3 w-72 rounded-xl shadow-2xl bg-white border border-gray-100 overflow-hidden animate-fadeIn">
                        {/* User Info Header */}
                        <div className="bg-gradient-to-br from-blue-50 to-indigo-50 px-4 py-4 border-b border-gray-100">
                          <div className="flex items-center gap-3">
                            {user?.image ? (
                          <img
                            className="h-10 w-10 rounded-full object-cover border-2 border-gray-200"
                            src={user.image}
                            alt="Profile"
                          />
                        ) : (
                          <div className="h-10 w-10 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center">
                            <User className="h-5 w-5 text-white" />
                          </div>
                        )}
                            <div className="flex-1">
                              <p className="text-sm font-semibold text-gray-900">{user?.name || "User"}</p>
                              <p className="text-xs text-gray-500">{user?.email || "user@example.com"}</p>
                              <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium mt-1 ${getRoleBadge().bg} ${getRoleBadge().text}`}>
                                {getRoleBadge().label}
                              </span>
                            </div>
                          </div>
                        </div>

                        {/* Menu Items */}
                        <div className="py-2">
                          {dropdownItems.map((item, index) => (
                            <React.Fragment key={item.name}>
                              {item.divider && (
                                <div className="border-t border-gray-100 my-2"></div>
                              )}
                              <button
                                onClick={() => {
                                  item.onClick();
                                  setIsProfileDropdownOpen(false);
                                }}
                                className={`
                                  flex items-center w-full px-4 py-3
                                  transition-all duration-200 group
                                  ${item.color === 'red' 
                                    ? 'hover:bg-red-50 hover:text-red-600' 
                                    : 'hover:bg-gray-50 hover:text-blue-600'
                                  }
                                `}
                              >
                                <div className={`
                                  p-2 rounded-lg mr-3 transition-colors
                                  ${item.color === 'red'
                                    ? 'bg-red-100 text-red-600 group-hover:bg-red-200'
                                    : 'bg-gray-100 text-gray-600 group-hover:bg-blue-100 group-hover:text-blue-600'
                                  }
                                `}>
                                  <item.icon className="h-4 w-4" />
                                </div>
                                <div className="flex-1 text-left">
                                  <p className="text-sm font-medium">{item.name}</p>
                                  <p className="text-xs text-gray-500">{item.description}</p>
                                </div>
                                <ChevronRight className="h-4 w-4 text-gray-400 group-hover:text-current opacity-0 group-hover:opacity-100 transform translate-x-0 group-hover:translate-x-1 transition-all" />
                              </button>
                            </React.Fragment>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </>
              ) : (
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setShowRegister(true)}
                    className="relative px-5 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg font-medium shadow-md hover:shadow-lg transform hover:scale-105 transition-all duration-200 group"
                  >
                    <span className="relative z-10">Register</span>
                    <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-blue-600 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  </button>
                </div>
              )}
            </div>

            {/* Mobile menu button */}
            <div className="lg:hidden flex items-center gap-3">
              {token && (
                <button className="relative p-2 rounded-lg hover:bg-gray-100 transition-all">
                  <Bell className="h-5 w-5 text-gray-600" />
                  {notifications > 0 && (
                    <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
                  )}
                </button>
              )}
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="p-2 rounded-lg hover:bg-gray-100 transition-all focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {isMenuOpen ? (
                  <X className="h-6 w-6 text-gray-700" />
                ) : (
                  <Menu className="h-6 w-6 text-gray-700" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Enhanced Mobile menu */}
        <div className={`
          lg:hidden fixed inset-x-0 top-16 lg:top-20 bg-white border-t border-gray-200 shadow-xl
          transition-all duration-300 ease-in-out
          ${isMenuOpen 
            ? 'max-h-screen opacity-100 visible' 
            : 'max-h-0 opacity-0 invisible overflow-hidden'
          }
        `}>
          <div className="max-h-[calc(100vh-4rem)] overflow-y-auto">
            {/* Mobile Navigation Links */}
            <div className="px-4 pt-4 pb-3 space-y-1">
              {navItems.map((item) => (
                <NavLink
                  key={item.name}
                  to={item.href}
                  className={({ isActive }) => `
                    flex items-center gap-3 px-4 py-3 rounded-lg font-medium
                    transition-all duration-200
                    ${isActive 
                      ? "text-blue-600 bg-blue-50" 
                      : "text-gray-600 hover:text-blue-600 hover:bg-gray-50"
                    }
                  `}
                  onClick={() => setIsMenuOpen(false)}
                >
                  <item.icon className="h-5 w-5" />
                  {item.name}
                </NavLink>
              ))}
            </div>

            {/* Mobile Profile Section */}
            {token ? (
              <div className="border-t border-gray-200">
                <div className="px-4 py-4">
                  <div className="flex items-center gap-3 mb-4">
                    {user?.image && (
                      <img
                        className="h-12 w-12 rounded-full object-cover border-2 border-gray-200"
                        src={user.image}
                        alt="Profile"
                      />
                    )}
                    <div className="flex-1">
                      <p className="text-sm font-semibold text-gray-900">{user?.name || "User"}</p>
                      <p className="text-xs text-gray-500">{user?.email || "user@example.com"}</p>
                      <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium mt-1 ${getRoleBadge().bg} ${getRoleBadge().text}`}>
                        {getRoleBadge().label}
                      </span>
                    </div>
                  </div>

                  <div className="space-y-1">
                    {dropdownItems.map((item) => (
                      <button
                        key={item.name}
                        onClick={() => {
                          item.onClick();
                          setIsMenuOpen(false);
                        }}
                        className={`
                          flex items-center gap-3 w-full px-3 py-2.5 rounded-lg
                          transition-all duration-200
                          ${item.color === 'red'
                            ? 'text-red-600 hover:bg-red-50'
                            : 'text-gray-700 hover:bg-gray-50 hover:text-blue-600'
                          }
                        `}
                      >
                        <item.icon className="h-5 w-5" />
                        <span className="font-medium">{item.name}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <div className="border-t border-gray-200 px-4 py-4 space-y-3">
                <button
                  onClick={() => {
                    setIsMenuOpen(false);
                    setShowRegister(true);
                  }}
                  className="w-full px-4 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg hover:from-blue-700 hover:to-indigo-700 transition-all font-medium shadow-md"
                >
                  Register
                </button>
              </div>
            )}
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;