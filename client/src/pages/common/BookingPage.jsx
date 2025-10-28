import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { api } from '../../api/auth'
import { UserContext } from '../../context/UserContext'
import { AuthContext } from '../../context/AuthContext'

const Appointment = () => {
    const { docId } = useParams()
    const { doctor, fetchDoctors } = useContext(UserContext)
    const { token } = useContext(AuthContext)
    const daysOfWeek = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT']

    const [docInfo, setDocInfo] = useState(false)
    const [docSlots, setDocSlots] = useState([])
    const [slotIndex, setSlotIndex] = useState(0)
    const [slotTime, setSlotTime] = useState('')
    const [reason, setReason] = useState('')
    const [notes, setNotes] = useState('')

    const navigate = useNavigate()

    const fetchDocInfo = async () => {
        const docInfo = doctor.find((doc) => doc.user._id === docId)
        setDocInfo(docInfo)
    }

    const getAvailableSolts = async () => {
        setDocSlots([])

        // getting current date
        let today = new Date()

        for (let i = 0; i < 7; i++) {
            // getting date with index 
            let currentDate = new Date(today)
            currentDate.setDate(today.getDate() + i)

            // setting end time of the date with index
            let endTime = new Date()
            endTime.setDate(today.getDate() + i)
            endTime.setHours(21, 0, 0, 0)

            // setting hours 
            if (today.getDate() === currentDate.getDate()) {
                currentDate.setHours(currentDate.getHours() > 10 ? currentDate.getHours() + 1 : 10)
                currentDate.setMinutes(currentDate.getMinutes() > 30 ? 30 : 0)
            } else {
                currentDate.setHours(10)
                currentDate.setMinutes(0)
            }

            let timeSlots = [];

            while (currentDate < endTime) {
                let formattedTime = currentDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

                let day = currentDate.getDate()
                let month = currentDate.getMonth() + 1
                let year = currentDate.getFullYear()

                const slotDate = day + "_" + month + "_" + year
                const slotTime = formattedTime

                const isSlotAvailable = docInfo.slots_booked[slotDate] && docInfo.slots_booked[slotDate].includes(slotTime) ? false : true

                if (isSlotAvailable) {
                    // Add slot to array
                    timeSlots.push({
                        datetime: new Date(currentDate),
                        time: formattedTime
                    })
                }

                // Increment current time by 30 minutes
                currentDate.setMinutes(currentDate.getMinutes() + 30);
            }

            setDocSlots(prev => ([...prev, timeSlots]))
        }
    }

    const bookAppointment = async () => {
        if (!token) {
            toast.warning('Login to book appointment')
            return navigate('/login')
        }

        const date = docSlots[slotIndex][0].datetime

        let day = date.getDate()
        let month = date.getMonth() + 1
        let year = date.getFullYear()

        const slotDate = day + "_" + month + "_" + year

        try {
            const { data } = await api.post(`/api/book-appointment/${docId}`, { slotDate, slotTime, notes, reason })
            if (data.success) {
                alert(data.message)
                fetchDoctors()
                navigate('/profile/my-appointments')
            } else {
                alert(data.message)
            }
        } catch (error) {
            console.log(error)
            alert(error.message)
        }
    }

    useEffect(() => {
        if (doctor.length > 0) {
            fetchDocInfo()
        }
    }, [doctor, docId])

    useEffect(() => {
        if (docInfo) {
            getAvailableSolts()
        }
    }, [docInfo])

    return docInfo ? (
        <div className="min-h-screen bg-gray-50 py-6 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                {/* Doctor Info Card */}
                <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
                    <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
                        <div className="relative">
                            <img 
                                src={docInfo.user.image} 
                                alt={docInfo.name} 
                                className="w-32 h-32 sm:w-40 sm:h-40 rounded-full object-cover border-4 border-blue-100"
                            />
                            {docInfo.verificationStatus === 'verified' && (
                                <div className="absolute bottom-2 right-2 bg-green-500 text-white text-xs px-2 py-1 rounded-full flex items-center gap-1">
                                    <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                    </svg>
                                    Verified
                                </div>
                            )}
                        </div>
                        
                        <div className="text-center sm:text-left flex-1">
                            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
                                Dr. {docInfo?.user.name}
                            </h1>
                            <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 text-gray-600">
                                <span className="inline-flex items-center gap-1">
                                    <svg className="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                    </svg>
                                    {docInfo.specialization}
                                </span>
                                <span className="inline-flex items-center gap-1">
                                    <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                    Consultation Fee: ${docInfo?.fees}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Booking Section */}
                <div className="bg-white rounded-xl shadow-lg p-6">
                    <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                        <svg className="w-6 h-6 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        Select Appointment Date & Time
                    </h2>

                    {/* Date Selection */}
                    <div className="mb-8">
                        <p className="text-gray-700 font-medium mb-4">Choose Date</p>
                        <div className="flex gap-3 overflow-x-auto pb-3 scrollbar-hide">
                            {docSlots.length > 0 && docSlots.map((item, index) => (
                                <div 
                                    onClick={() => setSlotIndex(index)} 
                                    key={index} 
                                    className={`flex flex-col items-center justify-center min-w-[80px] h-20 rounded-xl cursor-pointer transition-all duration-200 ${
                                        slotIndex === index 
                                            ? 'bg-blue-500 text-white shadow-lg scale-105' 
                                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                    }`}
                                >
                                    <p className="text-sm font-medium">
                                        {item[0] && daysOfWeek[item[0].datetime.getDay()]}
                                    </p>
                                    <p className="text-2xl font-bold">
                                        {item[0] && item[0].datetime.getDate()}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Time Selection */}
                    <div className="mb-8">
                        <p className="text-gray-700 font-medium mb-4">Choose Time</p>
                        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-3">
                            {docSlots.length > 0 && docSlots[slotIndex].map((item, index) => (
                                <button
                                    onClick={() => setSlotTime(item.time)} 
                                    key={index} 
                                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                                        item.time === slotTime 
                                            ? 'bg-blue-500 text-white shadow-md' 
                                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                    }`}
                                >
                                    {item.time.toLowerCase()}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Reason and Notes */}
                    <div className="space-y-6 mb-8">
                        <div>
                            <label className="block text-gray-700 font-medium mb-2">
                                Reason for Visit
                            </label>
                            <input 
                                type="text" 
                                placeholder="e.g., Regular checkup, Fever, Consultation" 
                                value={reason} 
                                onChange={(e) => setReason(e.target.value)}
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-200"
                            />
                        </div>

                        <div>
                            <label className="block text-gray-700 font-medium mb-2">
                                Additional Notes
                            </label>
                            <textarea 
                                placeholder="Any additional information you'd like to share with the doctor" 
                                value={notes} 
                                onChange={(e) => setNotes(e.target.value)}
                                rows="4"
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-200 resize-none"
                            />
                        </div>
                    </div>

                    {/* Book Button */}
                    <button 
                        onClick={bookAppointment}
                        disabled={!slotTime || !reason}
                        className={`w-full py-4 rounded-lg font-semibold text-white transition-all duration-200 ${
                            slotTime && reason
                                ? 'bg-blue-500 hover:bg-blue-600 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5'
                                : 'bg-gray-400 cursor-not-allowed'
                        }`}
                    >
                        Book Appointment
                    </button>
                </div>
            </div>
        </div>
    ) : (
        <div className="min-h-screen flex items-center justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
        </div>
    )
}

export default Appointment