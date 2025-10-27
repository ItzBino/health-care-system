import React, { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { DoctorContext } from '../../context/DoctorContext';
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
  DollarSign,
  Users,
  Heart,
  Stethoscope,
  Award,
  Clock,
  Star,
  TrendingUp,
  CalendarCheck,
  UserCheck,
  MessageSquare
} from 'lucide-react';

const DoctorDashboard = () => {
  const { user, loading: authLoading, userRole } = useContext(AuthContext);
  const { doctorProfile, loading: doctorLoading, hasProfile } = useContext(DoctorContext);
  const location = useLocation();

  const navigationTabs = userRole === "DOCTOR" ? [
    {
      name: 'Overview',
      path: '/profile/overview',
      icon: Grid3x3,
      description: 'View your dashboard',
      color: 'blue'
    },
    {
      name: 'Appointments',
      path: '/profile/my-appointments',
      icon: Calendar,
      description: 'Manage appointments',
      color: 'green'
    },
  ] : [];

  if (authLoading || doctorLoading) {
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

  const getStatusBadge = (status) => {
    const statusStyles = {
      APPROVED: 'bg-green-100 text-green-700 border-green-200',
      PENDING: 'bg-yellow-100 text-yellow-700 border-yellow-200',
      REJECTED: 'bg-red-100 text-red-700 border-red-200',
      ACTIVE: 'bg-blue-100 text-blue-700 border-blue-200'
    };
    return statusStyles[status] || statusStyles.PENDING;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-16 py-4 sm:py-6 lg:py-8">
        <div className="max-w-[1920px] mx-auto">
          {/* Doctor Profile Header Card */}
          <div className="bg-white rounded-xl sm:rounded-2xl shadow-xl overflow-hidden mb-6 lg:mb-8">
            {/* Header Background */}
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

            {/* Doctor Info Section */}
            <div className="px-4 sm:px-6 lg:px-8 pb-6 sm:pb-8">
              {/* Profile Image Container */}
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
                      <Stethoscope className="w-10 h-10 sm:w-12 sm:h-12 lg:w-14 lg:h-14 text-white" />
                    </div>
                  )}
                  <div className="absolute bottom-1 right-1 sm:bottom-2 sm:right-2 w-3 h-3 sm:w-4 sm:h-4 bg-green-500 border-2 border-white rounded-full"></div>
                </div>

                {/* Doctor Details */}
                <div className="flex-1 w-full pt-4 lg:pt-0 lg:pb-2">
                  <div className="flex flex-col xl:flex-row items-center lg:items-start xl:items-end justify-between gap-4 w-full">
                    <div className="w-full xl:w-auto text-center lg:text-left">
                      <div className="flex items-center justify-center lg:justify-start gap-3 mb-3">
                        <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900">
                          Dr. {user.name}
                        </h1>
                        <span className={`px-2 py-1 text-xs font-medium rounded-full border ${getStatusBadge(user.status)}`}>
                          {user.status}
                        </span>
                      </div>
                      
                      {/* Specialization if available */}
                      {doctorProfile?.specialization && (
                        <p className="text-base sm:text-lg text-gray-600 font-medium mb-2">
                          {doctorProfile.specialization}
                        </p>
                      )}
                      
                      {/* Contact details */}
                      <div className="flex flex-wrap justify-center lg:justify-start gap-3 sm:gap-4 lg:gap-5 text-xs sm:text-sm text-gray-600">
                        <span className="flex items-center gap-1.5">
                          <Mail className="w-3 h-3 sm:w-4 sm:h-4 text-gray-400" />
                          <span className="break-all">{user.email}</span>
                        </span>
                        {doctorProfile?.phoneNumber && (
                          <span className="flex items-center gap-1.5">
                            <Phone className="w-3 h-3 sm:w-4 sm:h-4 text-gray-400" />
                            {doctorProfile.phoneNumber}
                          </span>
                        )}
                        {doctorProfile?.clinicLocation && (
                          <span className="flex items-center gap-1.5">
                            <MapPin className="w-3 h-3 sm:w-4 sm:h-4 text-gray-400" />
                            <span className="truncate max-w-[200px]">{doctorProfile.clinicLocation}</span>
                          </span>
                        )}
                      </div>
                    </div>
                    
                    {/* Action buttons */}
                    <div className="flex gap-2">
                      {!hasProfile ? (
                        <NavLink to='/doctor/complete-profile'>
                          <button className="px-3 py-1.5 sm:px-4 sm:py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-1 sm:gap-2 text-sm sm:text-base whitespace-nowrap">
                            <Edit className="w-3 h-3 sm:w-4 sm:h-4" />
                            Complete Profile
                          </button>
                        </NavLink>
                      ) : (
                        <NavLink to='/settings'>
                          <button className="px-3 py-1.5 sm:px-4 sm:py-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors flex items-center gap-1 sm:gap-2 text-sm sm:text-base whitespace-nowrap">
                            <Edit className="w-3 h-3 sm:w-4 sm:h-4" />
                            Edit Profile
                          </button>
                        </NavLink>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Quick Stats */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mt-6 sm:mt-8">
                <div className="bg-blue-50 rounded-lg p-3 sm:p-4 border border-blue-100">
                  <div className="flex items-center gap-1.5 sm:gap-2 text-blue-700 mb-1.5">
                    <Award className="w-3 h-3 sm:w-4 sm:h-4" />
                    <span className="text-[10px] sm:text-xs font-medium">Experience</span>
                  </div>
                  <p className="text-sm sm:text-base lg:text-lg font-bold text-gray-900">
                    {doctorProfile?.experienceYears ? `${doctorProfile.experienceYears} Years` : 'N/A'}
                  </p>
                </div>
                <div className="bg-green-50 rounded-lg p-3 sm:p-4 border border-green-100">
                  <div className="flex items-center gap-1.5 sm:gap-2 text-green-700 mb-1.5">
                    <DollarSign className="w-3 h-3 sm:w-4 sm:h-4" />
                    <span className="text-[10px] sm:text-xs font-medium">Consultation Fee</span>
                  </div>
                  <p className="text-sm sm:text-base lg:text-lg font-bold text-gray-900">
                    {doctorProfile?.fees ? `$${doctorProfile.fees}` : 'N/A'}
                  </p>
                </div>
               
                <div className="bg-orange-50 rounded-lg p-3 sm:p-4 border border-orange-100">
                  <div className="flex items-center gap-1.5 sm:gap-2 text-orange-700 mb-1.5">
                    <Users className="w-3 h-3 sm:w-4 sm:h-4" />
                    <span className="text-[10px] sm:text-xs font-medium">Total Patients</span>
                  </div>
                  <p className="text-sm sm:text-base lg:text-lg font-bold text-gray-900">
                    {/* {Appointment.length} */}
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

export default DoctorDashboard;