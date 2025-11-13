import React, { useContext } from "react";
import { DoctorContext } from "../../context/DoctorContext";
import { NavLink } from "react-router-dom";
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
  Briefcase,
  AlertCircle,
  Check,
  X,
  User,
  Info,
} from "lucide-react";

// Helper for availability days
const days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
const today = new Date().toLocaleDateString("en-US", { weekday: "long" });

// Main Component
const DoctorProfile = () => {
  const { doctorProfile, loading } = useContext(DoctorContext);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <Loader2 className="w-10 h-10 text-blue-700 animate-spin mx-auto mb-3" />
          <p className="text-slate-600 font-medium">Loading Profile...</p>
        </div>
      </div>
    );
  }

  if (!doctorProfile) {
    return (
      <div className="flex items-center justify-center min-h-[400px] p-8">
        <div className="text-center max-w-md bg-white p-10 rounded-2xl border border-slate-200">
          <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <AlertCircle className="w-8 h-8 text-yellow-600" />
          </div>
          <h2 className="text-xl font-bold text-slate-800 mb-2">
            Profile Incomplete
          </h2>
          <p className="text-slate-500 mb-6">
            Please complete your profile to start accepting appointments and
            connect with patients.
          </p>
          <NavLink to="/settings">
            <button className="px-6 py-2.5 bg-blue-700 text-white rounded-lg font-semibold hover:bg-blue-800 transition-colors">
              Complete Your Profile
            </button>
          </NavLink>
        </div>
      </div>
    );
  }

  return (
    <div className="p-1">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* === Left Column: Main Content === */}
        <div className="lg:col-span-2 space-y-8">
          {/* Bio Section */}
          <Section title="Professional Bio" icon={Info}>
            <p className="text-slate-600 leading-relaxed">
              {doctorProfile.bio ||
                "No professional bio has been provided yet."}
            </p>
          </Section>

          {/* Timeline for Education & Experience */}
          <Section title="Qualifications & Experience" icon={GraduationCap}>
            <div className="relative border-l-2 border-slate-200 ml-3 py-3 space-y-8">
              {/* Education */}
              {doctorProfile.education.map((edu, index) => (
                <TimelineItem
                  key={`edu-${index}`}
                  icon={GraduationCap}
                  title={edu.degree}
                  subtitle={edu.college}
                  year={edu.passoutYear}
                />
              ))}
              {/* Experience */}
              <TimelineItem
                icon={Briefcase}
                title={`${doctorProfile.experienceYears} Years of Experience`}
                subtitle="In clinical practice"
                isExperience
              />
            </div>
          </Section>

          {/* Accepted Insurance */}
{/* Accepted Insurance */}
<Section title="Accepted Insurance" icon={Shield}>
  {doctorProfile.insurance && doctorProfile.insurance.length > 0 ? (
    <div className="flex flex-wrap gap-2">
      {doctorProfile.insurance?.map((ins, index) => (
        <span
          key={index}
          className="px-3 py-1.5 bg-slate-100 text-slate-700 rounded-full text-sm font-medium"
        >
          {ins}
        </span>
      ))}
    </div>
  ) : (
    <p className="text-slate-400 italic text-sm">
      No insurance information provided yet.
    </p>
  )}
