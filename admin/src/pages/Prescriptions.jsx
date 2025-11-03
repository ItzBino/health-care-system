import { useEffect, useState } from "react";
import { api } from "../api/auth";
import { useParams } from "react-router-dom";
import {
  Pill,
  User,
  Stethoscope,
  Calendar,
  Clock,
  CheckCircle,
  XCircle,
  AlertTriangle,
  ChevronDown,
  Download,
  Printer,
  Share2,
  Edit,
  Eye,
  MoreVertical,
  FileText,
  Hash,
  RefreshCw,
  Loader2,
  Search,
  Filter,
  Package,
  Timer,
  CalendarDays,
  MessageSquare,
  Shield,
  Activity,
  TrendingUp,
  Info,
  ChevronRight,
  Beaker,
  UserCheck,
  ClipboardCheck,
  AlertCircle,
  Plus,
  Minus
} from "lucide-react";

const Prescriptions = () => {
  const [prescriptions, setPrescriptions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [updatingStatus, setUpdatingStatus] = useState(null);
  const [updatingCompletion, setUpdatingCompletion] = useState(null);
  const [expandedMeds, setExpandedMeds] = useState({});
  const { id } = useParams();

  const fetchPrescriptions = async () => {
    try {
      setLoading(true);
      const res = await api.get(`/api/admin/prescriptions/${id}`);
      setPrescriptions(res.data.data);
      console.log(res.data.data);
    } catch (err) {
      console.error("Failed to fetch prescriptions:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id) {
      fetchPrescriptions();
    }
  }, [id]);

  const handleStatusChange = async (prescriptionId, newStatus) => {
    try {
      setUpdatingStatus(prescriptionId);
      const res = await api.put(`/api/admin/prescriptions/${prescriptionId}/status`, { 
        status: newStatus 
      });
      setPrescriptions((prev) =>
        prev.map((p) => (p._id === prescriptionId ? res.data.data : p))
      );
    } catch (err) {
      console.error("Failed to update status:", err);
    } finally {
      setUpdatingStatus(null);
    }
  };

  const handleCompletionChange = async (prescriptionId, isCompleted) => {
    try {
      setUpdatingCompletion(prescriptionId);
      const res = await api.put(`/api/admin/prescriptions/${prescriptionId}/completed`, { 
        isCompleted 
      });
      setPrescriptions((prev) =>
        prev.map((p) => (p._id === prescriptionId ? res.data.data : p))
      );
      if(res.data.success) {
toast("updated successfully");
      }
      
    } catch (err) {
      console.error("Failed to update completion:", err);
      toast("Failed to update");
    } finally {
      setUpdatingCompletion(null);
    }
  };

  const toggleMedExpand = (prescriptionId) => {
    setExpandedMeds(prev => ({
      ...prev,
      [prescriptionId]: !prev[prescriptionId]
    }));
  };

  const statusConfig = {
    ACTIVE: {
      color: "bg-green-100 text-green-800 border-green-300",
      icon: <CheckCircle className="w-4 h-4" />,
      label: "Active"
    },
    CANCELLED: {
      color: "bg-red-100 text-red-800 border-red-300",
      icon: <XCircle className="w-4 h-4" />,
      label: "Cancelled"
    },
    EXPIRED: {
      color: "bg-gray-100 text-gray-800 border-gray-300",
      icon: <AlertTriangle className="w-4 h-4" />,
      label: "Expired"
    }
  };

  const getDosageIcon = (dosage) => {
    if (dosage?.includes('tablet') || dosage?.includes('pill')) {
      return <Pill className="w-4 h-4 text-blue-600" />;
    }
    if (dosage?.includes('ml') || dosage?.includes('liquid')) {
      return <Beaker className="w-4 h-4 text-blue-600" />;
    }
    return <Package className="w-4 h-4 text-blue-600" />;
  };

  // Loading State
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-12 h-12 text-blue-600 animate-spin mx-auto mb-4" />
          <p className="text-gray-600">Loading prescriptions...</p>
        </div>
      </div>
    );
  }

  // Empty State
  if (!prescriptions || prescriptions.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-7xl mx-auto">
          <div className="bg-white rounded-2xl shadow-sm p-16 text-center">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Pill className="w-12 h-12 text-gray-400" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-3">No Prescriptions Found</h3>
            <p className="text-gray-600 max-w-md mx-auto">
              No prescriptions found for this patient. Prescriptions will appear here once issued.
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
                <Pill className="w-7 h-7 text-blue-600" />
                Prescriptions Management
              </h1>
              <p className="text-gray-600 mt-1 flex items-center gap-2">
                <User className="w-4 h-4" />
                Patient ID: {id.slice(-8)} • Total Prescriptions: {prescriptions?.length || 0}
              </p>
            </div>

            {/* Actions */}
            <div className="flex flex-wrap gap-3">
              <button 
                onClick={fetchPrescriptions}
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
                <Plus className="w-4 h-4" />
                New Prescription
              </button>
            </div>
          </div>

          {/* Stats Bar */}
          <div className="flex flex-wrap gap-4 mt-4 pt-4 border-t border-gray-200">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span className="text-sm text-gray-600">
                Active: {prescriptions.filter(p => p.status === 'ACTIVE').length}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-red-500 rounded-full"></div>
              <span className="text-sm text-gray-600">
                Cancelled: {prescriptions.filter(p => p.status === 'CANCELLED').length}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-gray-500 rounded-full"></div>
              <span className="text-sm text-gray-600">
                Expired: {prescriptions.filter(p => p.status === 'EXPIRED').length}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-blue-600" />
              <span className="text-sm text-gray-600">
                Completed: {prescriptions.filter(p => p.isCompleted).length}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Prescriptions Grid */}
      <div className="max-w-7xl mx-auto px-6 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {prescriptions.map((p) => (
            <div
              key={p._id}
              className="bg-white rounded-xl shadow-sm hover:shadow-lg transition-all border border-gray-100"
            >
              {/* Prescription Header */}
              <div className="p-6 border-b border-gray-100">
                <div className="flex items-start justify-between mb-4">
                  <div className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium border ${statusConfig[p.status]?.color}`}>
                    {statusConfig[p.status]?.icon}
                    {statusConfig[p.status]?.label}
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

                {/* Prescription ID and Date */}
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Hash className="w-4 h-4" />
                    <span>Prescription ID: {p._id.slice(-8)}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Calendar className="w-4 h-4" />
                    <span>Issued: {new Date(p.issuedAt).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit'
                    })}</span>
                  </div>
                  {p.isCompleted && (
                    <div className="flex items-center gap-2 text-sm text-green-600">
                      <ClipboardCheck className="w-4 h-4" />
                      <span className="font-medium">Prescription Completed</span>
                    </div>
                  )}
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
                       <img
                      src={p.patient?.image || "/default-doctor.png"}
                      alt={p.patient?.name}
                      className="w-12 h-12 rounded-full object-cover border-2 border-gray-200"
                    />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">{p.patient?.name}</p>
                      <p className="text-sm text-gray-600">ID: {p.patient?._id?.slice(-6)}</p>
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
                      src={p.doctor?.image || "/default-doctor.png"}
                      alt={p.doctor?.name}
                      className="w-12 h-12 rounded-full object-cover border-2 border-gray-200"
                    />
                    <div>
                      <p className="font-semibold text-gray-900">{p.doctor?.name}</p>
                      <p className="text-sm text-gray-600">{p.doctor?.specialization || "General"}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Medications Section */}
              {p.medications?.length > 0 && (
                <div className="p-6 border-b border-gray-100">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                      <Package className="w-4 h-4 text-purple-600" />
                      MEDICATIONS ({p.medications.length})
                    </div>
                    <button
                      onClick={() => toggleMedExpand(p._id)}
                      className="flex items-center gap-1 text-sm text-blue-600 hover:text-blue-700"
                    >
                      {expandedMeds[p._id] ? (
                        <>
                          <Minus className="w-4 h-4" />
                          Collapse
                        </>
                      ) : (
                        <>
                          <Plus className="w-4 h-4" />
                          Expand All
                        </>
                      )}
                    </button>
                  </div>

                  <div className="space-y-3">
                    {p.medications.slice(0, expandedMeds[p._id] ? undefined : 2).map((med, i) => (
                      <div key={i} className="bg-linear-to-r from-purple-50 to-blue-50 rounded-lg p-4 border border-purple-100">
                        <div className="flex items-start justify-between mb-2">
                          <div className="flex items-center gap-2">
                            {getDosageIcon(med.dosage)}
                            <h4 className="font-semibold text-gray-900">{med.name}</h4>
                          </div>
                          <span className="text-xs bg-purple-600 text-white px-2 py-1 rounded-full">
                            #{i + 1}
                          </span>
                        </div>
                        
                        <div className="grid grid-cols-2 gap-3 text-sm">
                          <div className="flex items-center gap-2">
                            <Activity className="w-3 h-3 text-gray-500" />
                            <span className="text-gray-600">Dosage:</span>
                            <span className="font-medium text-gray-900">{med.dosage}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Clock className="w-3 h-3 text-gray-500" />
                            <span className="text-gray-600">Frequency:</span>
                            <span className="font-medium text-gray-900">{med.frequency}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Timer className="w-3 h-3 text-gray-500" />
                            <span className="text-gray-600">Duration:</span>
                            <span className="font-medium text-gray-900">{med.duration}</span>
                          </div>
                          {med.notes && (
                            <div className="col-span-2 flex items-start gap-2">
                              <MessageSquare className="w-3 h-3 text-gray-500 mt-0.5" />
                              <span className="text-gray-600">Notes:</span>
                              <span className="font-medium text-gray-900">{med.notes}</span>
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                    
                    {!expandedMeds[p._id] && p.medications.length > 2 && (
                      <button
                        onClick={() => toggleMedExpand(p._id)}
                        className="w-full py-2 text-sm text-blue-600 hover:text-blue-700 font-medium flex items-center justify-center gap-1"
                      >
                        View {p.medications.length - 2} more medications
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                </div>
              )}

              {/* Status & Completion Controls */}
              <div className="p-6 bg-gray-50">
                <div className="space-y-4">
                  {/* Status Dropdown */}
                  <div>
                    <label className="text-sm font-medium text-gray-700 mb-1.5 block">
                      Update Status
                    </label>
                    <div className="relative">
                      <select
                        value={p.status}
                        onChange={(e) => handleStatusChange(p._id, e.target.value)}
                        disabled={updatingStatus === p._id}
                        className="w-full appearance-none px-4 py-2.5 pr-10 border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        <option value="ACTIVE">Active</option>
                        <option value="CANCELLED">Cancelled</option>
                        <option value="EXPIRED">Expired</option>
                      </select>
                      {updatingStatus === p._id ? (
                        <Loader2 className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-blue-600 animate-spin" />
                      ) : (
                        <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                      )}
                    </div>
                  </div>

                  {/* Completion Toggle */}
                  <div className="flex items-center justify-between p-3 bg-white rounded-lg border border-gray-200">
                    <label className="text-sm font-medium text-gray-700 flex items-center gap-2 cursor-pointer">
                      <ClipboardCheck className="w-4 h-4 text-green-600" />
                      Mark as Completed
                    </label>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={p.isCompleted}
                        onChange={(e) => handleCompletionChange(p._id, e.target.checked)}
                        disabled={updatingCompletion === p._id}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600 peer-disabled:opacity-50 peer-disabled:cursor-not-allowed"></div>
                      {updatingCompletion === p._id && (
                        <Loader2 className="absolute -right-8 w-4 h-4 text-blue-600 animate-spin" />
                      )}
                    </label>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-2 mt-4">
                  <button className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm">
                    <Eye className="w-4 h-4" />
                    View Details
                  </button>
                  <button className="flex items-center justify-center p-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                    <Edit className="w-4 h-4 text-gray-600" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Prescriptions;