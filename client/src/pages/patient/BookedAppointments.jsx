import React, { useEffect, useState } from 'react';
import { Calendar, Clock, User, ChevronRight } from 'lucide-react';
import { api } from '../../api/auth'

const BookedAppointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const fetchAppointments = async () => {
    setLoading(true);
    try {
       const response = await api.get('/api/patient/my-appointment');
       if(response.data.success){
         setAppointments(response.data.data);
         console.log(response.data.data);
         setLoading(false);
       }
    } catch (error) {
      console.log(error);
      setLoading(false);
      
    }
  }

  useEffect(() => {
    fetchAppointments();
  }, []);
  return (
    <div className="p-6 lg:p-8">
      {
        appointments.map((appointment, index) => (
          <div key={appointment._id}>
            <div className="flex justify-between">
              <div className="flex items-center">
                <img src={appointment.doctor.image} alt={appointment.doctor.name} className="w-12 h-12 rounded-full mr-4" />
                <div>
                  <h2 className="text-lg font-semibold">{appointment.doctor.name}</h2>
               
                </div>
              </div>
              <div className="flex items-center">
                <Calendar className="mr-2" />
                <p className="text-sm text-gray-600">{appointment.slotDate}</p> {/* backend response is 2025_10_31 */}
              </div>
              <div className="flex items-center">
                <Clock className="mr-2" />
                <p className="text-sm text-gray-600">{appointment.slotTime}</p> {/* backend response is 10:00 AM */}
              </div>
              <div className="flex items-center">
                <User className="mr-2" />
                <p className="text-sm text-gray-600">{appointment.patient.name}</p>
              </div>
              <div className="flex items-center">
                <ChevronRight className="mr-2" />
                <p className="text-sm text-gray-600">{appointment.status}</p>
              </div>
            </div>
            <button>cancel</button>
          </div>
        ))
      }
    </div>
  );
};

export default BookedAppointments;