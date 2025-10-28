import React, { useState, useContext, useEffect } from "react";
import { DoctorContext } from "../../context/DoctorContext";
import {
  EditIcon,
  Save,
  X,
  Plus,
  Calendar,
  GraduationCap,
  ShieldCheck,
  Lock,
  User,
} from "lucide-react";

// DisplayProfile Component
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
        <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-800">
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
          <User className="w-5 h-5 text-blue-600" /> Basic Information
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-1">
            <p className="text-sm text-gray-500">Specialization</p>
            <p className="font-medium text-gray-800">{doctorProfile.specialization}</p>
          </div>
          <div className="space-y-1">
            <p className="text-sm text-gray-500">License Number</p>
            <p className="font-medium text-gray-800">{doctorProfile.licenseNumber}</p>
          </div>
          <div className="space-y-1">
            <p className="text-sm text-gray-500">Clinic Location</p>
            <p className="font-medium text-gray-800">{doctorProfile.clinicLocation}</p>
          </div>
          <div className="space-y-1">
            <p className="text-sm text-gray-500">Phone Number</p>
            <p className="font-medium text-gray-800">{doctorProfile.phoneNumber}</p>
          </div>
          <div className="space-y-1 md:col-span-2">
            <p className="text-sm text-gray-500">Bio</p>
            <p className="font-medium text-gray-800">{doctorProfile.bio}</p>
          </div>
          <div className="space-y-1">
            <p className="text-sm text-gray-500">Consultation Fees</p>
            <p className="font-medium text-gray-800 text-lg">₹{doctorProfile.fees}</p>
          </div>
          <div className="space-y-1">
            <p className="text-sm text-gray-500">Experience</p>
            <p className="font-medium text-gray-800">{doctorProfile.experienceYears} years</p>
          </div>
        </div>
      </section>

      {/* Education */}
      {doctorProfile.education?.length > 0 && (
        <section className="bg-blue-50 rounded-xl p-4 sm:p-6">
          <h3 className="text-lg sm:text-xl font-semibold flex items-center gap-2 text-gray-700 mb-4">
            <GraduationCap className="w-5 h-5 text-blue-600" /> Education
          </h3>
          <div className="space-y-3">
            {doctorProfile.education.map((edu, i) => (
              <div key={i} className="bg-white rounded-lg p-3 sm:p-4 shadow-sm">
                <p className="font-semibold text-gray-800">{edu.degree}</p>
                <p className="text-gray-600 text-sm sm:text-base">
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
            <ShieldCheck className="w-5 h-5 text-green-600" /> Insurance Providers
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {doctorProfile.insurance.map((provider, i) => (
              <div key={i} className="bg-white rounded-lg px-4 py-2 shadow-sm">
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
            <Lock className="w-5 h-5 text-purple-600" /> Verification Status
          </h3>
          <p className="text-gray-600 font-medium">
            {doctorProfile.verificationStatus}
          </p>
        </section>
      )}
    </div>
  );
};

// DoctorProfileForm Component
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

  // Prefill form for editing
  useEffect(() => {
    if (doctorProfile && hasProfile) {
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
    }
  }, [doctorProfile, hasProfile]);

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
      await createDoctorProfile(formData);
    } catch (err) {
      console.error(err);
      alert("Error saving profile");
    }
  };

  const FormContent = () => (
    <form onSubmit={handleSubmit} className="space-y-6 sm:space-y-8">
      {/* Basic Info */}
      <section className="bg-gray-50 rounded-xl p-4 sm:p-6">
        <h3 className="text-lg sm:text-xl font-semibold flex items-center gap-2 text-gray-700 mb-4">
          <User className="w-5 h-5 text-blue-600" /> Basic Information
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
          {/* Text inputs */}
          {["specialization", "licenseNumber", "clinicLocation", "phoneNumber"].map(
            (field) => (
              <div key={field} className="space-y-2">
                <label
                  htmlFor={field}
                  className="block text-sm font-medium text-gray-700 capitalize"
                >
                  {field.replace(/([A-Z])/g, " $1").trim()}
                </label>
                <input
                  id={field}
                  name={field}
                  value={formData[field]}
                  onChange={handleChange}
                  disabled={hasProfile && !editMode}
                  className={`w-full px-3 sm:px-4 py-2 border rounded-lg transition-colors ${
                    hasProfile && !editMode
                      ? "bg-gray-100 cursor-not-allowed border-gray-200"
                      : "bg-white border-gray-300 hover:border-blue-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                  }`}
                />
              </div>
            )
          )}

          {/* Bio field */}
          <div className="md:col-span-2 space-y-2">
            <label htmlFor="bio" className="block text-sm font-medium text-gray-700">
              Bio
            </label>
            <textarea
              id="bio"
              name="bio"
              value={formData.bio}
              onChange={handleChange}
              disabled={hasProfile && !editMode}
              className={`w-full px-3 sm:px-4 py-2 border rounded-lg transition-colors ${
                hasProfile && !editMode
                  ? "bg-gray-100 cursor-not-allowed border-gray-200"
                  : "bg-white border-gray-300 hover:border-blue-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
              }`}
              rows={4}
            />
          </div>

          {/* Fees */}
          <div className="space-y-2">
            <label htmlFor="fees" className="block text-sm font-medium text-gray-700">
              Consultation Fees (₹)
            </label>
            <input
              type="number"
              id="fees"
              name="fees"
              value={formData.fees}
              onChange={handleChange}
              disabled={hasProfile && !editMode}
              className={`w-full px-3 sm:px-4 py-2 border rounded-lg transition-colors ${
                hasProfile && !editMode
                  ? "bg-gray-100 cursor-not-allowed border-gray-200"
                  : "bg-white border-gray-300 hover:border-blue-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
              }`}
            />
          </div>

          {/* Experience */}
          <div className="space-y-2">
            <label htmlFor="experienceYears" className="block text-sm font-medium text-gray-700">
              Experience (Years)
            </label>
            <input
              type="number"
              id="experienceYears"
              name="experienceYears"
              value={formData.experienceYears}
              onChange={handleChange}
              disabled={hasProfile && !editMode}
              className={`w-full px-3 sm:px-4 py-2 border rounded-lg transition-colors ${
                hasProfile && !editMode
                  ? "bg-gray-100 cursor-not-allowed border-gray-200"
                  : "bg-white border-gray-300 hover:border-blue-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
              }`}
            />
          </div>
        </div>
      </section>

      {/* Education */}
      <section className="bg-blue-50 rounded-xl p-4 sm:p-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mb-4">
          <h3 className="text-lg sm:text-xl font-semibold flex items-center gap-2 text-gray-700">
            <GraduationCap className="w-5 h-5 text-blue-600" /> Education
          </h3>
          <button
            type="button"
            onClick={addEducation}
            className="flex items-center gap-2 bg-blue-600 text-white px-3 py-1.5 rounded-lg hover:bg-blue-700 transition-colors text-sm"
          >
            <Plus className="w-4 h-4" /> Add Education
          </button>
        </div>
        <div className="space-y-4">
          {formData.education.map((edu, index) => (
            <div
              key={index}
              className="bg-white rounded-lg p-3 sm:p-4 border border-gray-200"
            >
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-3">
                <input
                  placeholder="Degree (e.g., MBBS)"
                  value={edu.degree}
                  onChange={(e) =>
                    handleEducationChange(index, "degree", e.target.value)
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                />
                <input
                  placeholder="College/University"
                  value={edu.college}
                  onChange={(e) =>
                    handleEducationChange(index, "college", e.target.value)
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                />
                <div className="flex gap-2">
                  <input
                    placeholder="Year"
                    type="number"
                    value={edu.passoutYear}
                    onChange={(e) =>
                      handleEducationChange(index, "passoutYear", e.target.value)
                    }
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                  />
                  {formData.education.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeEducation(index)}
                      className="px-3 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Insurance */}
      <section className="bg-green-50 rounded-xl p-4 sm:p-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mb-4">
          <h3 className="text-lg sm:text-xl font-semibold flex items-center gap-2 text-gray-700">
            <ShieldCheck className="w-5 h-5 text-green-600" /> Insurance Providers
          </h3>
          <button
            type="button"
            onClick={addInsurance}
            className="flex items-center gap-2 bg-green-600 text-white px-3 py-1.5 rounded-lg hover:bg-green-700 transition-colors text-sm"
          >
            <Plus className="w-4 h-4" /> Add Provider
          </button>
        </div>
        <div className="space-y-3">
          {formData.insurance.map((provider, index) => (
            <div key={index} className="flex gap-2">
              <input
                placeholder="Insurance Provider Name"
                value={provider}
                onChange={(e) => handleInsuranceChange(index, e.target.value)}
                className="flex-1 px-3 py-2 bg-white border border-gray-300 rounded-lg focus:border-green-500 focus:ring-2 focus:ring-green-200"
              />
              {formData.insurance.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeInsurance(index)}
                  className="px-3 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Buttons */}
      <div className="flex flex-col sm:flex-row gap-3 pt-6 border-t border-gray-200">
        <button
          type="submit"
          disabled={loading}
          className="flex items-center justify-center gap-2 bg-blue-600 text-white px-6 py-2.5 rounded-lg hover:bg-blue-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-sm hover:shadow-md w-full sm:w-auto"
        >
          {loading ? (
            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
          ) : (
            <Save className="w-5 h-5" />
          )}
          <span>{loading ? "Saving..." : "Save Profile"}</span>
        </button>
        <button
          type="button"
          onClick={() => setEditMode(false)}
          className="flex items-center justify-center gap-2 bg-gray-200 text-gray-700 px-6 py-2.5 rounded-lg hover:bg-gray-300 transition-all shadow-sm w-full sm:w-auto"
        >
          <X className="w-5 h-5" />
          <span>Cancel</span>
        </button>
      </div>
    </form>
  );

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
              <FormContent />
            ) : (
              <DisplayProfile
                doctorProfile={doctorProfile}
                onEdit={() => setEditMode(true)}
              />
            )
          ) : (
            <FormContent />
          )}
        </div>
      </div>
    </div>
  );
};

export default DoctorProfileForm;