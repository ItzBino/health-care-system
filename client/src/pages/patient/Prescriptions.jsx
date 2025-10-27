// import React, { useContext } from 'react';
// import {
//   ClipboardList,
//   Plus,
//   RefreshCw,
//   Pill,
//   Calendar,
//   Clock,
//   User,
//   FileText,
//   Download,
//   Printer,
//   ChevronRight,
//   AlertCircle,
//   CheckCircle,
//   XCircle,
//   Timer,
//   Loader2,
//   Activity,
//   Edit,
//   Share2,
//   Filter,
//   Search,
//   Shield,
//   Stethoscope
// } from 'lucide-react';
// import { UserContext } from '../../context/UserContext';

// const Prescriptions = () => {
//   const { prescription, setPrescription, loading } = useContext(UserContext);

//   // Format date
//   const formatDate = (dateString) => {
//     if (!dateString) return "N/A";
//     const date = new Date(dateString);
//     return date.toLocaleDateString("en-US", {
//       year: "numeric",
//       month: "short",
//       day: "numeric",
//     });
//   };

//   // Get status badge styling
//   const getStatusBadge = (status) => {
//     const statusStyles = {
//       active: {
//         bg: "bg-green-100",
//         text: "text-green-700",
//         icon: CheckCircle,
//         label: "Active"
//       },
//       completed: {
//         bg: "bg-blue-100",
//         text: "text-blue-700",
//         icon: CheckCircle,
//         label: "Completed"
//       },
//       expired: {
//         bg: "bg-red-100",
//         text: "text-red-700",
//         icon: XCircle,
//         label: "Expired"
//       },
//       pending: {
//         bg: "bg-yellow-100",
//         text: "text-yellow-700",
//         icon: Timer,
//         label: "Pending"
//       }
//     };
//     return statusStyles[status?.toLowerCase()] || statusStyles.pending;
//   };

//   // Get medication frequency color
//   const getFrequencyColor = (frequency) => {
//     if (frequency?.includes("daily")) return "text-blue-600";
//     if (frequency?.includes("twice")) return "text-orange-600";
//     if (frequency?.includes("thrice")) return "text-purple-600";
//     return "text-gray-600";
//   };

//   if (loading) {
//     return (
//       <div className="flex items-center justify-center min-h-[400px]">
//         <div className="text-center">
//           <Loader2 className="w-12 h-12 text-blue-600 animate-spin mx-auto mb-4" />
//           <p className="text-gray-600">Loading prescriptions...</p>
//         </div>
//       </div>
//     );
//   }

//   if (!prescription || prescription.length === 0) {
//     return (
//       <div className="p-6 lg:p-8">
//         <h2 className="text-2xl font-bold text-gray-800 mb-6">Prescriptions</h2>
//         <div className="flex flex-col items-center justify-center py-20 bg-gray-50 rounded-xl">
//           <div className="relative">
//             <ClipboardList className="w-20 h-20 text-gray-300 mb-4" />
//             <Pill className="w-8 h-8 text-gray-400 absolute -bottom-1 -right-1" />
//           </div>
//           <h3 className="text-xl font-semibold text-gray-700 mb-2">No Prescriptions Found</h3>
//           <p className="text-gray-500 text-center max-w-md mb-6">
//             Your prescription history and active medications will be displayed here.
//           </p>
//           <button className="px-6 py-3 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors flex items-center gap-2">
//             <RefreshCw className="w-5 h-5" />
//             Request Prescription
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
//           <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
//             <ClipboardList className="w-7 h-7 text-orange-600" />
//             Prescriptions
//           </h2>
//           <p className="text-gray-600 mt-1">
//             {prescription.length} prescription{prescription.length > 1 ? 's' : ''} found
//           </p>
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
//           <button className="px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors flex items-center gap-2 text-sm">
//             <Plus className="w-4 h-4" />
//             New Request
//           </button>
//         </div>
//       </div>

//       {/* Prescriptions Grid */}
//       <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6">
//         {prescription.map((rx) => {
//           const statusInfo = getStatusBadge(rx.status);
//           const StatusIcon = statusInfo.icon;

//           return (
//             <div
//               key={rx._id}
//               className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group"
//             >
//               {/* Prescription Header */}
//               <div className="bg-gradient-to-r from-orange-500 to-pink-500 p-4 sm:p-5">
//                 <div className="flex justify-between items-start">
//                   <div className="flex-1">
//                     <div className="flex items-center gap-2 mb-2">
//                       <ClipboardList className="w-5 h-5 text-white/80" />
//                       <h3 className="text-white font-semibold text-lg">Prescription</h3>
//                     </div>
//                     <div className="flex items-center gap-2 text-orange-100 text-sm">
//                       <Calendar className="w-4 h-4" />
//                       {formatDate(rx.issuedAt)}
//                     </div>
//                   </div>
//                   {/* Status Badge */}
//                   <div className={`px-2.5 py-1 rounded-full flex items-center gap-1 ${statusInfo.bg}`}>
//                     <StatusIcon className={`w-3.5 h-3.5 ${statusInfo.text}`} />
//                     <span className={`text-xs font-medium ${statusInfo.text}`}>
//                       {statusInfo.label}
//                     </span>
//                   </div>
//                 </div>
//               </div>

