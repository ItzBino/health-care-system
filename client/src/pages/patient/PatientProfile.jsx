import React, { useContext } from 'react';
import { UserContext } from '../../context/UserContext';
import {
  Calendar,
  Phone,
  MapPin,
  Heart,
  Shield,
  AlertCircle,
  Pill,
  Activity,
  Droplet,
  Users,
  CreditCard,
  Clock,
  PhoneCall,
  UserCheck,
  Home,
  Info
} from 'lucide-react';

const PatientProfile = () => {
  const { patient } = useContext(UserContext);

  const formatDate = (dateString) => {
    if (!dateString) return 'Not provided';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  if (!patient) {
    return (
      <div className="p-8 text-center">
        <Info className="w-16 h-16 text-gray-300 mx-auto mb-4" />
        <p className="text-gray-500">No patient profile data available</p>
      </div>
    );
  }

  return (
    <div className="p-6 lg:p-8">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Complete Profile Overview</h2>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Personal Information */}
        <div className="space-y-6">
          <div className="bg-gray-50 rounded-lg p-6">
            <h3 className="flex items-center gap-2 text-lg font-semibold text-gray-800 mb-4">
              <Info className="w-5 h-5 text-blue-600" />
              Personal Information
            </h3>
            <div className="space-y-3">
              <div>
                <p className="text-sm text-gray-500">Date of Birth</p>
                <p className="font-medium text-gray-800">{formatDate(patient.dob)}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Gender</p>
                <p className="font-medium text-gray-800">{patient.gender || 'Not specified'}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Blood Group</p>
                <p className="font-medium text-gray-800">
                  {patient.bloodGroup === 'none' ? 'Not specified' : patient.bloodGroup}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Phone</p>
                <p className="font-medium text-gray-800">{patient.phone || 'Not provided'}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Address</p>
                <p className="font-medium text-gray-800">{patient.address || 'Not provided'}</p>
              </div>
            </div>
          </div>

          {/* Emergency Contact */}
          <div className="bg-orange-50 border border-orange-200 rounded-lg p-6">
            <h3 className="flex items-center gap-2 text-lg font-semibold text-gray-800 mb-4">
              <PhoneCall className="w-5 h-5 text-orange-600" />
              Emergency Contact
            </h3>
            {patient.emergencyContact?.name ? (
              <div className="space-y-3">
                <div>
                  <p className="text-sm text-gray-500">Name</p>
                  <p className="font-medium text-gray-800">{patient.emergencyContact.name}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Phone</p>
                  <p className="font-medium text-gray-800">{patient.emergencyContact.ePhone || 'Not provided'}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Relationship</p>
                  <p className="font-medium text-gray-800">{patient.emergencyContact.relation || 'Not specified'}</p>
                </div>
              </div>
            ) : (
              <p className="text-gray-500 italic">No emergency contact provided</p>
            )}
          </div>
        </div>

        {/* Medical Information */}
        <div className="bg-red-50 rounded-lg p-6">
          <h3 className="flex items-center gap-2 text-lg font-semibold text-gray-800 mb-4">
            <Heart className="w-5 h-5 text-red-600" />
            Medical Information
          </h3>
          
          <div className="space-y-4">
            {/* Allergies */}
            <div>
              <h4 className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                <AlertCircle className="w-4 h-4 text-red-500" />
                Allergies
              </h4>
              {patient.allergies && patient.allergies.length > 0 ? (
                <div className="space-y-1">
                  {patient.allergies.map((allergy, i) => (
                    <div key={i} className="flex items-center gap-2 bg-white px-3 py-2 rounded">
                      <span className="w-2 h-2 bg-red-500 rounded-full"></span>
                      <span className="text-sm">{allergy}</span>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500 italic text-sm">No known allergies</p>
              )}
            </div>

            {/* Chronic Conditions */}
            <div>
              <h4 className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                <Activity className="w-4 h-4 text-orange-500" />
                Chronic Conditions
              </h4>
              {patient.chronicConditions && patient.chronicConditions.length > 0 ? (
                <div className="space-y-1">
                  {patient.chronicConditions.map((condition, i) => (
                    <div key={i} className="flex items-center gap-2 bg-white px-3 py-2 rounded">
                      <span className="w-2 h-2 bg-orange-500 rounded-full"></span>
                      <span className="text-sm">{condition}</span>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500 italic text-sm">No chronic conditions</p>
              )}
            </div>

            {/* Medications */}
            <div>
              <h4 className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                <Pill className="w-4 h-4 text-green-500" />
                Current Medications
              </h4>
              {patient.medications && patient.medications.length > 0 ? (
                <div className="space-y-1">
                  {patient.medications.map((medication, i) => (
                    <div key={i} className="flex items-center gap-2 bg-white px-3 py-2 rounded">
                      <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                      <span className="text-sm">{medication}</span>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500 italic text-sm">No current medications</p>
              )}
            </div>
          </div>
        </div>

        {/* Insurance Information */}
        <div className="bg-green-50 rounded-lg p-6">
          <h3 className="flex items-center gap-2 text-lg font-semibold text-gray-800 mb-4">
            <Shield className="w-5 h-5 text-green-600" />
            Insurance Information
          </h3>
          {patient.insurance?.provider ? (
            <div className="space-y-3">
              <div>
                <p className="text-sm text-gray-500">Provider</p>
                <p className="font-medium text-gray-800">{patient.insurance.provider}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Policy Number</p>
                <p className="font-medium text-gray-800">{patient.insurance.policyNumber || 'Not provided'}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Valid Until</p>
                <p className="font-medium text-gray-800">
                  {patient.insurance.validTill ? formatDate(patient.insurance.validTill) : 'Not specified'}
                </p>
              </div>
            </div>
          ) : (
            <div className="text-center py-8">
              <Shield className="w-12 h-12 text-gray-300 mx-auto mb-3" />
              <p className="text-gray-500">No insurance information provided</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PatientProfile;