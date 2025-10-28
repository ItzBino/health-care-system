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
  ChevronLeft,
  CheckCircle,
  GraduationCap,
  Stethoscope,
  Building,
  Heart,
  MessageCircle,
  Share2,
  Star,
  Users,
  Shield,
  Activity,
  Video,
  User
} from "lucide-react";

const DoctorDetails = () => {
  const { docId } = useParams();
  const navigate = useNavigate();
  const { doctor, setDoctor } = useContext(UserContext);
  const [activeTab, setActiveTab] = useState("overview");
  const [isLiked, setIsLiked] = useState(false);
  const doctorInfo = doctor.find((doc) => doc.user._id === docId);
  
  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  const formatTime = (time24) => {
    if (!time24) return "";
    const [hour, minute] = time24.split(":").map(Number);
    const ampm = hour >= 12 ? "PM" : "AM";
    const hour12 = hour % 12 || 12;
    return `${hour12}:${minute.toString().padStart(2, "0")} ${ampm}`;
  };

  if (!doctorInfo) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center p-4">
        <div className="text-center animate-fadeIn">
          <div className="w-32 h-32 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full flex items-center justify-center mx-auto mb-6 animate-pulse">
            <Stethoscope className="w-16 h-16 text-blue-500" />
          </div>
          <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-3">
            No Doctor Found
          </h2>
          <p className="text-gray-600 mb-8 max-w-md mx-auto">
            The doctor you're looking for doesn't exist or may have been removed.
          </p>
          <button
            onClick={() => navigate("/doctors")}
            className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-3 rounded-full hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-300 font-semibold"
          >
            Browse All Doctors
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50">

      {/* Hero Section with Doctor Info */}
      <div className="relative bg-gradient-to-br from-blue-600 via-blue-700 to-purple-700 overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute -top-24 -right-24 w-96 h-96 bg-white rounded-full blur-3xl"></div>
          <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-purple-300 rounded-full blur-3xl"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
          <div className="flex flex-col lg:flex-row items-center lg:items-start gap-6 lg:gap-10">
            {/* Doctor Image */}
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-400 to-purple-400 rounded-full blur-xl opacity-50 group-hover:opacity-75 transition-opacity duration-300"></div>
              <img
                src={doctorInfo.user.image || "/default-doctor.png"}
                alt={doctorInfo.user.name}
                className="relative w-36 h-36 lg:w-44 lg:h-44 rounded-full object-cover border-4 border-white shadow-2xl transform group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute bottom-3 right-3 w-8 h-8 bg-green-500 rounded-full border-3 border-white flex items-center justify-center">
                <div className="w-3 h-3 bg-white rounded-full animate-pulse"></div>
              </div>
            </div>

            {/* Doctor Basic Info */}
            <div className="flex-1 text-center lg:text-left animate-fadeIn">
              <div className="flex items-center justify-center lg:justify-start gap-3 mb-3">
                <h1 className="text-3xl lg:text-4xl font-bold text-white">
                  {doctorInfo.user.name}
                </h1>
                {doctorInfo.verificationStatus === 'VERIFIED' && (
                  <div className="bg-green-500/20 backdrop-blur-sm border border-green-300/50 px-3 py-1 rounded-full flex items-center gap-1">
                    <Shield className="w-4 h-4 text-white" />
                    <span className="text-xs text-white font-medium">Verified</span>
                  </div>
                )}
              </div>
              
              <p className="text-xl text-blue-100 mb-1">{doctorInfo.specialization}</p>
              
              {/* Quick Stats */}
              <div className="flex flex-wrap justify-center lg:justify-start gap-4 lg:gap-6 mb-6">
                <div className="flex items-center gap-2 text-white/90 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full">
                  <Briefcase className="w-5 h-5" />
                  <span className="font-medium">{doctorInfo.experienceYears || "10"}+ Years</span>
                </div>
                <div className="flex items-center gap-2 text-white/90 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full">
                  <Users className="w-5 h-5" />
                  <span className="font-medium">2000+ Patients</span>
                </div>
                <div className="flex items-center gap-2 text-white/90 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full">
                  <Award className="w-5 h-5" />
                  <span className="font-medium">License: {doctorInfo.licenseNumber}</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-3 justify-center lg:justify-start">
                <NavLink to={`/booking/${docId}`}>
                  <button className="bg-white text-blue-600 px-6 py-3 rounded-full font-semibold hover:bg-blue-50 hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-300 flex items-center gap-2 shadow-lg">
                    <Calendar className="w-5 h-5" />
                    Book Appointment
                  </button>
                </NavLink>
                <button className="bg-white/20 backdrop-blur-sm border border-white/30 text-white px-6 py-3 rounded-full font-semibold hover:bg-white/30 transition-all duration-300 flex items-center gap-2">
                  <Video className="w-5 h-5" />
                  Video Consult
                </button>
                <button className="bg-white/20 backdrop-blur-sm border border-white/30 text-white px-4 py-3 rounded-full hover:bg-white/30 transition-all duration-300">
                  <Share2 className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Quick Contact Card */}
            <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-5 text-white min-w-[280px] transform hover:scale-105 transition-transform duration-300">
              <h3 className="font-semibold mb-4 text-lg">Quick Info</h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3 bg-white/10 rounded-lg p-2">
                  <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
                    <DollarSign className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs text-white/70">Consultation Fee</p>
                    <p className="font-bold text-lg">${doctorInfo.fees || "150"}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <MapPin className="w-5 h-5 text-white/70" />
                  <span className="text-sm">{doctorInfo.clinicLocation || "New York, NY"}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Clock className="w-5 h-5 text-white/70" />
                  <span className="text-sm">Mon - Sat, 10:00 AM - 8:00 PM</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs Navigation */}
      <div className="bg-white/80 backdrop-blur-md border-b sticky top-[57px] z-10 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex gap-2 sm:gap-8 overflow-x-auto scrollbar-hide">
            {["overview", "education", "availability"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`py-4 px-4 capitalize font-medium border-b-3 transition-all duration-300 whitespace-nowrap relative ${
                  activeTab === tab
                    ? "border-blue-600 text-blue-600"
                    : "border-transparent text-gray-600 hover:text-gray-900"
                }`}
              >
                {tab}
                {activeTab === tab && (
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-600 to-purple-600"></div>
                )}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Overview Tab */}
            {activeTab === "overview" && (
              <>
                {/* About Section */}
                <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 p-6 lg:p-8 animate-fadeInUp">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-3">
                    <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                      <User className="w-6 h-6 text-blue-600" />
                    </div>
                    About Doctor
                  </h2>
                  <p className="text-gray-600 leading-relaxed text-lg">
                    {doctorInfo.bio || 
                    `Dr. ${doctorInfo.user.name} is a highly experienced ${doctorInfo.specialization} with over ${doctorInfo.experienceYears || '10'} years of practice. 
                    Dedicated to providing comprehensive healthcare services with a patient-centered approach. 
                    Known for exceptional diagnostic skills and compassionate care.`}
                  </p>
                </div>

                {/* Specializations */}
                <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 p-6 lg:p-8 animate-fadeInUp animation-delay-100">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                    <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                      <Activity className="w-6 h-6 text-purple-600" />
                    </div>
                    Specializations
                  </h2>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {[
                      "General Medicine",
                      "Cardiology",
                      "Diabetes Care",
                      "Hypertension",
                      "Preventive Care",
                      "Emergency Medicine"
                    ].map((spec, idx) => (
                      <div key={idx} className="bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-100 rounded-xl p-3 text-center hover:shadow-md transform hover:-translate-y-0.5 transition-all duration-300">
                        <span className="text-gray-700 font-medium">{spec}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Services Offered */}
                <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 p-6 lg:p-8 animate-fadeInUp animation-delay-200">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                    <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                      <Stethoscope className="w-6 h-6 text-green-600" />
                    </div>
                    Services Offered
                  </h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {[
                      { icon: CheckCircle, name: "Health Checkups", desc: "Comprehensive health screening" },
                      { icon: Shield, name: "Vaccination", desc: "All types of vaccines available" },
                      { icon: Activity, name: "Minor Surgeries", desc: "Outpatient procedures" },
                      { icon: Activity, name: "Lab Tests", desc: "Blood tests, urine tests, etc." },
                      { icon: Activity, name: "X-Ray & Imaging", desc: "Digital X-ray and ultrasound" },
                      { icon: Video, name: "Telemedicine", desc: "Online consultation available" }
                    ].map((service, idx) => (
                      <div key={idx} className="flex items-start gap-4 p-4 bg-gray-50 rounded-xl hover:bg-blue-50 transition-colors duration-300 group">
                        <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center shadow-sm group-hover:shadow-md transition-shadow duration-300">
                          <service.icon className="w-5 h-5 text-blue-600" />
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-900">{service.name}</h4>
                          <p className="text-sm text-gray-600">{service.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </>
            )}

            {/* Education Tab */}
            {activeTab === "education" && (
              <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 p-6 lg:p-8 animate-fadeInUp">
                <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                  <div className="w-10 h-10 bg-indigo-100 rounded-lg flex items-center justify-center">
                    <GraduationCap className="w-6 h-6 text-indigo-600" />
                  </div>
                  Education & Qualifications
                </h2>
                <div className="space-y-4">
                  {doctorInfo.education && doctorInfo.education.length > 0 ? (
                    doctorInfo.education.map((edu, idx) => (
                      <div key={idx} className="flex items-start gap-4 p-5 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl hover:shadow-md transform hover:-translate-y-0.5 transition-all duration-300">
                        <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-purple-500 rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg">
                          <GraduationCap className="w-7 h-7 text-white" />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-bold text-gray-900 text-lg">{edu.degree}</h4>
                          <p className="text-gray-700 font-medium">{edu.college}</p>
                          <div className="flex items-center gap-2 mt-2">
                            <Calendar className="w-4 h-4 text-gray-500" />
                            <span className="text-sm text-gray-600">Graduated: {edu.passoutYear}</span>
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-8">
                      <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <GraduationCap className="w-10 h-10 text-gray-400" />
                      </div>
                      <p className="text-gray-500">Education details not provided</p>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Availability Tab */}
            {activeTab === "availability" && (
              <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 p-6 lg:p-8 animate-fadeInUp">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Weekly Schedule</h2>
                <div className="space-y-3">
                  {days.map((day) => (
                    <div key={day} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-blue-50 transition-colors duration-300">
                      <span className="font-medium text-gray-900">{day}</span>
                      <span className="text-gray-600">10:00 AM - 8:00 PM</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right Sidebar */}
          <div className="space-y-6">
            {/* Booking Card */}
            <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 p-6 sticky top-[130px]">
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                <span className="bg-gradient-to-r from-blue-600 to-purple-600 text-white text-xs px-4 py-1 rounded-full font-semibold">
                  Available Today
                </span>
              </div>
              
              <h3 className="text-xl font-bold text-gray-900 mb-6 mt-3">Book Appointment</h3>
              <div className="space-y-4">
                <div className="p-5 bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl border border-blue-100">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-gray-700 font-medium">Consultation Fee</span>
                    <div className="text-right">
                      <span className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                        ${doctorInfo.fees || "150"}
                      </span>
                      <p className="text-xs text-gray-600">Per session</p>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg">
                    <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                      <Clock className="w-5 h-5 text-green-600" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900 text-sm">Next Available</p>
                      <p className="text-xs text-gray-600">Today, 2:30 PM</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg">
                    <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                      <Building className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900 text-sm">Consultation Mode</p>
                      <p className="text-xs text-gray-600">In-Clinic & Video Call</p>
                    </div>
                  </div>
                </div>

                <NavLink to={`/booking/${docId}`} className="block">
                  <button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-4 rounded-xl font-semibold hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-300 flex items-center justify-center gap-2">
                    <Calendar className="w-5 h-5" />
                    Book Appointment Now
                  </button>
                </NavLink>
                
                <button className="w-full bg-gray-100 text-gray-700 py-3 rounded-xl font-medium hover:bg-gray-200 transition-colors duration-300 flex items-center justify-center gap-2">
                  <MessageCircle className="w-5 h-5" />
                  Send Message
                </button>
              </div>
            </div>

            {/* Contact Info */}
            <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-5">Contact Information</h3>
              <div className="space-y-4">
                <div className="flex items-start gap-3 group">
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center group-hover:bg-blue-200 transition-colors duration-300">
                    <MapPin className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">Clinic Address</p>
                    <p className="text-gray-600 text-sm">{doctorInfo.clinicLocation || "123 Medical Center, New York, NY 10001"}</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3 group">
                  <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center group-hover:bg-purple-200 transition-colors duration-300">
                    <Mail className="w-5 h-5 text-purple-600" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">Email</p>
                    <p className="text-gray-600 text-sm break-all">{doctorInfo.user.email}</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3 group">
                  <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center group-hover:bg-green-200 transition-colors duration-300">
                    <Phone className="w-5 h-5 text-green-600" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">Phone</p>
                    <p className="text-gray-600 text-sm">{doctorInfo.phoneNumber || "+1 (555) 123-4567"}</p>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorDetails;