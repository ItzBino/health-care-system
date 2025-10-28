import React, { useContext, useState } from "react";
import { NavLink } from "react-router-dom";
import { AdminContext } from "../context/AdminContext";
import { api } from "../api/auth";
import {
  Calendar,
  Clock,
  User,
  Stethoscope,
  Mail,
  Phone,
  MapPin,
  CheckCircle,
  XCircle,
  AlertCircle,
  RefreshCw,
  ChevronDown,
  Activity,
  Filter,
  Search,
  Download,
  Eye,
  Edit,
  Trash2,
  MoreVertical,
  CalendarDays,
  UserCheck,
  Loader2
} from "lucide-react";

const Appointments = () => {
  const { appointments, setAppointments } = useContext(AdminContext);
  const [loading, setLoading] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("ALL");

  // Status configuration with colors and icons
  const statusConfig = {
    REQUESTED: {
      color: "bg-yellow-100 text-yellow-800 border-yellow-300",
      icon: <AlertCircle className="w-4 h-4" />,
      label: "Requested"
    },
    CONFIRMED: {
      color: "bg-blue-100 text-blue-800 border-blue-300",
      icon: <CheckCircle className="w-4 h-4" />,
      label: "Confirmed"
    },
    RESCHEDULED: {
      color: "bg-orange-100 text-orange-800 border-orange-300",
      icon: <RefreshCw className="w-4 h-4" />,
      label: "Rescheduled"
    },
    CANCELLED: {
      color: "bg-red-100 text-red-800 border-red-300",
      icon: <XCircle className="w-4 h-4" />,
      label: "Cancelled"
    },
    COMPLETED: {
      color: "bg-green-100 text-green-800 border-green-300",
      icon: <CheckCircle className="w-4 h-4" />,
      label: "Completed"
    }
  };

  // Filter appointments
  const filteredAppointments = appointments?.filter(appointment => {
    const matchesSearch = 
      appointment.doctor?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      appointment.patient?.name?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === "ALL" || appointment.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const handleStatusChange = async (id, newStatus, newCompleted) => {
    try {
      setLoading(id);
      const { data } = await api.patch(`/api/admin/${id}/status`, {
        status: newStatus,
        isCompleted: newCompleted,
      });

      if (data.success) {
        setAppointments((prev) =>
          prev.map((appt) =>
            appt._id === id ? { ...appt, ...data.appointment } : appt
          )
        );
      } else {
        alert("Failed to update appointment");
      }
    } catch (error) {
      console.error(error);
      alert("Error updating appointment");
    } finally {
      setLoading(null);
    }
  };

  // Empty state
  if (!appointments || appointments.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-7xl mx-auto">
          <div className="bg-white rounded-2xl shadow-sm p-16 text-center">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <CalendarDays className="w-12 h-12 text-gray-400" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-3">No Appointments Yet</h3>
            <p className="text-gray-600 max-w-md mx-auto">
              No appointments have been registered. They will appear here once patients book appointments.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                <CalendarDays className="w-7 h-7 text-blue-600" />
                Appointments Management
              </h1>
              <p className="text-gray-600 mt-1">
                Total: {appointments?.length || 0} appointments
              </p>
            </div>

            {/* Actions */}
            <div className="flex flex-wrap gap-3">
              <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                <Download className="w-4 h-4" />
                Export
              </button>
              <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
                <RefreshCw className="w-4 h-4" />
                Refresh
              </button>
            </div>
          </div>

          {/* Filters */}
          <div className="flex flex-col lg:flex-row gap-4 mt-6">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search by doctor or patient name..."
                className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex gap-2">
              <select
                className="px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
              >
                <option value="ALL">All Status</option>
                <option value="REQUESTED">Requested</option>
                <option value="CONFIRMED">Confirmed</option>
                <option value="RESCHEDULED">Rescheduled</option>
                <option value="CANCELLED">Cancelled</option>
                <option value="COMPLETED">Completed</option>
              </select>
              <button className="flex items-center gap-2 px-4 py-2.5 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                <Filter className="w-4 h-4" />
                More Filters
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Appointments Grid */}
      <div className="max-w-7xl mx-auto px-6 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredAppointments?.map((appointment) => (
            <div
              key={appointment._id}
              className="bg-white rounded-xl shadow-sm hover:shadow-lg transition-shadow border border-gray-100"
            >
              {/* Card Header */}
              <div className="p-6 border-b border-gray-100">
                <div className="flex items-start justify-between mb-4">
                  <div className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium border ${statusConfig[appointment.status]?.color}`}>
                    {statusConfig[appointment.status]?.icon}
                    {statusConfig[appointment.status]?.label}
                  </div>
                  <button className="p-1 hover:bg-gray-100 rounded-lg transition-colors">
                    <MoreVertical className="w-5 h-5 text-gray-500" />
                  </button>
                </div>

                {/* Appointment ID */}
                <div className="flex items-center gap-2 text-sm text-gray-600 mb-3">
                  <Activity className="w-4 h-4" />
                  <span>ID: #{appointment._id.slice(-8)}</span>
                </div>

                {/* Date and Time */}
                <div className="flex items-center gap-4 p-3 bg-blue-50 rounded-lg">
                  <div className="flex items-center gap-2 text-blue-700">
                    <Calendar className="w-4 h-4" />
                    <span className="font-medium">{appointment.slotDate}</span>
                  </div>
                  <div className="flex items-center gap-2 text-blue-700">
                    <Clock className="w-4 h-4" />
                    <span className="font-medium">{appointment.slotTime}</span>
                  </div>
                </div>
              </div>

              {/* Doctor Section */}
              <div className="p-6 border-b border-gray-100">
                <div className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-3">
                  <Stethoscope className="w-4 h-4 text-blue-600" />
                  DOCTOR
                </div>
                <div className="flex items-start gap-3">
                  <img
                    src={appointment.doctor?.image || "/default-doctor.png"}
                    alt={appointment.doctor?.name}
                    className="w-14 h-14 rounded-full object-cover border-2 border-gray-200"
                  />
                  <div className="flex-1">
                    <p className="font-semibold text-gray-900">{appointment.doctor?.name}</p>
                    <p className="text-sm text-gray-600 flex items-center gap-1 mt-1">
                      <Mail className="w-3 h-3" />
                      {appointment.doctor?.email}
                    </p>
                    <p className="text-sm text-gray-600 flex items-center gap-1 mt-1">
                      <Phone className="w-3 h-3" />
                      {appointment.doctor?.phone || "+1 234 567 890"}
                    </p>
                  </div>
                </div>
              </div>

              {/* Patient Section */}
              <div className="p-6 border-b border-gray-100">
                <div className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-3">
                  <User className="w-4 h-4 text-green-600" />
                  PATIENT
                </div>
                <div className="flex items-start gap-3">
                  <img
                    src={appointment.patient?.image || "/default-patient.png"}
                    alt={appointment.patient?.name}
                    className="w-14 h-14 rounded-full object-cover border-2 border-gray-200"
                  />
                  <div className="flex-1">
                    <p className="font-semibold text-gray-900">{appointment.patient?.name}</p>
                    <p className="text-sm text-gray-600 flex items-center gap-1 mt-1">
                      <Mail className="w-3 h-3" />
                      {appointment.patient?.email || "patient@example.com"}
                    </p>
                    <p className="text-sm text-gray-600 flex items-center gap-1 mt-1">
                      <MapPin className="w-3 h-3" />
                      {appointment.patient?.location || "New York, USA"}
                    </p>
                  </div>
                </div>
              </div>

              {/* Status Controls */}
              <div className="p-6 bg-gray-50">
                <div className="space-y-4">
                  {/* Status Dropdown */}
                  <div>
                    <label className="text-sm font-medium text-gray-700 mb-1.5 block">
                      Update Status
                    </label>
                    <div className="relative">
                      <select
                        value={appointment.status}
                        onChange={(e) =>
                          handleStatusChange(appointment._id, e.target.value, appointment.isCompleted)
                        }
                        disabled={loading === appointment._id}
                        className="w-full appearance-none px-4 py-2.5 pr-10 border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        <option value="REQUESTED">Requested</option>
                        <option value="CONFIRMED">Confirmed</option>
                        <option value="RESCHEDULED">Rescheduled</option>
                        <option value="CANCELLED">Cancelled</option>
                        <option value="COMPLETED">Completed</option>
                      </select>
                      <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
                    </div>
                  </div>

                  {/* Completion Toggle */}
                  <div className="flex items-center justify-between p-3 bg-white rounded-lg border border-gray-200">
                    <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                      <UserCheck className="w-4 h-4 text-green-600" />
                      Mark as Completed
                    </label>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={appointment.isCompleted}
                        onChange={(e) =>
                          handleStatusChange(appointment._id, appointment.status, e.target.checked)
                        }
                        disabled={loading === appointment._id}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600"></div>
                    </label>
                  </div>

                  {/* Loading State */}
                  {loading === appointment._id && (
                    <div className="flex items-center justify-center gap-2 text-blue-600 py-2">
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span className="text-sm">Updating...</span>
                    </div>
                  )}
                </div>

                {/* Action Buttons */}
                <div className="flex gap-2 mt-4">
                  <NavLink to='/patients'><button className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm">
                    <Eye className="w-4 h-4" />
                    View Details
                  </button></NavLink>
                  
                  <button className="flex items-center justify-center p-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                    <Edit className="w-4 h-4 text-gray-600" />
                  </button>
                  <button className="flex items-center justify-center p-2 bg-white border border-red-300 rounded-lg hover:bg-red-50 transition-colors">
                    <Trash2 className="w-4 h-4 text-red-600" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* No Results */}
        {filteredAppointments?.length === 0 && (
          <div className="bg-white rounded-xl shadow-sm p-12 text-center">
            <Search className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No appointments found</h3>
            <p className="text-gray-600">Try adjusting your search or filters</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Appointments;