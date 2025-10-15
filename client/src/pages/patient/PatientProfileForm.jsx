import React, { useState, useContext } from "react";
import { UserContext } from "../../context/UserContext";
import {
  User,
  Calendar,
  Phone,
  MapPin,
  Heart,
  Shield,
  AlertCircle,
  Pill,
  UserPlus,
  Save,
  X,
  Plus,
  Trash2,
  ChevronDown,
  Activity,
  CreditCard,
  Users,
  CheckCircle,
  Edit3,
  Droplet,
  Home,
  FileText,
  Tag,
  PhoneCall
} from "lucide-react";

const PatientProfileForm = () => {
  const [profile, setProfile] = useState({
    dob: "",
    gender: "MALE",
    address: "",
    phone: "",
    bloodGroup: "none",
    allergies: [],
    chronicConditions: [],
    medications: [],
    insurance: { provider: "", policyNumber: "", validTill: "" },
    emergencyContact: { name: "", ePhone: "", relation: "" },
  });

  const { createPatientProfile, isEditMode, setIsEditMode } =
    useContext(UserContext);

  // Handle field changes
  const handleChange = (field, value) =>
    setProfile((prev) => ({ ...prev, [field]: value }));

  const handleNestedChange = (parent, field, value) =>
    setProfile((prev) => ({
      ...prev,
      [parent]: { ...prev[parent], [field]: value },
    }));

  const handleArrayChange = (field, index, value) => {
    const updatedArray = [...profile[field]];
    updatedArray[index] = value;
    setProfile({ ...profile, [field]: updatedArray });
  };

  const addToArray = (field) =>
    setProfile({ ...profile, [field]: [...profile[field], ""] });

  const removeFromArray = (field, index) => {
    const updatedArray = profile[field].filter((_, i) => i !== index);
    setProfile({ ...profile, [field]: updatedArray });
  };

  // Submit form
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createPatientProfile(profile);
      setIsEditMode(false);
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Error saving profile");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-xl overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-8 sm:px-10">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div className="flex items-center gap-3">
                <div className="bg-white/20 p-3 rounded-lg">
                  <User className="w-8 h-8 text-white" />
                </div>
                <h2 className="text-2xl sm:text-3xl font-bold text-white">
                  {isEditMode ? "Complete Your Profile" : "Patient Profile"}
                </h2>
              </div>
              {!isEditMode && (
                <button
                  type="button"
                  onClick={() => setIsEditMode(true)}
                  className="flex items-center gap-2 px-4 py-2 bg-white text-blue-600 rounded-lg hover:bg-blue-50 transition-colors"
                >
                  <Edit3 className="w-5 h-5" />
                  Edit Profile
                </button>
              )}
            </div>
          </div>

          <div className="p-6 sm:p-10 space-y-8">
            {/* Personal Information Section */}
            <div className="bg-gray-50 rounded-xl p-6">
              <h3 className="flex items-center gap-2 text-lg font-semibold text-gray-800 mb-6">
                <User className="w-6 h-6 text-blue-600" />
                Personal Information
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Date of Birth */}
                <div className="space-y-2">
                  <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                    <Calendar className="w-4 h-4 text-gray-500" />
                    Date of Birth
                  </label>
                  {isEditMode ? (
                    <input
                      type="date"
                      value={profile.dob?.slice(0, 10) || ""}
                      onChange={(e) => handleChange("dob", e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    />
                  ) : (
                    <p className="px-4 py-2 bg-white rounded-lg">{profile.dob ? profile.dob.slice(0, 10) : "Not provided"}</p>
                  )}
                </div>

                {/* Gender */}
                <div className="space-y-2">
                  <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                    <Users className="w-4 h-4 text-gray-500" />
                    Gender
                  </label>
                  {isEditMode ? (
                    <div className="relative">
                      <select
                        value={profile.gender}
                        onChange={(e) => handleChange("gender", e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all appearance-none"
                      >
                        <option value="MALE">Male</option>
                        <option value="FEMALE">Female</option>
                        <option value="OTHER">Other</option>
                      </select>
                      <ChevronDown className="absolute right-3 top-3 w-4 h-4 text-gray-500 pointer-events-none" />
                    </div>
                  ) : (
                    <p className="px-4 py-2 bg-white rounded-lg">{profile.gender}</p>
                  )}
                </div>

                {/* Phone */}
                <div className="space-y-2">
                  <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                    <Phone className="w-4 h-4 text-gray-500" />
                    Phone Number
                  </label>
                  {isEditMode ? (
                    <input
                      type="tel"
                      value={profile.phone}
                      onChange={(e) => handleChange("phone", e.target.value)}
                      placeholder="Enter phone number"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    />
                  ) : (
                    <p className="px-4 py-2 bg-white rounded-lg">{profile.phone || "Not provided"}</p>
                  )}
                </div>

                {/* Blood Group */}
                <div className="space-y-2">
                  <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                    <Droplet className="w-4 h-4 text-gray-500" />
                    Blood Group
                  </label>
                  {isEditMode ? (
                    <div className="relative">
                      <select
                        value={profile.bloodGroup}
                        onChange={(e) => handleChange("bloodGroup", e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all appearance-none"
                      >
                        <option value="none">Select Blood Group</option>
                        <option value="A+">A+</option>
                        <option value="A-">A-</option>
                        <option value="B+">B+</option>
                        <option value="B-">B-</option>
                        <option value="O+">O+</option>
                        <option value="O-">O-</option>
                        <option value="AB+">AB+</option>
                        <option value="AB-">AB-</option>
                      </select>
                      <ChevronDown className="absolute right-3 top-3 w-4 h-4 text-gray-500 pointer-events-none" />
                    </div>
                  ) : (
                    <p className="px-4 py-2 bg-white rounded-lg">{profile.bloodGroup === "none" ? "Not specified" : profile.bloodGroup}</p>
                  )}
                </div>

                {/* Address - Full Width */}
                <div className="space-y-2 md:col-span-2">
                  <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                    <MapPin className="w-4 h-4 text-gray-500" />
                    Address
                  </label>
                  {isEditMode ? (
                    <textarea
                      value={profile.address}
                      onChange={(e) => handleChange("address", e.target.value)}
                      placeholder="Enter your address"
                      rows="2"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none"
                    />
                  ) : (
                    <p className="px-4 py-2 bg-white rounded-lg">{profile.address || "Not provided"}</p>
                  )}
                </div>
              </div>
            </div>

            {/* Medical Information Section */}
            <div className="bg-red-50 rounded-xl p-6">
              <h3 className="flex items-center gap-2 text-lg font-semibold text-gray-800 mb-6">
                <Heart className="w-6 h-6 text-red-600" />
                Medical Information
              </h3>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Allergies */}
                <div className="space-y-3">
                  <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                    <AlertCircle className="w-4 h-4 text-gray-500" />
                    Allergies
                  </label>
                  {profile.allergies.length === 0 && !isEditMode ? (
                    <p className="text-gray-500 italic px-4 py-2 bg-white rounded-lg">None reported</p>
                  ) : (
                    <div className="space-y-2">
                      {profile.allergies.map((item, i) => (
                        <div key={i} className="flex items-center gap-2">
                          {isEditMode ? (
                            <>
                              <input
                                type="text"
                                value={item}
                                onChange={(e) => handleArrayChange("allergies", i, e.target.value)}
                                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                                placeholder="Enter allergy"
                              />
                              <button
                                type="button"
                                onClick={() => removeFromArray("allergies", i)}
                                className="p-2 text-red-600 hover:bg-red-100 rounded-lg transition-colors"
                              >
                                <Trash2 className="w-5 h-5" />
                              </button>
                            </>
                          ) : (
                            <div className="flex items-center gap-2 px-3 py-2 bg-white rounded-lg w-full">
                              <span className="w-2 h-2 bg-red-500 rounded-full"></span>
                              <p>{item}</p>
                            </div>
                          )}
                        </div>
                      ))}
                      {isEditMode && (
                        <button
                          type="button"
                          onClick={() => addToArray("allergies")}
                          className="flex items-center gap-2 text-red-600 hover:text-red-700 font-medium"
                        >
                          <Plus className="w-5 h-5" />
                          Add Allergy
                        </button>
                      )}
                    </div>
                  )}
                </div>

                {/* Chronic Conditions */}
                <div className="space-y-3">
                  <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                    <Activity className="w-4 h-4 text-gray-500" />
                    Chronic Conditions
                  </label>
                  {profile.chronicConditions.length === 0 && !isEditMode ? (
                    <p className="text-gray-500 italic px-4 py-2 bg-white rounded-lg">None reported</p>
                  ) : (
                    <div className="space-y-2">
                      {profile.chronicConditions.map((item, i) => (
                        <div key={i} className="flex items-center gap-2">
                          {isEditMode ? (
                            <>
                              <input
                                type="text"
                                value={item}
                                onChange={(e) => handleArrayChange("chronicConditions", i, e.target.value)}
                                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                                placeholder="Enter condition"
                              />
                              <button
                                type="button"
                                onClick={() => removeFromArray("chronicConditions", i)}
                                className="p-2 text-red-600 hover:bg-red-100 rounded-lg transition-colors"
                              >
                                <Trash2 className="w-5 h-5" />
                              </button>
                            </>
                          ) : (
                            <div className="flex items-center gap-2 px-3 py-2 bg-white rounded-lg w-full">
                              <span className="w-2 h-2 bg-orange-500 rounded-full"></span>
                              <p>{item}</p>
                            </div>
                          )}
                        </div>
                      ))}
                      {isEditMode && (
                        <button
                          type="button"
                          onClick={() => addToArray("chronicConditions")}
                          className="flex items-center gap-2 text-red-600 hover:text-red-700 font-medium"
                        >
                          <Plus className="w-5 h-5" />
                          Add Condition
                        </button>
                      )}
                    </div>
                  )}
                </div>

                {/* Medications */}
                <div className="space-y-3">
                  <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                    <Pill className="w-4 h-4 text-gray-500" />
                    Current Medications
                  </label>
                  {profile.medications.length === 0 && !isEditMode ? (
                    <p className="text-gray-500 italic px-4 py-2 bg-white rounded-lg">None reported</p>
                  ) : (
                    <div className="space-y-2">
                      {profile.medications.map((item, i) => (
                        <div key={i} className="flex items-center gap-2">
                          {isEditMode ? (
                            <>
                              <input
                                type="text"
                                value={item}
                                onChange={(e) => handleArrayChange("medications", i, e.target.value)}
                                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                                placeholder="Enter medication"
                              />
                              <button
                                type="button"
                                onClick={() => removeFromArray("medications", i)}
                                className="p-2 text-red-600 hover:bg-red-100 rounded-lg transition-colors"
                              >
                                <Trash2 className="w-5 h-5" />
                              </button>
                            </>
                          ) : (
                            <div className="flex items-center gap-2 px-3 py-2 bg-white rounded-lg w-full">
                              <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                              <p>{item}</p>
                            </div>
                          )}
                        </div>
                      ))}
                      {isEditMode && (
                        <button
                          type="button"
                          onClick={() => addToArray("medications")}
                          className="flex items-center gap-2 text-red-600 hover:text-red-700 font-medium"
                        >
                          <Plus className="w-5 h-5" />
                          Add Medication
                        </button>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Insurance Information */}
            <div className="bg-green-50 rounded-xl p-6">
              <h3 className="flex items-center gap-2 text-lg font-semibold text-gray-800 mb-6">
                <Shield className="w-6 h-6 text-green-600" />
                Insurance Information
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-2">
                  <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                    <Home className="w-4 h-4 text-gray-500" />
                    Provider
                  </label>
                  {isEditMode ? (
                    <input
                      type="text"
                      value={profile.insurance.provider}
                      onChange={(e) => handleNestedChange("insurance", "provider", e.target.value)}
                      placeholder="Insurance provider"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    />
                  ) : (
                    <p className="px-4 py-2 bg-white rounded-lg">{profile.insurance.provider || "Not provided"}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                    <CreditCard className="w-4 h-4 text-gray-500" />
                    Policy Number
                  </label>
                  {isEditMode ? (
                    <input
                      type="text"
                      value={profile.insurance.policyNumber}
                      onChange={(e) => handleNestedChange("insurance", "policyNumber", e.target.value)}
                      placeholder="Policy number"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    />
                  ) : (
                    <p className="px-4 py-2 bg-white rounded-lg">{profile.insurance.policyNumber || "Not provided"}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                    <Calendar className="w-4 h-4 text-gray-500" />
                    Valid Until
                  </label>
                  {isEditMode ? (
                    <input
                      type="date"
                      value={profile.insurance.validTill?.slice(0, 10) || ""}
                      onChange={(e) => handleNestedChange("insurance", "validTill", e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    />
                  ) : (
                    <p className="px-4 py-2 bg-white rounded-lg">{profile.insurance.validTill?.slice(0, 10) || "Not provided"}</p>
                  )}
                </div>
              </div>
            </div>

            {/* Emergency Contact */}
            <div className="bg-orange-50 rounded-xl p-6">
              <h3 className="flex items-center gap-2 text-lg font-semibold text-gray-800 mb-6">
                <PhoneCall className="w-6 h-6 text-orange-600" />
                Emergency Contact
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-2">
                  <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                    <UserPlus className="w-4 h-4 text-gray-500" />
                    Contact Name
                  </label>
                  {isEditMode ? (
                    <input
                      type="text"
                      value={profile.emergencyContact.name}
                      onChange={(e) => handleNestedChange("emergencyContact", "name", e.target.value)}
                      placeholder="Emergency contact name"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    />
                  ) : (
                    <p className="px-4 py-2 bg-white rounded-lg">{profile.emergencyContact.name || "Not provided"}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                    <Phone className="w-4 h-4 text-gray-500" />
                    Phone Number
                  </label>
                  {isEditMode ? (
                    <input
                      type="tel"
                      value={profile.emergencyContact.ePhone}
                      onChange={(e) => handleNestedChange("emergencyContact", "ePhone", e.target.value)}
                      placeholder="Emergency phone"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    />
                  ) : (
                    <p className="px-4 py-2 bg-white rounded-lg">{profile.emergencyContact.ePhone || "Not provided"}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                    <Users className="w-4 h-4 text-gray-500" />
                    Relationship
                  </label>
                  {isEditMode ? (
                    <input
                      type="text"
                      value={profile.emergencyContact.relation}
                      onChange={(e) => handleNestedChange("emergencyContact", "relation", e.target.value)}
                      placeholder="Relationship"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    />
                  ) : (
                    <p className="px-4 py-2 bg-white rounded-lg">{profile.emergencyContact.relation || "Not provided"}</p>
                  )}
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            {isEditMode && (
              <div className="flex flex-col items-center justify-center sm:flex-row gap-4 pt-6">
                <button
                  type="submit"
                  className="w-full sm:w-auto px-6 py-2.5 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all font-medium shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  <Save className="w-5 h-5" />
                  Save Profile
                </button>
                <button
                  type="button"
                  onClick={() => setIsEditMode(false)}
                  className=" flex items-center justify-center gap-2 px-6 py-3 bg-gray-200 text-gray-700 font-semibold rounded-lg hover:bg-gray-300 transition-colors"
                >
                  <X className="w-5 h-5" />
                  Cancel
                </button>
              </div>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default PatientProfileForm;
