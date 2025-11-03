import React from 'react';
import { Save, X, Plus, GraduationCap, ShieldCheck, User } from "lucide-react";

const DoctorProfileFormContent = ({
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
}) => {
  
  // Note: The 'disabled' logic remains to control the fields when viewing/editing an existing profile
  const isDisabled = hasProfile && !editMode;

  return (
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
                  disabled={isDisabled}
                  className={`w-full px-3 sm:px-4 py-2 border rounded-lg transition-colors ${
                    isDisabled
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
              disabled={isDisabled}
              className={`w-full px-3 sm:px-4 py-2 border rounded-lg transition-colors ${
                isDisabled
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
              disabled={isDisabled}
              className={`w-full px-3 sm:px-4 py-2 border rounded-lg transition-colors ${
                isDisabled
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
              disabled={isDisabled}
              className={`w-full px-3 sm:px-4 py-2 border rounded-lg transition-colors ${
                isDisabled
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
          disabled={saving}
          className="flex items-center justify-center gap-2 bg-blue-600 text-white px-6 py-2.5 rounded-lg hover:bg-blue-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-sm hover:shadow-md w-full sm:w-auto"
        >
          {saving ? (
            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
          ) : (
            <Save className="w-5 h-5" />
          )}
          <span>{saving ? "Saving..." : "Save Profile"}</span>
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
};

export default DoctorProfileFormContent;