// import React, { useContext } from "react";
// import {
//   FileText,
//   Download,
//   Search,
//   Calendar,
//   User,
//   Activity,
//   Heart,
//   Thermometer,
//   Ruler,
//   Weight,
//   Stethoscope,
//   ClipboardList,
//   Clock,
//   ChevronRight,
//   Printer,
//   Share2,
//   Filter,
//   Loader2,
//   FileX,
//   AlertCircle,
//   CheckCircle
// } from "lucide-react";
// import { UserContext } from "../../context/UserContext";

// const Reports = () => {
//   const { report, setReport, loading } = useContext(UserContext);

//   // Format date function
//   const formatDate = (dateString) => {
//     if (!dateString) return "N/A";
//     const date = new Date(dateString);
//     return date.toLocaleDateString("en-US", {
//       year: "numeric",
//       month: "long",
//       day: "numeric",
//     });
//   };

//   // Get status color based on vitals
//   const getVitalStatus = (bp) => {
//     if (!bp) return { color: "gray", status: "N/A" };
//     const systolic = parseInt(bp.split("/")[0]);
//     if (systolic < 120) return { color: "green", status: "Normal" };
//     if (systolic < 140) return { color: "yellow", status: "Elevated" };
//     return { color: "red", status: "High" };
//   };

//   if (loading) {
//     return (
//       <div className="flex items-center justify-center min-h-[400px]">
//         <div className="text-center">
//           <Loader2 className="w-12 h-12 text-blue-600 animate-spin mx-auto mb-4" />
//           <p className="text-gray-600">Loading medical reports...</p>
//         </div>
//       </div>
//     );
//   }

//   if (!report || report.length === 0) {
//     return (
//       <div className="p-6 lg:p-8">
//         <h2 className="text-2xl font-bold text-gray-800 mb-6">Medical Reports</h2>
//         <div className="flex flex-col items-center justify-center py-20 bg-gray-50 rounded-xl">
//           <FileX className="w-20 h-20 text-gray-300 mb-4" />
//           <h3 className="text-xl font-semibold text-gray-700 mb-2">No Reports Available</h3>
//           <p className="text-gray-500 text-center max-w-md mb-6">
//             Your medical reports and test results will be stored here for easy access.
//           </p>
//           <button className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2">
//             <Download className="w-5 h-5" />
//             Upload First Report
//           </button>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="p-4 sm:p-6 lg:p-8">
//       {/* Header */}
//       <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
//         <div>
//           <h2 className="text-2xl font-bold text-gray-800">Medical Reports</h2>
//           <p className="text-gray-600 mt-1">Total {report.length} report{report.length > 1 ? 's' : ''} found</p>
//         </div>
        
//         {/* Action Buttons */}
//         <div className="flex flex-wrap gap-2">
//           <button className="px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors flex items-center gap-2 text-sm">
//             <Search className="w-4 h-4" />
//             Search
//           </button>
//           <button className="px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors flex items-center gap-2 text-sm">
//             <Filter className="w-4 h-4" />
//             Filter
//           </button>
//           <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2 text-sm">
//             <Download className="w-4 h-4" />
//             Download All
//           </button>
//         </div>
//       </div>

//       {/* Reports Grid */}
//       <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6">
//         {report.map((reportItem, index) => {
//           const bpStatus = getVitalStatus(reportItem.vitals?.bp);
          
//           return (
//             <div
//               key={index}
//               className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden group"
//             >
//               {/* Report Header */}
//               <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-4 sm:p-5">
//                 <div className="flex justify-between items-start">
//                   <div className="flex-1">
//                     <div className="flex items-center gap-2 mb-2">
//                       <FileText className="w-5 h-5 text-white/80" />
//                       <h3 className="text-white font-semibold text-lg">Report #{index + 1}</h3>
//                     </div>
//                     <div className="flex items-center gap-2 text-blue-100 text-sm">
//                       <Calendar className="w-4 h-4" />
//                       {formatDate(reportItem.visitDate)}
//                     </div>
//                   </div>
//                   <div className="flex gap-1">
//                     <button className="p-1.5 bg-white/20 rounded hover:bg-white/30 transition-colors">
//                       <Download className="w-4 h-4 text-white" />
//                     </button>
//                     <button className="p-1.5 bg-white/20 rounded hover:bg-white/30 transition-colors">
//                       <Printer className="w-4 h-4 text-white" />
//                     </button>
//                   </div>
//                 </div>
//               </div>

