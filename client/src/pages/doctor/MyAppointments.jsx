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
} from "lucide-react";
import { api } from "../../api/auth";
import { NavLink } from "react-router-dom";

const MyAppointments = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");

  const [appointments, setAppointments] = useState([]);
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
      upcoming: {
        bg: "bg-blue-100",
        text: "text-blue-700",
        icon: Clock,
        label: "Upcoming",
      },
      completed: {
        bg: "bg-green-100",
        text: "text-green-700",
        icon: CheckCircle,
        label: "Completed",
      },
      cancelled: {
        bg: "bg-red-100",
        text: "text-red-700",
        icon: XCircle,
        label: "Cancelled",
      },
      pending: {
        bg: "bg-yellow-100",
        text: "text-yellow-700",
        icon: AlertCircle,
        label: "Pending",
      },
    };
    return statusConfig[status] || statusConfig.pending;
  };

  const getAppointmentTypeIcon = (type) => {
    return type === "video" ? Video : Building;
  };

  if (appointments.length === 0) {
    return (
      <div className="p-4 sm:p-6 lg:p-8">
        {/* Header */}
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            My Appointments
          </h2>
          <p className="text-gray-600">
            Manage and track all your medical appointments
          </p>
        </div>

        {/* Search and Filter Bar */}
        <div className="bg-white rounded-xl border border-gray-200 p-4 mb-6">
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
                <option value="pending">Pending</option>
              </select>
              <button className="px-4 py-2.5 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors flex items-center gap-2">
                <Filter className="w-4 h-4" />
                <span className="hidden sm:inline">Filter</span>
              </button>
            </div>
          </div>
        </div>

        {/* Stats Cards (Optional - even when no appointments) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
          <div className="bg-white rounded-lg border border-gray-200 p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-600 text-sm">Total Appointments</span>
              <Calendar className="w-4 h-4 text-gray-400" />
            </div>
            <p className="text-2xl font-bold text-gray-900">0</p>
          </div>
          <div className="bg-white rounded-lg border border-gray-200 p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-600 text-sm">Upcoming</span>
              <Clock className="w-4 h-4 text-blue-400" />
            </div>
            <p className="text-2xl font-bold text-blue-600">0</p>
          </div>
          <div className="bg-white rounded-lg border border-gray-200 p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-600 text-sm">Completed</span>
              <CheckCircle className="w-4 h-4 text-green-400" />
            </div>
            <p className="text-2xl font-bold text-green-600">0</p>
          </div>
          <div className="bg-white rounded-lg border border-gray-200 p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-600 text-sm">Cancelled</span>
              <XCircle className="w-4 h-4 text-red-400" />
            </div>
            <p className="text-2xl font-bold text-red-600">0</p>
          </div>
        </div>

        {/* Empty State */}
        <div className="bg-white rounded-xl border border-gray-200 p-8 sm:p-12">
          <div className="text-center max-w-md mx-auto">
            <div className="w-24 h-24 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <CalendarX className="w-12 h-12 text-blue-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">
              No Appointments Yet
            </h3>
            <p className="text-gray-600 mb-8">
              You haven't booked any appointments
            </p>
          </div>
        </div>
      </div>
    );
  }

  // If there are appointments, you can render them here
  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <h2 className="text-2xl font-bold mb-4">My Appointments</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {appointments.map((appointment) => (
          <div key={appointment._id}>
            <img
              src={appointment.patient.image}
              alt={appointment.patient.name}
            />
            <p>{appointment.patient.name}</p>
            <p>{appointment.slotTime}</p>
            <p>{appointment.status}</p>
            <p>{appointment.slotDate}</p>
            <p>{appointment.reason}</p>
            <p>{appointment.notes}</p>
            {appointment.status === "REQUESTED" && (
              <>
                <NavLink
                  to={`/prescription-form/${appointment.patient._id}`}
                  className="btn"
                >
                  Script
                </NavLink>
                <NavLink
                  to={`/report-form/${appointment.patient._id}`}
                  className="btn"
                >
                  Report
                </NavLink>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyAppointments;
