import React, { useContext } from 'react';
import { UserContext } from '../../context/UserContext';
import { NavLink } from 'react-router-dom';
import {
  User,
  Calendar,
  Heart,
  Shield,
  AlertCircle,
  Pill,
  Droplet,
  PhoneCall,
  Info,
  Users,
  Home,
  Check,
  Edit,
  ClipboardList
} from 'lucide-react';

// Helper to format dates consistently
const formatDate = (dateString) => {
  if (!dateString) return 'Not Provided';
  try {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return 'Invalid Date';
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
  } catch {
    return 'Invalid Date';
  }
};

// Main Component
const PatientProfile = () => {
  const { patient } = useContext(UserContext);

  if (!patient) {
    return (
      <div className="flex items-center justify-center min-h-[400px] p-8">
        <div className="text-center max-w-md bg-white p-10 rounded-2xl border border-slate-200">
          <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <ClipboardList className="w-8 h-8 text-blue-700" />
          </div>
          <h2 className="text-xl font-bold text-slate-800 mb-2">Complete Your Profile</h2>
          <p className="text-slate-500 mb-6">
            Add your personal and medical details to get the most out of your health dashboard.
          </p>
          <NavLink to="/settings">
            <button className="px-6 py-2.5 bg-blue-700 text-white rounded-lg font-semibold hover:bg-blue-800 transition-colors inline-flex items-center gap-2">
              <Edit className="w-4 h-4" /> Go to Settings
            </button>
          </NavLink>
        </div>
      </div>
    );
  }

  return (
    <div className="p-1">
      <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h1 className="text-2xl font-bold text-slate-900">Profile Overview</h1>
        <NavLink to="/settings">
          <button className="w-full sm:w-auto bg-slate-100 text-slate-700 font-semibold px-5 py-2 rounded-lg hover:bg-slate-200 transition-colors flex items-center justify-center gap-2">
            <Edit className="w-4 h-4" /> Edit Profile
          </button>
        </NavLink>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* === Left Column: Main Details === */}
        <div className="lg:col-span-2 space-y-8">
          
          {/* Personal Information */}
          <Section title="Personal Information" icon={User}>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4">
              <InfoItem label="Date of Birth" value={formatDate(patient.dob)} />
              <InfoItem label="Gender" value={patient.gender || 'Not specified'} />
              <InfoItem label="Blood Group" value={patient.bloodGroup === 'none' ? 'Not specified' : patient.bloodGroup} />
              <InfoItem label="Phone" value={patient.phone || 'Not provided'} />
              <InfoItem label="Address" value={patient.address || 'Not provided'} className="sm:col-span-2" />
            </div>
          </Section>

          {/* Medical Summary */}
          <Section title="Medical Summary" icon={Heart}>
            {/* Allergies */}
            <MedicalList 
              title="Allergies" 
              items={patient.allergies} 
              icon={AlertCircle} 
              color="text-red-600" 
              emptyMessage="No known allergies"
            />
            {/* Chronic Conditions */}
            <MedicalList 
              title="Chronic Conditions" 
              items={patient.chronicConditions} 
              icon={ClipboardList} 
              color="text-yellow-600"
              emptyMessage="No chronic conditions listed"
            />
            {/* Medications */}
            <MedicalList 
              title="Current Medications" 
              items={patient.medications} 
              icon={Pill} 
              color="text-green-600"
              emptyMessage="No current medications listed"
            />
          </Section>

        </div>

        {/* === Right Column: Sidebar Info === */}
        <div className="lg:col-span-1 space-y-6">
          
          {/* Emergency Contact Card */}
          <SidebarCard title="Emergency Contact" icon={PhoneCall}>
            {patient.emergencyContact?.name ? (
              <div className="space-y-3">
                <InfoItem label="Name" value={patient.emergencyContact.name} />
                <InfoItem label="Phone" value={patient.emergencyContact.ePhone || 'Not provided'} />
                <InfoItem label="Relationship" value={patient.emergencyContact.relation || 'Not specified'} />
              </div>
            ) : (
              <p className="text-sm text-slate-500 italic">No emergency contact provided.</p>
            )}
          </SidebarCard>
          
          {/* Insurance Information Card */}
          <SidebarCard title="Insurance Details" icon={Shield}>
            {patient.insurance?.provider ? (
              <div className="space-y-3">
                <InfoItem label="Provider" value={patient.insurance.provider} />
                <InfoItem label="Policy Number" value={patient.insurance.policyNumber || 'Not provided'} />
                <InfoItem label="Valid Until" value={formatDate(patient.insurance.validTill)} />
              </div>
            ) : (
              <p className="text-sm text-slate-500 italic">No insurance information provided.</p>
            )}
          </SidebarCard>

        </div>
      </div>
    </div>
  );
};

// --- Sub-components for a clean and reusable structure ---

const Section = ({ title, icon: Icon, children }) => (
  <div className="bg-white p-6 rounded-xl border border-slate-200">
    <div className="flex items-center gap-3 mb-5">
      <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
        <Icon className="w-5 h-5 text-blue-700" />
      </div>
      <h2 className="text-xl font-bold text-slate-800">{title}</h2>
    </div>
    {children}
  </div>
);

const SidebarCard = ({ title, icon: Icon, children }) => (
  <div className="bg-white p-6 rounded-xl border border-slate-200">
    <div className="flex items-center gap-3 mb-4">
      <Icon className="w-5 h-5 text-slate-500" />
      <h3 className="text-lg font-bold text-slate-900">{title}</h3>
    </div>
    {children}
  </div>
);

const InfoItem = ({ label, value, className = "" }) => (
  <div className={className}>
    <p className="text-sm text-slate-500">{label}</p>
    <p className="font-medium text-slate-800">{value}</p>
  </div>
);

const MedicalList = ({ title, items, icon: Icon, color, emptyMessage }) => (
  <div className="border-t border-slate-100 pt-4 mt-4 first:border-t-0 first:pt-0 first:mt-0">
    <h4 className="flex items-center gap-2 text-md font-semibold text-slate-700 mb-2">
      <Icon className={`w-4 h-4 ${color}`} />
      {title}
    </h4>
    {items && items.length > 0 ? (
      <div className="flex flex-wrap gap-2">
        {items.map((item, i) => (
          <span key={i} className="px-3 py-1 bg-slate-100 text-slate-700 rounded-full text-sm">
            {item}
          </span>
        ))}
      </div>
    ) : (
      <p className="text-sm text-slate-500 italic">{emptyMessage}</p>
    )}
  </div>
);

export default PatientProfile;