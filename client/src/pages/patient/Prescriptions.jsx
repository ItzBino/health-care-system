import React from 'react';
import { useContext } from 'react';
import { UserContext } from '../../context/UserContext';
// FIX: Changed ClockOff to TimerOff
import { 
  User, 
  Calendar, 
  Pill, 
  Clock, 
  Droplet, 
  CheckCircle, 
  FileText,
  Ban, 
  TimerOff // CORRECTED: Use TimerOff for expired status
} from 'lucide-react';

// Helper function to format date
const formatIssueDate = (dateString) => {
  if (!dateString) return 'N/A';
  try {
    const date = new Date(dateString);
    // Example: "Oct 27, 2025"
    return date.toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'short', 
        day: 'numeric' 
    });
  } catch (error) {
    return dateString; // Return original if parsing fails
  }
};

const Prescriptions = () => {
  const { prescription } = useContext(UserContext);

  if (!prescription || prescription.length === 0) {
    return (
      <div className="p-6 text-center text-xl font-semibold text-gray-500">
        <FileText className="w-10 h-10 mx-auto mb-2 text-gray-400" />
        No Prescriptions found 😥
      </div>
    );
  }

  // --- Utility Functions for Status Styling ---

  const getStatusClasses = (status) => {
    switch (status) {
      case 'ACTIVE':
        return {
          bg: 'bg-green-100',
          text: 'text-green-800',
          icon: CheckCircle,
          iconColor: 'text-green-500',
        };
      case 'CANCELLED':
        return {
          bg: 'bg-red-100',
          text: 'text-red-800',
          icon: Ban,
          iconColor: 'text-red-500',
        };
      case 'EXPIRED':
        return {
          bg: 'bg-yellow-100',
          text: 'text-yellow-800',
          // FIX: Use TimerOff here
          icon: TimerOff, 
          iconColor: 'text-yellow-500',
        };
      default:
        return {
          bg: 'bg-gray-100',
          text: 'text-gray-800',
          icon: FileText,
          iconColor: 'text-gray-500',
        };
    }
  };

  // --- Component JSX ---
  return (
    <div className="p-4 sm:p-6 lg:p-8 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-extrabold text-gray-900 mb-8 border-b-2 pb-2">
        <FileText className="inline-block w-7 h-7 mr-2 text-indigo-600" />
        Your Prescriptions
      </h1>
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {prescription?.map((rx) => {
          const { bg, text, icon: StatusIcon, iconColor } = getStatusClasses(rx.status);
          const formattedDate = formatIssueDate(rx.issuedAt);

          return (
            // Individual Prescription Card
            <div 
              key={rx._id} 
              className="bg-white rounded-xl shadow-2xl hover:shadow-indigo-300/50 transition duration-500 overflow-hidden border border-gray-100"
            >
              {/* Doctor Info Header */}
              <div className="p-5 flex items-center space-x-4 bg-indigo-50/20">
                <img 
                  src={rx.doctor.image} 
                  alt={`${rx.doctor.name}'s image`}
                  className="w-14 h-14 rounded-full object-cover border-4 border-indigo-500 shadow-md"
                />
                <div className='flex-1'>
                  <p className="text-xl font-bold text-gray-900 flex items-center">
                      <User className="w-5 h-5 mr-2 text-indigo-600" />
                      Dr. {rx.doctor.name}
                  </p>
                  <p className="text-sm text-gray-600 flex items-center mt-1">
                      <Calendar className="w-4 h-4 mr-1.5 text-gray-500" />
                      Issued: {formattedDate}
                  </p>
                </div>
              </div>

              {/* Status */}
              <div className="p-5 border-b border-gray-100">
                <div className="text-sm font-semibold flex items-center">
                  <StatusIcon className={`w-5 h-5 mr-2 ${iconColor}`} />
                  <span 
                    className={`inline-block px-3 py-1 text-xs font-bold uppercase rounded-full ${bg} ${text}`}
                  >
                    {rx.status}
                  </span>
                </div>
              </div>

              {/* Medications List */}
              <div className="p-5 space-y-4">
                <h3 className="text-lg font-extrabold text-indigo-700 border-b pb-2 mb-4 flex items-center">
                  <Pill className="w-5 h-5 mr-2" />
                  Medications Details
                </h3>
                {rx.medications.map((med, index) => (
                  // Individual Medication Item
                  <div key={index} className="border-l-4 border-indigo-500 pl-4 py-1 bg-indigo-50/50 rounded-r-lg">
                    <p className="font-bold text-gray-800 flex items-center mb-1">
                      <Pill className="w-4 h-4 mr-2 text-indigo-600" />
                      {med?.name}
                    </p>
                    <div className="grid grid-cols-2 gap-y-1 text-sm text-gray-600">
                        <p className="flex items-center">
                          <Droplet className="w-4 h-4 mr-2 text-blue-500" />
                          <span className="font-semibold">Dose:</span> {med?.dosage}
                        </p>
                        <p className="flex items-center">
                          <Clock className="w-4 h-4 mr-2 text-orange-500" />
                          <span className="font-semibold">Freq:</span> {med?.frequency}
                        </p>
                        <p className="flex items-center col-span-2">
                          <Calendar className="w-4 h-4 mr-2 text-purple-500" />
                          <span className="font-semibold">Duration:</span> {med?.duration}
                        </p>
                    </div>
                    {med?.notes && (
                      <p className="text-xs italic text-gray-500 mt-2 p-1 border-t border-gray-200">
                        <span className="font-semibold not-italic">Note:</span> {med.notes}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Prescriptions;