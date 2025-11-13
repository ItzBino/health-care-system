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
  Loader2,
  Grid3x3,
  Edit,
  Bell,
  Settings,
  Droplet,
  Users
} from 'lucide-react';

const PatientDashboard = () => {
  const { user, loading: authLoading, userRole } = useContext(AuthContext);
  const { patient, loading: patientLoading } = useContext(UserContext);
  const location = useLocation();

  const navigationTabs = userRole === "PATIENT" ? [
    { name: 'Overview', path: '/profile/overview', icon: Grid3x3 },
    { name: 'Appointments', path: '/profile/my-appointments', icon: Calendar },
    { name: 'Reports', path: '/profile/reports', icon: FileText },
    { name: 'Scripts', path: '/profile/prescriptions', icon: ClipboardList },
  ] : [];

  if (authLoading || patientLoading) {
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

  const calculateAge = (dob) => {
    if (!dob) return null;
    try {
      const birthDate = new Date(dob);
      const today = new Date();
      let age = today.getFullYear() - birthDate.getFullYear();
      const monthDiff = today.getMonth() - birthDate.getMonth();
      if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
        age--;
      }
      return age;
    } catch {
      return null;
    }
  };
  
  return (
    <div className="min-h-screen bg-slate-100">
      {/* Header Section */}
      <div className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          {/* Main Info */}
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="flex items-center gap-5">
              {user.image ? (
                <img
                  src={user.image}
                  alt={user.name}
                  className="w-20 h-20 md:w-24 md:h-24 rounded-full object-cover ring-4 ring-slate-100"
                />
              ) : (
                <div className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-slate-200 flex items-center justify-center">
                  <span className="text-slate-500 text-3xl md:text-4xl font-bold">
                    {user.name?.charAt(0).toUpperCase()}
                  </span>
                </div>
              )}
              <div>
                <h1 className="text-2xl md:text-3xl font-bold text-slate-900">{user.name}</h1>
                <div className="flex flex-wrap items-center gap-x-5 gap-y-1 mt-2 text-sm text-slate-500">
                  <span className="flex items-center gap-1.5"><Mail className="w-4 h-4" />{user.email}</span>
                  {patient?.phone && <span className="flex items-center gap-1.5"><Phone className="w-4 h-4" />{patient.phone}</span>}
                  {patient?.address && <span className="flex items-center gap-1.5"><MapPin className="w-4 h-4" />{patient.address}</span>}
                </div>
              </div>
            </div>
            <div className="w-full md:w-auto">
              <NavLink to='/settings'>
                <button className="w-full bg-slate-100 text-slate-700 font-semibold px-5 py-2.5 rounded-lg hover:bg-slate-200 transition-colors flex items-center justify-center gap-2">
                  <Edit className="w-4 h-4" /> Edit Profile
                </button>
              </NavLink>
            </div>
          </div>

          {/* Divider and Quick Stats */}
          <div className="mt-6 pt-6 border-t border-slate-200">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <StatItem icon={Droplet} label="Blood Group" value={patient?.bloodGroup === 'none' ? 'N/A' : patient?.bloodGroup || 'N/A'} color="text-red-600" />
              <StatItem icon={Calendar} label="Age" value={patient?.dob ? `${calculateAge(patient.dob)} yrs` : 'N/A'} color="text-blue-600" />
              <StatItem icon={Users} label="Gender" value={patient?.gender || 'N/A'} color="text-purple-600" />
          <StatItem
  icon={Shield}
  label="Insurance"
  value={patient?.insurance?.provider?.trim() ? 'Active' : 'None'}
  color="text-green-600"
/>

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
                  className={`flex items-center gap-2 px-1 py-4 font-semibold transition-colors border-b-2
                    ${isActive 
                      ? 'text-blue-700 border-blue-700' 
                      : 'text-slate-500 border-transparent hover:text-slate-800 hover:border-slate-300'}`}
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

// Sub-component for a cleaner main component
const StatItem = ({ icon: Icon, label, value, color }) => (
  <div className="flex items-center gap-3 bg-slate-50 p-3 rounded-lg">
    <div className={`flex-shrink-0 w-10 h-10 flex items-center justify-center rounded-full bg-white`}>
      <Icon className={`w-5 h-5 ${color || 'text-slate-500'}`} />
    </div>
    <div>
      <p className="text-sm text-slate-500">{label}</p>
      <p className="text-base font-bold text-slate-900">{value}</p>
    </div>
  </div>
);

export default PatientDashboard;