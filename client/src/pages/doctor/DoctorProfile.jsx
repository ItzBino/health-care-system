import React, { useContext } from 'react';
import { DoctorContext } from '../../context/DoctorContext';
import { 
  Loader2, 
  GraduationCap, 
  DollarSign, 
  MapPin, 
  Phone, 
  Award, 
  Shield, 
  Calendar, 
  Clock,
  Stethoscope,
  FileText,
  AlertCircle,
  CheckCircle,
  User
} from 'lucide-react';

const DoctorProfile = () => {
  const { doctorProfile, loading } = useContext(DoctorContext);

  const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <Loader2 className="w-12 h-12 text-blue-600 animate-spin mx-auto mb-4" />
          <p className="text-gray-600">Loading profile...</p>
        </div>
      </div>
    );
  }

  if (!doctorProfile) {
    return (
      <div className="flex items-center justify-center min-h-[400px] p-8">
        <div className="text-center max-w-md">
          <div className="w-20 h-20 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <AlertCircle className="w-10 h-10 text-yellow-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Profile Incomplete</h2>
          <p className="text-gray-600 mb-6">
            Please complete your profile to start accepting appointments and connect with patients.
          </p>
          <button className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            Complete Your Profile
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-6">
      {/* Bio Section */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-100">
        <div className="flex items-start gap-3 mb-4">
          <User className="w-5 h-5 text-blue-600 mt-1" />
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Professional Bio</h3>
            <p className="text-gray-600 leading-relaxed">
              {doctorProfile.bio || "No bio provided"}
            </p>
          </div>
        </div>
      </div>

      {/* Professional Information */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Basic Info Card */}
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-4">
            <h3 className="text-white font-semibold flex items-center gap-2">
              <Stethoscope className="w-5 h-5" />
              Professional Information
            </h3>
          </div>
          <div className="p-6 space-y-4">
            <div className="flex items-center justify-between py-2 border-b border-gray-100">
              <span className="text-gray-600 text-sm">Specialization</span>
              <span className="font-medium text-gray-900">{doctorProfile.specialization}</span>
            </div>
            <div className="flex items-center justify-between py-2 border-b border-gray-100">
              <span className="text-gray-600 text-sm">License Number</span>
              <span className="font-medium text-gray-900">{doctorProfile.licenseNumber}</span>
            </div>
            <div className="flex items-center justify-between py-2 border-b border-gray-100">
              <span className="text-gray-600 text-sm flex items-center gap-1">
                <Award className="w-4 h-4" />
                Experience
              </span>
              <span className="font-medium text-gray-900">{doctorProfile.experienceYears} Years</span>
            </div>
            <div className="flex items-center justify-between py-2">
              <span className="text-gray-600 text-sm flex items-center gap-1">
                <DollarSign className="w-4 h-4" />
                Consultation Fee
              </span>
              <span className="font-medium text-gray-900 text-lg">${doctorProfile.fees}</span>
            </div>
          </div>
        </div>

        {/* Contact Info Card */}
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
          <div className="bg-gradient-to-r from-green-600 to-teal-600 px-6 py-4">
            <h3 className="text-white font-semibold flex items-center gap-2">
              <Phone className="w-5 h-5" />
              Contact Information
            </h3>
          </div>
          <div className="p-6 space-y-4">
            <div className="flex items-start gap-3">
              <MapPin className="w-5 h-5 text-gray-400 mt-1" />
              <div>
                <p className="text-sm text-gray-600 mb-1">Clinic Location</p>
                <p className="font-medium text-gray-900">{doctorProfile.clinicLocation}</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Phone className="w-5 h-5 text-gray-400 mt-1" />
              <div>
                <p className="text-sm text-gray-600 mb-1">Phone Number</p>
                <p className="font-medium text-gray-900">{doctorProfile.phoneNumber}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Education Section */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="bg-gradient-to-r from-purple-600 to-pink-600 px-6 py-4">
          <h3 className="text-white font-semibold flex items-center gap-2">
            <GraduationCap className="w-5 h-5" />
            Education & Qualifications
          </h3>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {doctorProfile.education.map((edu, index) => (
              <div key={index} className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <GraduationCap className="w-5 h-5 text-purple-600" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-900">{edu.degree}</h4>
                    <p className="text-sm text-gray-600 mt-1">{edu.college}</p>
                    <p className="text-xs text-gray-500 mt-2">Graduated: {edu.passoutYear}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Schedule Section */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="bg-gradient-to-r from-orange-600 to-red-600 px-6 py-4">
          <h3 className="text-white font-semibold flex items-center gap-2">
            <Calendar className="w-5 h-5" />
            Working Schedule
          </h3>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {doctorProfile.schedule?.map((slot, index) => (
              <div key={index} className="bg-gradient-to-br from-orange-50 to-red-50 rounded-lg p-4 border border-orange-200">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center">
                    <Clock className="w-4 h-4 text-orange-600" />
                  </div>
                  <h4 className="font-semibold text-gray-900">{days[slot.dayOfWeek]}</h4>
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Hours:</span>
                    <span className="font-medium text-gray-900">
                      {slot.start} - {slot.end}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Slot Duration:</span>
                    <span className="font-medium text-gray-900">{slot.slotMinutes} min</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Insurance Section */}
      {doctorProfile.insurance && doctorProfile.insurance.length > 0 && (
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
          <div className="bg-gradient-to-r from-teal-600 to-cyan-600 px-6 py-4">
            <h3 className="text-white font-semibold flex items-center gap-2">
              <Shield className="w-5 h-5" />
              Accepted Insurance
            </h3>
          </div>
          <div className="p-6">
            <div className="flex flex-wrap gap-2">
              {doctorProfile.insurance.map((ins, index) => (
                <span
                  key={index}
                  className="px-3 py-1.5 bg-teal-50 text-teal-700 rounded-full text-sm font-medium border border-teal-200"
                >
                  <CheckCircle className="w-3 h-3 inline mr-1" />
                  {ins}
                </span>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DoctorProfile;