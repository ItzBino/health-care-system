import React, { useContext, useState } from 'react';
import { AdminContext } from '../context/AdminContext';
import { NavLink } from 'react-router-dom';
import {
  Users,
  Stethoscope,
  Calendar,
  Clock,
  CheckCircle,
  XCircle,
  ChevronRight,
  Download,
  RefreshCw,
  ArrowUp,
  ArrowDown,
  UserPlus,
} from 'lucide-react';

const Dashboard = () => {
  const { doctors, patients, appointments } = useContext(AdminContext);
  const [timeRange, setTimeRange] = useState('today');
  const [refreshing, setRefreshing] = useState(false);

  const handleRefresh = () => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 1000);
  };

  // --- Dynamic Statistics ---
  const totalDoctors = doctors?.length || 0;
  const approvedDoctors = doctors?.filter(d => d.status === 'APPROVED')?.length || 0;
  const pendingDoctors = doctors?.filter(d => d.status === 'PENDING')?.length || 0;

  const totalPatients = patients?.length || 0;
  const activePatients = patients?.filter(p => p.lastLogin)?.length || 0;

  const totalAppointments = appointments?.length || 0;
  const today = new Date().toISOString().split('T')[0];
  const todayAppointments = appointments?.filter(a => a.slotDate === today)?.length || 0;
  const pendingAppointments = appointments?.filter(a => a.status === 'PENDING')?.length || 0;
  const completedAppointments = appointments?.filter(a => a.status === 'COMPLETED')?.length || 0;
  const cancelledAppointments = appointments?.filter(a => a.status === 'CANCELLED')?.length || 0;

  return (
    <div className="min-h-screen bg-linear-to-br from-blue-50 via-white to-indigo-50">
      <div className="p-4 sm:p-6 lg:p-8">
        <div className="max-w-7xl mx-auto">

          {/* Header */}
          <div className="mb-8">
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Dashboard Overview</h1>
                <p className="text-gray-600 mt-1">Here’s your healthcare system at a glance.</p>
              </div>

              <div className="flex flex-wrap gap-2">
                <select
                  value={timeRange}
                  onChange={(e) => setTimeRange(e.target.value)}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
                >
                  <option value="today">Today</option>
                  <option value="week">This Week</option>
                  <option value="month">This Month</option>
                </select>

                <button
                  onClick={handleRefresh}
                  className="px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors flex items-center gap-2"
                >
                  <RefreshCw className={`w-4 h-4 ${refreshing ? 'animate-spin' : ''}`} />
                  Refresh
                </button>

                <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2">
                  <Download className="w-4 h-4" />
                  Export Report
                </button>
              </div>
            </div>
          </div>

          {/* --- Cards Section --- */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">

            {/* Doctors */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                    <Stethoscope className="w-6 h-6 text-blue-600" />
                  </div>
                  <span className="text-green-600 flex items-center gap-1 text-sm font-medium">
                    <ArrowUp className="w-4 h-4" /> +5%
                  </span>
                </div>
                <h3 className="text-2xl font-bold text-gray-900">{totalDoctors}</h3>
                <p className="text-gray-600 text-sm mt-1">Total Doctors</p>

                <div className="mt-4 pt-4 border-t border-gray-100 text-xs flex justify-between">
                  <span className="text-gray-500">Approved: {approvedDoctors}</span>
                  <span className="text-gray-500">Pending: {pendingDoctors}</span>
                </div>
              </div>
              <NavLink to="/doctors" className="block px-6 py-3 bg-gray-50 hover:bg-gray-100 transition-colors text-center text-sm font-medium text-gray-700">
                View All Doctors <ChevronRight className="w-4 h-4 inline" />
              </NavLink>
            </div>

            {/* Patients */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                    <Users className="w-6 h-6 text-green-600" />
                  </div>
                  <span className="text-green-600 flex items-center gap-1 text-sm font-medium">
                    <ArrowUp className="w-4 h-4" /> +3%
                  </span>
                </div>
                <h3 className="text-2xl font-bold text-gray-900">{totalPatients}</h3>
                <p className="text-gray-600 text-sm mt-1">Total Patients</p>
                <div className="mt-4 pt-4 border-t border-gray-100 text-xs flex justify-between">
                  <span className="text-gray-500">Active: {activePatients}</span>
                  <span className="text-gray-500">New Today: {patients?.filter(p => p.createdAt?.startsWith(today))?.length || 0}</span>
                </div>
              </div>
              <NavLink to="/patients" className="block px-6 py-3 bg-gray-50 hover:bg-gray-100 transition-colors text-center text-sm font-medium text-gray-700">
                View All Patients <ChevronRight className="w-4 h-4 inline" />
              </NavLink>
            </div>

            {/* Appointments */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                    <Calendar className="w-6 h-6 text-purple-600" />
                  </div>
                  <span className="text-blue-600 flex items-center gap-1 text-sm font-medium">
                    <Clock className="w-4 h-4" /> Today
                  </span>
                </div>
                <h3 className="text-2xl font-bold text-gray-900">{totalAppointments}</h3>
                <p className="text-gray-600 text-sm mt-1">Appointments Today</p>
                <div className="mt-4 pt-4 border-t border-gray-100 text-xs flex justify-between">
                  <span className="text-gray-500">Pending: {pendingAppointments}</span>
                  <span className="text-gray-500">Completed: {completedAppointments}</span>
                </div>
              </div>
              <NavLink to="/appointments" className="block px-6 py-3 bg-gray-50 hover:bg-gray-100 transition-colors text-center text-sm font-medium text-gray-700">
                View All Appointments <ChevronRight className="w-4 h-4 inline" />
              </NavLink>
            </div>

            {/* Quick Stats */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-6">Quick Stats</h2>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-blue-600" />
                    <span className="text-sm font-medium text-gray-700">Completed</span>
                  </div>
                  <span className="text-lg font-bold text-blue-600">{completedAppointments}</span>
                </div>

                <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <Clock className="w-5 h-5 text-yellow-600" />
                    <span className="text-sm font-medium text-gray-700">Pending</span>
                  </div>
                  <span className="text-lg font-bold text-yellow-600">{pendingAppointments}</span>
                </div>

                <div className="flex items-center justify-between p-3 bg-red-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <XCircle className="w-5 h-5 text-red-600" />
                    <span className="text-sm font-medium text-gray-700">Cancelled</span>
                  </div>
                  <span className="text-lg font-bold text-red-600">{cancelledAppointments}</span>
                </div>

                <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <UserPlus className="w-5 h-5 text-green-600" />
                    <span className="text-sm font-medium text-gray-700">New Registrations</span>
                  </div>
                  <span className="text-lg font-bold text-green-600">
                    {patients?.filter(p => p.createdAt?.startsWith(today))?.length || 0}
                  </span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
