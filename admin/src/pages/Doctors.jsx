import { useContext, useState } from "react";
import { AdminContext } from "../context/AdminContext";
import {
  Search,
  Filter,
  Mail,
  Shield,
  Award,
  FileText,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle,
  MoreVertical,
  UserCheck,
  Stethoscope,
  DollarSign,
  Users,
  StethoscopeIcon,
} from "lucide-react";
import { api } from "../api/auth";
import {toast} from "react-toastify"

const Doctors = () => {
  const { doctors, profile, handleEmailStatus, handleStatusChange,setProfile } =
    useContext(AdminContext);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [sortBy, setSortBy] = useState("name");
  const [viewMode, setViewMode] = useState("grid"); // 'grid' or 'list'
  const [updating, setUpdating] = useState(null);

  // Filter doctors based on search and status
  const filteredDoctors =
    doctors?.filter((doctor) => {
      const matchesSearch =
        doctor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        doctor.email.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus =
        filterStatus === "all" || doctor.status === filterStatus;
      return matchesSearch && matchesStatus;
    }) || [];

  // ✅ Function to handle status change (availability / verification)
 const handleDoctorProfileUpdate = async (doctorId, field, value) => {
  try {
    setUpdating(doctorId);

    // Prepare dynamic body
    const payload = { [field]: value };

    const res = await api.put(`/api/admin/${doctorId}/status`, payload);
    console.log("Doctor updated:", res.data);

    setProfile(prev => prev.map(p => p._id === doctorId ? { ...p, ...payload } : p));
    toast("status updated successfully");
  } catch (err) {
    console.error("Failed to update doctor:", err);
    toast("Failed to update status");
  } finally {
    setUpdating(null);
  }
};

  // Sort doctors
  const sortedDoctors = [...filteredDoctors].sort((a, b) => {
    switch (sortBy) {
      case "name":
        return a.name.localeCompare(b.name);
      case "status":
        return a.status.localeCompare(b.status);
      case "recent":
        return new Date(b.createdAt) - new Date(a.createdAt);
      default:
        return 0;
    }
  });

  const getStatusColor = (status) => {
    switch (status) {
      case "APPROVED":
        return "bg-green-100 text-green-700 border-green-200";
      case "PENDING":
        return "bg-yellow-100 text-yellow-700 border-yellow-200";
      case "SUSPENDED":
        return "bg-red-100 text-red-700 border-red-200";
      default:
        return "bg-gray-100 text-gray-700 border-gray-200";
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "APPROVED":
        return <CheckCircle className="w-4 h-4" />;
      case "PENDING":
        return <Clock className="w-4 h-4" />;
      case "SUSPENDED":
        return <XCircle className="w-4 h-4" />;
      default:
        return <AlertCircle className="w-4 h-4" />;
    }
  };

  // Stats cards data
  const stats = {
    total: doctors?.length || 0,
    approved: doctors?.filter((d) => d.status === "APPROVED").length || 0,
    pending: doctors?.filter((d) => d.status === "PENDING").length || 0,
    suspended: doctors?.filter((d) => d.status === "SUSPENDED").length || 0,
    verified: doctors?.filter((d) => d.emailVerified).length || 0,
  };

  if (!doctors || doctors.length === 0) {
    return (
      <div className="min-h-screen bg-linear-to-br from-blue-50 via-white to-indigo-50 p-4 sm:p-6 lg:p-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center py-12">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <StethoscopeIcon className="w-12 h-12 text-gray-400" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              No Registered Doctors
            </h2>
            <p className="text-gray-600 mb-8">
              There are no doctors registered in the system yet.
            </p>
            <button className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
              Invite Doctors
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-blue-50 via-white to-indigo-50">
      <div className="p-4 sm:p-6 lg:p-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div>
                <h1 className="text-3xl font-bold text-gray-900">
                  Doctors Management
                </h1>
                <p className="text-gray-600 mt-1">
                  Manage and monitor all registered doctors
                </p>
              </div>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 mb-8">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-gray-600 text-sm">Total Doctors</span>
                <Users className="w-5 h-5 text-blue-600" />
              </div>
              <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
            </div>
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-gray-600 text-sm">Approved</span>
                <CheckCircle className="w-5 h-5 text-green-600" />
              </div>
              <p className="text-2xl font-bold text-green-600">
                {stats.approved}
              </p>
            </div>
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-gray-600 text-sm">Pending</span>
                <Clock className="w-5 h-5 text-yellow-600" />
              </div>
              <p className="text-2xl font-bold text-yellow-600">
                {stats.pending}
              </p>
            </div>
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-gray-600 text-sm">Suspended</span>
                <XCircle className="w-5 h-5 text-red-600" />
              </div>
              <p className="text-2xl font-bold text-red-600">
                {stats.suspended}
              </p>
            </div>
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-gray-600 text-sm">Verified</span>
                <Shield className="w-5 h-5 text-purple-600" />
              </div>
              <p className="text-2xl font-bold text-purple-600">
                {stats.verified}
              </p>
            </div>
          </div>

          {/* Search and Filters */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 mb-6">
            <div className="flex flex-col lg:flex-row gap-4">
              {/* Search */}
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search by name or email..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>

              {/* Filters */}
              <div className="flex flex-wrap gap-2">
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
                >
                  <option value="all">All Status</option>
                  <option value="APPROVED">Approved</option>
                  <option value="PENDING">Pending</option>
                  <option value="SUSPENDED">Suspended</option>
                </select>

                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
                >
                  <option value="name">Sort by Name</option>
                  <option value="status">Sort by Status</option>
                  <option value="recent">Sort by Recent</option>
                </select>

                {/* View Mode Toggle */}
                <div className="flex border border-gray-300 rounded-lg overflow-hidden">
                  <button
                    onClick={() => setViewMode("grid")}
                    className={`px-3 py-2 ${
                      viewMode === "grid"
                        ? "bg-blue-600 text-white"
                        : "bg-white text-gray-600"
                    }`}
                  >
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
                      />
                    </svg>
                  </button>
                  <button
                    onClick={() => setViewMode("list")}
                    className={`px-3 py-2 ${
                      viewMode === "list"
                        ? "bg-blue-600 text-white"
                        : "bg-white text-gray-600"
                    }`}
                  >
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4 6h16M4 12h16M4 18h16"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Doctors Grid/List */}
          <div
            className={
              viewMode === "grid"
                ? "grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6"
                : "space-y-4"
            }
          >
            {sortedDoctors.map((doctor) => {
              const doctorProfile = profile?.find(
                (p) => String(p.user) === String(doctor._id)
              );

              return (
                <div
                  key={doctor._id}
                  className={`bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow ${
                    viewMode === "list" ? "flex flex-col lg:flex-row" : ""
                  }`}
                >
                  {/* Card Header with Status */}
                  <div
                    className={`${
                      viewMode === "list" ? "lg:w-1/3 p-6" : "p-6"
                    }`}
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-4">
                        {/* Doctor Image */}
                        <div className="relative">
                          {doctor.image ? (
                            <img
                              src={doctor.image}
                              alt={doctor.name}
                              className="w-16 h-16 rounded-full object-cover border-2 border-gray-200"
                            />
                          ) : (
                            <div className="w-16 h-16 rounded-full bg-linear-to-br from-blue-500 to-indigo-600 flex items-center justify-center">
                              <Stethoscope className="w-8 h-8 text-white" />
                            </div>
                          )}
                          {doctor.emailVerified && (
                            <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center border-2 border-white">
                              <CheckCircle className="w-3 h-3 text-white" />
                            </div>
                          )}
                        </div>

                        {/* Basic Info */}
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900">
                            {doctor.name}
                          </h3>
                          <p className="text-sm text-gray-600 flex items-center gap-1">
                            <Mail className="w-3 h-3" />
                            {doctor.email}
                          </p>
                        </div>
                      </div>

                      {/* Action Menu */}
                      <div className="relative">
                        <button className="p-1 hover:bg-gray-100 rounded-lg transition-colors">
                          <MoreVertical className="w-5 h-5 text-gray-500" />
                        </button>
                      </div>
                    </div>

                    {/* Status Badge */}
                    <div className="flex items-center gap-2 mb-4">
                      <span
                        className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium border ${getStatusColor(
                          doctor.status
                        )}`}
                      >
                        {getStatusIcon(doctor.status)}
                        {doctor.status}
                      </span>
                      {doctor.emailVerified && (
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-700 border border-blue-200">
                          <Shield className="w-3 h-3" />
                          Verified
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Profile Information */}
                  {doctorProfile && (
                    <div
                      className={`${
                        viewMode === "list"
                          ? "lg:flex-1 p-6 lg:border-l border-gray-200"
                          : "px-6 pb-6"
                      }`}
                    >
                      <div className="space-y-3 ">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          <div className="flex items-center gap-2 text-sm">
                            <Stethoscope className=" w-4 h-4 text-gray-600" />
                            <span className="text-gray-600">
                              Specialization:
                            </span>
                            <span className="font-medium text-gray-900">
                              {doctorProfile.specialization}
                            </span>
                          </div>
                          <div className="flex items-center gap-2 text-sm">
                            <FileText className="lg:ml-4 w-4 h-4 text-gray-400" />
                            <span className="text-gray-600">License:</span>
                            <span className="font-medium text-gray-900">
                              {doctorProfile.licenseNumber}
                            </span>
                          </div>
                          <div className="flex items-center gap-2 text-sm">
                            <Award className="w-4 h-4 text-gray-400" />
                            <span className="text-gray-600">Experience:</span>
                            <span className="font-medium text-gray-900">
                              {doctorProfile.experienceYears} years
                            </span>
                          </div>
                          <div className="flex items-center gap-2 text-sm">
                            <DollarSign className="w-4 h-4 text-gray-400" />
                            <span className="text-gray-600">Fee:</span>
                            <span className="font-medium text-gray-900">
                              ${doctorProfile.fees}
                            </span>
                          </div>
                        </div>

                        {doctorProfile.bio && (
                          <div className="pt-2 border-t border-gray-100">
                            <p className="text-sm text-gray-600 line-clamp-2">
                              {doctorProfile.bio}
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Actions Section */}
                  <div
                    className={`${
                      viewMode === "list"
                        ? "lg:w-64 p-6 lg:border-l border-gray-200"
                        : "px-6 pb-6"
                    } bg-gray-50`}
                  >
                    <div className="space-y-4">
                      {/* Status Change */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Status Management
                        </label>
                        <select
                          value={doctor.status}
                          onChange={(e) =>
                            handleStatusChange(doctor._id, e.target.value)
                          }
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white text-sm"
                        >
                          <option value="PENDING">Pending Review</option>
                          <option value="APPROVED">Approve Doctor</option>
                          <option value="SUSPENDED">Suspend Account</option>
                        </select>
                      </div>

                      {/* Email Verification */}
                      <div className="flex items-center justify-between p-3 bg-white rounded-lg border border-gray-200">
                        <label className="flex items-center gap-2 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={doctor.emailVerified}
                            onChange={(e) =>
                              handleEmailStatus(doctor._id, e.target.checked)
                            }
                            className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                          />
                          <span className="text-sm font-medium text-gray-700">
                            Email Verified
                          </span>
                        </label>
                        {doctor.emailVerified ? (
                          <CheckCircle className="w-4 h-4 text-green-500" />
                        ) : (
                          <XCircle className="w-4 h-4 text-gray-400" />
                        )}
                      </div>

                      {doctorProfile && (
                        <div className="mt-4 space-y-3">
                          {/* Toggle Availability */}
                         <div>
  <label className="block text-sm font-medium text-gray-700 mb-1">
    Availability
  </label>
  <select
    value={doctorProfile.available ? "true" : "false"}
    onChange={(e) =>
      handleDoctorProfileUpdate(
        doctorProfile._id,
        "available",
        e.target.value === "true"
      )
    }
    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 text-sm"
    disabled={updating === doctorProfile._id}
  >
    <option value="true">Available</option>
    <option value="false">Unavailable</option>
  </select>
</div>


                          {/* Change Verification Status */}
                          <div>
  <label className="block text-sm font-medium text-gray-700 mb-1">
    Verification Status
  </label>
  <select
    value={doctorProfile.verificationStatus}
    onChange={(e) =>
      handleDoctorProfileUpdate(
        doctorProfile._id,
        "verificationStatus",
        e.target.value
      )
    }
    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 text-sm"
    disabled={updating === doctorProfile._id}
  >
    <option value="PENDING">Pending</option>
    <option value="VERIFIED">Verified</option>
    <option value="REJECTED">Rejected</option>
  </select>
</div>

                        </div>
                      )}

                      {/* Quick Actions */}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Pagination (optional) */}
          <div className="mt-8 flex items-center justify-between">
            <p className="text-sm text-gray-600">
              Showing {sortedDoctors.length} of {doctors.length} doctors
            </p>
            <div className="flex gap-2">
              <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-sm">
                Previous
              </button>
              <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm">
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Doctors;
