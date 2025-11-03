import React, { useState, useContext, useEffect } from "react";
import { DoctorContext } from "../../context/DoctorContext";
import {
  Edit3 as EditIcon,
  User,
  GraduationCap,
  ShieldCheck,
  Lock,
  MapPin,
  Phone,
  FileText,
  Briefcase,
  Tag,
  Award,
  Building,
  CheckCircle,
} from "lucide-react";

// Import the new Form Content Component
import DoctorProfileFormContent from "./DoctorProfileFormContent"; 
import { toast } from "react-toastify";


// DisplayProfile Component (remains unchanged)
const DisplayProfile = ({ doctorProfile, onEdit }) => {
  if (!doctorProfile)
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <p className="text-gray-500 italic text-lg">No profile data found.</p>
      </div>
    );

  return (
   <div className="space-y-6 sm:space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b pb-4 mb-6">
        <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-800 flex items-center gap-2">
          <User className="w-6 h-6 text-blue-600" />
          Doctor Profile
        </h2>
        <button
          onClick={onEdit}
          className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-all duration-200 shadow-sm hover:shadow-md w-full sm:w-auto justify-center"
        >
          <EditIcon className="w-4 h-4" /> Edit Profile
        </button>
      </div>

      {/* Basic Information */}
      <section className="bg-gray-50 rounded-xl p-4 sm:p-6">
        <h3 className="text-lg sm:text-xl font-semibold flex items-center gap-2 text-gray-700 mb-4">
          <FileText className="w-5 h-5 text-gray-600" />
          Basic Information
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-1">
            <p className="text-sm text-gray-500 flex items-center gap-1">
              <Tag className="w-4 h-4 text-gray-400" /> Specialization
            </p>
            <p className="font-medium text-gray-800">{doctorProfile.specialization || "Not specified"}</p>
          </div>

          <div className="space-y-1">
            <p className="text-sm text-gray-500 flex items-center gap-1">
              <Award className="w-4 h-4 text-gray-400" /> License Number
            </p>
            <p className="font-medium text-gray-800">{doctorProfile.licenseNumber || "Not provided"}</p>
          </div>

          <div className="space-y-1">
            <p className="text-sm text-gray-500 flex items-center gap-1">
              <MapPin className="w-4 h-4 text-gray-400" /> Clinic Location
            </p>
            <p className="font-medium text-gray-800">{doctorProfile.clinicLocation || "Not specified"}</p>
          </div>

          <div className="space-y-1">
            <p className="text-sm text-gray-500 flex items-center gap-1">
              <Phone className="w-4 h-4 text-gray-400" /> Phone Number
            </p>
            <p className="font-medium text-gray-800">{doctorProfile.phoneNumber || "Not provided"}</p>
          </div>

          <div className="space-y-1 md:col-span-2">
            <p className="text-sm text-gray-500 flex items-center gap-1">
              <FileText className="w-4 h-4 text-gray-400" /> Bio
            </p>
            <p className="font-medium text-gray-800">{doctorProfile.bio || "No bio provided"}</p>
          </div>

          <div className="space-y-1">
            <p className="text-sm text-gray-500 flex items-center gap-1">
              <Tag className="w-4 h-4 text-gray-400" /> Consultation Fees
            </p>
            <p className="font-medium text-gray-800 text-lg">
              ₹{doctorProfile.fees || "0"}
            </p>
          </div>

          <div className="space-y-1">
            <p className="text-sm text-gray-500 flex items-center gap-1">
              <Briefcase className="w-4 h-4 text-gray-400" /> Experience
            </p>
            <p className="font-medium text-gray-800">
              {doctorProfile.experienceYears
                ? `${doctorProfile.experienceYears} years`
                : "Not specified"}
            </p>
          </div>
        </div>
      </section>

      {/* Education */}
      {doctorProfile.education?.length > 0 && (
        <section className="bg-blue-50 rounded-xl p-4 sm:p-6">
          <h3 className="text-lg sm:text-xl font-semibold flex items-center gap-2 text-gray-700 mb-4">
            <GraduationCap className="w-5 h-5 text-blue-600" />
            Education
          </h3>
          <div className="space-y-3">
            {doctorProfile.education.map((edu, i) => (
              <div key={i} className="bg-white rounded-lg p-3 sm:p-4 shadow-sm border">
                <p className="font-semibold text-gray-800">{edu.degree}</p>
                <p className="text-gray-600 text-sm sm:text-base flex items-center gap-2">
                  <Building className="w-4 h-4 text-gray-400" />
                  {edu.college} • {edu.passoutYear}
                </p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Insurance */}
      {doctorProfile.insurance?.length > 0 && (
        <section className="bg-green-50 rounded-xl p-4 sm:p-6">
          <h3 className="text-lg sm:text-xl font-semibold flex items-center gap-2 text-gray-700 mb-4">
            <ShieldCheck className="w-5 h-5 text-green-600" />
            Insurance Providers
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {doctorProfile.insurance.map((provider, i) => (
              <div
                key={i}
                className="bg-white rounded-lg px-4 py-2 shadow-sm border flex items-center gap-2"
              >
                <CheckCircle className="w-4 h-4 text-green-500" />
                <p className="text-gray-700">{provider}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Verification Status */}
      {doctorProfile.verificationStatus && (
        <section className="bg-purple-50 rounded-xl p-4 sm:p-6">
          <h3 className="text-lg sm:text-xl font-semibold flex items-center gap-2 text-gray-700 mb-2">
            <Lock className="w-5 h-5 text-purple-600" />
            Verification Status
          </h3>
          <p className="text-gray-600 font-medium">
            {doctorProfile.verificationStatus}
          </p>
        </section>
      )}
    </div>
  );
};

// DoctorProfileForm Component (state and logic)
const DoctorProfileForm = () => {
  const {
    createDoctorProfile,
    doctorProfile,
    loading,
    hasProfile,
    editMode,
    setEditMode,
  } = useContext(DoctorContext);

  const [formData, setFormData] = useState({
    specialization: "",
    licenseNumber: "",
    clinicLocation: "",
    fees: "",
    experienceYears: "",
    bio: "",
    phoneNumber: "",
    education: [{ degree: "", college: "", passoutYear: "" }],
    insurance: [""],
  });

  const [isInitialized, setIsInitialized] = useState(false);
  const [saving, setSaving] = useState(false);


  useEffect(() => {
    if (doctorProfile && hasProfile && !isInitialized) {
      setFormData({
        specialization: doctorProfile.specialization || "",
        licenseNumber: doctorProfile.licenseNumber || "",
        clinicLocation: doctorProfile.clinicLocation || "",
        fees: doctorProfile.fees || "",
        experienceYears: doctorProfile.experienceYears || "",
        bio: doctorProfile.bio || "",
        phoneNumber: doctorProfile.phoneNumber || "",
        education: doctorProfile.education?.length
          ? doctorProfile.education
          : [{ degree: "", college: "", passoutYear: "" }],
        insurance: doctorProfile.insurance?.length
          ? doctorProfile.insurance
          : [""],
      });
      setIsInitialized(true);
    }
  }, [doctorProfile, hasProfile, isInitialized]);



  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleEducationChange = (index, field, value) => {
    const updated = [...formData.education];
    updated[index][field] = value;
    setFormData((prev) => ({ ...prev, education: updated }));
  };

  const addEducation = () => {
    setFormData((prev) => ({
      ...prev,
      education: [
        ...prev.education,
        { degree: "", college: "", passoutYear: "" },
      ],
    }));
  };

  const removeEducation = (index) => {
    const updated = formData.education.filter((_, i) => i !== index);
    setFormData((prev) => ({ ...prev, education: updated }));
  };

  const handleInsuranceChange = (index, value) => {
    const updated = [...formData.insurance];
    updated[index] = value;
    setFormData((prev) => ({ ...prev, insurance: updated }));
  };

  const addInsurance = () => {
    setFormData((prev) => ({ ...prev, insurance: [...prev.insurance, ""] }));
  };

  const removeInsurance = (index) => {
    const updated = formData.insurance.filter((_, i) => i !== index);
    setFormData((prev) => ({ ...prev, insurance: updated }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setSaving(true);
      await createDoctorProfile(formData);
      toast.success("Profile saved successfully");
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Error saving profile");
    } finally {
      setSaving(false);
    }
  };


  // Consolidate all the props for the Form Content component
  const formProps = {
    formData,
    handleChange,
    handleEducationChange,
    addEducation,
    removeEducation,
    handleInsuranceChange,
    addInsurance,
    removeInsurance,
    handleSubmit,
    saving,
    setEditMode,
    hasProfile,
    editMode,
  };


  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 py-4 sm:py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white rounded-xl sm:rounded-2xl shadow-lg p-4 sm:p-6 lg:p-8">
          {/* Title for mobile */}
          {!hasProfile && (
            <div className="mb-6 pb-4 border-b">
              <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-800">
                Create Your Doctor Profile
              </h1>
              <p className="text-gray-600 mt-2 text-sm sm:text-base">
                Fill in your professional details to complete your profile
              </p>
            </div>
          )}

          {hasProfile ? (
            editMode ? (
              // Use the external component here, passing all props
              <DoctorProfileFormContent {...formProps} />
            ) : (
              <DisplayProfile
                doctorProfile={doctorProfile}
                onEdit={() => setEditMode(true)}
              />
            )
          ) : (
            // Use the external component here too
            <DoctorProfileFormContent {...formProps} />
          )}
        </div>
      </div>
    </div>
  );
};

export default DoctorProfileForm;