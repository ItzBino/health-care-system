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
  Share2
} from "lucide-react";

const DoctorDetails = () => {
  const { docId } = useParams();
  const navigate = useNavigate();
  const { doctor, setDoctor } = useContext(UserContext);
  const [activeTab, setActiveTab] = useState("overview");
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
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-32 h-32 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
            <Stethoscope className="w-16 h-16 text-gray-400" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">No Doctor Found</h2>
          <p className="text-gray-600 mb-6">The doctor you're looking for doesn't exist.</p>
          <button
            onClick={() => navigate("/doctors")}
            className="bg-blue-600 text-white px-6 py-3 rounded-xl hover:bg-blue-700 transition-colors font-semibold"
          >
            Browse All Doctors
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Back Navigation */}
      <div className="bg-white border-b sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
          >
            <ChevronLeft className="w-5 h-5" />
            <span className="font-medium">Back</span>
          </button>
        </div>
      </div>

      {/* Hero Section with Doctor Info */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700">
        <div className="max-w-7xl mx-auto px-4 py-8 md:py-12">
          <div className="flex flex-col md:flex-row items-center md:items-start gap-6 md:gap-8">
            {/* Doctor Image */}
            <div className="relative">
              <img
                src={doctorInfo.user.image || "/default-doctor.png"}
                alt={doctorInfo.user.name}
                className="w-32 h-32 md:w-40 md:h-40 rounded-full object-cover border-4 border-white shadow-xl"
              />
              <div className="absolute bottom-2 right-2 w-6 h-6 bg-green-500 rounded-full border-2 border-white"></div>
            </div>

            {/* Doctor Basic Info */}
            <div className="flex-1 text-center md:text-left">
              <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
                {doctorInfo.user.name}
              </h1>
              <p className="text-xl text-blue-100 mb-3">{doctorInfo.specialization}</p>
              
              {/* Quick Stats */}
              <div className="flex flex-wrap justify-center md:justify-start gap-4 mb-4">
                <div className="flex items-center gap-2 text-white/90">
                  <Briefcase className="w-5 h-5" />
                  <span>{doctorInfo.experienceYears || "10"}+ Years</span>
                </div>
                <div className="flex items-center gap-2 text-white/90">
                  <Award className="w-5 h-5" />
                  <span>License: {doctorInfo.licenseNumber}</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-3 justify-center md:justify-start">
                <NavLink to={`/booking/${docId}`}>
                  <button className="bg-white text-blue-600 px-6 py-3 rounded-xl font-semibold hover:bg-blue-50 transition-colors flex items-center gap-2 shadow-lg">
                    <Calendar className="w-5 h-5" />
                    Book Appointment
                  </button>
                </NavLink>
                <button className="bg-white/20 backdrop-blur text-white px-6 py-3 rounded-xl font-semibold hover:bg-white/30 transition-colors flex items-center gap-2">
                  <MessageCircle className="w-5 h-5" />
                  Message
                </button>
                <button className="bg-white/20 backdrop-blur text-white px-4 py-3 rounded-xl font-semibold hover:bg-white/30 transition-colors">
                  <Heart className="w-5 h-5" />
                </button>
                <button className="bg-white/20 backdrop-blur text-white px-4 py-3 rounded-xl font-semibold hover:bg-white/30 transition-colors">
                  <Share2 className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Quick Contact Card */}
            <div className="bg-white/10 backdrop-blur rounded-xl p-4 text-white min-w-[250px]">
              <h3 className="font-semibold mb-3">Quick Info</h3>
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2">
                  <DollarSign className="w-4 h-4" />
                  <span>Consultation: ${doctorInfo.fees || "150"}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  <span>{doctorInfo.clinicLocation || "New York, NY"}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4" />
                  <span className="truncate">{doctorInfo.user.email}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs Navigation */}
      <div className="bg-white border-b sticky top-[57px] z-10">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex gap-8 overflow-x-auto">
            {["overview", "education"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`py-4 px-2 capitalize font-medium border-b-2 transition-colors whitespace-nowrap ${
                  activeTab === tab
                    ? "border-blue-600 text-blue-600"
                    : "border-transparent text-gray-600 hover:text-gray-900"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Overview Tab */}
            {activeTab === "overview" && (
              <>
                {/* About Section */}
                <div className="bg-white rounded-xl shadow-md p-6">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <Stethoscope className="w-6 h-6 text-blue-600" />
                    About Doctor
                  </h2>
                  <p className="text-gray-600 leading-relaxed">
                    {doctorInfo.bio || 
                    `Dr. ${doctorInfo.user.name} is a highly experienced ${doctorInfo.specialization} with over ${doctorInfo.experienceYears || '10'} years of practice. 
                    Dedicated to providing comprehensive healthcare services with a patient-centered approach. 
                    Known for exceptional diagnostic skills and compassionate care.`}
                  </p>
                </div>


                {/* Services Offered */}
                <div className="bg-white rounded-xl shadow-md p-6">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">Services Offered</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {[
                      "Health Checkups",
                      "Vaccination",
                      "Minor Surgeries",
                      "Lab Tests",
                      "X-Ray & Imaging",
                      "Telemedicine"
                    ].map((service, idx) => (
                      <div key={idx} className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg">
                        <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                        <span className="text-gray-700">{service}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </>
            )}

            {/* Education Tab */}
            {activeTab === "education" && (
              <div className="bg-white rounded-xl shadow-md p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                  <GraduationCap className="w-6 h-6 text-blue-600" />
                  Education & Qualifications
                </h2>
                <div className="space-y-4">
                  {doctorInfo.education && doctorInfo.education.length > 0 ? (
                    doctorInfo.education.map((edu, idx) => (
                      <div key={idx} className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg">
                        <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                          <GraduationCap className="w-6 h-6 text-blue-600" />
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-900">{edu.degree}</h4>
                          <p className="text-gray-600">{edu.college}</p>
                          <span className="text-sm text-gray-500">{edu.passoutYear}</span>
                        </div>
                      </div>
                    ))
                  ) : (
                   
                      <div key={idx} className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg">
                       <p>Not Provided</p>
                      </div>
                    )}
                  
                </div>
                  
              </div>
                  )}
          </div>

          {/* Right Sidebar */}
          <div className="space-y-6">
            {/* Booking Card */}
            <div className="bg-white rounded-xl shadow-md p-6 sticky top-[130px]">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Book Appointment</h3>
              <div className="space-y-4">
                <div className="p-4 bg-blue-50 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-gray-700">Consultation Fee</span>
                    <span className="text-2xl font-bold text-blue-600">${doctorInfo.fees || "150"}</span>
                  </div>
                  <span className="text-sm text-gray-600">Per session</span>
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-gray-600">
                    <Clock className="w-5 h-5" />
                    <span>{doctorInfo.available ? "Available Today 10 AM - 8:30 PM book before slot gets booked" : "Not Available"} </span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <Building className="w-5 h-5" />
                    <span>In-Clinic & Video Consultation</span>
                  </div>
                </div>

                <NavLink to={`/booking/${docId}`} className="block">
                  <button className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-3 rounded-xl font-semibold hover:from-blue-700 hover:to-blue-800 transition-all shadow-lg">
                    Book Now
                  </button>
                </NavLink>
              </div>
            </div>

            {/* Contact Info */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Contact Information</h3>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-gray-400 mt-1" />
                  <div>
                    <p className="font-medium text-gray-900">Clinic Address</p>
                    <p className="text-gray-600 text-sm">{doctorInfo.clinicLocation || "123 Medical Center, New York, NY 10001"}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Mail className="w-5 h-5 text-gray-400 mt-1" />
                  <div>
                    <p className="font-medium text-gray-900">Email</p>
                    <p className="text-gray-600 text-sm">{doctorInfo.user.email}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Phone className="w-5 h-5 text-gray-400 mt-1" />
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