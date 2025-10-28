import { NavLink } from 'react-router-dom';
import { useContext, useState, useEffect, useRef } from 'react';
import { AuthContext } from '../context/AuthContext';
import {
  LayoutDashboard,
  Users,
  UserCog,
  Calendar,
  Menu,
  X,
  LogOut,
  Bell,
  Search,
  Settings,
  ChevronDown,
  Shield,
  Activity,
  Home,
  Building2,
  FileText,
  TrendingUp,
  MessageSquare,
  HelpCircle,
  User,
  Stethoscope
} from 'lucide-react';
import { AdminContext } from '../context/AdminContext';

const Navbar = () => {
  const { logout, token, user } = useContext(AuthContext);
  const { appointments } = useContext(AdminContext);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const profileDropdownRef = useRef(null);
  const notificationDropdownRef = useRef(null);

  // Navigation items with icons
  const navigationItems = [
    {
      name: 'Dashboard',
      path: '/',
      icon: LayoutDashboard,
      badge: null
    },
    {
      name: 'Doctors',
      path: '/doctors',
      icon: Stethoscope,
      badge: null
    },
    {
      name: 'Patients',
      path: '/patients',
      icon: Users,
      badge: null
    },
    {
      name: 'Appointments',
      path: '/appointments',
      icon: Calendar,
      badge: appointments.length
      // badge: '5' Appointments.length // Example badge for new appointments
    }
  ];

  // Mock notifications
  const notifications = [
    { id: 1, text: 'New doctor registration pending', time: '5 min ago', unread: true },
    { id: 2, text: 'Appointment cancelled by patient', time: '1 hour ago', unread: true },
    { id: 3, text: 'System backup completed', time: '2 hours ago', unread: false }
  ];

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Handle click outside for dropdowns
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileDropdownRef.current && !profileDropdownRef.current.contains(event.target)) {
        setIsProfileDropdownOpen(false);
      }
      if (notificationDropdownRef.current && !notificationDropdownRef.current.contains(event.target)) {
        setIsNotificationOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [window.location.pathname]);

  if (!token) return null;

  return (
    <>
      {/* Main Navbar */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled 
          ? 'bg-white/95 backdrop-blur-md shadow-lg' 
          : 'bg-white shadow-md'
      }`}>
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-20">
            {/* Left Section - Logo and Brand */}
            <div className="flex items-center gap-3">
              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
              >
                {isMobileMenuOpen ? (
                  <X className="w-6 h-6 text-gray-700" />
                ) : (
                  <Menu className="w-6 h-6 text-gray-700" />
                )}
              </button>

              {/* Logo */}
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center shadow-md">
                  <Shield className="w-6 h-6 text-white" />
                </div>
                <div className="hidden sm:block">
                  <h1 className="text-xl font-bold text-gray-900">HealthAdmin</h1>
                  <p className="text-xs text-gray-500">Management Portal</p>
                </div>
              </div>
            </div>

            {/* Center Section - Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-1">
              {navigationItems.map((item) => (
                <NavLink
                  key={item.path}
                  to={item.path}
                  className={({ isActive }) => `
                    relative px-4 py-2 rounded-lg transition-all duration-200
                    flex items-center gap-2 group
                    ${isActive 
                      ? 'bg-blue-50 text-blue-700' 
                      : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                    }
                  `}
                >
                  <item.icon className="w-5 h-5" />
                  <span className="font-medium">{item.name}</span>
                  {item.badge && (
                    <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                      {item.badge}
                    </span>
                  )}
                </NavLink>
              ))}
            </div>

            {/* Right Section - Search, Notifications, Profile */}
            <div className="flex items-center gap-2 sm:gap-4">
             

              {/* Mobile Search Button */}
              <button className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors">
                <Search className="w-5 h-5 text-gray-600" />
              </button>

              {/* Notifications */}
              <div className="relative" ref={notificationDropdownRef}>
                <button
                  onClick={() => setIsNotificationOpen(!isNotificationOpen)}
                  className="relative p-2 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <Bell className="w-5 h-5 text-gray-600" />
                  <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
                </button>

                {/* Notifications Dropdown */}
                {isNotificationOpen && (
                  <div className="absolute right-0 mt-2 w-80 bg-white rounded-xl shadow-xl border border-gray-200 overflow-hidden">
                    <div className="px-4 py-3 bg-gray-50 border-b border-gray-200">
                      <h3 className="text-sm font-semibold text-gray-900">Notifications</h3>
                    </div>
                    <div className="max-h-96 overflow-y-auto">
                      {notifications.map((notification) => (
                        <div
                          key={notification.id}
                          className={`px-4 py-3 hover:bg-gray-50 transition-colors cursor-pointer ${
                            notification.unread ? 'bg-blue-50/50' : ''
                          }`}
                        >
                          <p className="text-sm text-gray-900">{notification.text}</p>
                          <p className="text-xs text-gray-500 mt-1">{notification.time}</p>
                        </div>
                      ))}
                    </div>
                    <div className="px-4 py-3 bg-gray-50 border-t border-gray-200">
                      <button className="text-sm text-blue-600 hover:text-blue-700 font-medium">
                        View all notifications
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* Profile Dropdown */}
              <div className="relative" ref={profileDropdownRef}>
                <button
                  onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)}
                  className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <div className="hidden sm:block text-right">
                    <p className="text-sm font-medium text-gray-900">
                      {user?.name || 'Admin User'}
                    </p>
                    <p className="text-xs text-gray-500">Administrator</p>
                  </div>
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center">
                    <User className="w-6 h-6 text-white" />
                  </div>
                  <ChevronDown className={`w-4 h-4 text-gray-500 transition-transform ${
                    isProfileDropdownOpen ? 'rotate-180' : ''
                  }`} />
                </button>

                {/* Profile Dropdown Menu */}
                {isProfileDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-xl border border-gray-200 overflow-hidden">
                    <div className="px-4 py-3 bg-gray-50 border-b border-gray-200">
                      <p className="text-sm font-medium text-gray-900">{user?.email || 'admin@healthcare.com'}</p>
                      <p className="text-xs text-gray-500 mt-1">System Administrator</p>
                    </div>
                    <div className="border-t border-gray-200 py-2">
                      <button
                        onClick={() => logout()}
                        className="flex items-center gap-3 px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors w-full text-left"
                      >
                        <LogOut className="w-4 h-4" />
                        Sign Out
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        <div className={`lg:hidden transition-all duration-300 overflow-hidden ${
          isMobileMenuOpen ? 'max-h-screen' : 'max-h-0'
        }`}>
          <div className="px-4 py-4 bg-gray-50 border-t border-gray-200 space-y-1">
            {navigationItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                onClick={() => setIsMobileMenuOpen(false)}
                className={({ isActive }) => `
                  flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200
                  ${isActive 
                    ? 'bg-blue-100 text-blue-700' 
                    : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                  }
                `}
              >
                <item.icon className="w-5 h-5" />
                <span className="font-medium">{item.name}</span>
                {item.badge && (
                  <span className="ml-auto bg-red-500 text-white text-xs px-2 py-0.5 rounded-full">
                    {item.badge}
                  </span>
                )}
              </NavLink>
            ))}
            
            {/* Mobile Only - Additional Links */}
            <div className="border-t border-gray-200 mt-4 pt-4">
              <button
                onClick={() => logout()}
                className="flex items-center gap-3 px-4 py-3 text-red-600 hover:bg-red-50 rounded-lg transition-colors w-full text-left"
              >
                <LogOut className="w-5 h-5" />
                <span className="font-medium">Sign Out</span>
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Spacer to prevent content from going under fixed navbar */}
      <div className="h-16 lg:h-20"></div>
    </>
  );
};

export default Navbar;