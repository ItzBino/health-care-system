import React, { useState, useContext, useEffect } from "react";
import {
  Calendar,
  Clock,
  User,
  MapPin,
  Phone,
  Search,
  Filter,
  ChevronRight,
  AlertCircle,
  CheckCircle,
  XCircle,
  CalendarX,
  Video,
  Building,
  MoreVertical,
  FileText,
  ClipboardList,
  MessageSquare,
  Stethoscope,
} from "lucide-react";
import { api } from "../../api/auth";
import { NavLink } from "react-router-dom";

const MyAppointments = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [appointments, setAppointments] = useState([]);
  const [dropdownOpen, setDropdownOpen] = useState(null);

  const fetchBookedAppointments = async () => {
    const response = await api.get("/api/doctor/appointment");
    if (response.data.success) {
      setAppointments(response.data.data);
      console.log("doctor appointments: ", response.data.data);
    }
  };

  useEffect(() => {
    fetchBookedAppointments();
  }, []);

  const getStatusBadge = (status) => {
    const statusConfig = {
      UPCOMING: {
        bg: "bg-blue-50 border-blue-200",
        text: "text-blue-700",
        icon: Clock,
        label: "Upcoming",
      },
      COMPLETED: {
        bg: "bg-green-50 border-green-200",
        text: "text-green-700",
        icon: CheckCircle,
        label: "Completed",
      },
      CANCELLED: {
        bg: "bg-red-50 border-red-200",
        text: "text-red-700",
        icon: XCircle,
        label: "Cancelled",
      },
      REQUESTED: {
        bg: "bg-yellow-50 border-yellow-200",
        text: "text-yellow-700",
        icon: AlertCircle,
        label: "Requested",
      },
      PENDING: {
        bg: "bg-orange-50 border-orange-200",
        text: "text-orange-700",
        icon: AlertCircle,
        label: "Pending",
      },
    };
    return statusConfig[status?.toUpperCase()] || statusConfig.PENDING;
  };

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const formatTime = (timeString) => {
    // If timeString is already formatted, return it
    if (timeString?.includes('AM') || timeString?.includes('PM')) return timeString;
    // Otherwise format it
    return timeString;
  };

  // Filter appointments based on search and status
  const filteredAppointments = appointments.filter((appointment) => {
    const matchesSearch = 
      appointment.patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      appointment.reason?.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = 
      filterStatus === "all" || 
      appointment.status?.toUpperCase() === filterStatus.toUpperCase();
    
    return matchesSearch && matchesStatus;
  });

  // Calculate stats
  const stats = {
    total: appointments.length,
    upcoming: appointments.filter(a => a.status?.toUpperCase() === 'UPCOMING').length,
    completed: appointments.filter(a => a.status?.toUpperCase() === 'COMPLETED').length,
    cancelled: appointments.filter(a => a.status?.toUpperCase() === 'CANCELLED').length,
  };

  if (appointments.length === 0) {
    return (
      <div className="p-4 sm:p-6 lg:p-8 bg-gray-50 min-h-screen">
        {/* Header */}
        <div className="mb-6">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
            My Appointments
          </h2>
          <p className="text-gray-600">
            Manage and track all your medical appointments
          </p>
        </div>

        {/* Search and Filter Bar */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 mb-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search appointments..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div className="flex gap-2">
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
              >
                <option value="all">All Status</option>
                <option value="upcoming">Upcoming</option>
                <option value="completed">Completed</option>
                <option value="cancelled">Cancelled</option>
                <option value="requested">Requested</option>
              </select>
              <button className="px-4 py-2.5 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors flex items-center gap-2">
                <Filter className="w-4 h-4" />
                <span className="hidden sm:inline">Filter</span>
              </button>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-600 text-sm">Total Appointments</span>
              <Calendar className="w-4 h-4 text-gray-400" />
            </div>
            <p className="text-2xl font-bold text-gray-900">0</p>
          </div>
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-600 text-sm">Upcoming</span>
              <Clock className="w-4 h-4 text-blue-400" />
            </div>
            <p className="text-2xl font-bold text-blue-600">0</p>
          </div>
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-600 text-sm">Completed</span>
              <CheckCircle className="w-4 h-4 text-green-400" />
            </div>
            <p className="text-2xl font-bold text-green-600">0</p>
          </div>
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-600 text-sm">Cancelled</span>
              <XCircle className="w-4 h-4 text-red-400" />
            </div>
            <p className="text-2xl font-bold text-red-600">0</p>
          </div>
        </div>

        {/* Empty State */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 sm:p-12">
          <div className="text-center max-w-md mx-auto">
            <div className="w-24 h-24 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <CalendarX className="w-12 h-12 text-blue-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">
              No Appointments Yet
            </h3>
            <p className="text-gray-600 mb-8">
              You haven't received any appointment requests yet
            </p>
          </div>
        </div>
      </div>
    );
  }

  // If there are appointments
  return (
    <div className="p-4 sm:p-6 lg:p-8 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="mb-6">
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
          My Appointments
        </h2>
        <p className="text-gray-600">
          Manage and track all your medical appointments
        </p>
      </div>

      {/* Search and Filter Bar */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 mb-6">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search by patient name or reason..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div className="flex gap-2">
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
            >
              <option value="all">All Status</option>
              <option value="upcoming">Upcoming</option>
              <option value="completed">Completed</option>
              <option value="cancelled">Cancelled</option>
              <option value="requested">Requested</option>
            </select>
            <button className="px-4 py-2.5 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors flex items-center gap-2">
              <Filter className="w-4 h-4" />
              <span className="hidden sm:inline">Filter</span>
            </button>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-6">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-3 sm:p-4">
          <div className="flex items-center justify-between mb-1 sm:mb-2">
            <span className="text-gray-600 text-xs sm:text-sm">Total</span>
            <Calendar className="w-4 h-4 text-gray-400" />
          </div>
          <p className="text-xl sm:text-2xl font-bold text-gray-900">{stats.total}</p>
        </div>
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-3 sm:p-4">
          <div className="flex items-center justify-between mb-1 sm:mb-2">
            <span className="text-gray-600 text-xs sm:text-sm">Upcoming</span>
            <Clock className="w-4 h-4 text-blue-400" />
          </div>
          <p className="text-xl sm:text-2xl font-bold text-blue-600">{stats.upcoming}</p>
        </div>
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-3 sm:p-4">
          <div className="flex items-center justify-between mb-1 sm:mb-2">
            <span className="text-gray-600 text-xs sm:text-sm">Completed</span>
            <CheckCircle className="w-4 h-4 text-green-400" />
          </div>
          <p className="text-xl sm:text-2xl font-bold text-green-600">{stats.completed}</p>
        </div>
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-3 sm:p-4">
          <div className="flex items-center justify-between mb-1 sm:mb-2">
            <span className="text-gray-600 text-xs sm:text-sm">Cancelled</span>
            <XCircle className="w-4 h-4 text-red-400" />
          </div>
          <p className="text-xl sm:text-2xl font-bold text-red-600">{stats.cancelled}</p>
        </div>
      </div>

      {/* Appointments Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6">
        {filteredAppointments.map((appointment) => {
          const statusConfig = getStatusBadge(appointment.status);
          const StatusIcon = statusConfig.icon;

          return (
            <div
              key={appointment._id}
              className="bg-white rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow duration-200"
            >
              {/* Card Header */}
              <div className="p-4 sm:p-5 border-b border-gray-100">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center space-x-3">
                    <div className="relative">
                      <img
                        src={appointment.patient.image || "/default-avatar.png"}
                        alt={appointment.patient.name}
                        className="w-12 h-12 sm:w-14 sm:h-14 rounded-full object-cover border-2 border-gray-200"
                      />
                      <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white"></div>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 text-sm sm:text-base">
                        {appointment.patient.name}
                      </h3>
                      <p className="text-xs sm:text-sm text-gray-500">
                        Patient ID: #{appointment.patient._id.slice(-6)}
                      </p>
                    </div>
                  </div>
                  <div className="relative">
                    <button
                      onClick={() => setDropdownOpen(dropdownOpen === appointment._id ? null : appointment._id)}
                      className="p-1 hover:bg-gray-100 rounded-lg transition-colors"
                    >
                      <MoreVertical className="w-5 h-5 text-gray-400" />
                    </button>
                    {dropdownOpen === appointment._id && (
                      <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 z-10">
                        <button className="w-full text-left px-4 py-2 text-sm hover:bg-gray-50">
                          View Details
                        </button>
                        <button className="w-full text-left px-4 py-2 text-sm hover:bg-gray-50">
                          Contact Patient
                        </button>
                        <button className="w-full text-left px-4 py-2 text-sm hover:bg-gray-50 text-red-600">
                          Cancel Appointment
                        </button>
                      </div>
                    )}
                  </div>
                </div>

                {/* Status Badge */}
                <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full border ${statusConfig.bg} ${statusConfig.text}`}>
                  <StatusIcon className="w-3.5 h-3.5" />
                  <span className="text-xs font-medium">{statusConfig.label}</span>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-4 sm:p-5 space-y-3">
                {/* Date and Time */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-gray-600">
                    <Calendar className="w-4 h-4" />
                    <span className="text-sm font-medium">{formatDate(appointment.slotDate)}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <Clock className="w-4 h-4" />
                    <span className="text-sm font-medium">{formatTime(appointment.slotTime)}</span>
                  </div>
                </div>

                {/* Reason */}
                {appointment.reason && (
                  <div className="bg-gray-50 rounded-lg p-3">
                    <div className="flex items-start gap-2">
                      <Stethoscope className="w-4 h-4 text-gray-500 mt-0.5" />
                      <div className="flex-1">
                        <p className="text-xs text-gray-500 mb-1">Reason for visit</p>
                        <p className="text-sm text-gray-700">{appointment.reason}</p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Notes */}
                {appointment.notes && (
                  <div className="bg-blue-50 rounded-lg p-3">
                    <div className="flex items-start gap-2">
                      <MessageSquare className="w-4 h-4 text-blue-500 mt-0.5" />
                      <div className="flex-1">
                        <p className="text-xs text-blue-600 mb-1">Notes</p>
                        <p className="text-sm text-gray-700">{appointment.notes}</p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Action Buttons for Requested Status */}
                {appointment.status === "REQUESTED" && (
                  <div className="flex gap-2 pt-3 border-t border-gray-100">
                    <NavLink
                      to={`/prescription-form/${appointment.patient._id}`}
                      className="flex-1 flex items-center justify-center gap-2 bg-blue-600 text-white px-3 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
                    >
                      <FileText className="w-4 h-4" />
                      <span>Prescription</span>
                    </NavLink>
                    <NavLink
                      to={`/report-form/${appointment.patient._id}`}
                      className="flex-1 flex items-center justify-center gap-2 bg-green-600 text-white px-3 py-2 rounded-lg hover:bg-green-700 transition-colors text-sm font-medium"
                    >
                      <ClipboardList className="w-4 h-4" />
                      <span>Report</span>
                    </NavLink>
                  </div>
                )}

                {/* View Details Link for other statuses
                {appointment.status !== "REQUESTED" && (
                  <div className="pt-3 border-t border-gray-100">
                    <button className="w-full flex items-center justify-center gap-2 text-blue-600 hover:text-blue-700 transition-colors text-sm font-medium">
                      <span>View Details</span>
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                )} */}
              </div>
            </div>
          );
        })}
      </div>

      {/* Empty State for filtered results */}
      {filteredAppointments.length === 0 && appointments.length > 0 && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 sm:p-12">
          <div className="text-center max-w-md mx-auto">
            <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="w-10 h-10 text-gray-400" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              No matching appointments found
            </h3>
            <p className="text-gray-600">
              Try adjusting your search or filter criteria
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyAppointments;