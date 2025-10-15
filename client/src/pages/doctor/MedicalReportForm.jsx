import React, { useState } from "react";
import axios from "axios";
import { format } from "date-fns";
import {
  FileText,
  Plus,
  Trash2,
  Calendar,
  User,
  Stethoscope,
  Activity,
  Heart,
  Thermometer,
  Ruler,
  Weight,
  Droplets,
  ClipboardList,
  CheckCircle,
  XCircle,
  AlertCircle,
  Save,
  ChevronDown,
  Info,
  Loader2,
  CalendarDays,
  NotebookPen,
  TrendingUp,
  Shield,
  Clock,
  Building,
  Hash,
  UserCheck,
  Copy,
  Edit3,
  Zap,
  AlertTriangle,
  Microscope,
  Pill,
  HeartPulse,
  Brain,
  Eye,
  Bone
} from 'lucide-react';

const MedicalReportForm = ({ patientId, doctorId, onSuccess }) => {
  const [visitDate, setVisitDate] = useState(format(new Date(), "yyyy-MM-dd"));
  const [diagnoses, setDiagnoses] = useState([{ primary: true, code: "", description: "" }]);
  const [vitals, setVitals] = useState({ 
    height: "", 
    weight: "", 
    bp: "", 
    pulse: "", 
    temp: "",
    oxygen: "",
    glucose: "",
    respRate: ""
  });
  const [symptoms, setSymptoms] = useState([""]);
  const [labTests, setLabTests] = useState([{ name: "", result: "", status: "normal" }]);
  const [treatmentPlan, setTreatmentPlan] = useState("");
  const [followUpDate, setFollowUpDate] = useState("");
  const [status, setStatus] = useState("PENDING");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");
  const [expandedSections, setExpandedSections] = useState(['vitals', 'diagnosis', 'treatment']);
  const [reportNotes, setReportNotes] = useState("");

  // Sample patient and doctor data (replace with actual data)
  const patientData = {
    name: "John Doe",
    age: 45,
    gender: "Male",
    bloodGroup: "O+",
    id: "PAT-001234",
    phone: "+1234567890",
    email: "john.doe@email.com",
    lastVisit: "2024-01-10",
    conditions: ["Hypertension", "Diabetes Type 2"],
    allergies: ["Penicillin", "Peanuts"]
  };

  const doctorData = {
    name: "Dr. Sarah Johnson",
    specialization: "Internal Medicine",
    license: "MD-123456",
    hospital: "City Medical Center",
    department: "General Medicine"
  };

  // Common symptoms for quick selection
  const commonSymptoms = [
    "Fever", "Headache", "Cough", "Fatigue", "Chest Pain",
    "Shortness of Breath", "Nausea", "Dizziness", "Body Aches"
  ];

  // Common diagnoses templates
  const diagnosisTemplates = [
    { code: "J06.9", description: "Acute upper respiratory infection" },
    { code: "I10", description: "Essential (primary) hypertension" },
    { code: "E11.9", description: "Type 2 diabetes mellitus" },
    { code: "J20.9", description: "Acute bronchitis" },
    { code: "K29.7", description: "Gastritis" }
  ];

  // Toggle section expansion
  const toggleSection = (section) => {
    if (expandedSections.includes(section)) {
      setExpandedSections(expandedSections.filter(s => s !== section));
    } else {
      setExpandedSections([...expandedSections, section]);
    }
  };

  // Calculate BMI
  const calculateBMI = () => {
    if (vitals.height && vitals.weight) {
      const heightInM = parseFloat(vitals.height) / 100;
      const bmi = (parseFloat(vitals.weight) / (heightInM * heightInM)).toFixed(1);
      return bmi;
    }
    return null;
  };

  // Get BMI Category
  const getBMICategory = (bmi) => {
    if (!bmi) return "";
    const value = parseFloat(bmi);
    if (value < 18.5) return { text: "Underweight", color: "text-yellow-600" };
    if (value < 25) return { text: "Normal", color: "text-green-600" };
    if (value < 30) return { text: "Overweight", color: "text-orange-600" };
    return { text: "Obese", color: "text-red-600" };
  };

  // Handle vitals change
  const handleVitalsChange = (field, value) => {
    setVitals({ ...vitals, [field]: value });
  };

  // Handle diagnoses
  const handleDiagnosisChange = (index, field, value) => {
    const updated = [...diagnoses];
    updated[index][field] = value;
    setDiagnoses(updated);
  };

  const addDiagnosis = () => {
    setDiagnoses([...diagnoses, { primary: false, code: "", description: "" }]);
  };

  const removeDiagnosis = (index) => {
    if (diagnoses.length > 1) {
      setDiagnoses(diagnoses.filter((_, i) => i !== index));
    }
  };

  const useDiagnosisTemplate = (template, index) => {
    const updated = [...diagnoses];
    updated[index] = { ...updated[index], ...template };
    setDiagnoses(updated);
  };

  // Handle symptoms
  const handleSymptomChange = (index, value) => {
    const updated = [...symptoms];
    updated[index] = value;
    setSymptoms(updated);
  };

  const addSymptom = () => setSymptoms([...symptoms, ""]);
  const removeSymptom = (index) => {
    if (symptoms.length > 1) {
      setSymptoms(symptoms.filter((_, i) => i !== index));
    }
  };

  const addQuickSymptom = (symptom) => {
    if (!symptoms.includes(symptom)) {
      const emptyIndex = symptoms.findIndex(s => s === "");
      if (emptyIndex !== -1) {
        const updated = [...symptoms];
        updated[emptyIndex] = symptom;
        setSymptoms(updated);
      } else {
        setSymptoms([...symptoms, symptom]);
      }
    }
  };

  // Handle lab tests
  const handleLabTestChange = (index, field, value) => {
    const updated = [...labTests];
    updated[index][field] = value;
    setLabTests(updated);
  };

  const addLabTest = () => {
    setLabTests([...labTests, { name: "", result: "", status: "normal" }]);
  };

  const removeLabTest = (index) => {
    if (labTests.length > 1) {
      setLabTests(labTests.filter((_, i) => i !== index));
    }
  };

  // Get vital status indicators
  const getVitalStatus = (type, value) => {
    if (!value) return null;
    
    const ranges = {
      bp: { 
        normal: { systolic: [90, 120], diastolic: [60, 80] },
        elevated: { systolic: [120, 130], diastolic: [80, 90] },
        high: { systolic: [130, 180], diastolic: [90, 120] }
      },
      pulse: { normal: [60, 100], low: [0, 60], high: [100, 200] },
      temp: { normal: [36, 37.5], low: [0, 36], high: [37.5, 42] },
      oxygen: { normal: [95, 100], low: [0, 95] }
    };

    // Implement actual logic based on ranges
    // This is simplified for demonstration
    return { status: "normal", color: "text-green-600" };
  };

  // Submit form
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    setMessageType("");

    // Validate required fields
    const validDiagnoses = diagnoses.filter(d => d.description);
    if (validDiagnoses.length === 0) {
      setMessage("Please add at least one diagnosis");
      setMessageType("error");
      setLoading(false);
      return;
    }

    try {
      const payload = {
        patient: patientId,
        doctor: doctorId,
        visitDate,
        diagnoses: validDiagnoses,
        vitals,
        symptoms: symptoms.filter(s => s !== ""),
        labTests: labTests.filter(l => l.name !== ""),
        treatmentPlan,
        followUpDate: followUpDate || null,
        status,
        reportNotes,
        bmi: calculateBMI()
      };

      const res = await axios.post("/api/medical-reports", payload);

      if (res.data.success) {
        setMessage("Medical report created successfully!");
        setMessageType("success");
        // Reset form
        setDiagnoses([{ primary: true, code: "", description: "" }]);
        setVitals({ height: "", weight: "", bp: "", pulse: "", temp: "", oxygen: "", glucose: "", respRate: "" });
        setSymptoms([""]);
        setLabTests([{ name: "", result: "", status: "normal" }]);
        setTreatmentPlan("");
        setFollowUpDate("");
        setStatus("PENDING");
        setReportNotes("");
        if (onSuccess) onSuccess();
      }
    } catch (err) {
      console.error(err);
      setMessage("Failed to create medical report. Please try again.");
      setMessageType("error");
    } finally {
      setLoading(false);
    }
  };

  const bmi = calculateBMI();
  const bmiCategory = getBMICategory(bmi);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-2xl shadow-xl mb-6 overflow-hidden">
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div className="flex items-center gap-3">
                <div className="bg-white/20 backdrop-blur-sm p-3 rounded-xl">
                  <FileText className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h1 className="text-2xl sm:text-3xl font-bold text-white">Medical Report</h1>
                  <p className="text-blue-100 mt-1">Create comprehensive patient medical report</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-white text-sm">
                  Visit Date: {format(new Date(visitDate), "MMM dd, yyyy")}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Form Section */}
          <div className="lg:col-span-2 space-y-6">
            <form onSubmit={handleSubmit}>
              {/* Visit Information */}
              <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-blue-600" />
                  Visit Information
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Visit Date
                    </label>
                    <input
                      type="date"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      value={visitDate}
                      onChange={(e) => setVisitDate(e.target.value)}
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Report Status
                    </label>
                    <select
                      value={status}
                      onChange={(e) => setStatus(e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="PENDING">Pending</option>
                      <option value="COMPLETED">Completed</option>
                      <option value="REVIEWED">Reviewed</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Symptoms Section */}
              <div className="bg-white rounded-xl shadow-lg overflow-hidden mb-6">
                <div 
                  className="bg-gradient-to-r from-gray-50 to-gray-100 px-6 py-4 cursor-pointer"
                  onClick={() => toggleSection('symptoms')}
                >
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                      <Activity className="w-5 h-5 text-orange-600" />
                      Symptoms
                    </h3>
                    <ChevronDown className={`w-5 h-5 transition-transform ${
                      expandedSections.includes('symptoms') ? 'rotate-180' : ''
                    }`} />
                  </div>
                </div>
                
                {expandedSections.includes('symptoms') && (
                  <div className="p-6">
                    {/* Quick Symptoms */}
                    <div className="mb-4">
                      <p className="text-sm text-gray-600 mb-2">Quick Add Common Symptoms:</p>
                      <div className="flex flex-wrap gap-2">
                        {commonSymptoms.map((symptom) => (
                          <button
                            key={symptom}
                            type="button"
                            onClick={() => addQuickSymptom(symptom)}
                            className={`px-3 py-1 rounded-full text-sm transition-all ${
                              symptoms.includes(symptom)
                                ? 'bg-orange-600 text-white'
                                : 'bg-gray-100 hover:bg-orange-100 text-gray-700'
                            }`}
                          >
                            {symptom}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Symptom Inputs */}
                    <div className="space-y-2">
                      {symptoms.map((symptom, index) => (
                        <div key={index} className="flex gap-2">
                          <input
                            type="text"
                            placeholder={`Symptom ${index + 1}`}
                            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                            value={symptom}
                            onChange={(e) => handleSymptomChange(index, e.target.value)}
                          />
                          {symptoms.length > 1 && (
                            <button
                              type="button"
                              onClick={() => removeSymptom(index)}
                              className="p-2 text-red-500 hover:bg-red-50 rounded-lg"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          )}
                        </div>
                      ))}
                    </div>
                    <button
                      type="button"
                      onClick={addSymptom}
                      className="mt-3 text-blue-600 hover:text-blue-700 font-medium flex items-center gap-1"
                    >
                      <Plus className="w-4 h-4" />
                      Add Symptom
                    </button>
                  </div>
                )}
              </div>

              {/* Vitals Section */}
              <div className="bg-white rounded-xl shadow-lg overflow-hidden mb-6">
                <div 
                  className="bg-gradient-to-r from-gray-50 to-gray-100 px-6 py-4 cursor-pointer"
                  onClick={() => toggleSection('vitals')}
                >
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                      <HeartPulse className="w-5 h-5 text-red-600" />
                      Vital Signs
                    </h3>
                    <ChevronDown className={`w-5 h-5 transition-transform ${
                      expandedSections.includes('vitals') ? 'rotate-180' : ''
                    }`} />
                  </div>
                </div>
                
                {expandedSections.includes('vitals') && (
                  <div className="p-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {/* Height */}
                      <div className="relative">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          <Ruler className="inline w-4 h-4 mr-1" />
                          Height (cm)
                        </label>
                        <input
                          type="number"
                          placeholder="170"
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                          value={vitals.height}
                          onChange={(e) => handleVitalsChange("height", e.target.value)}
                        />
                      </div>

                      {/* Weight */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          <Weight className="inline w-4 h-4 mr-1" />
                          Weight (kg)
                        </label>
                        <input
                          type="number"
                          placeholder="70"
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                          value={vitals.weight}
                          onChange={(e) => handleVitalsChange("weight", e.target.value)}
                        />
                      </div>

                      {/* BMI Display */}
                      {bmi && (
                        <div className="bg-gray-50 rounded-lg p-3">
                          <p className="text-sm text-gray-600">BMI</p>
                          <p className="text-xl font-bold">{bmi}</p>
                          <p className={`text-sm font-medium ${bmiCategory.color}`}>
                            {bmiCategory.text}
                          </p>
                        </div>
                      )}

                      {/* Blood Pressure */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          <Heart className="inline w-4 h-4 mr-1" />
                          Blood Pressure
                        </label>
                        <input
                          type="text"
                          placeholder="120/80"
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                          value={vitals.bp}
                          onChange={(e) => handleVitalsChange("bp", e.target.value)}
                        />
                      </div>

                      {/* Pulse */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          <Activity className="inline w-4 h-4 mr-1" />
                          Pulse (bpm)
                        </label>
                        <input
                          type="number"
                          placeholder="72"
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                          value={vitals.pulse}
                          onChange={(e) => handleVitalsChange("pulse", e.target.value)}
                        />
                      </div>

                      {/* Temperature */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          <Thermometer className="inline w-4 h-4 mr-1" />
                          Temperature (°C)
                        </label>
                        <input
                          type="number"
                          step="0.1"
                          placeholder="36.5"
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                          value={vitals.temp}
                          onChange={(e) => handleVitalsChange("temp", e.target.value)}
                        />
                      </div>

                      {/* Oxygen Saturation */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          <Droplets className="inline w-4 h-4 mr-1" />
                          O₂ Saturation (%)
                        </label>
                        <input
                          type="number"
                          placeholder="98"
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                          value={vitals.oxygen}
                          onChange={(e) => handleVitalsChange("oxygen", e.target.value)}
                        />
                      </div>

                      {/* Blood Glucose */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          <TrendingUp className="inline w-4 h-4 mr-1" />
                          Glucose (mg/dL)
                        </label>
                        <input
                          type="number"
                          placeholder="90"
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                          value={vitals.glucose}
                          onChange={(e) => handleVitalsChange("glucose", e.target.value)}
                        />
                      </div>

                      {/* Respiratory Rate */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          <Activity className="inline w-4 h-4 mr-1" />
                          Resp. Rate
                        </label>
                        <input
                          type="number"
                          placeholder="16"
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                          value={vitals.respRate}
                          onChange={(e) => handleVitalsChange("respRate", e.target.value)}
                        />
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Diagnosis Section */}
              <div className="bg-white rounded-xl shadow-lg overflow-hidden mb-6">
                <div 
                  className="bg-gradient-to-r from-gray-50 to-gray-100 px-6 py-4 cursor-pointer"
                  onClick={() => toggleSection('diagnosis')}
                >
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                      <Microscope className="w-5 h-5 text-purple-600" />
                      Diagnosis
                    </h3>
                    <ChevronDown className={`w-5 h-5 transition-transform ${
                      expandedSections.includes('diagnosis') ? 'rotate-180' : ''
                    }`} />
                  </div>
                </div>
                
                {expandedSections.includes('diagnosis') && (
                  <div className="p-6">
                    {/* Quick Templates */}
                    <div className="mb-4 p-3 bg-purple-50 rounded-lg">
                      <p className="text-sm font-medium text-purple-900 mb-2">Quick Templates:</p>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {diagnosisTemplates.map((template, idx) => (
                          <button
                            key={idx}
                            type="button"
                            onClick={() => useDiagnosisTemplate(template, 0)}
                            className="text-left p-2 bg-white hover:bg-purple-100 rounded border border-purple-200 transition-all"
                          >
                            <span className="font-mono text-xs text-purple-600">{template.code}</span>
                            <p className="text-sm text-gray-700">{template.description}</p>
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Diagnosis Inputs */}
                    <div className="space-y-3">
                      {diagnoses.map((diag, index) => (
                        <div key={index} className="p-4 bg-gray-50 rounded-lg">
                          <div className="flex items-center justify-between mb-2">
                            <label className="flex items-center gap-2">
                              <input
                                type="checkbox"
                                checked={diag.primary}
                                onChange={(e) => handleDiagnosisChange(index, "primary", e.target.checked)}
                                className="w-4 h-4 text-blue-600 rounded"
                              />
                              <span className="font-medium text-gray-700">
                                {diag.primary ? 'Primary Diagnosis' : `Secondary Diagnosis ${index}`}
                              </span>
                            </label>
                            {diagnoses.length > 1 && (
                              <button
                                type="button"
                                onClick={() => removeDiagnosis(index)}
                                className="text-red-500 hover:bg-red-50 p-1 rounded"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            )}
                          </div>
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                            <input
                              type="text"
                              placeholder="ICD Code"
                              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                              value={diag.code}
                              onChange={(e) => handleDiagnosisChange(index, "code", e.target.value)}
                            />
                            <input
                              type="text"
                              placeholder="Diagnosis description"
                              className="md:col-span-2 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                              value={diag.description}
                              onChange={(e) => handleDiagnosisChange(index, "description", e.target.value)}
                              required
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                    <button
                      type="button"
                      onClick={addDiagnosis}
                      className="mt-3 text-purple-600 hover:text-purple-700 font-medium flex items-center gap-1"
                    >
                      <Plus className="w-4 h-4" />
                      Add Diagnosis
                    </button>
                  </div>
                )}
              </div>

              {/* Lab Tests Section */}
              <div className="bg-white rounded-xl shadow-lg overflow-hidden mb-6">
                <div 
                  className="bg-gradient-to-r from-gray-50 to-gray-100 px-6 py-4 cursor-pointer"
                  onClick={() => toggleSection('labtests')}
                >
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                      <ClipboardList className="w-5 h-5 text-green-600" />
                      Lab Tests
                    </h3>
                    <ChevronDown className={`w-5 h-5 transition-transform ${
                      expandedSections.includes('labtests') ? 'rotate-180' : ''
                    }`} />
                  </div>
                </div>
                
                {expandedSections.includes('labtests') && (
                  <div className="p-6">
                    <div className="space-y-3">
                      {labTests.map((test, index) => (
                        <div key={index} className="grid grid-cols-1 md:grid-cols-4 gap-3">
                          <input
                            type="text"
                            placeholder="Test name"
                            className="md:col-span-2 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                            value={test.name}
                            onChange={(e) => handleLabTestChange(index, "name", e.target.value)}
                          />
                          <input
                            type="text"
                            placeholder="Result"
                            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                            value={test.result}
                            onChange={(e) => handleLabTestChange(index, "result", e.target.value)}
                          />
                          <div className="flex gap-2">
                            <select
                              value={test.status}
                              onChange={(e) => handleLabTestChange(index, "status", e.target.value)}
                              className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                            >
                              <option value="normal">Normal</option>
                              <option value="abnormal">Abnormal</option>
                              <option value="critical">Critical</option>
                            </select>
                            {labTests.length > 1 && (
                              <button
                                type="button"
                                onClick={() => removeLabTest(index)}
                                className="p-2 text-red-500 hover:bg-red-50 rounded-lg"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                    <button
                      type="button"
                      onClick={addLabTest}
                      className="mt-3 text-green-600 hover:text-green-700 font-medium flex items-center gap-1"
                    >
                      <Plus className="w-4 h-4" />
                      Add Lab Test
                    </button>
                  </div>
                )}
              </div>

              {/* Treatment Plan Section */}
              <div className="bg-white rounded-xl shadow-lg overflow-hidden mb-6">
                <div 
                  className="bg-gradient-to-r from-gray-50 to-gray-100 px-6 py-4 cursor-pointer"
                  onClick={() => toggleSection('treatment')}
                >
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                      <Pill className="w-5 h-5 text-blue-600" />
                      Treatment Plan
                    </h3>
                    <ChevronDown className={`w-5 h-5 transition-transform ${
                      expandedSections.includes('treatment') ? 'rotate-180' : ''
                    }`} />
                  </div>
                </div>
                
                {expandedSections.includes('treatment') && (
                  <div className="p-6">
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Treatment Details
                        </label>
                        <textarea
                          placeholder="Enter treatment plan, medications, procedures, and recommendations..."
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 resize-none"
                          rows="5"
                          value={treatmentPlan}
                          onChange={(e) => setTreatmentPlan(e.target.value)}
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Additional Notes
                        </label>
                        <textarea
                          placeholder="Any additional observations or recommendations..."
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 resize-none"
                          rows="3"
                          value={reportNotes}
                          onChange={(e) => setReportNotes(e.target.value)}
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          <CalendarDays className="inline w-4 h-4 mr-1" />
                          Follow-up Date
                        </label>
                        <input
                          type="date"
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                          value={followUpDate}
                          onChange={(e) => setFollowUpDate(e.target.value)}
                        />
                      </div>
                    </div>
                  </div>
                )}
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
                    Creating Report...
                  </>
                ) : (
                  <>
                    <Save className="w-5 h-5" />
                    Create Medical Report
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
                      The medical report has been saved successfully.
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
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <p className="text-sm text-gray-500">Patient ID</p>
                    <p className="font-mono text-sm text-gray-800">{patientData.id}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Blood Group</p>
                    <p className="font-semibold text-gray-800">{patientData.bloodGroup}</p>
                  </div>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Last Visit</p>
                  <p className="font-semibold text-gray-800">{patientData.lastVisit}</p>
                </div>
                
                {/* Medical Conditions */}
                {patientData.conditions.length > 0 && (
                  <div className="pt-3 border-t">
                    <p className="text-sm text-gray-500 mb-2">Medical Conditions</p>
                    <div className="flex flex-wrap gap-2">
                      {patientData.conditions.map((condition, idx) => (
                        <span key={idx} className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full">
                          {condition}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Allergies Alert */}
                {patientData.allergies.length > 0 && (
                  <div className="mt-3 p-3 bg-red-50 border border-red-200 rounded-lg">
                    <div className="flex items-start gap-2">
                      <AlertTriangle className="w-4 h-4 text-red-600 flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="text-sm font-semibold text-red-800">Allergies</p>
                        <div className="mt-1 flex flex-wrap gap-1">
                          {patientData.allergies.map((allergy, idx) => (
                            <span key={idx} className="text-xs bg-red-100 text-red-700 px-2 py-1 rounded-full">
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
                Attending Physician
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
                  <p className="text-sm text-gray-500">Department</p>
                  <p className="font-semibold text-gray-800">{doctorData.department}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Hospital</p>
                  <p className="font-semibold text-gray-800">{doctorData.hospital}</p>
                </div>
              </div>
            </div>

            {/* Report Guidelines */}
            <div className="bg-blue-50 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-blue-900 mb-3 flex items-center gap-2">
                <Info className="w-5 h-5" />
                Report Guidelines
              </h3>
              <ul className="space-y-2 text-sm text-blue-800">
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
                  <span>Record all vital signs accurately</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
                  <span>Include primary and secondary diagnoses</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
                  <span>Document all symptoms reported</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
                  <span>Provide detailed treatment plan</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
                  <span>Schedule follow-up if necessary</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MedicalReportForm;