// import React, { useContext } from 'react'
// import { AdminContext } from '../context/AdminContext'

// const Dashboard = () => {
//     const {doctors,patients,appointments,profile} = useContext(AdminContext)
//     console.log(profile)
//   return (
//     <div>
//       <div>
//         Doctors:{doctors.length}
//       </div>
//       <div>
//         Patients:{patients.length}
//       </div>
//       {/* <div>
//         Appointments:{appointments.length}
//       </div> */}
//     </div>
//   )
// }

// export default Dashboard

import React, { useContext, useState, useEffect } from 'react';
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
  Star,
  UserPlus,
  PieChart,
  ArrowUp,
  ArrowDown,

 
} from 'lucide-react';

const Dashboard = () => {
  const { doctors, patients, appointments, profile } = useContext(AdminContext);
  const [timeRange, setTimeRange] = useState('today');
  const [refreshing, setRefreshing] = useState(false);

  // Calculate statistics
  const stats = {
    doctors: {
      total: doctors?.length || 0,
      approved: doctors?.filter(d => d.status === 'APPROVED').length || 0,
      pending: doctors?.filter(d => d.status === 'PENDING').length || 0,
      verified: doctors?.filter(d => d.emailVerified).length || 0,
      growth: 12.5 // Mock growth percentage
    },
    patients: {
      total: patients?.length || 0,
      active: patients?.filter(p => p.lastVisit).length || 0,
      new: 24, // Mock new patients
      growth: 8.3
    },
    appointments: {
      total: appointments?.length || 0,
      today: 15, // Mock today's appointments
      pending: 8,
      completed: 42,
      cancelled: 3
    },
    revenue: {
      today: 4250,
      month: 125000,
      growth: 15.2
    }
  };





  const handleRefresh = () => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 1000);
  };

  // Chart data for appointments by day (mock)
  const chartData = [
    { day: 'Mon', appointments: 45 },
    { day: 'Tue', appointments: 52 },
    { day: 'Wed', appointments: 38 },
    { day: 'Thu', appointments: 65 },
    { day: 'Fri', appointments: 48 },
    { day: 'Sat', appointments: 32 },
    { day: 'Sun', appointments: 28 }
  ];


  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      <div className="p-4 sm:p-6 lg:p-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Dashboard Overview</h1>
                <p className="text-gray-600 mt-1">Welcome back! Here's what's happening in your healthcare system.</p>
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
                  <option value="year">This Year</option>
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

          {/* Main Stats Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {/* Doctors Card */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                    <Stethoscope className="w-6 h-6 text-blue-600" />
                  </div>
                  <span className={`flex items-center gap-1 text-sm font-medium ${stats.doctors.growth > 0 ? 'text-green-600' : 'text-red-600'}`}>
                    {stats.doctors.growth > 0 ? <ArrowUp className="w-4 h-4" /> : <ArrowDown className="w-4 h-4" />}
                    {Math.abs(stats.doctors.growth)}%
                  </span>
                </div>
                <h3 className="text-2xl font-bold text-gray-900">{stats.doctors.total}</h3>
                <p className="text-gray-600 text-sm mt-1">Total Doctors</p>
                <div className="mt-4 pt-4 border-t border-gray-100">
                  <div className="flex justify-between text-xs">
                    <span className="text-gray-500">Approved: {stats.doctors.approved}</span>
                    <span className="text-gray-500">Pending: {stats.doctors.pending}</span>
                  </div>
                </div>
              </div>
              <NavLink to="/doctors" className="block px-6 py-3 bg-gray-50 hover:bg-gray-100 transition-colors">
                <span className="flex items-center justify-center gap-2 text-sm font-medium text-gray-700">
                  View All Doctors
                  <ChevronRight className="w-4 h-4" />
                </span>
              </NavLink>
            </div>

            {/* Patients Card */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                    <Users className="w-6 h-6 text-green-600" />
                  </div>
                  <span className={`flex items-center gap-1 text-sm font-medium ${stats.patients.growth > 0 ? 'text-green-600' : 'text-red-600'}`}>
                    {stats.patients.growth > 0 ? <ArrowUp className="w-4 h-4" /> : <ArrowDown className="w-4 h-4" />}
                    {Math.abs(stats.patients.growth)}%
                  </span>
                </div>
                <h3 className="text-2xl font-bold text-gray-900">{stats.patients.total}</h3>
                <p className="text-gray-600 text-sm mt-1">Total Patients</p>
                <div className="mt-4 pt-4 border-t border-gray-100">
                  <div className="flex justify-between text-xs">
                    <span className="text-gray-500">Active: {stats.patients.active}</span>
                    <span className="text-gray-500">New: {stats.patients.new}</span>
                  </div>
                </div>
              </div>
              <NavLink to="/patients" className="block px-6 py-3 bg-gray-50 hover:bg-gray-100 transition-colors">
                <span className="flex items-center justify-center gap-2 text-sm font-medium text-gray-700">
                  View All Patients
                  <ChevronRight className="w-4 h-4" />
                </span>
              </NavLink>
            </div>

            {/* Appointments Card */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                    <Calendar className="w-6 h-6 text-purple-600" />
                  </div>
                  <span className="flex items-center gap-1 text-sm font-medium text-blue-600">
                    <Clock className="w-4 h-4" />
                    Today
                  </span>
                </div>
                <h3 className="text-2xl font-bold text-gray-900">{stats.appointments.today}</h3>
                <p className="text-gray-600 text-sm mt-1">Appointments Today</p>
                <div className="mt-4 pt-4 border-t border-gray-100">
                  <div className="flex justify-between text-xs">
                    <span className="text-gray-500">Pending: {stats.appointments.pending}</span>
                    <span className="text-gray-500">Completed: {stats.appointments.completed}</span>
                  </div>
                </div>
              </div>
              <NavLink to="/appointments" className="block px-6 py-3 bg-gray-50 hover:bg-gray-100 transition-colors">
                <span className="flex items-center justify-center gap-2 text-sm font-medium text-gray-700">
                  View All Appointments
                  <ChevronRight className="w-4 h-4" />
                </span>
              </NavLink>
            </div>


           
           

            {/* Quick Stats */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-6">Quick Stats</h2>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-blue-600" />
                    <span className="text-sm font-medium text-gray-700">Completed Today</span>
                  </div>
                  <span className="text-lg font-bold text-blue-600">42</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <Clock className="w-5 h-5 text-yellow-600" />
                    <span className="text-sm font-medium text-gray-700">Pending Review</span>
                  </div>
                  <span className="text-lg font-bold text-yellow-600">8</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-red-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <XCircle className="w-5 h-5 text-red-600" />
                    <span className="text-sm font-medium text-gray-700">Cancelled</span>
                  </div>
                  <span className="text-lg font-bold text-red-600">3</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <UserPlus className="w-5 h-5 text-green-600" />
                    <span className="text-sm font-medium text-gray-700">New Registrations</span>
                  </div>
                  <span className="text-lg font-bold text-green-600">24</span>
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
