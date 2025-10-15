import React from 'react';
import { Calendar, Clock, User, ChevronRight } from 'lucide-react';

const MyAppointments = () => {
  return (
    <div className="p-6 lg:p-8">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">My Appointments</h2>
      
      <div className="flex flex-col items-center justify-center py-20">
        <Calendar className="w-20 h-20 text-gray-300 mb-4" />
        <h3 className="text-xl font-semibold text-gray-700 mb-2">No Appointments Yet</h3>
        <p className="text-gray-500 text-center max-w-md mb-6">
          Your upcoming and past appointments will appear here. Book your first appointment to get started.
        </p>
        <button className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2">
          Book New Appointment
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export default MyAppointments;