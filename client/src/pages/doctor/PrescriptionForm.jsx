import React, { useState } from "react";
import axios from "axios";
import {
  Pill,
  Plus,
  Trash2,
  Clock,
  Calendar,
  FileText,
  CheckCircle,
  XCircle,
  AlertCircle,
  Save,
  User,
  Stethoscope,
  Activity,
  ChevronDown,
  Info,
  Edit3,
  Copy,
  Loader2,
  ClipboardList,
  Heart,
  Shield,
  Timer,
  TrendingUp,
  Package,
  Droplets,
  CalendarDays,
  NotebookPen,
  Zap
} from 'lucide-react';

const PrescriptionForm = ({ patientId, doctorId, onSuccess }) => {
  const [medications, setMedications] = useState([
    { name: "", dosage: "", frequency: "", duration: "", notes: "" },
  ]);
  const [isCompleted, setIsCompleted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");
  const [expandedCards, setExpandedCards] = useState([0]);
  const [prescriptionNotes, setPrescriptionNotes] = useState("");
  const [followUpDate, setFollowUpDate] = useState("");

  // Sample patient and doctor data (replace with actual data)
  const patientData = {
    name: "John Doe",
    age: 45,
    gender: "Male",
    allergies: ["Penicillin", "Aspirin"],
    bloodGroup: "O+",
    id: "PAT-001234"
  };

  const doctorData = {
    name: "Dr. Sarah Johnson",
    specialization: "General Medicine",
    license: "MD-123456",
    hospital: "City Medical Center"
  };

  // Common medications for quick selection
  const commonMedications = [
    { name: "Paracetamol", dosage: "500mg", frequency: "Twice daily", duration: "5 days" },
    { name: "Amoxicillin", dosage: "250mg", frequency: "Three times daily", duration: "7 days" },
    { name: "Ibuprofen", dosage: "400mg", frequency: "As needed", duration: "3 days" },
    { name: "Omeprazole", dosage: "20mg", frequency: "Once daily", duration: "14 days" },
  ];

  // Frequency options
  const frequencyOptions = [
    "Once daily",
    "Twice daily",
    "Three times daily",
    "Four times daily",
    "Every 6 hours",
    "Every 8 hours",
    "Every 12 hours",
    "As needed",
    "Before meals",
    "After meals",
    "At bedtime"
  ];

  // Duration options
  const durationOptions = [
    "3 days",
    "5 days",
    "7 days",
    "10 days",
    "14 days",
    "21 days",
    "30 days",
    "Ongoing",
    "As directed"
  ];

  // Handle input change for medication fields
  const handleChange = (index, field, value) => {
    const updated = [...medications];
    updated[index][field] = value;
    setMedications(updated);
  };

  // Add new medication row
  const addMedication = () => {
    setMedications([...medications, { name: "", dosage: "", frequency: "", duration: "", notes: "" }]);
    setExpandedCards([...expandedCards, medications.length]);
  };

  // Remove a medication row
  const removeMedication = (index) => {
    const updated = medications.filter((_, i) => i !== index);
    setMedications(updated);
    setExpandedCards(expandedCards.filter(i => i !== index).map(i => i > index ? i - 1 : i));
  };

  // Toggle card expansion
  const toggleCardExpansion = (index) => {
    if (expandedCards.includes(index)) {
      setExpandedCards(expandedCards.filter(i => i !== index));
    } else {
      setExpandedCards([...expandedCards, index]);
    }
  };

  // Use template medication
  const useTemplate = (template, index) => {
    const updated = [...medications];
    updated[index] = { ...updated[index], ...template };
    setMedications(updated);
  };

  // Duplicate medication
  const duplicateMedication = (index) => {
    const newMed = { ...medications[index] };
    setMedications([...medications, newMed]);
    setExpandedCards([...expandedCards, medications.length]);
  };

  // Submit prescription
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    setMessageType("");

    // Validate at least one medication
    const validMedications = medications.filter(med => med.name.trim() !== "");
    if (validMedications.length === 0) {
      setMessage("Please add at least one medication");
      setMessageType("error");
      setLoading(false);
      return;
    }

    try {
      const payload = {
        patient: patientId,
        doctor: doctorId,
        medications: validMedications,
        isCompleted,
        prescriptionNotes,
        followUpDate
      };

      const res = await axios.post("/api/prescriptions", payload);

      if (res.data.success) {
        setMessage("Prescription created successfully!");
        setMessageType("success");
        setMedications([{ name: "", dosage: "", frequency: "", duration: "", notes: "" }]);
        setIsCompleted(false);
        setPrescriptionNotes("");
        setFollowUpDate("");
        if (onSuccess) onSuccess();
      }
    } catch (err) {
      console.error(err);
      setMessage("Failed to create prescription. Please try again.");
      setMessageType("error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-2xl shadow-xl mb-6 overflow-hidden">
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div className="flex items-center gap-3">
                <div className="bg-white/20 backdrop-blur-sm p-3 rounded-xl">
                  <ClipboardList className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h1 className="text-2xl sm:text-3xl font-bold text-white">Create Prescription</h1>
                  <p className="text-blue-100 mt-1">Fill in the medication details for the patient</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-white text-sm">
                  {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Form Section */}
          <div className="lg:col-span-2 space-y-6">
            {/* Quick Templates */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                <Zap className="w-5 h-5 text-yellow-500" />
                Quick Templates
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {commonMedications.map((template, idx) => (
                  <button
                    key={idx}
                    onClick={() => useTemplate(template, 0)}
                    className="text-left p-3 bg-gray-50 hover:bg-blue-50 rounded-lg border border-gray-200 hover:border-blue-300 transition-all group"
                  >
                    <p className="font-medium text-gray-800 group-hover:text-blue-700">{template.name}</p>
                    <p className="text-xs text-gray-500">{template.dosage} • {template.frequency}</p>
                  </button>
                ))}
              </div>
            </div>

            {/* Medications Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              {medications.map((med, index) => (
                <div
                  key={index}
                  className={`bg-white rounded-xl shadow-lg overflow-hidden transition-all ${
                    expandedCards.includes(index) ? 'ring-2 ring-blue-500' : ''
                  }`}
                >
                  {/* Card Header */}
                  <div className="bg-gradient-to-r from-gray-50 to-gray-100 px-6 py-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="bg-blue-100 p-2 rounded-lg">
                          <Pill className="w-5 h-5 text-blue-600" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-800">
                            Medication {index + 1}
                            {med.name && <span className="ml-2 text-blue-600">- {med.name}</span>}
                          </h3>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => duplicateMedication(index)}
                          className="p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                          title="Duplicate"
                        >
                          <Copy className="w-4 h-4" />
                        </button>
                        <button
                          type="button"
                          onClick={() => toggleCardExpansion(index)}
                          className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-200 rounded-lg transition-colors"
                        >
                          <ChevronDown className={`w-4 h-4 transition-transform ${
                            expandedCards.includes(index) ? 'rotate-180' : ''
                          }`} />
                        </button>
                        {medications.length > 1 && (
                          <button
                            type="button"
                            onClick={() => removeMedication(index)}
                            className="p-2 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Card Body */}
                  {expandedCards.includes(index) && (
                    <div className="p-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {/* Medication Name */}
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            <Package className="inline w-4 h-4 mr-1" />
                            Medication Name *
                          </label>
                          <input
                            type="text"
                            placeholder="e.g., Paracetamol"
                            value={med.name}
                            onChange={(e) => handleChange(index, "name", e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                            required
                          />
                        </div>

                        {/* Dosage */}
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            <Droplets className="inline w-4 h-4 mr-1" />
                            Dosage
                          </label>
                          <input
                            type="text"
                            placeholder="e.g., 500mg"
                            value={med.dosage}
                            onChange={(e) => handleChange(index, "dosage", e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                          />
                        </div>

                        {/* Frequency */}
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            <Clock className="inline w-4 h-4 mr-1" />
                            Frequency
                          </label>
                          <select
                            value={med.frequency}
                            onChange={(e) => handleChange(index, "frequency", e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                          >
                            <option value="">Select frequency</option>
                            {frequencyOptions.map(freq => (
                              <option key={freq} value={freq}>{freq}</option>
                            ))}
                          </select>
                        </div>

                        {/* Duration */}
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            <Calendar className="inline w-4 h-4 mr-1" />
                            Duration
                          </label>
                          <select
                            value={med.duration}
                            onChange={(e) => handleChange(index, "duration", e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                          >
                            <option value="">Select duration</option>
                            {durationOptions.map(dur => (
                              <option key={dur} value={dur}>{dur}</option>
                            ))}
                          </select>
                        </div>

                        {/* Notes */}
                        <div className="md:col-span-2">
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            <NotebookPen className="inline w-4 h-4 mr-1" />
                            Special Instructions
                          </label>
                          <textarea
                            placeholder="e.g., Take with food, avoid alcohol..."
                            value={med.notes}
                            onChange={(e) => handleChange(index, "notes", e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none"
                            rows="2"
                          />
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}

              {/* Add Medication Button */}
              <button
                type="button"
                onClick={addMedication}
                className="w-full py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-xl hover:from-green-600 hover:to-emerald-700 transition-all flex items-center justify-center gap-2 font-medium shadow-lg hover:shadow-xl transform hover:scale-[1.02]"
              >
                <Plus className="w-5 h-5" />
                Add Another Medication
              </button>

              {/* Additional Notes Section */}
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                  <FileText className="w-5 h-5 text-blue-600" />
                  Additional Information
                </h3>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      General Instructions
                    </label>
                    <textarea
                      placeholder="Any additional instructions or notes for the prescription..."
                      value={prescriptionNotes}
                      onChange={(e) => setPrescriptionNotes(e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none"
                      rows="3"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <CalendarDays className="inline w-4 h-4 mr-1" />
                      Follow-up Date
                    </label>
                    <input
                      type="date"
                      value={followUpDate}
                      onChange={(e) => setFollowUpDate(e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    />
                  </div>

                  {/* Completion Status */}
                  <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
                    <input
                      type="checkbox"
                      id="isCompleted"
                      checked={isCompleted}
                      onChange={(e) => setIsCompleted(e.target.checked)}
                      className="w-5 h-5 text-blue-600 rounded focus:ring-blue-500"
                    />
                    <label htmlFor="isCompleted" className="font-medium text-gray-700 cursor-pointer">
                      Mark prescription as completed
                    </label>
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className={`w-full py-4 rounded-xl font-semibold text-white transition-all flex items-center justify-center gap-2 shadow-lg ${
                  loading 
                    ? 'bg-gray-400 cursor-not-allowed' 
                    : 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 hover:shadow-xl transform hover:scale-[1.02]'
                }`}
              >
                {loading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Creating Prescription...
                  </>
                ) : (
                  <>
                    <Save className="w-5 h-5" />
                    Create Prescription
                  </>
                )}
              </button>
            </form>

            {/* Message Display */}
            {message && (
              <div className={`mt-6 p-4 rounded-xl flex items-start gap-3 ${
                messageType === 'success' 
                  ? 'bg-green-50 border border-green-200' 
                  : 'bg-red-50 border border-red-200'
              }`}>
                {messageType === 'success' ? (
                  <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                ) : (
                  <XCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                )}
                <div>
                  <p className={`font-semibold ${
                    messageType === 'success' ? 'text-green-900' : 'text-red-900'
                  }`}>
                    {message}
                  </p>
                  {messageType === 'success' && (
                    <p className="text-sm text-green-700 mt-1">
                      The prescription has been saved and sent to the patient.
                    </p>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            {/* Patient Information */}
            <div className="bg-white rounded-xl shadow-lg p-6 sticky top-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                <User className="w-5 h-5 text-blue-600" />
                Patient Information
              </h3>
              <div className="space-y-3">
                <div>
                  <p className="text-sm text-gray-500">Name</p>
                  <p className="font-semibold text-gray-800">{patientData.name}</p>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <p className="text-sm text-gray-500">Age</p>
                    <p className="font-semibold text-gray-800">{patientData.age} years</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Gender</p>
                    <p className="font-semibold text-gray-800">{patientData.gender}</p>
                  </div>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Patient ID</p>
                  <p className="font-mono text-sm text-gray-800">{patientData.id}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Blood Group</p>
                  <p className="font-semibold text-gray-800">{patientData.bloodGroup}</p>
                </div>
                
                {/* Allergies Alert */}
                {patientData.allergies.length > 0 && (
                  <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                    <div className="flex items-start gap-2">
                      <AlertCircle className="w-4 h-4 text-red-600 flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="text-sm font-semibold text-red-800">Allergies</p>
                        <div className="mt-1">
                          {patientData.allergies.map((allergy, idx) => (
                            <span key={idx} className="inline-block text-xs bg-red-100 text-red-700 px-2 py-1 rounded-full mr-2 mt-1">
                              {allergy}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Doctor Information */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                <Stethoscope className="w-5 h-5 text-blue-600" />
                Prescribing Doctor
              </h3>
              <div className="space-y-3">
                <div>
                  <p className="text-sm text-gray-500">Name</p>
                  <p className="font-semibold text-gray-800">{doctorData.name}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Specialization</p>
                  <p className="font-semibold text-gray-800">{doctorData.specialization}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">License</p>
                  <p className="font-mono text-sm text-gray-800">{doctorData.license}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Hospital</p>
                  <p className="font-semibold text-gray-800">{doctorData.hospital}</p>
                </div>
              </div>
            </div>

            {/* Guidelines */}
            <div className="bg-blue-50 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-blue-900 mb-3 flex items-center gap-2">
                <Info className="w-5 h-5" />
                Prescription Guidelines
              </h3>
              <ul className="space-y-2 text-sm text-blue-800">
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
                  <span>Verify patient allergies before prescribing</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
                  <span>Include clear dosage instructions</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
                  <span>Specify duration of treatment</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
                  <span>Add special instructions if needed</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrescriptionForm;