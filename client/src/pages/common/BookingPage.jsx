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

            const { data } = await api.post(`/api/book-appointment/${docId}`, { slotDate, slotTime,notes,reason },)
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
        <div>

               

            {/* Booking slots */}
            <div>
                <div>
                    <img src={docInfo.user.image} alt={docInfo.name} />
                    <p>Dr. {docInfo.name}</p>
                    
                    <p>{docInfo.specialization}</p>
                    <p>{docInfo.fees}</p>
                    <p>{docInfo.verificationStatus}</p>

                </div>
                <p >Booking slots</p>
                <div className='flex gap-3 items-center w-full overflow-x-scroll mt-4'>
                    {docSlots.length && docSlots.map((item, index) => (
                        <div onClick={() => setSlotIndex(index)} key={index} className={`text-center py-6 min-w-16 rounded-full cursor-pointer ${slotIndex === index ? ' text-black' : 'border'}`}>
                            <p>{item[0] && daysOfWeek[item[0].datetime.getDay()]}</p>
                            <p>{item[0] && item[0].datetime.getDate()}</p>
                        </div>
                    ))}
                </div>

                <div className='flex items-center gap-3 w-full overflow-x-scroll mt-4'>
                    {docSlots.length && docSlots[slotIndex].map((item, index) => (
                        <p onClick={() => setSlotTime(item.time)} key={index} className={`text-sm font-light  flex-shrink-0 px-5 py-2 rounded-full cursor-pointer ${item.time === slotTime ? 'text-black' : 'text-black'}`}>{item.time.toLowerCase()}</p>
                    ))}
                </div>
                <div>
                    <p>Reason</p>
                    <input type="text" placeholder='Reason'  value={reason} onChange={(e) => setReason(e.target.value)} />
                </div>
                <div>
                    <p>Notes</p>
                    <input type="text" placeholder='Notes' value={notes} onChange={(e) => setNotes(e.target.value)} />
                </div>

                <button onClick={bookAppointment} >Book an appointment</button>
            </div>

           
        </div>
    ) : null
}

export default Appointment