//               {/* Doctor Information */}
//               <div className="p-4 border-b border-gray-100">
//                 <div className="flex items-center gap-3">
//                   {reportItem.doctor?.image ? (
//                     <img
//                       src={reportItem.doctor.image}
//                       alt={reportItem.doctor.name}
//                       className="w-12 h-12 rounded-full object-cover border-2 border-blue-100"
//                     />
//                   ) : (
//                     <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center">
//                       <User className="w-6 h-6 text-gray-500" />
//                     </div>
//                   )}
//                   <div className="flex-1">
//                     <p className="text-sm text-gray-500">Attending Physician</p>
//                     <p className="font-semibold text-gray-800">{reportItem.doctor?.name || "N/A"}</p>
//                   </div>
//                   <Stethoscope className="w-5 h-5 text-gray-400" />
//                 </div>
//               </div>

//               {/* Vitals Grid */}
//               <div className="p-4 bg-gray-50">
//                 <h4 className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-3">
//                   <Activity className="w-4 h-4" />
//                   Vital Signs
//                 </h4>
//                 <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
//                   <div className="bg-white rounded-lg p-2.5">
//                     <div className="flex items-center gap-1 text-gray-500 mb-1">
//                       <Ruler className="w-3 h-3" />
//                       <span className="text-xs">Height</span>
//                     </div>
//                     <p className="font-semibold text-gray-800 text-sm">
//                       {reportItem.vitals?.height || "N/A"} cm
//                     </p>
//                   </div>
//                   <div className="bg-white rounded-lg p-2.5">
//                     <div className="flex items-center gap-1 text-gray-500 mb-1">
//                       <Weight className="w-3 h-3" />
//                       <span className="text-xs">Weight</span>
//                     </div>
//                     <p className="font-semibold text-gray-800 text-sm">
//                       {reportItem.vitals?.weight || "N/A"} kg
//                     </p>
//                   </div>
//                   <div className="bg-white rounded-lg p-2.5">
//                     <div className="flex items-center gap-1 text-gray-500 mb-1">
//                       <Heart className="w-3 h-3" />
//                       <span className="text-xs">BP</span>
//                     </div>
//                     <div className="flex items-center gap-1">
//                       <p className="font-semibold text-gray-800 text-sm">
//                         {reportItem.vitals?.bp || "N/A"}
//                       </p>
//                       {reportItem.vitals?.bp && (
//                         <span className={`w-2 h-2 rounded-full bg-${bpStatus.color}-500`}></span>
//                       )}
//                     </div>
//                   </div>
//                   <div className="bg-white rounded-lg p-2.5">
//                     <div className="flex items-center gap-1 text-gray-500 mb-1">
//                       <Activity className="w-3 h-3" />
//                       <span className="text-xs">Pulse</span>
//                     </div>
//                     <p className="font-semibold text-gray-800 text-sm">
//                       {reportItem.vitals?.pulse || "N/A"} bpm
//                     </p>
//                   </div>
//                   <div className="bg-white rounded-lg p-2.5 col-span-2 sm:col-span-1">
//                     <div className="flex items-center gap-1 text-gray-500 mb-1">
//                       <Thermometer className="w-3 h-3" />
//                       <span className="text-xs">Temp</span>
//                     </div>
//                     <p className="font-semibold text-gray-800 text-sm">
//                       {reportItem.vitals?.temp || "N/A"}°F
//                     </p>
//                   </div>
//                 </div>
//               </div>

