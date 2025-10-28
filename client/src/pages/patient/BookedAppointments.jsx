import React, { useEffect, useState } from 'react';
import { 
  Calendar, 
  Clock, 
  User, 
  ChevronRight, 
  MapPin, 
  Phone, 
  AlertCircle,
  CheckCircle,
  XCircle,
  Loader2,
  CalendarX,
  Stethoscope,
  Activity
} from 'lucide-react';
import { api } from '../../api/auth';

const BookedAppointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [cancellingId, setCancellingId] = useState(null);

  const fetchAppointments = async () => {
    setLoading(true);
    try {
      const response = await api.get('/api/patient/my-appointment');
      if(response.data.success){
        setAppointments(response.data.data);
        console.log(response.data.data);
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchAppointments();
  }, []);

  // Format date from 2025_10_31 to readable format
  const formatDate = (dateString) => {
    if (!dateString) return '';
    const [year, month, day] = dateString.split('_');
    const date = new Date(year, month - 1, day);
    return date.toLocaleDateString('en-US', { 
      weekday: 'short',
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  // Get status badge configuration
  const getStatusBadge = (status) => {
    const statusConfig = {
      CONFIRMED: {
        bg: "bg-green-50 border-green-200",
        text: "text-green-700",
        icon: CheckCircle,
        label: "Confirmed",
      },
      PENDING: {
        bg: "bg-yellow-50 border-yellow-200",
        text: "text-yellow-700",
        icon: AlertCircle,
        label: "Pending",
      },
      CANCELLED: {
        bg: "bg-red-50 border-red-200",
        text: "text-red-700",
        icon: XCircle,
        label: "Cancelled",
      },
      COMPLETED: {
        bg: "bg-blue-50 border-blue-200",
        text: "text-blue-700",
        icon: CheckCircle,
        label: "Completed",
      },
      REQUESTED: {
        bg: "bg-orange-50 border-orange-200",
        text: "text-orange-700",
        icon: Clock,
        label: "Requested",
      },
    };
    return statusConfig[status?.toUpperCase()] || statusConfig.PENDING;
  };

  const handleCancelAppointment = async (appointmentId) => {
    setCancellingId(appointmentId);
    try {
      // Add your cancel API call here
      // await api.delete(`/api/patient/appointment/${appointmentId}`);
      // fetchAppointments(); // Refresh the list
      setTimeout(() => setCancellingId(null), 2000); // Simulated delay
    } catch (error) {
      console.error('Error cancelling appointment:', error);
      setCancellingId(null);
    }
  };

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-center h-64">
            <div className="text-center">
              <Loader2 className="w-12 h-12 text-blue-600 animate-spin mx-auto mb-4" />
              <p className="text-gray-600">Loading appointments...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Empty state
  if (!appointments || appointments.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
              My Appointments
            </h1>
            <p className="text-gray-600">
              View and manage your upcoming medical appointments
            </p>
          </div>

          {/* Empty State */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 sm:p-12">
            <div className="text-center max-w-md mx-auto">
              <div className="w-24 h-24 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <CalendarX className="w-12 h-12 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                No Appointments Booked
              </h3>
              <p className="text-gray-600 mb-8">
                You haven't booked any appointments yet. Find a doctor and book your first appointment.
              </p>
              <button className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium">
                Find Doctors
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
            My Appointments
          </h1>
          <p className="text-gray-600">
            You have {appointments.length} appointment{appointments.length !== 1 ? 's' : ''} scheduled
          </p>
        </div>

        {/* Appointments Grid */}
        <div className="grid gap-4 md:gap-6">
          {appointments.map((appointment) => {
            const statusConfig = getStatusBadge(appointment.status);
            const StatusIcon = statusConfig.icon;
            const isCancelling = cancellingId === appointment._id;

            return (
              <div 
                key={appointment._id}
                className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-all duration-200"
              >
                {/* Mobile Layout */}
                <div className="lg:hidden">
                  <div className="p-4 sm:p-6">
                    {/* Doctor Info */}
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        <img 
                          src={appointment.doctor.image || '/default-doctor.png'} 
                          alt={appointment.doctor.name} 
                          className="w-14 h-14 rounded-full object-cover border-2 border-gray-200" 
                        />
                        <div>
                          <h3 className="font-semibold text-gray-900">
                            Dr. {appointment.doctor.name}
                          </h3>
                          <p className="text-sm text-gray-500">
                            {appointment.doctor.specialization || 'General Physician'}
                          </p>
                        </div>
                      </div>
                      {/* Status Badge */}
                      <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full border ${statusConfig.bg} ${statusConfig.text}`}>
                        <StatusIcon className="w-3.5 h-3.5" />
                        <span className="text-xs font-medium">{statusConfig.label}</span>
                      </div>
                    </div>

                    {/* Appointment Details */}
                    <div className="space-y-2 mb-4">
                      <div className="flex items-center text-gray-600">
                        <Calendar className="w-4 h-4 mr-2" />
                        <span className="text-sm">{formatDate(appointment.slotDate)}</span>
                      </div>
                      <div className="flex items-center text-gray-600">
                        <Clock className="w-4 h-4 mr-2" />
                        <span className="text-sm">{appointment.slotTime}</span>
                      </div>
                      {appointment.reason && (
                        <div className="flex items-center text-gray-600">
                          <Stethoscope className="w-4 h-4 mr-2" />
                          <span className="text-sm">{appointment.reason}</span>
                        </div>
                      )}
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-2">
                      {appointment.status !== 'CANCELLED' && appointment.status !== 'COMPLETED' && (
                        <button
                          onClick={() => handleCancelAppointment(appointment._id)}
                          disabled={isCancelling}
                          className="flex-1 px-4 py-2 border border-red-300 text-red-600 rounded-lg hover:bg-red-50 transition-colors font-medium text-sm disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                        >
                          {isCancelling ? (
                            <>
                              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                              Cancelling...
                            </>
                          ) : (
                            'Cancel Appointment'
                          )}
                        </button>
                      )}
                      <button className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium text-sm flex items-center justify-center">
                        View Details
                        <ChevronRight className="w-4 h-4 ml-1" />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Desktop Layout */}
                <div className="hidden lg:block">
                  <div className="p-6">
                    <div className="flex items-center justify-between">
                      {/* Doctor Info */}
                      <div className="flex items-center space-x-4 flex-1">
                        <img 
                          src={appointment.doctor.image || '/default-doctor.png'} 
                          alt={appointment.doctor.name} 
                          className="w-16 h-16 rounded-full object-cover border-2 border-gray-200" 
                        />
                        <div>
                          <h3 className="font-semibold text-gray-900 text-lg">
                            Dr. {appointment.doctor.name}
                          </h3>
                          <p className="text-gray-500">
                            {appointment.doctor.specialization || 'General Physician'}
                          </p>
                        </div>
                      </div>

                      {/* Date & Time */}
                      <div className="flex items-center gap-6 flex-1 justify-center">
                        <div className="flex items-center text-gray-600">
                          <Calendar className="w-5 h-5 mr-2 text-gray-400" />
                          <div>
                            <p className="text-sm text-gray-500">Date</p>
                            <p className="font-medium">{formatDate(appointment.slotDate)}</p>
                          </div>
                        </div>
                        <div className="flex items-center text-gray-600">
                          <Clock className="w-5 h-5 mr-2 text-gray-400" />
                          <div>
                            <p className="text-sm text-gray-500">Time</p>
                            <p className="font-medium">{appointment.slotTime}</p>
                          </div>
                        </div>
                      </div>

                      {/* Status & Actions */}
                      <div className="flex items-center gap-3 flex-1 justify-end">
                        {/* Status Badge */}
                        <div className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border ${statusConfig.bg} ${statusConfig.text}`}>
                          <StatusIcon className="w-4 h-4" />
                          <span className="text-sm font-medium">{statusConfig.label}</span>
                        </div>

                        {/* Action Buttons */}
                        {appointment.status !== 'CANCELLED' && appointment.status !== 'COMPLETED' && (
                          <button
                            onClick={() => handleCancelAppointment(appointment._id)}
                            disabled={isCancelling}
                            className="px-4 py-2 border border-red-300 text-red-600 rounded-lg hover:bg-red-50 transition-colors font-medium text-sm disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
                          >
                            {isCancelling ? (
                              <>
                                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                                Cancelling...
                              </>
                            ) : (
                              <>
                                <XCircle className="w-4 h-4 mr-2" />
                                Cancel
                              </>
                            )}
                          </button>
                        )}
                        
                        {/* <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium text-sm flex items-center">
                          View Details
                          <ChevronRight className="w-4 h-4 ml-1" />
                        </button> */}
                      </div>
                    </div>

                    {/* Additional Info (if reason exists) */}
                    {appointment.reason && (
                      <div className="mt-4 pt-4 border-t border-gray-100">
                        <div className="flex items-center text-gray-600">
                          <Activity className="w-4 h-4 mr-2 text-gray-400" />
                          <span className="text-sm text-gray-500 mr-2">Reason for visit:</span>
                          <span className="text-sm font-medium text-gray-700">{appointment.reason}</span>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default BookedAppointments;