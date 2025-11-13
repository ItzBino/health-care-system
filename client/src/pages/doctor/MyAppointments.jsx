import React, { useEffect, useState, useMemo } from "react";
import {
  Calendar,
  Clock,
  User,
  Search,
  AlertCircle,
  CheckCircle,
  XCircle,
  CalendarX,
  MoreVertical,
  FileText,
  ClipboardList,
  MessageSquare,
  Stethoscope,
  Loader2,
  RefreshCw
} from "lucide-react";
import { api } from "../../api/auth";
import { NavLink } from "react-router-dom";

// MINIMALIST STATUS STYLES
const STATUS_STYLES = {
  CONFIRMED: {
    bg: "bg-blue-100",
    text: "text-blue-800",
    icon: Clock,
    label: "Confirmed",
  },
  COMPLETED: {
    bg: "bg-green-100",
    text: "text-green-800",
    icon: CheckCircle,
    label: "Completed",
  },
  CANCELLED: {
    bg: "bg-red-100",
    text: "text-red-800",
    icon: XCircle,
    label: "Cancelled",
  },
  REQUESTED: {
    bg: "bg-yellow-100",
    text: "text-yellow-800",
    icon: AlertCircle,
    label: "Requested",
  },
};

// Helpers
const getStatusStyle = (status) => {
  if (!status) return STATUS_STYLES.REQUESTED;
  const key = String(status).toUpperCase();
  return STATUS_STYLES[key] || STATUS_STYLES.REQUESTED;
};

const formatDate = (val) => {
  if (!val) return "N/A";
  try {
    if (val.includes("_")) {
      const [day, month, year] = val.split("_").map(Number);
      const d = new Date(year, month - 1, day);
      return d.toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" });
    }
    const d = new Date(val);
    if (isNaN(d.getTime())) return "Invalid Date";
    return d.toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" });
  } catch {
    return "Invalid Date";
  }
};

const to12h = (t) => {
  const [h, m = "00"] = t.split(":").map((n) => parseInt(n, 10));
  const hour = ((h + 11) % 12) + 1;
  const ampm = h >= 12 ? "PM" : "AM";
  return `${String(hour).padStart(2, "0")}:${String(m).padStart(2, "0")} ${ampm}`;
};

const formatTime = (time) => {
  if (!time) return "N/A";
  if (time.includes("AM") || time.includes("PM")) return time;
  if (time.includes("-")) {
    const [start, end] = time.split("-");
    return `${to12h(start.trim())} - ${to12h(end.trim())}`;
  }
  if (time.includes(":")) return to12h(time.trim());
  return time;
};