//               {/* Diagnoses */}
//               {reportItem.diagnoses && reportItem.diagnoses.length > 0 && (
//                 <div className="p-4 border-t border-gray-100">
//                   <h4 className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
//                     <ClipboardList className="w-4 h-4" />
//                     Diagnoses
//                   </h4>
//                   <div className="space-y-1.5">
//                     {reportItem.diagnoses.map((diagnosis, idx) => (
//                       <div key={idx} className="flex items-start gap-2">
//                         <CheckCircle className="w-3.5 h-3.5 text-green-500 mt-0.5 flex-shrink-0" />
//                         <p className="text-sm text-gray-700">{diagnosis}</p>
//                       </div>
//                     ))}
//                   </div>
//                 </div>
//               )}

//               {/* Treatment Plan */}
//               {reportItem.treatmentPlan && (
//                 <div className="p-4 border-t border-gray-100">
//                   <h4 className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
//                     <FileText className="w-4 h-4" />
//                     Treatment Plan
//                   </h4>
//                   <p className="text-sm text-gray-600 line-clamp-3">
//                     {reportItem.treatmentPlan}
//                   </p>
//                 </div>
//               )}

//               {/* Follow-up Date */}
//               {reportItem.followUpDate && (
//                 <div className="p-4 bg-blue-50 border-t border-blue-100">
//                   <div className="flex items-center justify-between">
//                     <div className="flex items-center gap-2">
//                       <Clock className="w-4 h-4 text-blue-600" />
//                       <div>
//                         <p className="text-xs text-blue-600 font-medium">Follow-up Date</p>
//                         <p className="text-sm font-semibold text-gray-800">
//                           {formatDate(reportItem.followUpDate)}
//                         </p>
//                       </div>
//                     </div>
//                     <ChevronRight className="w-5 h-5 text-blue-600" />
//                   </div>
//                 </div>
//               )}

//               {/* Actions Footer */}
//               <div className="p-4 bg-gray-50 border-t border-gray-200 flex justify-between">
//                 <button className="text-sm text-gray-600 hover:text-gray-800 flex items-center gap-1 transition-colors">
//                   <Share2 className="w-4 h-4" />
//                   Share
//                 </button>
//                 <button className="text-sm text-blue-600 hover:text-blue-700 font-medium flex items-center gap-1 transition-colors">
//                   View Details
//                   <ChevronRight className="w-4 h-4" />
//                 </button>
//               </div>
//             </div>
//           );
//         })}
//       </div>
//     </div>
//   );
// };

// export default Reports;

import React from 'react'
import { useContext } from 'react'
import { UserContext } from '../../context/UserContext'

const Reports = () => {
  const {report} = useContext(UserContext)
  if(!report){
    return (
      <div>
        No reports Found
      </div>
    )
  }
  return (
    <div>
      {
        report.map((reportItem, index) => {
          return(
            <div key={report._id}>
              <p>{reportItem?.doctor.name}</p>
              <img src={reportItem?.doctor.image} alt={reportItem.doctor.name} />
              <p>{reportItem?.reportNotes}</p>
              <p>{reportItem?.treatmentPlan}</p>
              <p>{reportItem?.followUpDate}</p>
              <p>{reportItem?.visitDate}</p>
              {
                reportItem.symptoms.map((symptom, index) => {
                  return(
                    <p key={index}>{symptom}</p>
                  )
                })
              }
              {
                reportItem.diagnoses.map((diagnosis, index) => {
                  return(
                    <div key={index}>
                      <p>{diagnosis?.primary}</p>
                      <p>{diagnosis?.code}</p>
                      <p>{diagnosis?.description}</p>
                    </div>  
                  )
                })
              }
              <p>{reportItem?.vitals?.bp}</p>
              <p>{reportItem?.vitals?.pulse}</p>
              <p>{reportItem?.vitals?.temp}</p>
              <p>{reportItem?.vitals?.height}</p>
              <p>{reportItem?.vitals?.weight}</p>
            </div>
          )
        })
      }
    </div>
  )
}

export default Reports

