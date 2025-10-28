import React, { useContext, useState, useMemo, } from "react";
import { UserContext } from "../context/UserContext";
import { NavLink } from "react-router-dom";
import { Search, MapPin, Clock, DollarSign,CheckCircle, Stethoscope} from "lucide-react";
import { ViewDetails, Booking } from "../components/Buttons";

const Doctors = () => {
  const { doctor } = useContext(UserContext);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredDoctors = useMemo(() => {
    const list = Array.isArray(doctor) ? doctor : [];
    if (!searchTerm.trim()) return list;
    const t = searchTerm.toLowerCase();
    return list.filter(
      (item) =>
        item?.user?.name?.toLowerCase().includes(t) ||
        item?.specialization?.toLowerCase().includes(t)
    );
  }, [doctor, searchTerm]);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Find Your Doctor
          </h1>
          <p className="text-blue-100 text-lg md:text-xl">
            Book appointments with verified healthcare professionals
          </p>
        </div>
      </div>

      {/* Search Bar */}
      <div className="max-w-7xl mx-auto px-4 -mt-8">
        <div className="bg-white/90 backdrop-blur rounded-xl shadow-xl p-4 md:p-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search doctors by name or specialization..."
                className="w-full pl-12 pr-4 py-3.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Doctors Grid */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        {filteredDoctors?.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
            {filteredDoctors.map((item) => (
              <div
                key={item?.user?._id}
                className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300 overflow-hidden group"
              >
                <div className="p-6">
                  {/* Doctor Image and Basic Info */}
                  <div className="flex items-start gap-4 mb-5">
                    <div className="relative">
                      <img
                        src={item?.user?.image || "/default-doctor.png"}
                        alt={item?.user?.name || "Doctor"}
                        className="w-28 h-28 rounded-full object-cover border-4 border-gray-100 group-hover:border-blue-100 transition-colors"
                      />
                      {/* Online Status Indicator */}
                      <div className="absolute bottom-1 right-1 w-6 h-6 bg-green-500 rounded-full border-2 border-white flex items-center justify-center">
                        <div className="w-2.5 h-2.5 bg-white rounded-full animate-pulse"></div>
                      </div>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="text-xl font-bold text-gray-900">
                          {item?.user?.name}
                        </h3>
                        {
                          item?.verificationStatus === "VERIFIED" &&(
                             <CheckCircle
                          className="w-5 h-5 text-blue-500"
                          title="Verified Doctor"
                        />
                          )
                        }
                       
                      </div>

                      <div className="flex items-center gap-2 text-blue-600 font-semibold">
                        <Stethoscope className="w-4 h-4" />
                        {item?.specialization}
                      </div>

                      <div className="mt-2">
                        <span
                          className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${
                            item?.available
                              ? "bg-green-100 text-green-800"
                              : "bg-gray-100 text-red-700"
                          }`}
                        >
                          {item?.available ? "Available Today" : "Unavailable"}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Doctor Details */}
                  <div className="space-y-3 mb-5">
                    <div className="flex items-center gap-3 text-gray-600">
                      <div className="w-8 h-8 bg-blue-50 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Clock className="w-4 h-4 text-blue-600" />
                      </div>
                      <span className="text-sm font-medium">
                        {item?.experience ?? 10}+ Years Experience
                      </span>
                    </div>
                    <div className="flex items-center gap-3 text-gray-600">
                      <div className="w-8 h-8 bg-green-50 rounded-lg flex items-center justify-center flex-shrink-0">
                        <MapPin className="w-4 h-4 text-green-600" />
                      </div>
                      <span className="text-sm font-medium">
                        {item?.clinicLocation || "New York, NY"}
                      </span>
                    </div>
                    <div className="flex items-center gap-3 text-gray-600">
                      <div className="w-8 h-8 bg-purple-50 rounded-lg flex items-center justify-center flex-shrink-0">
                        <DollarSign className="w-4 h-4 text-purple-600" />
                      </div>
                      <span className="text-sm font-medium">
                        Consultation: ${item?.fees ?? 150}
                      </span>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="space-y-3">
                    <NavLink
                      to={`/booking/${item?.user?._id}`}
                      className="block"
                    >
                      <Booking />
                    </NavLink>
                    <NavLink
                      to={`/doctors/${item?.user?._id}`}
                      className="block"
                    >
                      <ViewDetails />
                    </NavLink>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          // Empty State
          <div className="bg-white rounded-xl shadow-lg p-16 text-center">
            <div className="max-w-md mx-auto">
              <div className="w-32 h-32 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Search className="w-16 h-16 text-gray-400" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">
                No doctors found
              </h3>
              <p className="text-gray-600">
                Try adjusting your search to find what you're looking for.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Doctors;