const MyAppointments = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("ALL");
  const [appointments, setAppointments] = useState([]);
  const [dropdownOpen, setDropdownOpen] = useState(null);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");

  const fetchBookedAppointments = async () => {
    try {
      setLoading(true);
      setErr("");
      const response = await api.get("/api/doctor/appointment");
      if (response.data?.success) {
        setAppointments(response.data.data || []);
      } else {
        setErr("Failed to load appointments.");
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookedAppointments();
  }, []);

  useEffect(() => {
    const close = () => setDropdownOpen(null);
    document.addEventListener("click", close);
    return () => document.removeEventListener("click", close);
  }, []);

  const filteredAppointments = useMemo(() => {
    const q = searchTerm.trim().toLowerCase();
    return appointments.filter((a) => {
      const matchesSearch = !q ||
        a?.patient?.name?.toLowerCase().includes(q) ||
        a?.reason?.toLowerCase().includes(q) ||
        a?._id?.toLowerCase().includes(q);
      const status = String(a?.status || "").toUpperCase();
      const matchesStatus = filterStatus === "ALL" ? true : status === filterStatus;
      return matchesSearch && matchesStatus;
    });
  }, [appointments, searchTerm, filterStatus]);

  const stats = useMemo(() => ({
    total: appointments.length,
    confirmed: appointments.filter((a) => String(a.status).toUpperCase() === "CONFIRMED").length,
    completed: appointments.filter((a) => String(a.status).toUpperCase() === "COMPLETED").length,
    cancelled: appointments.filter((a) => String(a.status).toUpperCase() === "CANCELLED").length,
  }), [appointments]);

  if (loading) {
    return (
      <div className="space-y-6 animate-pulse">
        <div className="flex justify-between items-center">
          <div className="space-y-2">
            <div className="h-7 w-56 bg-slate-200 rounded"></div>
            <div className="h-4 w-72 bg-slate-200 rounded"></div>
          </div>
          <div className="h-10 w-28 bg-slate-200 rounded-lg"></div>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="h-24 bg-slate-100 rounded-xl"></div>
          ))}
        </div>
        <div className="h-14 bg-slate-100 rounded-xl"></div>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="h-56 bg-slate-100 rounded-xl" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {err && (
        <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-red-700 flex items-center gap-2">
          <AlertCircle className="w-5 h-5" />
          <span>{err}</span>
          <button onClick={fetchBookedAppointments} className="ml-auto inline-flex items-center gap-2 text-red-700 hover:text-red-900">
            <RefreshCw className="w-4 h-4" /> Retry
          </button>
        </div>
      )}

      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Appointments</h1>
          <p className="mt-1 text-slate-500">Manage and track your scheduled appointments.</p>
        </div>
        <button
          onClick={fetchBookedAppointments}
          className="inline-flex items-center justify-center gap-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold px-4 py-2 rounded-lg transition-colors w-full sm:w-auto"
        >
          <RefreshCw className="w-4 h-4" /> Refresh
        </button>
      </div>

      {/* KPI Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatCard label="Total" value={stats.total} icon={Calendar} color="text-slate-500" />
        <StatCard label="Confirmed" value={stats.confirmed} icon={Clock} color="text-blue-600" />
        <StatCard label="Completed" value={stats.completed} icon={CheckCircle} color="text-green-600" />
        <StatCard label="Cancelled" value={stats.cancelled} icon={XCircle} color="text-red-600" />
      </div>
      
      {/* Filters + Search */}
      <div className="bg-slate-50 border border-slate-200 rounded-xl p-4">
        <div className="flex flex-col md:flex-row md:items-center gap-3">
          <div className="flex flex-wrap items-center gap-2">
            {["ALL", "CONFIRMED", "REQUESTED", "COMPLETED", "CANCELLED"].map((f) => (
              <button
                key={f}
                onClick={() => setFilterStatus(f)}
                className={`px-3 py-1.5 rounded-full text-sm font-medium transition
                  ${filterStatus === f
                    ? "bg-blue-700 text-white"
                    : "bg-white text-slate-700 border border-slate-200 hover:bg-slate-100"
                  }`}
              >
                {f[0] + f.slice(1).toLowerCase()}
              </button>
            ))}
          </div>

          <div className="md:ml-auto w-full md:w-80">
            <div className="relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search by patient, reason, or ID..."
                className="w-full pl-10 pr-4 py-2 bg-white border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Appointments List */}
      {appointments.length === 0 ? (
        <EmptyState title="No Appointments Yet" message="You haven't received any appointment requests." icon={CalendarX} />
      ) : filteredAppointments.length === 0 ? (
        <EmptyState title="No Matching Appointments" message="Try adjusting your search or filter criteria." icon={Search} />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredAppointments.map((appointment) => (
            <AppointmentCard key={appointment._id} appointment={appointment} dropdownOpen={dropdownOpen} setDropdownOpen={setDropdownOpen} />
          ))}
        </div>
      )}
    </div>
  );
};

// Sub-components for better organization
const StatCard = ({ label, value, icon: Icon, color }) => (
  <div className="bg-white p-4 rounded-xl border border-slate-200">
    <div className="flex items-center justify-between">
      <p className="text-sm font-medium text-slate-500">{label}</p>
      <Icon className={`w-5 h-5 ${color}`} />
    </div>
    <p className={`text-3xl font-bold mt-1 ${color}`}>{value}</p>
  </div>
);

