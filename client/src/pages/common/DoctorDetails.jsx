import React, { useContext, useState } from "react";
import { useParams, useNavigate, NavLink } from "react-router-dom";
import { UserContext } from "../../context/UserContext";
import {
  MapPin,
  Mail,
  Phone,
  Clock,
  Calendar,
  Award,
  Briefcase,
  DollarSign,
  CheckCircle,
  GraduationCap,
  Stethoscope,
  Building,
  Info,
  Shield,
  Video,
  User,
} from "lucide-react";

// Main Component
const DoctorDetails = () => {
  const { docId } = useParams();
  const navigate = useNavigate();
  const { doctor } = useContext(UserContext); // Removed setDoctor as it's not used
  const [activeTab, setActiveTab] = useState("overview");

  // Find the specific doctor from the context array
  const doctorInfo = doctor.find((doc) => doc.user._id === docId);

  // Hardcoded days array for the schedule
  const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

  // "Doctor Not Found" state
  if (!doctorInfo) {
    return (
      <div className="min-h-screen bg-slate-100 flex items-center justify-center p-4">
        <div className="text-center bg-white p-10 rounded-2xl shadow-md border border-slate-200">
          <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Stethoscope className="w-10 h-10 text-slate-400" />
          </div>
          <h2 className="text-2xl font-bold text-slate-800 mb-2">Doctor Not Found</h2>
          <p className="text-slate-500 mb-6 max-w-sm">
            The profile you are looking for could not be found. It may have been moved or deleted.
          </p>
          <button
            onClick={() => navigate("/doctors")}
            className="bg-blue-700 text-white px-6 py-2.5 rounded-lg font-semibold hover:bg-blue-800 transition-colors"
          >
            Browse All Doctors
          </button>
        </div>
      </div>
    );
  }

  // Main component render
  return (
    <div className="min-h-screen bg-slate-100">
      {/* Hero Section */}
      <div className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
            <img
              src={doctorInfo.user.image || "/default-doctor.png"}
              alt={doctorInfo.user.name}
              className="w-28 h-28 lg:w-32 lg:h-32 rounded-full object-cover ring-4 ring-slate-100"
            />
            <div className="flex-1">
              <div className="flex items-center gap-3">
                <h1 className="text-2xl lg:text-3xl font-bold text-slate-900">{doctorInfo.user.name}</h1>
                {doctorInfo.verificationStatus === 'VERIFIED' && (
                  <div className="bg-green-100 text-green-800 px-2.5 py-1 rounded-full flex items-center gap-1.5">
                    <Shield className="w-4 h-4" />
                    <span className="text-xs font-semibold">Verified</span>
                  </div>
                )}
              </div>
              <p className="text-lg text-slate-600 mt-1">{doctorInfo.specialization}</p>
              <div className="mt-3 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-slate-500">
                <span className="flex items-center gap-1.5"><Briefcase className="w-4 h-4" /> {doctorInfo.experienceYears || "10"}+ Years Experience</span>
                <span className="flex items-center gap-1.5"><Award className="w-4 h-4" /> License: {doctorInfo.licenseNumber}</span>
                <span className="flex items-center gap-1.5"><User className="w-4 h-4" /> 2000+ Patients Treated</span>
              </div>
            </div>
            <div className="w-full md:w-auto flex flex-col sm:flex-row gap-3">
              <NavLink to={`/booking/${docId}`} className="w-full">
                <button className="w-full bg-blue-700 text-white px-5 py-2.5 rounded-lg font-semibold hover:bg-blue-800 transition-colors flex items-center justify-center gap-2">
                  <Calendar className="w-4 h-4" /> Book Appointment
                </button>
              </NavLink>
              <button className="w-full bg-slate-100 text-slate-700 font-semibold px-5 py-2.5 rounded-lg hover:bg-slate-200 transition-colors flex items-center justify-center gap-2">
                <Video className="w-4 h-4" /> Video Consult
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="bg-white sticky top-16 z-10 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex gap-6 overflow-x-auto">
            {["overview", "education", "availability"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`py-4 px-1 capitalize font-semibold border-b-2 transition-colors
                  ${activeTab === tab ? "border-blue-700 text-blue-700" : "border-transparent text-slate-500 hover:text-slate-800"}`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>
      </div>
      
      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-8">
            {activeTab === "overview" && (
              <>
                <Section title="About Doctor" icon={Info}>
                  <p className="text-slate-600 leading-relaxed">
                    {doctorInfo.bio || `Dr. ${doctorInfo.user.name} is a highly experienced ${doctorInfo.specialization} with over ${doctorInfo.experienceYears || '10'} years of practice. Dedicated to providing comprehensive healthcare services with a patient-centered approach.`}
                  </p>
                </Section>
                <Section title="Specializations" icon={Stethoscope}>
                  <div className="flex flex-wrap gap-2">
                    {["General Medicine", "Cardiology", "Diabetes Care", "Hypertension", "Preventive Care"].map((spec) => (
                      <span key={spec} className="px-3 py-1.5 bg-slate-100 text-slate-700 rounded-full text-sm font-medium">{spec}</span>
                    ))}
                  </div>
                </Section>
              </>
            )}

            {activeTab === "education" && (
              <Section title="Education & Qualifications" icon={GraduationCap}>
                <div className="relative border-l-2 border-slate-200 ml-3 py-3 space-y-8">
                  {doctorInfo.education && doctorInfo.education.length > 0 ? (
                    doctorInfo.education.map((edu, idx) => (
                      <TimelineItem key={idx} title={edu.degree} subtitle={edu.college} year={edu.passoutYear} />
                    ))
                  ) : <p className="pl-8 text-slate-500 italic">Education details not provided.</p>}
                </div>
              </Section>
            )}

            {activeTab === "availability" && (
              <Section title="Weekly Schedule" icon={Clock}>
                <div className="space-y-2">
                  {days.map((day) => (
                    <div key={day} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                      <span className="font-medium text-slate-800">{day}</span>
                      <span className="text-slate-600">10:00 AM - 08:00 PM</span>
                    </div>
                  ))}
                </div>
              </Section>
            )}
          </div>

          {/* Right Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            <SidebarCard title="Consultation & Booking">
              <div className="flex items-center justify-between mb-4 pb-4 border-b border-slate-100">
                <span className="text-slate-500 font-medium">Consultation Fee</span>
                <span className="text-2xl font-bold text-slate-900">${doctorInfo.fees || "150"}</span>
              </div>
              <div className="space-y-3 mb-4">
                <div className="flex items-center gap-3"><Clock className="w-5 h-5 text-blue-700" /> <p className="text-slate-700"><span className="font-semibold">Next Available:</span> Today, 2:30 PM</p></div>
                <div className="flex items-center gap-3"><Building className="w-5 h-5 text-blue-700" /> <p className="text-slate-700">In-Clinic & Video Call</p></div>
              </div>
              <NavLink to={`/booking/${docId}`} className="block">
                <button className="w-full bg-blue-700 text-white py-3 rounded-lg font-semibold hover:bg-blue-800 transition-colors">
                  Book Now
                </button>
              </NavLink>
            </SidebarCard>

            <SidebarCard title="Contact Information">
              <div className="space-y-4">
                <ContactItem icon={MapPin} label="Clinic Address" value={doctorInfo.clinicLocation || "123 Medical Center, New York, NY 10001"} />
                <ContactItem icon={Mail} label="Email" value={doctorInfo.user.email} />
                <ContactItem icon={Phone} label="Phone" value={doctorInfo.phoneNumber || "+1 (555) 123-4567"} />
              </div>
            </SidebarCard>
          </div>
        </div>
      </div>
    </div>
  );
};

// --- Reusable Sub-components for a clean structure ---

const Section = ({ title, icon: Icon, children }) => (
  <div className="bg-white p-6 rounded-xl border border-slate-200">
    <div className="flex items-center gap-3 mb-5">
      <div className="w-10 h-10 bg-slate-100 rounded-lg flex items-center justify-center">
        <Icon className="w-5 h-5 text-slate-600" />
      </div>
      <h2 className="text-xl font-bold text-slate-800">{title}</h2>
    </div>
    {children}
  </div>
);

const SidebarCard = ({ title, children }) => (
  <div className="bg-white p-6 rounded-xl border border-slate-200 sticky top-36">
    <h3 className="text-lg font-bold text-slate-900 mb-4">{title}</h3>
    {children}
  </div>
);

const TimelineItem = ({ title, subtitle, year }) => (
  <div className="pl-8 relative">
    <div className="absolute left-[-9px] top-1 w-4 h-4 bg-blue-700 rounded-full border-2 border-white"></div>
    <div className="flex items-start gap-3">
      <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
        <GraduationCap className="w-5 h-5 text-blue-700" />
      </div>
      <div>
        <h4 className="font-semibold text-slate-800">{title}</h4>
        <p className="text-sm text-slate-500 mt-0.5">{subtitle}</p>
        <p className="text-xs text-slate-400 mt-1">Graduated: {year}</p>
      </div>
    </div>
  </div>
);

const ContactItem = ({ icon: Icon, label, value }) => (
  <div className="flex items-start gap-3">
    <Icon className="w-5 h-5 text-slate-400 mt-1 flex-shrink-0" />
    <div>
      <p className="text-sm text-slate-500">{label}</p>
      <p className="font-medium text-slate-800 break-all">{value}</p>
    </div>
  </div>
);

export default DoctorDetails;