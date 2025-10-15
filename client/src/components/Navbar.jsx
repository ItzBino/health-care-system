import React, { useState, useRef, useEffect } from "react";
import {
  Menu,
  X,
  ChevronDown,
  User,
  Settings,
  LogOut,
  Heart,
} from "lucide-react";
import { NavLink, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const Navbar = ({setShowRegister}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const { user, logout, loading, token } = useContext(AuthContext); // Set to true to show profile
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

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

  // Navigation items
  const navItems = [
    { name: "Home", href: "/" },
    { name: "Services", href: "/services" },
    { name: "Doctors", href: "/doctors" },
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contact" },
  ];

  // Dropdown menu items
  const dropdownItems = [
    {
      name: "Profile",
      icon: User,
      onClick: () => {
        navigate("/profile");
      }, // ✅ navigate programmatically
    },
    {
      name: "Settings",
      icon: Settings,
      onClick: () => {
        console.log("Settings clicked");
        navigate("/settings");
      },
    },
    {
      name: "Sign Out",
      icon: LogOut,
      onClick: () => {
        console.log("Sign out clicked");
        logout();
      },
    },
  ];

  if (loading)
    return (
      <div className="flex justify-center items-center w-7 h-7">
        <img src="'./loading.gif" alt="loading" />
      </div>
    );

  return (
    <nav className="bg-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo Section */}
          <div className="flex items-center">
            <div className="flex-shrink-0 flex items-center">
              <Heart className="h-8 w-8 text-blue-600 mr-2" />
              <span className="text-xl font-bold text-gray-800">
                Nova<span className="text-blue-600">Med</span>
              </span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <NavLink
                key={item.name}
                to={item.href}
                className="text-gray-600 hover:text-blue-600 px-3 py-2 text-sm font-medium transition-colors duration-200"
              >
                {item.name}
              </NavLink>
            ))}
          </div>

          {/* Right Section - Profile/Login */}
          <div className="hidden md:flex items-center space-x-4">
            {token ? (
              <>
                {/* Notification Icon (optional) */}
                <button className="p-2 rounded-full hover:bg-gray-100 transition-colors">
                  <svg
                    className="h-6 w-6 text-gray-600"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                  </svg>
                </button>

                {/* Profile Dropdown */}
                <div className="relative" ref={dropdownRef}>
                  <button
                    onClick={() =>
                      setIsProfileDropdownOpen(!isProfileDropdownOpen)
                    }
                    className="flex items-center space-x-3 p-2 rounded-full hover:bg-gray-100 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <img
                      className="h-8 w-8 rounded-full object-cover border-2 border-gray-200"
                      src={user && user.image}
                      alt="Profile"
                    />
                    <ChevronDown
                      className={`h-4 w-4 text-gray-600 transition-transform duration-200 ${
                        isProfileDropdownOpen ? "rotate-180" : ""
                      }`}
                    />
                  </button>

                  {/* Dropdown Menu */}
                  {isProfileDropdownOpen && (
                    <div className="absolute right-0 mt-2 w-56 rounded-lg shadow-lg bg-white ring-1 ring-black ring-opacity-5 animate-fadeIn">
                      <div className="px-4 py-3 border-b border-gray-100">
                        <p className="text-sm font-medium text-gray-900">
                          {user && user.name}
                        </p>
                        <p className="text-xs text-gray-500">{user && user.email}</p>
                      </div>
                      <div className="py-1">
                        {dropdownItems.map((item) => (
                          <button
                            key={item.name}
                            onClick={() => {
                              item.onClick();
                              setIsProfileDropdownOpen(false);
                            }}
                            className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors"
                          >
                            <item.icon className="h-4 w-4 mr-3" />
                            {item.name}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <button
                onClick={() => {
                    setShowRegister(true)
                }}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200"
              >
                Sign In
              </button>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-600 hover:text-blue-600 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
            >
              {isMenuOpen ? (
                <X className="block h-6 w-6" />
              ) : (
                <Menu className="block h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-200 animate-slideDown">
          <div className="px-2 pt-2 pb-3 space-y-1">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-600 hover:text-blue-600 hover:bg-gray-50 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                {item.name}
              </a>
            ))}
          </div>

          {/* Mobile Profile Section */}
          {token && (
            <div className="border-t border-gray-200 px-4 py-3">
              <div className="flex items-center mb-3">
                <img
                  className="h-10 w-10 rounded-full object-cover border-2 border-gray-200"
                  src={user &&user.image}
                  alt="Profile"
                />
                <div className="ml-3">
                  <p className="text-sm font-medium text-gray-900">
                    {user && user.name}
                  </p>
                  <p className="text-xs text-gray-500">{user && user.email}</p>
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
                    className="flex items-center w-full px-3 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded-md transition-colors"
                  >
                    <item.icon className="h-4 w-4 mr-3" />
                    {item.name}
                  </button>
                ))}
              </div>
            </div>
          )}

          {!token && (
            <div className="border-t border-gray-200 px-4 py-3">
              <button
                onClick={() => {
                  setIsMenuOpen(false);
                  setShowRegister(true)
                }}
                className="w-full bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200"
              >
                Sign In
              </button>
            </div>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
