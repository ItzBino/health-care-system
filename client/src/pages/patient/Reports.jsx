import React, { useContext } from "react";
import {
  FileText,
  Download,
  User,
  Calendar,
  Activity,
  Heart,
  Thermometer,
  Ruler,
  Weight,
  Stethoscope,
  ClipboardList,
  Clock,
  ChevronRight,
  Share2,
  FileX,
  PlusCircle, // Using a different icon for "Upload First Report"
} from "lucide-react";
import { UserContext } from "../../context/UserContext";

// Format date function (reused from your previous example)
const formatDate = (dateString) => {
  if (!dateString) return "N/A";
  try {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  } catch (error) {
    return dateString;
  }
};

// Get status color based on vitals (reused from your previous example)
const getVitalStatus = (bp) => {
  if (!bp) return { color: "gray", status: "N/A" };
  const systolic = parseInt(bp.split("/")[0]);
  if (systolic < 120) return { color: "green", status: "Normal" };
  if (systolic < 140) return { color: "yellow", status: "Elevated" };
  return { color: "red", status: "High" };
};

const Reports = () => {
  const { report, loading } = useContext(UserContext); // Assuming 'loading' state might be added

  // Assuming you might add a 'loading' state later
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        {/* Placeholder for a loading spinner */}
        <div className="text-center">
          <Clock className="w-12 h-12 text-blue-600 animate-spin mx-auto mb-4" />
          <p className="text-gray-600">Loading medical reports...</p>
        </div>
      </div>
    );
  }

  if (!report || report.length === 0) {
    return (
      <div className="p-6 lg:p-8 bg-gray-50 min-h-screen">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Medical Reports</h2>
        <div className="flex flex-col items-center justify-center py-20 bg-white rounded-xl shadow-lg border border-gray-100">
          <FileX className="w-20 h-20 text-gray-300 mb-4" />
          <h3 className="text-xl font-semibold text-gray-700 mb-2">No Reports Available</h3>
          <p className="text-gray-500 text-center max-w-md mb-6">
            Your medical reports and test results will be stored here for easy access.
          </p>
          <button className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2 font-medium shadow-md">
            <PlusCircle className="w-5 h-5" />
            Upload Report
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-6 lg:p-8 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="flex justify-between items-center mb-8 border-b pb-4">
        <div>
          <h1 className="text-3xl font-extrabold text-gray-900 flex items-center">
            <FileText className="w-7 h-7 mr-2 text-indigo-600" />
            Medical Reports
          </h1>
          <p className="text-gray-600 mt-1 text-sm">
            Total {report.length} report{report.length > 1 ? 's' : ''} found
          </p>
        </div>
      </div>

      {/* Reports Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {report.map((reportItem, index) => {
          const bpStatus = getVitalStatus(reportItem.vitals?.bp);
          
          return (
            <div
              key={index}
              className="bg-white rounded-xl shadow-xl hover:shadow-2xl transition-shadow duration-300 overflow-hidden border border-gray-100"
            >
              {/* Report Header */}
              <div className="bg-indigo-600 p-5">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <FileText className="w-6 h-6 text-white/90" />
                      <h3 className="text-white font-bold text-xl">Visit Report</h3>
                    </div>
                    <div className="flex items-center gap-2 text-indigo-200 text-sm font-medium">
                      <Calendar className="w-4 h-4" />
                      {formatDate(reportItem.visitDate)}
                    </div>
                  </div>
                  <button className="p-2 bg-white/20 rounded-full hover:bg-white/30 transition-colors self-center">
                    <Download className="w-5 h-5 text-white" />
                  </button>
                </div>
              </div>

              {/* Doctor Information */}
              <div className="p-5 border-b border-gray-100">
                <div className="flex items-center gap-4">
                  {reportItem.doctor?.image ? (
                    <img
                      src={reportItem.doctor.image}
                      alt={reportItem.doctor.name}
                      className="w-14 h-14 rounded-full object-cover border-3 border-indigo-200 shadow-md"
                    />
                  ) : (
                    <div className="w-14 h-14 rounded-full bg-gray-200 flex items-center justify-center">
                      <User className="w-7 h-7 text-gray-500" />
                    </div>
                  )}
                  <div className="flex-1">
                    <p className="text-sm text-gray-500 flex items-center gap-1">
                      <Stethoscope className="w-4 h-4" />
                      Attending Physician
                    </p>
                    <p className="font-bold text-gray-900 text-lg">Dr. {reportItem.doctor?.name || "N/A"}</p>
                  </div>
                </div>
              </div>

              {/* Vitals Grid */}
              <div className="p-5 bg-gray-50 border-b border-gray-100">
                <h4 className="flex items-center gap-2 text-md font-bold text-gray-700 mb-4">
                  <Activity className="w-5 h-5 text-indigo-600" />
                  Vital Signs
                </h4>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                  {/* Height */}
                  <div className="bg-white rounded-lg p-3 shadow-sm text-center">
                    <Ruler className="w-5 h-5 text-blue-500 mx-auto mb-1" />
                    <p className="text-xs text-gray-500 font-medium">Height</p>
                    <p className="font-bold text-gray-800 text-sm">
                      {reportItem.vitals?.height || "N/A"} cm
                    </p>
                  </div>
                  {/* Weight */}
                  <div className="bg-white rounded-lg p-3 shadow-sm text-center">
                    <Weight className="w-5 h-5 text-yellow-500 mx-auto mb-1" />
                    <p className="text-xs text-gray-500 font-medium">Weight</p>
                    <p className="font-bold text-gray-800 text-sm">
                      {reportItem.vitals?.weight || "N/A"} kg
                    </p>
                  </div>
                  {/* BP */}
                  <div className="bg-white rounded-lg p-3 shadow-sm text-center col-span-2 sm:col-span-1">
                    <Heart className={`w-5 h-5 mx-auto mb-1 
                      ${bpStatus.color === 'green' ? 'text-green-500' : bpStatus.color === 'yellow' ? 'text-yellow-500' : 'text-red-500'}`} 
                    />
                    <p className="text-xs text-gray-500 font-medium">BP ({bpStatus.status})</p>
                    <p className="font-bold text-gray-800 text-sm">
                      {reportItem.vitals?.bp || "N/A"}
                    </p>
                  </div>
                  {/* Pulse */}
                  <div className="bg-white rounded-lg p-3 shadow-sm text-center">
                    <Activity className="w-5 h-5 text-orange-500 mx-auto mb-1" />
                    <p className="text-xs text-gray-500 font-medium">Pulse</p>
                    <p className="font-bold text-gray-800 text-sm">
                      {reportItem.vitals?.pulse || "N/A"} bpm
                    </p>
                  </div>
                  {/* Temp */}
                  <div className="bg-white rounded-lg p-3 shadow-sm text-center">
                    <Thermometer className="w-5 h-5 text-red-500 mx-auto mb-1" />
                    <p className="text-xs text-gray-500 font-medium">Temp</p>
                    <p className="font-bold text-gray-800 text-sm">
                      {reportItem.vitals?.temp || "N/A"}°F
                    </p>
                  </div>
                </div>
              </div>

              {/* Diagnoses and Symptoms */}
              <div className="p-5 space-y-4">
                {/* Symptoms */}
                {reportItem.symptoms && reportItem.symptoms.length > 0 && (
                  <div>
                    <h4 className="flex items-center gap-2 text-md font-bold text-gray-700 mb-3">
                      <Heart className="w-5 h-5 text-pink-600" />
                      Reported Symptoms
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {reportItem.symptoms.map((symptom, idx) => (
                        <span key={idx} className="px-3 py-1 bg-pink-50 text-pink-700 text-xs font-medium rounded-full border border-pink-200">
                          {symptom}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
                
                {/* Diagnoses */}
                {reportItem.diagnoses && reportItem.diagnoses.length > 0 && (
                  <div>
                    <h4 className="flex items-center gap-2 text-md font-bold text-gray-700 mb-3 mt-4 border-t pt-4">
                      <ClipboardList className="w-5 h-5 text-green-600" />
                      Diagnoses
                    </h4>
                    <div className="space-y-3">
                      {reportItem.diagnoses.map((diagnosis, idx) => (
                        <div key={idx} className="border border-green-200 rounded-lg p-3 bg-green-50">
                          {diagnosis?.description && (
                            <p className="text-xs text-gray-500 mt-1 italic line-clamp-2">
                              {diagnosis.description}
                            </p>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Report Notes & Treatment Plan */}
              <div className="p-5 border-t border-gray-100 space-y-4">
                {reportItem.reportNotes && (
                  <div>
                    <h4 className="flex items-center gap-2 text-sm font-bold text-gray-700 mb-1">
                      <FileText className="w-4 h-4 text-gray-500" />
                      Doctor's Notes
                    </h4>
                    <p className="text-sm text-gray-600 line-clamp-3 italic">
                      {reportItem.reportNotes}
                    </p>
                  </div>
                )}
                {reportItem.treatmentPlan && (
                  <div>
                    <h4 className="flex items-center gap-2 text-sm font-bold text-gray-700 mb-1">
                      <ClipboardList className="w-4 h-4 text-blue-500" />
                      Treatment Plan
                    </h4>
                    <p className="text-sm text-gray-600 line-clamp-3">
                      {reportItem.treatmentPlan}
                    </p>
                  </div>
                )}
              </div>

              {/* Follow-up Date & Actions Footer */}
              <div className="p-5 bg-indigo-50 border-t border-indigo-100 flex justify-between items-center">
                {reportItem.followUpDate ? (
                  <div className="flex items-center gap-3">
                    <Clock className="w-5 h-5 text-indigo-600" />
                    <div>
                      <p className="text-xs text-indigo-600 font-medium uppercase">Follow-up Date</p>
                      <p className="text-sm font-bold text-gray-800">
                        {formatDate(reportItem.followUpDate)}
                      </p>
                    </div>
                  </div>
                ) : (
                  <p className="text-sm text-gray-500">No follow-up scheduled.</p>
                )}

                <div className="flex items-center gap-3">
                  <button className="text-sm text-gray-600 hover:text-gray-800 flex items-center gap-1 transition-colors">
                    <Share2 className="w-4 h-4" />
                    Share
                  </button>
                  <button className="text-sm text-indigo-600 hover:text-indigo-700 font-bold flex items-center gap-1 transition-colors">
                    Details
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Reports;