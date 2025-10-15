import React, { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { UserContext } from '../../context/UserContext';
import { Outlet, NavLink, useLocation } from 'react-router-dom';
import {
  User,
  Calendar,
  FileText,
  ClipboardList,
  Mail,
  Phone,
  MapPin,
  Shield,
  Activity,
  Loader2,
  Grid3x3,
  ChevronRight,
  Edit,
  Bell,
  Settings,
  Droplet,
  Users,
  Heart
} from 'lucide-react';

const PatientDashboard = () => {
  const { user, loading: authLoading } = useContext(AuthContext);
  const { patient, loading: patientLoading } = useContext(UserContext);
  const location = useLocation();

  const navigationTabs = [
    {
      name: 'Overview',
      path: '/profile/overview',
      icon: Grid3x3,
      description: 'View your complete profile',
      color: 'blue'
    },
    {
      name: 'My Appointments',
      path: '/profile/my-appointments',
      icon: Calendar,
      description: 'Manage appointments',
      color: 'green'
    },
    {
      name: 'Reports',
      path: '/profile/reports',
      icon: FileText,
      description: 'Medical reports & tests',
      color: 'purple'
    },
    {
      name: 'Prescriptions',
      path: '/profile/prescriptions',
      icon: ClipboardList,
      description: 'Medication history',
      color: 'orange'
    }
  ];

  if (authLoading || patientLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-12 h-12 text-blue-600 animate-spin mx-auto mb-4" />
          <p className="text-gray-600 text-lg">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 flex items-center justify-center">
        <div className="text-center">
          <User className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h2 className="text-2xl font-semibold text-gray-700 mb-2">No User Found</h2>
          <p className="text-gray-500">Please log in to access your dashboard</p>
        </div>
      </div>
    );
  }

  const isActiveTab = (path) => location.pathname === path;

  const calculateAge = (dob) => {
    if (!dob) return null;
    const birthDate = new Date(dob);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  };

  const getColorClasses = (color, isActive) => {
    const colors = {
      blue: {
        bg: isActive ? 'bg-blue-100' : 'bg-gray-100',
        text: isActive ? 'text-blue-700' : 'text-gray-600',
        border: 'border-blue-600',
        lightBg: 'bg-blue-50'
      },
      green: {
        bg: isActive ? 'bg-green-100' : 'bg-gray-100',
        text: isActive ? 'text-green-700' : 'text-gray-600',
        border: 'border-green-600',
        lightBg: 'bg-green-50'
      },
      purple: {
        bg: isActive ? 'bg-purple-100' : 'bg-gray-100',
        text: isActive ? 'text-purple-700' : 'text-gray-600',
        border: 'border-purple-600',
        lightBg: 'bg-purple-50'
      },
      orange: {
        bg: isActive ? 'bg-orange-100' : 'bg-gray-100',
        text: isActive ? 'text-orange-700' : 'text-gray-600',
        border: 'border-orange-600',
        lightBg: 'bg-orange-50'
      }
    };
    return colors[color] || colors.blue;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-16 py-4 sm:py-6 lg:py-8">
        <div className="max-w-[1920px] mx-auto">
          {/* User Profile Header Card */}
          <div className="bg-white rounded-xl sm:rounded-2xl shadow-xl overflow-hidden mb-6 lg:mb-8">
            {/* Header Background - Reduced height */}
            <div className="h-20 sm:h-24 md:h-28 lg:h-32 bg-gradient-to-r from-blue-600 to-indigo-600 relative">
              <div className="absolute top-2 right-2 sm:top-4 sm:right-4 flex gap-2">
                <button className="p-1.5 sm:p-2 bg-white/20 backdrop-blur-sm rounded-lg hover:bg-white/30 transition-colors">
                  <Bell className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                </button>
                <button className="p-1.5 sm:p-2 bg-white/20 backdrop-blur-sm rounded-lg hover:bg-white/30 transition-colors">
                  <Settings className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                </button>
              </div>
            </div>

            {/* User Info Section - Added more padding and adjusted negative margin */}
            <div className="px-4 sm:px-6 lg:px-8 pb-6 sm:pb-8">
              {/* Profile Image Container - Less negative margin */}
              <div className="flex flex-col lg:flex-row items-center lg:items-end gap-4 lg:gap-6 -mt-10 sm:-mt-12 lg:-mt-14">
                {/* Profile Image */}
                <div className="relative flex-shrink-0">
                  {user.image ? (
                    <img
                      src={user.image}
                      alt={user.name}
                      className="w-24 h-24 sm:w-28 sm:h-28 lg:w-32 lg:h-32 rounded-xl sm:rounded-2xl object-cover border-4 border-white shadow-xl bg-white"
                    />
                  ) : (
                    <div className="w-24 h-24 sm:w-28 sm:h-28 lg:w-32 lg:h-32 rounded-xl sm:rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center border-4 border-white shadow-xl">
                      <span className="text-white text-2xl sm:text-3xl lg:text-4xl font-bold">
                        {user.name?.charAt(0).toUpperCase()}
                      </span>
                    </div>
                  )}
                  <div className="absolute bottom-1 right-1 sm:bottom-2 sm:right-2 w-3 h-3 sm:w-4 sm:h-4 bg-green-500 border-2 border-white rounded-full"></div>
                </div>

                {/* User Details - Added more top padding */}
                <div className="flex-1 w-full pt-4 lg:pt-0 lg:pb-2">
                  <div className="flex flex-col xl:flex-row items-center lg:items-start xl:items-end justify-between gap-4 w-full">
                    <div className="w-full xl:w-auto text-center lg:text-left">
                      {/* Name with more spacing */}
                      <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 mb-3">
                        {user.name}
                      </h1>
                      {/* Contact details with better spacing */}
                      <div className="flex flex-wrap justify-center lg:justify-start gap-3 sm:gap-4 lg:gap-5 text-xs sm:text-sm text-gray-600">
                        <span className="flex items-center gap-1.5">
                          <Mail className="w-3 h-3 sm:w-4 sm:h-4 text-gray-400" />
                          <span className="break-all">{user.email}</span>
                        </span>
                        {patient?.phone && (
                          <span className="flex items-center gap-1.5">
                            <Phone className="w-3 h-3 sm:w-4 sm:h-4 text-gray-400" />
                            {patient.phone}
                          </span>
                        )}
                        {patient?.address && (
                          <span className="flex items-center gap-1.5">
                            <MapPin className="w-3 h-3 sm:w-4 sm:h-4 text-gray-400" />
                            <span className="truncate max-w-[200px]">{patient.address}</span>
                          </span>
                        )}
                      </div>
                    </div>
                    {/* Edit button */}
                    <button className="px-3 py-1.5 sm:px-4 sm:py-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors flex items-center gap-1 sm:gap-2 text-sm sm:text-base whitespace-nowrap">
                      <Edit className="w-3 h-3 sm:w-4 sm:h-4" />
                      Edit Profile
                    </button>
                  </div>
                </div>
              </div>

              {/* Quick Stats - Added margin top for spacing */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mt-6 sm:mt-8">
                <div className="bg-blue-50 rounded-lg p-3 sm:p-4 border border-blue-100">
                  <div className="flex items-center gap-1.5 sm:gap-2 text-blue-700 mb-1.5">
                    <Droplet className="w-3 h-3 sm:w-4 sm:h-4" />
                    <span className="text-[10px] sm:text-xs font-medium">Blood Group</span>
                  </div>
                  <p className="text-sm sm:text-base lg:text-lg font-bold text-gray-900">
                    {patient?.bloodGroup === 'none' ? 'N/A' : patient?.bloodGroup || 'N/A'}
                  </p>
                </div>
                <div className="bg-green-50 rounded-lg p-3 sm:p-4 border border-green-100">
                  <div className="flex items-center gap-1.5 sm:gap-2 text-green-700 mb-1.5">
                    <Calendar className="w-3 h-3 sm:w-4 sm:h-4" />
                    <span className="text-[10px] sm:text-xs font-medium">Age</span>
                  </div>
                  <p className="text-sm sm:text-base lg:text-lg font-bold text-gray-900">
                    {patient?.dob ? `${calculateAge(patient.dob)} yrs` : 'N/A'}
                  </p>
                </div>
                <div className="bg-purple-50 rounded-lg p-3 sm:p-4 border border-purple-100">
                  <div className="flex items-center gap-1.5 sm:gap-2 text-purple-700 mb-1.5">
                    <Shield className="w-3 h-3 sm:w-4 sm:h-4" />
                    <span className="text-[10px] sm:text-xs font-medium">Insurance</span>
                  </div>
                  <p className="text-sm sm:text-base lg:text-lg font-bold text-gray-900">
                    {patient?.insurance?.provider ? 'Active' : 'None'}
                  </p>
                </div>
                <div className="bg-orange-50 rounded-lg p-3 sm:p-4 border border-orange-100">
                  <div className="flex items-center gap-1.5 sm:gap-2 text-orange-700 mb-1.5">
                    <Users className="w-3 h-3 sm:w-4 sm:h-4" />
                    <span className="text-[10px] sm:text-xs font-medium">Gender</span>
                  </div>
                  <p className="text-sm sm:text-base lg:text-lg font-bold text-gray-900">
                    {patient?.gender || 'N/A'}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="bg-white rounded-xl shadow-lg mb-6 overflow-hidden">
            <div className="grid grid-cols-2 lg:grid-cols-4 divide-x divide-gray-200">
              {navigationTabs.map((tab, index) => {
                const isActive = isActiveTab(tab.path);
                const colors = getColorClasses(tab.color, isActive);
                
                return (
                  <NavLink
                    key={tab.path}
                    to={tab.path}
                    className={`
                      relative p-3 sm:p-4 lg:p-5 transition-all duration-200 
                      ${isActive ? colors.lightBg : 'hover:bg-gray-50'}
                      ${index >= 2 ? 'border-t lg:border-t-0 border-gray-200' : ''}
                    `}
                  >
                    <div className="flex flex-col items-center text-center">
                      <div className={`
                        p-2 sm:p-2.5 lg:p-3 rounded-lg mb-1.5 sm:mb-2 transition-colors
                        ${colors.bg} ${colors.text}
                      `}>
                        <tab.icon className="w-5 h-5 sm:w-6 sm:h-6" />
                      </div>
                      <h3 className={`
                        font-semibold text-xs sm:text-sm mb-0.5 sm:mb-1
                        ${isActive ? colors.text : 'text-gray-700'}
                      `}>
                        {tab.name}
                      </h3>
                      <p className="text-[10px] sm:text-xs text-gray-500 hidden sm:block">
                        {tab.description}
                      </p>
                    </div>
                    {isActive && (
                      <div className={`absolute bottom-0 left-0 right-0 h-0.5 sm:h-1 ${colors.border} bg-current`}></div>
                    )}
                  </NavLink>
                );
              })}
            </div>
          </div>

          {/* Content Area */}
          <div className="bg-white rounded-xl shadow-lg min-h-[400px] sm:min-h-[500px] lg:min-h-[600px]">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PatientDashboard;
