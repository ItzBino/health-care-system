import React, { useContext, useEffect, useState } from "react";
// import { AppointmentContext } from "../context/AppointmentContext";
import { DoctorContext } from "../../context/DoctorContext";
import { format, addMinutes, isBefore, isToday, isTomorrow, startOfDay, addDays } from "date-fns";
import {
  Calendar,
  Clock,
  User,
  MapPin,
  Phone,
  DollarSign,
  ChevronLeft,
  ChevronRight,
  Check,
  AlertCircle,
  Info,
  Loader2,
  Star,
  Shield,
  Award,
  MessageSquare,
  Building2,
  GraduationCap,
  Stethoscope,
  CalendarCheck,
  XCircle,
  ChevronDown
} from 'lucide-react';

const BookingPage = () => {
  const { doctorProfile } = useContext(DoctorContext);
//   const { createAppointment, loading } = useContext(AppointmentContext);
const [loading, setLoading] = useState(false);

  const [selectedDate, setSelectedDate] = useState("");
  const [slots, setSlots] = useState([]);
  const [selectedSlot, setSelectedSlot] = useState("");
  const [reason, setReason] = useState("");
  const [notes, setNotes] = useState("");
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");
  const [showCalendar, setShowCalendar] = useState(false);
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const quickReasons = [
    "General Consultation",
    "Follow-up Visit",
    "Routine Checkup",
    "Specific Symptoms",
    "Prescription Refill",
    "Lab Results Review",
    "Emergency",
    "Other"
  ];

  // Generate calendar days
  const generateCalendarDays = () => {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();
    
    const days = [];
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null);
    }
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(new Date(year, month, i));
    }
    
    return days;
  };

  // Check if doctor works on this day
  const isDoctorAvailable = (date) => {
    if (!doctorProfile?.schedule) return false;
    const dayOfWeek = date.getDay();
    return doctorProfile.schedule.some(s => s.dayOfWeek === dayOfWeek);
  };

  // Generate available slots based on doctor schedule
  useEffect(() => {
    if (!doctorProfile || !selectedDate) return;

    const selectedDay = new Date(selectedDate).getDay();
    const schedule = doctorProfile.schedule.find(
      (s) => s.dayOfWeek === selectedDay
    );

    if (!schedule) {
      setSlots([]);
      return;
    }

    const date = new Date(selectedDate);
    const [startHour, startMin] = schedule.start.split(":").map(Number);
    const [endHour, endMin] = schedule.end.split(":").map(Number);
    const slotMinutes = schedule.slotMinutes || 30;

    let current = new Date(date.setHours(startHour, startMin, 0, 0));
    const end = new Date(date.setHours(endHour, endMin, 0, 0));

    const generated = [];
    const now = new Date();
    
    while (isBefore(current, end)) {
      const slotEnd = addMinutes(current, slotMinutes);
      
      // Only add future slots
      if (current > now) {
        generated.push({
          start: new Date(current),
          end: slotEnd,
        });
      }
      current = slotEnd;
    }
    setSlots(generated);
  }, [doctorProfile, selectedDate]);

  const handleBook = async () => {
    if (!selectedSlot || !reason) {
      setMessage("Please select a time slot and enter a reason");
      setMessageType("error");
      return;
    }

    const payload = {
      start: selectedSlot.start,
      end: selectedSlot.end,
      reason,
      notes,
    };

    const success = await createAppointment(payload);
    if (success) {
      setMessage("Appointment booked successfully!");
      setMessageType("success");
      setSelectedSlot("");
      setReason("");
      setNotes("");
      setSelectedDate("");
    } else {
      setMessage("Failed to book appointment. Please try again.");
      setMessageType("error");
    }
  };

  // Get date label
  const getDateLabel = (date) => {
    if (isToday(date)) return "Today";
    if (isTomorrow(date)) return "Tomorrow";
    return format(date, "EEEE, MMM d");
  };

  // Quick date selection
  const quickDates = [];
  for (let i = 0; i < 7; i++) {
    const date = addDays(new Date(), i);
    if (isDoctorAvailable(date)) {
      quickDates.push(date);
    }
  }

  if (!doctorProfile) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-12 h-12 text-blue-600 animate-spin mx-auto mb-4" />
          <p className="text-gray-600">Loading doctor information...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">Book Your Appointment</h1>
          <p className="text-gray-600">Schedule a consultation with our expert doctor</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Doctor Profile Card */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden sticky top-4">
              {/* Doctor Header */}
              <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-6 text-white">
                <div className="flex items-center gap-4">
                  {doctorProfile.user?.image ? (
                    <img
                      src={doctorProfile.user.image}
                      alt={doctorProfile.user.name}
                      className="w-20 h-20 rounded-full border-4 border-white/30 object-cover"
                    />
                  ) : (
                    <div className="w-20 h-20 rounded-full bg-white/20 flex items-center justify-center">
                      <User className="w-10 h-10 text-white" />
                    </div>
                  )}
                  <div>
                    <h2 className="text-xl font-bold">Dr. {doctorProfile.user?.name}</h2>
                    <p className="text-blue-100">{doctorProfile.specialization}</p>
                    <div className="flex items-center gap-1 mt-2">
                      <Star className="w-4 h-4 fill-current" />
                      <Star className="w-4 h-4 fill-current" />
                      <Star className="w-4 h-4 fill-current" />
                      <Star className="w-4 h-4 fill-current" />
                      <Star className="w-4 h-4" />
                      <span className="text-sm ml-1">4.8</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Doctor Details */}
              <div className="p-6 space-y-4">
                {doctorProfile.experienceYears && (
                  <div className="flex items-center gap-3 text-gray-700">
                    <Award className="w-5 h-5 text-blue-600" />
                    <span>{doctorProfile.experienceYears} years of experience</span>
                  </div>
                )}
                
                {doctorProfile.clinicLocation && doctorProfile.clinicLocation !== 'none' && (
                  <div className="flex items-center gap-3 text-gray-700">
                    <MapPin className="w-5 h-5 text-blue-600" />
                    <span>{doctorProfile.clinicLocation}</span>
                  </div>
                )}
                
                {doctorProfile.phoneNumber && doctorProfile.phoneNumber !== 'Not provided' && (
                  <div className="flex items-center gap-3 text-gray-700">
                    <Phone className="w-5 h-5 text-blue-600" />
                    <span>{doctorProfile.phoneNumber}</span>
                  </div>
                )}

                <div className="flex items-center gap-3 text-gray-700">
                  <DollarSign className="w-5 h-5 text-blue-600" />
                  <span>Consultation Fee: ${doctorProfile.fees}</span>
                </div>

                {doctorProfile.education?.length > 0 && (
                  <div className="flex items-start gap-3 text-gray-700">
                    <GraduationCap className="w-5 h-5 text-blue-600 mt-0.5" />
                    <div>
                      {doctorProfile.education.map((edu, idx) => (
                        <div key={idx}>
                          <span className="font-medium">{edu.degree}</span>
                          <span className="text-gray-500 text-sm block">{edu.college}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Verification Badge */}
                {doctorProfile.verificationStatus === 'VERIFIED' && (
                  <div className="flex items-center gap-2 p-3 bg-green-50 rounded-lg">
                    <Shield className="w-5 h-5 text-green-600" />
                    <span className="text-green-700 font-medium">Verified Doctor</span>
                  </div>
                )}

                {/* Insurance */}
                {doctorProfile.insurance?.length > 0 && (
                  <div className="border-t pt-4">
                    <p className="text-sm font-semibold text-gray-700 mb-2">Insurance Accepted</p>
                    <div className="flex flex-wrap gap-2">
                      {doctorProfile.insurance.map((ins, idx) => (
                        <span key={idx} className="text-xs px-2 py-1 bg-blue-100 text-blue-700 rounded-full">
                          {ins}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Booking Form */}
          <div className="lg:col-span-2 space-y-6">
            {/* Date Selection */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <Calendar className="w-5 h-5 text-blue-600" />
                Select Date
              </h3>

              {/* Quick Date Selection */}
              <div className="mb-4">
                <p className="text-sm text-gray-600 mb-3">Quick Selection</p>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
                  {quickDates.slice(0, 4).map((date, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedDate(format(date, 'yyyy-MM-dd'))}
                      className={`p-3 rounded-lg border-2 transition-all ${
                        selectedDate === format(date, 'yyyy-MM-dd')
                          ? 'border-blue-600 bg-blue-50 text-blue-700'
                          : 'border-gray-200 hover:border-blue-400 hover:bg-gray-50'
                      }`}
                    >
                      <p className="font-semibold text-sm">{getDateLabel(date)}</p>
                      <p className="text-xs text-gray-500">{format(date, 'MMM d')}</p>
                    </button>
                  ))}
                </div>
              </div>

              {/* Calendar Input */}
              <div className="relative">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Or choose a specific date
                </label>
                <div className="relative">
                  <input
                    type="date"
                    className="w-full px-4 py-3 pr-10 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    min={format(new Date(), 'yyyy-MM-dd')}
                  />
                  <Calendar className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
                </div>
              </div>

              {/* Doctor's Schedule Info */}
              {doctorProfile.schedule?.length > 0 && (
                <div className="mt-4 p-4 bg-blue-50 rounded-lg">
                  <div className="flex items-start gap-2">
                    <Info className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm font-semibold text-blue-900">Doctor's Availability</p>
                      <div className="mt-2 grid grid-cols-2 sm:grid-cols-3 gap-2">
                        {doctorProfile.schedule.map((slot, idx) => {
                          const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
                          return (
                            <div key={idx} className="text-xs">
                              <span className="font-medium text-blue-800">{days[slot.dayOfWeek]}:</span>
                              <span className="text-blue-700 ml-1">{slot.start} - {slot.end}</span>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Time Slot Selection */}
            {selectedDate && (
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <Clock className="w-5 h-5 text-blue-600" />
                  Select Time
                </h3>

                {slots.length > 0 ? (
                  <>
                    <p className="text-sm text-gray-600 mb-4">
                      {slots.length} time slots available for {format(new Date(selectedDate), 'EEEE, MMMM d, yyyy')}
                    </p>
                    <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-3">
                      {slots.map((slot, i) => {
                        const isSelected = selectedSlot?.start === slot.start;
                        const timeStr = format(slot.start, "h:mm a");
                        
                        return (
                          <button
                            key={i}
                            onClick={() => setSelectedSlot(slot)}
                            className={`relative p-3 rounded-lg border-2 font-medium transition-all transform hover:scale-105 ${
                              isSelected
                                ? "border-blue-600 bg-blue-600 text-white shadow-lg"
                                : "border-gray-200 hover:border-blue-400 hover:bg-blue-50 bg-white"
                            }`}
                          >
                            <Clock className={`w-4 h-4 mx-auto mb-1 ${isSelected ? 'text-white' : 'text-gray-400'}`} />
                            <span className="text-sm">{timeStr}</span>
                            {isSelected && (
                              <Check className="absolute top-1 right-1 w-4 h-4 text-white" />
                            )}
                          </button>
                        );
                      })}
                    </div>
                  </>
                ) : (
                  <div className="text-center py-8">
                    <AlertCircle className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                    <p className="text-gray-500">No available slots for this date</p>
                    <p className="text-sm text-gray-400 mt-1">Please select another date</p>
                  </div>
                )}
              </div>
            )}

            {/* Reason for Visit */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <MessageSquare className="w-5 h-5 text-blue-600" />
                Appointment Details
              </h3>

              {/* Quick Reason Selection */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Reason for Visit
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {quickReasons.map((quickReason) => (
                    <button
                      key={quickReason}
                      onClick={() => setReason(quickReason)}
                      className={`p-2 rounded-lg border text-sm font-medium transition-all ${
                        reason === quickReason
                          ? 'border-blue-600 bg-blue-50 text-blue-700'
                          : 'border-gray-200 hover:border-blue-400 hover:bg-gray-50'
                      }`}
                    >
                      {quickReason}
                    </button>
                  ))}
                </div>
              </div>

              {/* Custom Reason Input */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {reason === 'Other' ? 'Please specify' : 'Additional details (optional)'}
                </label>
                <textarea
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none"
                  rows="3"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Provide more details about your visit..."
                />
              </div>
            </div>

            {/* Selected Summary */}
            {selectedSlot && (
              <div className="bg-blue-50 border-2 border-blue-200 rounded-2xl p-6">
                <h3 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                  <CalendarCheck className="w-5 h-5 text-blue-600" />
                  Appointment Summary
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                  <div>
                    <span className="text-gray-600">Date:</span>
                    <span className="font-semibold ml-2">
                      {format(new Date(selectedDate), 'EEEE, MMMM d, yyyy')}
                    </span>
                  </div>
                  <div>
                    <span className="text-gray-600">Time:</span>
                    <span className="font-semibold ml-2">
                      {format(selectedSlot.start, "h:mm a")}
                    </span>
                  </div>
                  <div>
                    <span className="text-gray-600">Doctor:</span>
                    <span className="font-semibold ml-2">Dr. {doctorProfile.user?.name}</span>
                  </div>
                  <div>
                    <span className="text-gray-600">Fee:</span>
                    <span className="font-semibold ml-2">${doctorProfile.fees}</span>
                  </div>
                  {reason && (
                    <div className="sm:col-span-2">
                      <span className="text-gray-600">Reason:</span>
                      <span className="font-semibold ml-2">{reason}</span>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={handleBook}
                disabled={loading || !selectedSlot || !reason}
                className={`flex-1 py-4 px-6 rounded-lg font-bold transition-all transform hover:scale-105 flex items-center justify-center gap-2 ${
                  loading || !selectedSlot || !reason
                    ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    : 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:from-blue-700 hover:to-indigo-700 shadow-lg'
                }`}
              >
                {loading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Booking...
                  </>
                ) : (
                  <>
                    <CalendarCheck className="w-5 h-5" />
                    Confirm Booking
                  </>
                )}
              </button>
              
              <button
                onClick={() => {
                  setSelectedDate("");
                  setSelectedSlot("");
                  setReason("");
                  setNotes("");
                }}
                className="px-6 py-4 border-2 border-gray-300 text-gray-700 rounded-lg font-bold hover:bg-gray-50 transition-all"
              >
                Clear Selection
              </button>
            </div>

            {/* Message Display */}
            {message && (
              <div className={`p-4 rounded-lg flex items-start gap-3 ${
                messageType === 'success' 
                  ? 'bg-green-50 border-2 border-green-200' 
                  : 'bg-red-50 border-2 border-red-200'
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
                      You will receive a confirmation email shortly.
                    </p>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingPage;