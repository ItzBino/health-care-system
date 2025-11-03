import React, { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { DoctorContext } from '../../context/DoctorContext';
import { Outlet, NavLink, useLocation } from 'react-router-dom';
import {
  User,
  Calendar,
  Grid3x3,
  Mail,
  Phone,
  Loader2,
  Edit,
  DollarSign,
  Stethoscope,
  Award,
  ChevronRight,
} from 'lucide-react';

const DoctorDashboard = () => {
  const { user, loading: authLoading, userRole } = useContext(AuthContext);
  const { doctorProfile, loading: doctorLoading, hasProfile } = useContext(DoctorContext);
  const location = useLocation();

  const navigationTabs = userRole === "DOCTOR" ? [
    { name: 'Overview', path: '/profile/overview', icon: Grid3x3 },
    { name: 'Appointments', path: '/profile/my-appointments', icon: Calendar },
  ] : [];

  if (authLoading || doctorLoading) {
    return (
      <div className="min-h-screen bg-slate-100 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-10 h-10 text-blue-700 animate-spin mx-auto" />
          <p className="text-slate-600 mt-3 font-medium">Loading Dashboard...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-slate-100 flex items-center justify-center p-4">
        <div className="text-center bg-white p-8 rounded-2xl shadow-md border border-slate-200 max-w-md">
          <User className="w-12 h-12 text-slate-400 mx-auto mb-4" />
          <h2 className="text-xl font-bold text-slate-800 mb-1">No User Found</h2>
          <p className="text-slate-500">Please log in to access your dashboard.</p>
        </div>
      </div>
    );
  }

  const isActiveTab = (path) => location.pathname === path;

  return (
    <div className="min-h-screen bg-slate-100">
      {/* Hero Header Section */}
      <div className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            
            {/* Left Section - Profile */}
            <div className="flex items-center gap-5">
              {user.image ? (
                <img
                  src={user.image}
                  alt={user.name}
                  className="w-20 h-20 md:w-24 md:h-24 rounded-full object-cover ring-4 ring-slate-100"
                />
              ) : (
                <div className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-slate-200 flex items-center justify-center">
                  <Stethoscope className="w-10 h-10 md:w-12 md:h-12 text-slate-500" />
                </div>
              )}
              
              <div>
                <div className="flex items-center gap-3 mb-1">
                  <h1 className="text-2xl md:text-3xl font-bold text-slate-900">Dr. {user.name}</h1>
                  <span className={`
                    px-2.5 py-1 text-xs font-semibold rounded-full
                    ${user.status === 'APPROVED' ? 'bg-green-100 text-green-800' : 
                      user.status === 'ACTIVE' ? 'bg-blue-100 text-blue-800' :
                      'bg-yellow-100 text-yellow-800'}
                  `}>
                    {user.status}
                  </span>
                </div>
                <p className="text-slate-600 text-lg">
                  {doctorProfile?.specialization || 'Medical Specialist'}
                </p>
                <div className="flex flex-wrap items-center gap-x-5 gap-y-1 mt-2 text-sm text-slate-500">
                  <span className="flex items-center gap-1.5">
                    <Mail className="w-4 h-4" />
                    {user.email}
                  </span>
                  {doctorProfile?.phoneNumber && (
                    <span className="flex items-center gap-1.5">
                      <Phone className="w-4 h-4" />
                      {doctorProfile.phoneNumber}
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* Right Section - Stats & Action */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 w-full md:w-auto">
              <div className="flex gap-6">
                <div className="text-left">
                  <p className="text-sm text-slate-500">Experience</p>
                  <p className="text-2xl font-bold text-slate-900">
                    {doctorProfile?.experienceYears || '0'}
                    <span className="text-base font-medium text-slate-500 ml-1">yrs</span>
                  </p>
                </div>
                <div className="text-left pl-6 border-l border-slate-200">
                  <p className="text-sm text-slate-500">Consult Fee</p>
                  <p className="text-2xl font-bold text-slate-900">
                    <span className="text-base font-medium text-slate-500 mr-1">$</span>
                    {doctorProfile?.fees || '0'}
                  </p>
                </div>
              </div>

              {!hasProfile && (
                <NavLink to='/doctor/complete-profile' className="w-full sm:w-auto">
                  <button className="w-full bg-blue-700 text-white px-5 py-2.5 rounded-lg font-semibold hover:bg-blue-800 transition-colors flex items-center justify-center gap-2">
                    <Edit className="w-4 h-4" />
                    Complete Profile
                  </button>
                </NavLink>
              )}
            </div>

          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="bg-white sticky top-0 z-20 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex gap-4 md:gap-6 overflow-x-auto">
            {navigationTabs.map((tab) => {
              const isActive = isActiveTab(tab.path);
              const Icon = tab.icon;
              
              return (
                <NavLink
                  key={tab.path}
                  to={tab.path}
                  className={`
                    flex items-center gap-2 px-1 py-4 font-semibold transition-colors border-b-2
                    ${isActive 
                      ? 'text-blue-700 border-blue-700' 
                      : 'text-slate-500 border-transparent hover:text-slate-800 hover:border-slate-300'}
                  `}
                >
                  <Icon className="w-5 h-5" />
                  <span>{tab.name}</span>
                </NavLink>
              );
            })}
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-2xl shadow-md border border-slate-200 p-6 md:p-8 min-h-[400px]">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default DoctorDashboard;