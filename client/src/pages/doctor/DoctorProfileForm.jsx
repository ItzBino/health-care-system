import React, { useState, useEffect, useContext } from "react";
import { DoctorContext } from "../../context/DoctorContext";
import { EditIcon } from "lucide-react";

const DoctorProfileForm = ({ doctorId }) => {
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
    schedule: [{ dayOfWeek: 1, start: "09:00", end: "12:00", slotMinutes: 30 }],
  });

  const {
    createDoctorProfile,
    doctorProfile,
    setDoctorProfile,
    loading,
    hasProfile,
    editMode,
    setEditMode,
  } = useContext(DoctorContext);

  // ✅ Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // ✅ Handle nested education changes
  const handleEducationChange = (index, field, value) => {
    const updated = [...formData.education];
    updated[index][field] = value;
    setFormData((prev) => ({ ...prev, education: updated }));
  };

  // ✅ Handle schedule change
  const handleScheduleChange = (index, field, value) => {
    const updated = [...formData.schedule];
    updated[index][field] = value;
    setFormData((prev) => ({ ...prev, schedule: updated }));
  };

  // ✅ Add/Remove education rows
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

  // ✅ Add/Remove schedule rows
  const addSchedule = () => {
    setFormData((prev) => ({
      ...prev,
      schedule: [
        ...prev.schedule,
        { dayOfWeek: 1, start: "09:00", end: "12:00", slotMinutes: 30 },
      ],
    }));
  };

  const removeSchedule = (index) => {
    const updated = formData.schedule.filter((_, i) => i !== index);
    setFormData((prev) => ({ ...prev, schedule: updated }));
  };

  // ✅ Submit form
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      createDoctorProfile(formData);
    } catch (err) {
      console.error(err);
      alert("Error saving profile");
    }
  };

  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  return (
    <div className="max-w-4xl mx-auto bg-white shadow-xl rounded-2xl p-8">
    <h2 className="text-2xl font-semibold mb-6 text-gray-700">
  {!hasProfile
    ? "Complete Your Profile"
    : editMode
      ? "Edit Profile"
      : "Your Profile"}
</h2>
              <div>
                {!editMode && (
                <button
                  type="button"
                  onClick={() => setEditMode(true)}
                  className="flex items-center gap-2 px-4 py-2 bg-white text-blue-600 rounded-lg hover:bg-blue-50 transition-colors"
                >
                  <EditIcon className="w-5 h-5" />
                  Edit Profile
                </button>
              )}
              </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Basic Info */}
       <div className="grid grid-cols-2 gap-4">
  {editMode ? (
    // Edit Mode
    <>
      <input
        name="specialization"
        placeholder="Specialization"
        value={formData.specialization}
        onChange={handleChange}
        className="border p-3 rounded-lg"
      />
      <input
        name="licenseNumber"
        placeholder="License Number"
        value={formData.licenseNumber}
        onChange={handleChange}
        className="border p-3 rounded-lg"
      />
      <input
        name="clinicLocation"
        placeholder="Clinic Location"
        value={formData.clinicLocation}
        onChange={handleChange}
        className="border p-3 rounded-lg"
      />
      <input
        type="number"
        name="fees"
        placeholder="Fees"
        value={formData.fees}
        onChange={handleChange}
        className="border p-3 rounded-lg"
      />
      <input
        type="number"
        name="experienceYears"
        placeholder="Experience (Years)"
        value={formData.experienceYears}
        onChange={handleChange}
        className="border p-3 rounded-lg"
      />
      <input
        name="phoneNumber"
        placeholder="Phone Number"
        value={formData.phoneNumber}
        onChange={handleChange}
        className="border p-3 rounded-lg"
      />
    </>
  ) : (
    // View Mode
    <>
      <p>{formData.specialization || "Not provided"}</p>
      <p>{formData.licenseNumber || "Not provided"}</p>
      <p>{formData.clinicLocation || "Not provided"}</p>
      <p>{formData.fees || "Not provided"}</p>
      <p>{formData.experienceYears || "Not provided"}</p>
      <p>{formData.phoneNumber || "Not provided"}</p>
    </>
  )}
</div>