const EmptyState = ({ title, message, icon: Icon }) => (
  <div className="text-center p-12 bg-slate-50 rounded-xl border-2 border-dashed border-slate-200">
    <div className="w-16 h-16 bg-slate-200 rounded-full flex items-center justify-center mx-auto mb-4">
      <Icon className="w-8 h-8 text-slate-500" />
    </div>
    <h3 className="text-lg font-semibold text-slate-800">{title}</h3>
    <p className="text-slate-500 mt-1">{message}</p>
  </div>
);

const AppointmentCard = ({ appointment, dropdownOpen, setDropdownOpen }) => {
  const s = getStatusStyle(appointment.status);
  const StatusIcon = s.icon;
  const patient = appointment.patient || {};

  return (
    <div className="bg-white rounded-xl border border-slate-200 divide-y divide-slate-100 hover:shadow-lg hover:border-slate-300 transition-all duration-300">
      <div className="p-4">
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center gap-3">
            <img
              src={patient.image || "/default-avatar.png"}
              alt={patient.name || "Patient"}
              className="w-12 h-12 rounded-full object-cover ring-2 ring-slate-100"
            />
            <div>
              <h3 className="font-semibold text-slate-900">{patient.name || "Patient"}</h3>
              <p className="text-sm text-slate-500">ID: #{String(patient._id || "").slice(-6) || "N/A"}</p>
            </div>
          </div>
          <div className="relative">
            <button
              onClick={(e) => { e.stopPropagation(); setDropdownOpen(dropdownOpen === appointment._id ? null : appointment._id); }}
              className="p-1.5 hover:bg-slate-100 rounded-lg"
            >
              <MoreVertical className="w-5 h-5 text-slate-400" />
            </button>
            {dropdownOpen === appointment._id && (
              <div onClick={(e) => e.stopPropagation()} className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-xl border border-slate-200 z-10">
                <button className="w-full text-left px-4 py-2 text-sm text-slate-700 hover:bg-slate-50">View Details</button>
                <button className="w-full text-left px-4 py-2 text-sm text-slate-700 hover:bg-slate-50">Contact Patient</button>
                <button className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50">Cancel</button>
              </div>
            )}
          </div>
        </div>
        <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full ${s.bg} ${s.text}`}>
          <StatusIcon className="w-3.5 h-3.5" />
          <span className="text-xs font-medium">{s.label}</span>
        </div>
      </div>
      <div className="p-4 space-y-3 text-sm">
        <div className="flex items-center justify-between text-slate-700">
          <div className="flex items-center gap-2"><Calendar className="w-4 h-4 text-slate-400" /><span>{formatDate(appointment.slotDate)}</span></div>
          <div className="flex items-center gap-2"><Clock className="w-4 h-4 text-slate-400" /><span>{formatTime(appointment.slotTime)}</span></div>
        </div>
        {appointment.reason && (
          <div className="bg-slate-50 rounded-md p-3">
            <p className="text-xs text-slate-500 mb-1">Reason for visit</p>
            <p className="text-slate-800">{appointment.reason}</p>
          </div>
        )}
        {appointment.notes && (
          <div className="bg-slate-50 rounded-md p-3">
            <p className="text-xs text-slate-500 mb-1">Additional Notes</p>
            <p className="text-slate-800">{appointment.notes}</p>
          </div>
        )}
      </div>
      {String(appointment.status).toUpperCase() === "CONFIRMED" && (
        <div className="p-4">
          <div className="flex gap-2">
            {patient?._id ? (
              <>
                <NavLink to={`/prescription-form/${patient._id}`} className="flex-1 flex items-center justify-center gap-2 bg-blue-700 text-white px-3 py-2 rounded-lg hover:bg-blue-800 transition-colors font-semibold">
                  <FileText className="w-4 h-4" /><span>Prescription</span>
                </NavLink>
                <NavLink to={`/report-form/${patient._id}`} className="flex-1 flex items-center justify-center gap-2 bg-slate-200 text-slate-700 px-3 py-2 rounded-lg hover:bg-slate-300 transition-colors font-semibold">
                  <ClipboardList className="w-4 h-4" /><span>Report</span>
                </NavLink>
              </>
            ) : <div className="text-xs text-slate-500 w-full text-center">Patient ID unavailable</div>}
          </div>
        </div>
      )}
    </div>
  );
};

export default MyAppointments;