//               {/* Doctor Information */}
//               <div className="p-4 border-b border-gray-100 bg-gray-50">
//                 <div className="flex items-center gap-3">
//                   {rx.doctor?.user.image ? (
//                     <img
//                       src={rx.doctor.user.image}
//                       alt={rx.doctor.user.name}
//                       className="w-12 h-12 rounded-full object-cover border-2 border-orange-100"
//                     />
//                   ) : (
//                     <div className="w-12 h-12 rounded-full bg-orange-100 flex items-center justify-center">
//                       <User className="w-6 h-6 text-orange-600" />
//                     </div>
//                   )}
//                   <div className="flex-1">
//                     <p className="text-xs text-gray-500 flex items-center gap-1">
//                       <Stethoscope className="w-3 h-3" />
//                       Prescribed by
//                     </p>
//                     <p className="font-semibold text-gray-800">{rx.doctor?.name || "N/A"}</p>
//                   </div>
//                 </div>
//               </div>

//               {/* Description */}
//               {rx.description && (
//                 <div className="px-4 pt-3 pb-2">
//                   <div className="flex items-start gap-2">
//                     <FileText className="w-4 h-4 text-gray-400 mt-0.5" />
//                     <div className="flex-1">
//                       <p className="text-xs text-gray-500 font-medium mb-1">Notes</p>
//                       <p className="text-sm text-gray-700 line-clamp-2">{rx.description}</p>
//                     </div>
//                   </div>
//                 </div>
//               )}

//               {/* Medications List */}
//               <div className="p-4">
//                 <h4 className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-3">
//                   <Pill className="w-4 h-4 text-orange-600" />
//                   Medications ({rx.medications?.length || 0})
//                 </h4>
                
//                 {rx.medications && rx.medications.length > 0 ? (
//                   <div className="space-y-3 max-h-64 overflow-y-auto custom-scrollbar">
//                     {rx.medications.map((med, index) => (
//                       <div
//                         key={index}
//                         className="bg-orange-50 rounded-lg p-3 border border-orange-100 hover:border-orange-200 transition-colors"
//                       >
//                         <div className="flex items-start justify-between mb-2">
//                           <h5 className="font-semibold text-gray-800 flex items-center gap-2">
//                             <span className="w-6 h-6 bg-orange-200 text-orange-700 rounded-full flex items-center justify-center text-xs font-bold">
//                               {index + 1}
//                             </span>
//                             {med.name}
//                           </h5>
//                         </div>
                        
//                         <div className="grid grid-cols-2 gap-2 text-sm">
//                           <div className="flex items-center gap-1.5">
//                             <Activity className="w-3.5 h-3.5 text-gray-500" />
//                             <span className="text-gray-600">Dosage:</span>
//                             <span className="font-medium text-gray-800">{med.dosage}</span>
//                           </div>
//                           <div className="flex items-center gap-1.5">
//                             <Clock className="w-3.5 h-3.5 text-gray-500" />
//                             <span className="text-gray-600">Frequency:</span>
//                             <span className={`font-medium ${getFrequencyColor(med.frequency)}`}>
//                               {med.frequency}
//                             </span>
//                           </div>
//                           <div className="flex items-center gap-1.5 col-span-2">
//                             <Timer className="w-3.5 h-3.5 text-gray-500" />
//                             <span className="text-gray-600">Duration:</span>
//                             <span className="font-medium text-gray-800">{med.duration}</span>
//                           </div>
//                         </div>
                        
//                         {med.notes && (
//                           <div className="mt-2 pt-2 border-t border-orange-100">
//                             <p className="text-xs text-gray-600 italic">
//                               <span className="font-medium">Note:</span> {med.notes}
//                             </p>
//                           </div>
//                         )}
//                       </div>
//                     ))}
//                   </div>
//                 ) : (
//                   <p className="text-sm text-gray-500 italic text-center py-4 bg-gray-50 rounded-lg">
//                     No medications listed
//                   </p>
//                 )}
//               </div>

//               {/* Actions Footer */}
//               <div className="p-4 bg-gray-50 border-t border-gray-200 flex items-center justify-between">
//                 <div className="flex gap-2">
//                   <button className="p-2 text-gray-600 hover:text-gray-800 hover:bg-white rounded-lg transition-all">
//                     <Download className="w-4 h-4" />
//                   </button>
//                   <button className="p-2 text-gray-600 hover:text-gray-800 hover:bg-white rounded-lg transition-all">
//                     <Printer className="w-4 h-4" />
//                   </button>
//                   <button className="p-2 text-gray-600 hover:text-gray-800 hover:bg-white rounded-lg transition-all">
//                     <Share2 className="w-4 h-4" />
//                   </button>
//                 </div>
//                 <button className="text-sm text-orange-600 hover:text-orange-700 font-medium flex items-center gap-1 transition-colors">
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

// export default Prescriptions;

import React from 'react'
import { useContext } from 'react'
import { UserContext } from '../../context/UserContext'

const Prescriptions = () => {
  const {prescription} = useContext(UserContext)
  if(!prescription) return <div>No Prescrition found</div>
  return (
    <div>
      {
        prescription?.map((rx) => {
          return( 
            <div key={rx._id}>
              <img src={rx.doctor.image} alt="" />
              <p>{rx?.doctor.name}</p>
              <p>{rx?.issuedAt}</p>
              { rx.medications.map((med,index) => {
                return(
                  <div key={index}>
                    <p>{med?.name}</p>
                    <p>{med?.dosage}</p>
                    <p>{med?.frequency}</p>
                    <p>{med?.duration}</p>
                    <p>{med?.notes}</p>
                  </div>
                )
              })}
              <p>{rx?.status}</p>
            </div>
          )
        })
      }
    </div>
  )
}

export default Prescriptions
