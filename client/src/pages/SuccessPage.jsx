import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { 
  CheckCircle, 
  Calendar, 
  Clock, 
  User, 
  MapPin, 
  ArrowRight,
  Home,
  Mail
} from 'lucide-react';

const CheckoutSuccess = () => {
  const navigate = useNavigate();

  // Mock appointment data - in real app, get from URL params or API
  const appointment = {
    id: 'APT-2024-001234',
    doctorName: 'Dr. Sarah Johnson',
    date: 'Monday, January 20, 2024',
    time: '10:00 AM',
    location: 'MediCare Clinic, New York',
    email: 'patient@example.com'
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-8">
      <div className="max-w-md w-full">
        {/* Success Card */}
        <div className="bg-white rounded-2xl shadow-lg p-8">
          {/* Success Icon */}
          <div className="text-center mb-6">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
              <CheckCircle className="w-10 h-10 text-green-600" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              Payment Successful!
            </h1>
            <p className="text-gray-600">
              Your appointment has been confirmed
            </p>
          </div>

          {/* Appointment Details */}
          <div className="bg-gray-50 rounded-xl p-6 mb-6 space-y-4">
            <div className="text-center mb-4">
              <p className="text-sm text-gray-500">Appointment ID</p>
              <p className="font-mono font-semibold text-gray-900">{appointment.id}</p>
            </div>

            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <User className="w-5 h-5 text-gray-400" />
                <div>
                  <p className="text-sm text-gray-500">Doctor</p>
                  <p className="font-medium text-gray-900">{appointment.doctorName}</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Calendar className="w-5 h-5 text-gray-400" />
                <div>
                  <p className="text-sm text-gray-500">Date</p>
                  <p className="font-medium text-gray-900">{appointment.date}</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Clock className="w-5 h-5 text-gray-400" />
                <div>
                  <p className="text-sm text-gray-500">Time</p>
                  <p className="font-medium text-gray-900">{appointment.time}</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <MapPin className="w-5 h-5 text-gray-400" />
                <div>
                  <p className="text-sm text-gray-500">Location</p>
                  <p className="font-medium text-gray-900">{appointment.location}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Email Notice */}
          <div className="flex items-start gap-2 p-4 bg-blue-50 rounded-lg mb-6">
            <Mail className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm text-blue-900 font-medium">Confirmation Email Sent</p>
              <p className="text-xs text-blue-700 mt-1">
                We've sent the appointment details to {appointment.email}
              </p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-3">
            <Link 
              to="/appointments"
              className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
            >
              View My Appointments
              <ArrowRight className="w-4 h-4" />
            </Link>
            
            <Link 
              to="/"
              className="w-full flex items-center justify-center gap-2 px-4 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
            >
              <Home className="w-4 h-4" />
              Back to Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutSuccess;