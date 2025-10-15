import {  User,
  ChevronRight,
Calendar,} from "lucide-react";

export const Booking = () => {
    return (
         <button className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-3 px-4 rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all font-semibold shadow-md hover:shadow-lg transform hover:-translate-y-0.5 flex items-center justify-center gap-2">
                            <Calendar className="w-5 h-5" />
                            Book Appointment
                          </button>
    )
}

export const ViewDetails = () => {
  return (
    <button className="w-full bg-white border-2 border-gray-200 text-gray-700 py-3 px-4 rounded-xl hover:border-blue-500 hover:text-blue-600 hover:bg-blue-50 transition-all font-semibold flex items-center justify-center gap-2 group">
      <User className="w-5 h-5" />
      View Profile
      <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
    </button>
  );
};
