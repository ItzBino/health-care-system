import React, { useContext, useState, useEffect } from 'react'
import { UserContext } from '../context/UserContext'
import { NavLink } from 'react-router-dom'
import { 
  Search, 
  Filter, 
  MapPin, 
  Clock, 
  DollarSign,
  ChevronDown,
  X,
} from 'lucide-react'
import { ViewDetails } from '../components/Buttons'
import { Booking } from '../components/Buttons'

const Doctors = () => {
  const { doctor, setDoctors } = useContext(UserContext)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedSpecialization, setSelectedSpecialization] = useState('all')
  const [selectedExperience, setSelectedExperience] = useState('all')
  const [filteredDoctors, setFilteredDoctors] = useState(doctor)
  const [showMobileFilters, setShowMobileFilters] = useState(false)
  const [sortBy, setSortBy] = useState('default')

  // Extract unique specializations from doctors
  const specializations = [...new Set(doctor.map(item => item.specialization))]

  // Filter doctors based on search and filters
  useEffect(() => {
    let filtered = doctor

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(item =>
        item.user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.specialization.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    // Specialization filter
    if (selectedSpecialization !== 'all') {
      filtered = filtered.filter(item => 
        item.specialization === selectedSpecialization
      )
    }

    // Experience filter
    if (selectedExperience !== 'all') {
      filtered = filtered.filter(item => {
        const exp = item.experience || 0
        switch(selectedExperience) {
          case '0-5': return exp <= 5
          case '5-10': return exp > 5 && exp <= 10
          case '10-15': return exp > 10 && exp <= 15
          case '15+': return exp > 15
          default: return true
        }
      })
    }

    // Sorting
    if (sortBy === 'name') {
      filtered = [...filtered].sort((a, b) => 
        a.user.name.localeCompare(b.user.name)
      )
    } else if (sortBy === 'experience') {
      filtered = [...filtered].sort((a, b) => 
        (b.experience || 0) - (a.experience || 0)
      )
    }

    setFilteredDoctors(filtered)
  }, [searchTerm, selectedSpecialization, selectedExperience, sortBy, doctor])

  // Clear all filters
  const clearFilters = () => {
    setSearchTerm('')
    setSelectedSpecialization('all')
    setSelectedExperience('all')
    setSortBy('default')
    setShowMobileFilters(false) // Close mobile filters after clearing
  }

  // Handle specialization change on mobile
  const handleMobileSpecializationChange = (value) => {
    setSelectedSpecialization(value)
    setTimeout(() => setShowMobileFilters(false), 200) // Close after selection
  }

  // Handle experience change on mobile
  const handleMobileExperienceChange = (value) => {
    setSelectedExperience(value)
    setTimeout(() => setShowMobileFilters(false), 200) // Close after selection
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Find Your Doctor</h1>
          <p className="text-blue-100 text-lg md:text-xl">Book appointments with verified healthcare professionals</p>
        </div>
      </div>

      {/* Search Bar */}
      <div className="max-w-7xl mx-auto px-4 -mt-8">
        <div className="bg-white rounded-xl shadow-xl p-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search doctors by name or specialization..."
                className="w-full pl-12 pr-4 py-3.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            {/* Sort Dropdown */}
            <div className="relative">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="appearance-none bg-white border border-gray-200 rounded-xl px-6 py-3.5 pr-12 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all cursor-pointer"
              >
                <option value="default">Sort By</option>
                <option value="name">Name (A-Z)</option>
                <option value="experience">Experience</option>
              </select>
              <ChevronDown className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 pointer-events-none" />
            </div>

            {/* Mobile Filter Toggle */}
            <button
              onClick={() => setShowMobileFilters(!showMobileFilters)}
              className="md:hidden flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white px-6 py-3.5 rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all shadow-lg"
            >
              <Filter className="w-5 h-5" />
              Filters
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* Sidebar Filters - Desktop */}
          <div className="hidden md:block lg:w-1/4">
            <div className="bg-white rounded-xl shadow-lg p-6 sticky top-4">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold text-gray-800">Filters</h3>
                <button
                  onClick={clearFilters}
                  className="text-sm text-blue-600 hover:text-blue-800 font-medium transition-colors"
                >
                  Clear all
                </button>
              </div>

              {/* Specialization Dropdown Filter */}
              <div className="mb-6">
                <h4 className="font-semibold text-gray-700 mb-3">Specialization</h4>
                <div className="relative">
                  <select
                    value={selectedSpecialization}
                    onChange={(e) => setSelectedSpecialization(e.target.value)}
                    className="w-full appearance-none bg-white border border-gray-200 rounded-xl px-4 py-3 pr-10 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all cursor-pointer hover:border-gray-300"
                  >
                    <option value="all">All Specializations</option>
                    {specializations.map((spec, index) => (
                      <option key={index} value={spec}>{spec}</option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 pointer-events-none" />
                </div>
              </div>

              {/* Experience Filter */}
              <div className="mb-6">
                <h4 className="font-semibold text-gray-700 mb-3">Experience</h4>
                <div className="space-y-2">
                  {['all', '0-5', '5-10', '10-15', '15+'].map((exp) => (
                    <label key={exp} className="flex items-center p-2 hover:bg-gray-50 rounded-lg cursor-pointer transition-colors">
                      <input
                        type="radio"
                        name="experience"
                        value={exp}
                        checked={selectedExperience === exp}
                        onChange={(e) => setSelectedExperience(e.target.value)}
                        className="mr-3 text-blue-600 focus:ring-blue-500"
                      />
                      <span className="text-gray-700">{exp === 'all' ? 'All Experience' : `${exp} years`}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Mobile Filters - Slide-out Panel with Blur Background */}
          {showMobileFilters && (
            <div className="fixed inset-0 z-50 md:hidden">
              {/* Blur Background */}
              <div 
                className="absolute inset-0 backdrop-blur-sm bg-black/20" 
                onClick={() => setShowMobileFilters(false)} 
              />
              {/* Filter Panel - Reduced Height */}
              <div className="absolute right-0 bottom-0 h-[70vh] w-full bg-white rounded-t-3xl p-6 overflow-y-auto shadow-2xl">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-xl font-bold text-gray-800">Filters</h3>
                  <button 
                    onClick={() => setShowMobileFilters(false)}
                    className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>
                
                {/* Mobile filter content */}
                <div className="space-y-6">
                  {/* Specialization Dropdown */}
                  <div>
                    <h4 className="font-semibold text-gray-700 mb-3">Specialization</h4>
                    <div className="relative">
                      <select
                        value={selectedSpecialization}
                        onChange={(e) => handleMobileSpecializationChange(e.target.value)}
                        className="w-full appearance-none bg-white border border-gray-200 rounded-xl px-4 py-3 pr-10 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all cursor-pointer"
                      >
                        <option value="all">All Specializations</option>
                        {specializations.map((spec, index) => (
                          <option key={index} value={spec}>{spec}</option>
                        ))}
                      </select>
                      <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 pointer-events-none" />
                    </div>
                  </div>

                  {/* Experience */}
                  <div>
                    <h4 className="font-semibold text-gray-700 mb-3">Experience</h4>
                    <div className="space-y-2">
                      {['all', '0-5', '5-10', '10-15', '15+'].map((exp) => (
                        <label key={exp} className="flex items-center p-3 hover:bg-gray-50 rounded-lg cursor-pointer">
                          <input
                            type="radio"
                            name="experience-mobile"
                            value={exp}
                            checked={selectedExperience === exp}
                            onChange={(e) => handleMobileExperienceChange(e.target.value)}
                            className="mr-3"
                          />
                          <span>{exp === 'all' ? 'All Experience' : `${exp} years`}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  <button
                    onClick={clearFilters}
                    className="w-full py-3 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition-colors font-medium"
                  >
                    Clear All Filters
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Doctors Grid */}
          <div className="flex-1">

            {/* Doctors Cards */}
            {filteredDoctors.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredDoctors.map((item) => (
                  <div key={item.user._id} className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden group">
                    <div className="p-6">
                      {/* Doctor Image and Basic Info - Circle on Left */}
                      <div className="flex items-start gap-4 mb-5">
                        <div className="relative">
                          <img 
                            src={item.user.image || '/default-doctor.png'} 
                            alt={item.user.name}
                            className="w-28 h-28 rounded-full object-cover border-4 border-gray-100 group-hover:border-blue-100 transition-colors"
                          />
                          {/* Online Status Indicator */}
                          <div className="absolute bottom-1 right-1 w-6 h-6 bg-green-500 rounded-full border-3 border-white flex items-center justify-center">
                            <div className="w-2.5 h-2.5 bg-white rounded-full animate-pulse"></div>
                          </div>
                        </div>
                        <div className="flex-1">
                          <h3 className="text-xl font-bold text-gray-900 mb-1">{item.user.name}</h3>
                          <p className="text-blue-600 font-semibold">{item.specialization}</p>
                          {/* Quick availability info */}
                          <div className="mt-2">
                            <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                              Available Today
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
                          <span className="text-sm font-medium">{item.experience || '10'}+ Years Experience</span>
                        </div>
                        <div className="flex items-center gap-3 text-gray-600">
                          <div className="w-8 h-8 bg-green-50 rounded-lg flex items-center justify-center flex-shrink-0">
                            <MapPin className="w-4 h-4 text-green-600" />
                          </div>
                          <span className="text-sm font-medium">{item.location || 'New York, NY'}</span>
                        </div>
                        <div className="flex items-center gap-3 text-gray-600">
                          <div className="w-8 h-8 bg-purple-50 rounded-lg flex items-center justify-center flex-shrink-0">
                            <DollarSign className="w-4 h-4 text-purple-600" />
                          </div>
                          <span className="text-sm font-medium">Consultation: ${item.consultationFee || '150'}</span>
                        </div>
                      </div>

                      {/* Languages */}
                      {item.languages && (
                        <div className="mb-5">
                          <div className="flex flex-wrap gap-2">
                            {item.languages.map((lang, idx) => (
                              <span key={idx} className="px-3 py-1 bg-gray-100 text-gray-700 text-xs rounded-full font-medium">
                                {lang}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Action Buttons */}
                      <div className="space-y-3">
                        <NavLink 
                          to={`/booking/${item.user._id}`}
                          className="block"
                        >
                          <Booking/>
                        </NavLink>
                        <NavLink 
                          to={`/doctors/${item.user._id}`}
                          className="block"
                        >
                         <ViewDetails/>
                        
                        </NavLink>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              /* Empty State */
              <div className="bg-white rounded-xl shadow-lg p-16 text-center">
                <div className="max-w-md mx-auto">
                  <div className="w-32 h-32 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Search className="w-16 h-16 text-gray-400" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">No doctors found</h3>
                  <p className="text-gray-600 mb-8">
                    Try adjusting your search or filters to find what you're looking for.
                  </p>
                  <button
                    onClick={clearFilters}
                    className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-8 py-3 rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all font-semibold shadow-lg"
                  >
                    Clear All Filters
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Doctors