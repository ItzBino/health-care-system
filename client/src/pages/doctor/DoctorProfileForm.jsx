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
    return <p className="text-gray-500 italic">No profile data found.</p>;

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex justify-between items-center border-b pb-4 mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Doctor Profile</h2>
        <button
          onClick={onEdit}
          className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-all"
        >
          <EditIcon className="w-4 h-4" /> Edit
        </button>
      </div>

      {/* Basic Information */}
      <section>
        <h3 className="text-xl font-semibold flex items-center gap-2 text-gray-700 mb-3">
          <User className="w-5 h-5 text-blue-600" /> Basic Information
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <p>
            <strong>Specialization:</strong> {doctorProfile.specialization}
          </p>
          <p>
            <strong>License Number:</strong> {doctorProfile.licenseNumber}
          </p>
          <p>
            <strong>Clinic Location:</strong> {doctorProfile.clinicLocation}
          </p>
          <p>
            <strong>Phone Number:</strong> {doctorProfile.phoneNumber}
          </p>
          <p>
            <strong>Bio:</strong> {doctorProfile.bio}
          </p>
          <p>
            <strong>Fees:</strong> ₹{doctorProfile.fees}
          </p>
          <p>
            <strong>Experience:</strong> {doctorProfile.experienceYears} years
          </p>
        </div>
      </section>

      {/* Education */}
      {doctorProfile.education?.length > 0 && (
        <section>
          <h3 className="text-xl font-semibold flex items-center gap-2 text-gray-700 mb-3">
            <GraduationCap className="w-5 h-5 text-blue-600" /> Education
          </h3>
          {doctorProfile.education.map((edu, i) => (
            <p key={i}>
              {edu.degree} — {edu.college} ({edu.passoutYear})
            </p>
          ))}
        </section>
      )}

      {/* Insurance */}
      {doctorProfile.insurance?.length > 0 && (
        <section>
          <h3 className="text-xl font-semibold flex items-center gap-2 text-gray-700 mb-3">
            <ShieldCheck className="w-5 h-5 text-blue-600" /> Insurance
            Providers
          </h3>
          <ul className="list-disc ml-6">
            {doctorProfile.insurance.map((provider, i) => (
              <li key={i}>{provider}</li>
            ))}
          </ul>
        </section>
      )}


      {/* Verification Status */}
      {doctorProfile.verificationStatus && (
        <section>
          <h3 className="text-xl font-semibold flex items-center gap-2 text-gray-700">
            <Lock className="w-5 h-5 text-blue-600" /> Verification Status
          </h3>
          <p className="mt-1 text-gray-600">
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

  const days = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 py-8 px-4">
      <div className="max-w-6xl mx-auto bg-white rounded-2xl shadow-lg p-8">
        {hasProfile ? (
          editMode ? (
            // Edit Form
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Basic Info */}
       <section>
  <h3 className="text-xl font-semibold flex items-center gap-2 text-gray-700 mb-3">
    <User className="w-5 h-5 text-blue-600" /> Basic Information
  </h3>

  {/* Grid layout for fields */}
  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
    {/* Text inputs */}
    {["specialization", "licenseNumber", "clinicLocation", "phoneNumber"].map(
      (field) => (
        <div key={field} className="flex flex-col gap-1">
          <label
            htmlFor={field}
            className="font-medium capitalize text-gray-700"
          >
            {field}
          </label>
          <input
            id={field}
            name={field}
            value={formData[field]}
            onChange={handleChange}
            disabled={hasProfile && !editMode}
            className={`border rounded-lg px-4 py-2 w-full ${
              hasProfile && !editMode
                ? "bg-gray-100 cursor-not-allowed"
                : "bg-gray-50"
            }`}
          />
        </div>
      )
    )}

    {/* Bio field */}
    <div className="flex flex-col gap-1 md:col-span-2">
      <label htmlFor="bio" className="font-medium text-gray-700">
        Bio
      </label>
      <textarea
        id="bio"
        name="bio"
        value={formData.bio}
        onChange={handleChange}
        disabled={hasProfile && !editMode}
        className={`border rounded-lg px-4 py-2 w-full ${
          hasProfile && !editMode
            ? "bg-gray-100 cursor-not-allowed"
            : "bg-gray-50"
        }`}
        rows={4}
      />
    </div>

    {/* Fees */}
    <div className="flex flex-col gap-1">
      <label htmlFor="fees" className="font-medium text-gray-700">
        Fees
      </label>
      <input
        type="number"
        id="fees"
        name="fees"
        value={formData.fees}
        onChange={handleChange}
        disabled={hasProfile && !editMode}
        className={`border rounded-lg px-4 py-2 w-full ${
          hasProfile && !editMode
            ? "bg-gray-100 cursor-not-allowed"
            : "bg-gray-50"
        }`}
      />
    </div>

    {/* Experience */}
    <div className="flex flex-col gap-1">
      <label htmlFor="experienceYears" className="font-medium text-gray-700">
        Experience (Years)
      </label>
      <input
        type="number"
        id="experienceYears"
        name="experienceYears"
        value={formData.experienceYears}
        onChange={handleChange}
        disabled={hasProfile && !editMode}
        className={`border rounded-lg px-4 py-2 w-full ${
          hasProfile && !editMode
            ? "bg-gray-100 cursor-not-allowed"
            : "bg-gray-50"
        }`}
      />
    </div>
  </div>
</section>


              {/* Education */}
              <section>
                <div className="flex justify-between items-center mb-3">
                  <h3 className="text-xl font-semibold flex items-center gap-2 text-gray-700">
                    <GraduationCap className="w-5 h-5 text-blue-600" />{" "}
                    Education
                  </h3>
                  <button
                    type="button"
                    onClick={addEducation}
                    className="flex items-center gap-1 bg-blue-600 text-white px-3 py-1.5 rounded-md"
                  >
                    <Plus className="w-4 h-4" /> Add
                  </button>
                </div>
                {formData.education.map((edu, index) => (
                  <div
                    key={index}
                    className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4"
                  >
                    <input
                      placeholder="Degree"
                      value={edu.degree}
                      onChange={(e) =>
                        handleEducationChange(index, "degree", e.target.value)
                      }
                      className="border rounded-lg px-4 py-2 bg-gray-50"
                    />
                    <input
                      placeholder="College"
                      value={edu.college}
                      onChange={(e) =>
                        handleEducationChange(index, "college", e.target.value)
                      }
                      className="border rounded-lg px-4 py-2 bg-gray-50"
                    />
                    <input
                      placeholder="Passout Year"
                      type="number"
                      value={edu.passoutYear}
                      onChange={(e) =>
                        handleEducationChange(
                          index,
                          "passoutYear",
                          e.target.value
                        )
                      }
                      className="border rounded-lg px-4 py-2 bg-gray-50"
                    />
                    <button
                      type="button"
                      onClick={() => removeEducation(index)}
                      className="text-red-600 hover:text-red-800 text-sm"
                    >
                      Remove
                    </button>
                  </div>
                ))}
              </section>

              {/* Insurance */}
              <section>
                <div className="flex justify-between items-center mb-3">
                  <h3 className="text-xl font-semibold flex items-center gap-2 text-gray-700">
                    <ShieldCheck className="w-5 h-5 text-blue-600" /> Insurance
                    Providers
                  </h3>
                  <button
                    type="button"
                    onClick={addInsurance}
                    className="flex items-center gap-1 bg-green-600 text-white px-3 py-1.5 rounded-md"
                  >
                    <Plus className="w-4 h-4" /> Add
                  </button>
                </div>
                {formData.insurance.map((provider, index) => (
                  <div key={index} className="flex gap-3 items-center mb-2">
                    <input
                      placeholder="Insurance Provider"
                      value={provider}
                      onChange={(e) =>
                        handleInsuranceChange(index, e.target.value)
                      }
                      className="border rounded-lg px-4 py-2 bg-gray-50 flex-1"
                    />
                    <button
                      type="button"
                      onClick={() => removeInsurance(index)}
                      className="text-red-600 hover:text-red-800 text-sm"
                    >
                      Remove
                    </button>
                  </div>
                ))}
              </section>

             

             

              {/* Buttons */}
              <div className="flex gap-4 pt-6 border-t border-gray-200">
                <button
                  type="submit"
                  disabled={loading}
                  className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 flex items-center gap-2"
                >
                  {loading ? (
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <Save className="w-4 h-4" />
                  )}{" "}
                  Save
                </button>
                <button
                  type="button"
                  onClick={() => setEditMode(false)}
                  className="bg-gray-200 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-300 flex items-center gap-2"
                >
                  <X className="w-4 h-4" /> Cancel
                </button>
              </div>
            </form>
          ) : (
            // Display Profile
            <DisplayProfile
              doctorProfile={doctorProfile}
              onEdit={() => setEditMode(true)}
            />
          )
        ) : (
          // No profile yet: create
          <form onSubmit={handleSubmit} className="space-y-8">
            <section>
              <h3 className="text-xl font-semibold flex items-center gap-2 text-gray-700 mb-3">
                <User className="w-5 h-5 text-blue-600" /> Basic Information
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[
                  "specialization",
                  "licenseNumber",
                  "clinicLocation",
                  "phoneNumber",
                ].map((field) => (
                  <div key={field} className="flex flex-col gap-1">
                    <label className="font-medium capitalize text-gray-700">
                      {field}
                    </label>
                    <input
                      name={field}
                      value={formData[field]}
                      onChange={handleChange}
                      className="border rounded-lg px-4 py-2 bg-gray-50"
                    />
                  </div>
                ))}
            <div>

  <label className="font-medium text-gray-700">Bio</label>
  <textarea
    name="bio"
    value={formData.bio}
    onChange={handleChange}
    disabled={hasProfile && !editMode}
    className={`border rounded-lg px-4 py-2 w-full ${
      hasProfile && !editMode ? "bg-gray-100 cursor-not-allowed" : "bg-gray-50"
    }`}
    rows={4}
  />
</div> 

                <div>
                  <label className="font-medium text-gray-700">Fees</label>
                  <input
                    type="number"
                    name="fees"
                    value={formData.fees}
                    onChange={handleChange}
                    className="border rounded-lg px-4 py-2 bg-gray-50 w-full"
                  />
                </div>
                <div>
                  <label className="font-medium text-gray-700">
                    Experience (Years)
                  </label>
                  <input
                    type="number"
                    name="experienceYears"
                    value={formData.experienceYears}
                    onChange={handleChange}
                    className="border rounded-lg px-4 py-2 bg-gray-50 w-full"
                  />
                </div>
              </div>
            </section>

            {/* Education */}
            <section>
              <div className="flex justify-between items-center mb-3">
                <h3 className="text-xl font-semibold flex items-center gap-2 text-gray-700">
                  <GraduationCap className="w-5 h-5 text-blue-600" /> Education
                </h3>
                <button
                  type="button"
                  onClick={addEducation}
                  className="flex items-center gap-1 bg-blue-600 text-white px-3 py-1.5 rounded-md"
                >
                  <Plus className="w-4 h-4" /> Add
                </button>
              </div>
              {formData.education.map((edu, index) => (
                <div
                  key={index}
                  className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4"
                >
                  <input
                    placeholder="Degree"
                    value={edu.degree}
                    onChange={(e) =>
                      handleEducationChange(index, "degree", e.target.value)
                    }
                    className="border rounded-lg px-4 py-2 bg-gray-50"
                  />
                  <input
                    placeholder="College"
                    value={edu.college}
                    onChange={(e) =>
                      handleEducationChange(index, "college", e.target.value)
                    }
                    className="border rounded-lg px-4 py-2 bg-gray-50"
                  />
                  <input
                    placeholder="Passout Year"
                    type="number"
                    value={edu.passoutYear}
                    onChange={(e) =>
                      handleEducationChange(
                        index,
                        "passoutYear",
                        e.target.value
                      )
                    }
                    className="border rounded-lg px-4 py-2 bg-gray-50"
                  />
                  <button
                    type="button"
                    onClick={() => removeEducation(index)}
                    className="text-red-600 hover:text-red-800 text-sm"
                  >
                    Remove
                  </button>
                </div>
              ))}
            </section>

            {/* Insurance */}
            <section>
              <div className="flex justify-between items-center mb-3">
                <h3 className="text-xl font-semibold flex items-center gap-2 text-gray-700">
                  <ShieldCheck className="w-5 h-5 text-blue-600" /> Insurance
                  Providers
                </h3>
                <button
                  type="button"
                  onClick={addInsurance}
                  className="flex items-center gap-1 bg-green-600 text-white px-3 py-1.5 rounded-md"
                >
                  <Plus className="w-4 h-4" /> Add
                </button>
              </div>
              {formData.insurance.map((provider, index) => (
                <div key={index} className="flex gap-3 items-center mb-2">
                  <input
                    placeholder="Insurance Provider"
                    value={provider}
                    onChange={(e) =>
                      handleInsuranceChange(index, e.target.value)
                    }
                    className="border rounded-lg px-4 py-2 bg-gray-50 flex-1"
                  />
                  <button
                    type="button"
                    onClick={() => removeInsurance(index)}
                    className="text-red-600 hover:text-red-800 text-sm"
                  >
                    Remove
                  </button>
                </div>
              ))}
            </section>

           
            {/* Buttons */}
            <div className="flex gap-4 pt-6 border-t border-gray-200">
              <button
                type="submit"
                disabled={loading}
                className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 flex items-center gap-2"
              >
                {loading ? (
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  <Save className="w-4 h-4" />
                )}{" "}
                Save
              </button>
              <button
                type="button"
                onClick={() => setEditMode(false)}
                className="bg-gray-200 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-300 flex items-center gap-2"
              >
                <X className="w-4 h-4" /> Cancel
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default DoctorProfileForm;