</Section>


        </div>

        {/* === Right Column: At-a-Glance Info === */}
        <div className="lg:col-span-1 space-y-6">
          {/* Key Information Card */}
          <SidebarCard title="Key Information">
            <dl className="divide-y divide-slate-100">
              <InfoRow
                label="Specialization"
                value={doctorProfile.specialization}
                icon={Stethoscope}
              />
              <InfoRow
                label="License Number"
                value={doctorProfile.licenseNumber}
              />
              <InfoRow
                label="Consultation Fee"
                value={`$${doctorProfile.fees}`}
                icon={DollarSign}
                isBold={true}
              />
            </dl>
          </SidebarCard>

          {/* Availability Card */}
          <SidebarCard title="Availability">
            <div className="space-y-2">
              {days.map((day) => {
                const isToday = day === today;
                const isAvailable = isToday && doctorProfile.available;

                return (
                  <div
                    key={day}
                    className={`flex items-center justify-between text-sm px-4 py-2 rounded-lg border transition-all ${
                      isToday
                        ? isAvailable
                          ? "bg-green-50 border-green-300"
                          : "bg-red-50 border-red-300"
                        : "bg-slate-50 border-slate-200"
                    }`}
                  >
                    <span
                      className={`font-medium ${
                        isToday ? "text-slate-800" : "text-slate-500"
                      }`}
                    >
                      {day} {isToday && "(Today)"}
                    </span>
                    {isToday ? (
                      isAvailable ? (
                        <span className="flex items-center gap-1 font-semibold text-green-600">
                          <Check className="w-4 h-4" /> Available
                        </span>
                      ) : (
                        <span className="flex items-center gap-1 text-red-600 font-semibold">
                          <X className="w-4 h-4" /> Unavailable
                        </span>
                      )
                    ) : (
                      <span className="text-slate-400 text-xs">N/A</span>
                    )}
                  </div>
                );
              })}
              <div className="mt-4 pt-4 border-t border-slate-100 flex items-center gap-3">
                <Clock className="w-5 h-5 text-blue-700" />
                <div>
                  <p className="text-xs text-slate-500">General Timings</p>
                  <p className="font-semibold text-slate-800">
                    10:00 AM - 8:00 PM
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-4 pt-4 border-t border-slate-100 flex items-center gap-3">
              <Clock className="w-5 h-5 text-blue-700" />
              <div>
                <p className="text-xs text-slate-500">Today's Status</p>
                <p
                  className={`font-semibold ${
                    doctorProfile.available ? "text-green-700" : "text-red-700"
                  }`}
                >
                  {doctorProfile.available ? "Available" : "Unavailable"}
                </p>
              </div>
            </div>
          </SidebarCard>

          {/* Contact Card */}
          <SidebarCard title="Location & Contact">
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-slate-400 mt-1 flex-shrink-0" />
                <div>
                  <p className="text-xs text-slate-500">Clinic Location</p>
                  <p className="font-medium text-slate-800">
                    {doctorProfile.clinicLocation}
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-slate-400 mt-1 flex-shrink-0" />
                <div>
                  <p className="text-xs text-slate-500">Phone Number</p>
                  <p className="font-medium text-slate-800">
                    {doctorProfile.phoneNumber}
                  </p>
                </div>
              </div>
            </div>
          </SidebarCard>
        </div>
      </div>
    </div>
  );
};

// Sub-components for a cleaner main component
const Section = ({ title, icon: Icon, children }) => (
  <div>
    <div className="flex items-center gap-3 mb-4">
      <div className="w-10 h-10 bg-slate-100 rounded-lg flex items-center justify-center">
        <Icon className="w-5 h-5 text-slate-600" />
      </div>
      <h2 className="text-xl font-bold text-slate-800">{title}</h2>
    </div>
    <div className="pl-12">{children}</div>
  </div>
);

const SidebarCard = ({ title, children }) => (
  <div className="bg-white p-6 rounded-xl border border-slate-200">
    <h3 className="text-lg font-bold text-slate-900 mb-4">{title}</h3>
    {children}
  </div>
);

const TimelineItem = ({
  icon: Icon,
  title,
  subtitle,
  year,
  isExperience = false,
}) => (
  <div className="pl-8 relative">
    <div className="absolute left-[-9px] top-1 w-4 h-4 bg-blue-700 rounded-full border-2 border-white"></div>
    <div className="flex items-start gap-3">
      <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
        <Icon className="w-5 h-5 text-blue-700" />
      </div>
      <div className="flex-1">
        <h4 className="font-semibold text-slate-800">{title}</h4>
        <p className="text-sm text-slate-500 mt-0.5">{subtitle}</p>
        {year && (
          <p className="text-xs text-slate-400 mt-1">Graduated: {year}</p>
        )}
      </div>
    </div>
  </div>
);

const InfoRow = ({ label, value, icon: Icon, isBold = false }) => (
  <div className="flex items-center justify-between py-3">
    <dt className="text-sm text-slate-500 flex items-center gap-2">
      {Icon && <Icon className="w-4 h-4" />}
      {label}
    </dt>
    <dd
      className={`text-sm text-slate-900 ${
        isBold ? "font-bold text-base" : "font-medium"
      }`}
    >
      {value}
    </dd>
  </div>
);

export default DoctorProfile;
