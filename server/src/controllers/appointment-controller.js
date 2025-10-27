import Appointment from "../models/Appointment.js";
import DoctorProfile from "../models/DoctorProfile.js";

export const bookAppointment = async (req, res) => {

    try {

        const {slotDate, slotTime,reason,notes } = req.body
        const { docId } = req.params
        const userId = req.patient.id
        const docData = await 
        DoctorProfile.findOne({user: docId})

        if (!docData.available) {
            return res.json({ success: false, message: 'Doctor Not Available' })
        }

        let slots_booked = docData.slots_booked

        // checking for slot availablity 
        if (slots_booked[slotDate]) {
            if (slots_booked[slotDate].includes(slotTime)) {
                return res.json({ success: false, message: 'Slot Not Available' })
            }
            else {
                slots_booked[slotDate].push(slotTime)
            }
        } else {
            slots_booked[slotDate] = []
            slots_booked[slotDate].push(slotTime)
        }


        delete docData.slots_booked

        const appointmentData = {
            patient: userId,
            doctor: docId,
            amount: docData.fees,
            slotTime,
            slotDate,
            reason,
            notes,
        }

        const newAppointment = new Appointment(appointmentData)
        await newAppointment.save()

        // save new slots data in docData
        await 
        DoctorProfile.findOneAndUpdate({user: docId}, { slots_booked })

        res.json({ success: true, message: 'Appointment Booked' })

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }

}