{
    editMode?(   <textarea
          name="bio"
          placeholder="Short Bio"
          value={formData.bio}
          onChange={handleChange}
          className="border p-3 rounded-lg w-full"
        />):(
          <p>{formData.bio || "Not provided"}</p>
        )
}
     

        {/* Education */}
       <div>
  <h3 className="font-semibold text-lg mb-2">Education</h3>
  {editMode ? (
    <>
      {formData.education.map((edu, index) => (
        <div key={index} className="grid grid-cols-3 gap-3 mb-2">
          <input
            placeholder="Degree"
            value={edu.degree}
            onChange={(e) =>
              handleEducationChange(index, "degree", e.target.value)
            }
            className="border p-2 rounded-lg"
          />
          <input
            placeholder="College"
            value={edu.college}
            onChange={(e) =>
              handleEducationChange(index, "college", e.target.value)
            }
            className="border p-2 rounded-lg"
          />
          <input
            placeholder="Passout Year"
            type="number"
            value={edu.passoutYear}
            onChange={(e) =>
              handleEducationChange(index, "passoutYear", e.target.value)
            }
            className="border p-2 rounded-lg"
          />
          {formData.education.length > 1 && (
            <button
              type="button"
              onClick={() => removeEducation(index)}
              className="text-red-600 text-sm underline col-span-3"
            >
              Remove
            </button>
          )}
        </div>
      ))}
      <button
        type="button"
        onClick={addEducation}
        className="bg-blue-500 text-white px-3 py-1 rounded-lg mt-2"
      >
        + Add Education
      </button>
    </>
  ) : (
    <>
      {formData.education.map((edu, index) => (
        <div key={index} className="grid grid-cols-3 gap-3 mb-2">
          <p>{edu.degree || "Not provided"}</p>
          <p>{edu.college || "Not provided"}</p>
          <p>{edu.passoutYear || "Not provided"}</p>
        </div>
      ))}
    </>
  )}
</div>


        {/* Schedule */}
        <div>
          <h3 className="font-semibold text-lg mb-2">Schedule</h3>
         {editMode ? (<>
              {formData.schedule.map((slot, index) => (
            <div
              key={index}
              className="grid grid-cols-4 gap-3 mb-2 items-center"
            >
              <select
                value={slot.dayOfWeek}
                onChange={(e) =>
                  handleScheduleChange(
                    index,
                    "dayOfWeek",
                    parseInt(e.target.value)
                  )
                }
                className="border p-2 rounded-lg"
              >
                {days.map((day, i) => (
                  <option key={i} value={i}>
                    {day}
                  </option>
                ))}
              </select>
              <input
                type="time"
                value={slot.start}
                onChange={(e) =>
                  handleScheduleChange(index, "start", e.target.value)
                }
                className="border p-2 rounded-lg"
              />
              <input
                type="time"
                value={slot.end}
                onChange={(e) =>
                  handleScheduleChange(index, "end", e.target.value)
                }
                className="border p-2 rounded-lg"
              />
              <input
                type="number"
                value={slot.slotMinutes}
                onChange={(e) =>
                  handleScheduleChange(index, "slotMinutes", e.target.value)
                }
                className="border p-2 rounded-lg"
              />
              {formData.schedule.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeSchedule(index)}
                  className="text-red-600 text-sm underline col-span-4"
                >
                  Remove
                </button>
              )}
            </div>
          ))}
          <button
            type="button"
            onClick={addSchedule}
            className="bg-green-500 text-white px-3 py-1 rounded-lg mt-2"
          >
            + Add Schedule
          </button>
          </>
         ):(
          <>
          {formData.schedule.map((slot, index) => (
            <div
              key={index}
              className="grid grid-cols-4 gap-3 mb-2 items-center"
            >
              <p>{days[slot.dayOfWeek]}</p>
              <p>{slot.start}</p>
              <p>{slot.end}</p>
              <p>{slot.slotMinutes}</p>
            </div>
          ))}
          </>
         )}
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-indigo-600 text-white py-3 rounded-xl font-semibold hover:bg-indigo-700 transition-all"
        >
          {loading
            ? "Saving..."
            : hasProfile
            ? editMode
        ? "Update Profile":''
    : "Create Profile"}
        </button>
      </form>
    </div>
  );
};

export default DoctorProfileForm;
