import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { api } from "../api/auth";
import { AdminContext } from "../context/AdminContext";
import {
  FileText,
  User,
  Stethoscope,
  Calendar,
  Activity,
  Heart,
  Thermometer,
  Wind,
  Weight,
  Ruler,
  AlertCircle,
  CheckCircle,
  Clock,
  ChevronDown,
  Download,
  Printer,
  Share2,
  Edit,
  Eye,
  MoreVertical,
  ClipboardList,
  Pill,
  CalendarDays,
  FileBarChart,
  TrendingUp,
  Loader2,
  Search,
  Filter,
  RefreshCw,
  ChevronRight,
  Hash,
  MessageSquare,
  UserCheck,
  Shield,
  Droplet
} from "lucide-react";

const Reports = () => {
  const { id } = useParams();
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [updatingStatus, setUpdatingStatus] = useState(null);
  const [expandedReport, setExpandedReport] = useState(null);

  const fetchReports = async () => {
    try {
      setLoading(true);
      const res = await api.get(`/api/admin/reports/${id}`);
      setReports(res.data.data);
      console.log("reports: ", res.data.data);
    } catch (err) {
      console.error("Failed to fetch reports:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id) {
      fetchReports();
    }
  }, [id]);

  const handleStatusChange = async (reportId, status) => {
    try {
      setUpdatingStatus(reportId);
      const res = await api.put(`/api/admin/reports/${reportId}/status`, { status });
      setReports((prev) =>
        prev.map((r) => (r._id === reportId ? res.data.data : r))
      );
      if(res.data.success) {
        toast("updated successfully");
      }
    } catch (err) {
      console.error("Failed to update report status:", err);
      toast("Failed to update status");
    } finally {
      setUpdatingStatus(null);
    }
  };

  const statusConfig = {
    PENDING: {
      color: "bg-yellow-100 text-yellow-800 border-yellow-300",
      icon: <Clock className="w-4 h-4" />,
      label: "Pending"
    },
    COMPLETED: {
      color: "bg-green-100 text-green-800 border-green-300",
      icon: <CheckCircle className="w-4 h-4" />,
      label: "Completed"
    }
  };

  const vitalIcons = {
    height: <Ruler className="w-4 h-4 text-blue-600" />,
    weight: <Weight className="w-4 h-4 text-green-600" />,
    bp: <Heart className="w-4 h-4 text-red-600" />,
    temp: <Thermometer className="w-4 h-4 text-orange-600" />,
    pulse: <Activity className="w-4 h-4 text-purple-600" />
  };

  // Loading State
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-12 h-12 text-blue-600 animate-spin mx-auto mb-4" />
          <p className="text-gray-600">Loading medical reports...</p>
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
                <FileText className="w-7 h-7 text-blue-600" />
                Medical Reports
              </h1>
              <p className="text-gray-600 mt-1 flex items-center gap-2">
                <User className="w-4 h-4" />
                Patient ID: {id} • Total Reports: {reports?.length || 0}
              </p>
            </div>

            {/* Actions */}
            <div className="flex flex-wrap gap-3">
              <button 
                onClick={fetchReports}
                className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <RefreshCw className="w-4 h-4" />
                Refresh
              </button>
              <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                <Download className="w-4 h-4" />
                Export All
              </button>
              <button className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
                <FileText className="w-4 h-4" />
                New Report
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-6 py-6">
        {reports?.length === 0 ? (
          // Empty State
          <div className="bg-white rounded-2xl shadow-sm p-16 text-center">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <FileText className="w-12 h-12 text-gray-400" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-3">No Reports Found</h3>
            <p className="text-gray-600 max-w-md mx-auto">
              No medical reports found for this patient. Reports will appear here once created.
            </p>
          </div>
        ) : (
          // Reports Grid
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {reports?.map((report) => (
              <div
                key={report._id}
                className="bg-white rounded-xl shadow-sm hover:shadow-lg transition-all border border-gray-100"
              >
                {/* Report Header */}
                <div className="p-6 border-b border-gray-100">
                  <div className="flex items-start justify-between mb-4">
                    <div className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium border ${statusConfig[report.status]?.color}`}>
                      {statusConfig[report.status]?.icon}
                      {statusConfig[report.status]?.label}
                    </div>
                    <div className="flex items-center gap-2">
                      <button className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors">
                        <Printer className="w-4 h-4 text-gray-500" />
                      </button>
                      <button className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors">
                        <Share2 className="w-4 h-4 text-gray-500" />
                      </button>
                      <button className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors">
                        <MoreVertical className="w-4 h-4 text-gray-500" />
                      </button>
                    </div>
                  </div>

                  {/* Report ID and Date */}
                  <div className="flex items-center gap-2 text-sm text-gray-600 mb-3">
                    <Hash className="w-4 h-4" />
                    <span>Report ID: {report._id.slice(-8)}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Calendar className="w-4 h-4" />
                    <span>Visit Date: {new Date(report.visitDate).toLocaleDateString('en-US', { 
                      year: 'numeric', 
                      month: 'long', 
                      day: 'numeric' 
                    })}</span>
                  </div>
                </div>

                {/* Patient & Doctor Info */}
                <div className="p-6 grid grid-cols-2 gap-4 border-b border-gray-100">
                  {/* Patient */}
                  <div>
                    <div className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-3">
                      <User className="w-4 h-4 text-green-600" />
                      PATIENT
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                        <UserCheck className="w-6 h-6 text-green-600" />
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900">{report.patient?.name}</p>
                        <p className="text-sm text-gray-600">ID: {report.patient?._id?.slice(-6)}</p>
                      </div>
                    </div>
                  </div>

                  {/* Doctor */}
                  <div>
                    <div className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-3">
                      <Stethoscope className="w-4 h-4 text-blue-600" />
                      DOCTOR
                    </div>
                    <div className="flex items-center gap-3">
                      <img
                        src={report.doctor?.image || "/default-doctor.png"}
                        alt={report.doctor?.name}
                        className="w-12 h-12 rounded-full object-cover border-2 border-gray-200"
                      />
                      <div>
                        <p className="font-semibold text-gray-900">{report.doctor?.name || "N/A"}</p>
                        <p className="text-sm text-gray-600">{report.doctor?.specialization || "General"}</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Vitals */}
                <div className="p-6 border-b border-gray-100">
                  <div className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-3">
                    <Activity className="w-4 h-4 text-red-600" />
                    VITAL SIGNS
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {report.vitals && Object.entries(report.vitals).map(([key, value]) => (
                      <div key={key} className="bg-gray-50 rounded-lg p-3">
                        <div className="flex items-center gap-2 mb-1">
                          {vitalIcons[key]}
                          <span className="text-xs font-medium text-gray-600 uppercase">{key}</span>
                        </div>
                        <p className="text-lg font-semibold text-gray-900">
                          {value || "—"}
                          {key === 'height' && ' cm'}
                          {key === 'weight' && ' kg'}
                          {key === 'temp' && '°F'}
                          {key === 'pulse' && ' bpm'}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Symptoms */}
                {report.symptoms?.length > 0 && (
                  <div className="p-6 border-b border-gray-100">
                    <div className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-3">
                      <AlertCircle className="w-4 h-4 text-orange-600" />
                      SYMPTOMS
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {report.symptoms.map((symptom, index) => (
                        <span
                          key={index}
                          className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-orange-100 text-orange-800"
                        >
                          {symptom}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Diagnoses */}
                {report.diagnoses?.length > 0 && (
                  <div className="p-6 border-b border-gray-100">
                    <div className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-3">
                      <ClipboardList className="w-4 h-4 text-purple-600" />
                      DIAGNOSES
                    </div>
                    <div className="space-y-3">
                      {report.diagnoses.map((diagnosis, index) => (
                        <div key={index} className="bg-purple-50 rounded-lg p-3">
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-1">
                                <span className="text-xs font-medium text-purple-600">
                                  CODE: {diagnosis.code}
                                </span>
                                {diagnosis.primary && (
                                  <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-purple-600 text-white">
                                    PRIMARY
                                  </span>
                                )}
                              </div>
                              <p className="text-sm text-gray-900">{diagnosis.description}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Treatment Plan & Notes */}
                <div className="p-6 border-b border-gray-100">
                  {report.treatmentPlan && (
                    <div className="mb-4">
                      <div className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                        <Pill className="w-4 h-4 text-blue-600" />
                        TREATMENT PLAN
                      </div>
                      <p className="text-gray-700 bg-blue-50 rounded-lg p-3 text-sm">
                        {report.treatmentPlan}
                      </p>
                    </div>
                  )}

                  {report.reportNotes && (
                    <div>
                      <div className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                        <MessageSquare className="w-4 h-4 text-gray-600" />
                        NOTES
                      </div>
                      <p className="text-gray-700 bg-gray-50 rounded-lg p-3 text-sm">
                        {report.reportNotes}
                      </p>
                    </div>
                  )}
                </div>

                {/* Follow-up Date */}
                {report.followUpDate && (
                  <div className="px-6 py-4 bg-blue-50 border-b border-blue-100">
                    <div className="flex items-center gap-2">
                      <CalendarDays className="w-4 h-4 text-blue-600" />
                      <span className="text-sm font-medium text-blue-900">
                        Follow-up Date: {new Date(report.followUpDate).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })}
                      </span>
                    </div>
                  </div>
                )}

                {/* Status Control */}
                <div className="p-6 bg-gray-50">
                  <div className="flex items-center justify-between">
                    <label className="text-sm font-medium text-gray-700">
                      Update Status
                    </label>
                    <div className="relative">
                      <select
                        value={report.status}
                        onChange={(e) => handleStatusChange(report._id, e.target.value)}
                        disabled={updatingStatus === report._id}
                        className="appearance-none px-4 py-2 pr-10 border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed text-sm"
                      >
                        <option value="PENDING">PENDING</option>
                        <option value="COMPLETED">COMPLETED</option>
                      </select>
                      {updatingStatus === report._id ? (
                        <Loader2 className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-blue-600 animate-spin" />
                      ) : (
                        <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                      )}
                    </div>
                  </div>

                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Reports;