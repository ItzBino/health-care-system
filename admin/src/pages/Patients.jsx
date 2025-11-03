import React, { useContext, useState } from 'react';
import { AdminContext } from '../context/AdminContext';
import { NavLink } from 'react-router-dom';
import {
  Search,
  Filter,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Users,
  FileText,
  ClipboardList,
  Eye,
  Download,
  MoreVertical,
  User,
  Heart,
  Activity,
  Droplet,
  Shield,
  AlertCircle,
  TrendingUp,
  Clock,
  ChevronRight,
  FileBarChart,
  Stethoscope,
  Pill,
  UserPlus,
  Building2,
  CreditCard,
  CheckCircle,
  XCircle,
  Info
} from 'lucide-react';

const Patients = () => {
  const { patients, allReports,allPrescriptions } = useContext(AdminContext);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterGender, setFilterGender] = useState('all');
  const [filterAge, setFilterAge] = useState('all');
  const [sortBy, setSortBy] = useState('name');
  const [viewMode, setViewMode] = useState('grid');

  

  // Calculate age from DOB
  const calculateAge = (dob) => {
    if (!dob) return 'N/A';
    const birthDate = new Date(dob);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  };

  // Filter patients
  const filteredPatients = patients?.filter(patient => {
    const matchesSearch = patient?.user?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          patient?.user?.email?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesGender = filterGender === 'all' || patient.gender === filterGender;
    
    // Age filtering
    let matchesAge = true;
    if (filterAge !== 'all' && patient.dob) {
      const age = calculateAge(patient.dob);
      switch(filterAge) {
        case 'child':
          matchesAge = age < 18;
          break;
        case 'adult':
          matchesAge = age >= 18 && age < 60;
          break;
        case 'senior':
          matchesAge = age >= 60;
          break;
      }
    }
    
    return matchesSearch && matchesGender && matchesAge;
  }) || [];

  // Sort patients
  const sortedPatients = [...filteredPatients].sort((a, b) => {
    switch(sortBy) {
      case 'name':
        return (a.name || '').localeCompare(b.name || '');
      case 'recent':
        return new Date(b.createdAt || 0) - new Date(a.createdAt || 0);
      case 'age':
        return calculateAge(a.dob) - calculateAge(b.dob);
      default:
        return 0;
    }
  });

  // Statistics
  const stats = {
    total: patients?.length || 0,
    male: patients?.filter(p => p.gender === 'Male').length || 0,
    female: patients?.filter(p => p.gender === 'Female').length || 0,
    children: patients?.filter(p => calculateAge(p.dob) < 18).length || 0,
    adults: patients?.filter(p => {
      const age = calculateAge(p.dob);
      return age >= 18 && age < 60;
    }).length || 0,
    seniors: patients?.filter(p => calculateAge(p.dob) >= 60).length || 0
  };

  // Get blood group color
  const getBloodGroupColor = (bloodGroup) => {
    const colors = {
      'A+': 'bg-red-100 text-red-700',
      'A-': 'bg-red-100 text-red-700',
      'B+': 'bg-blue-100 text-blue-700',
      'B-': 'bg-blue-100 text-blue-700',
      'AB+': 'bg-purple-100 text-purple-700',
      'AB-': 'bg-purple-100 text-purple-700',
      'O+': 'bg-green-100 text-green-700',
      'O-': 'bg-green-100 text-green-700'
    };
    return colors[bloodGroup] || 'bg-gray-100 text-gray-700';
  };

  if (!patients || patients.length === 0) {
    return (
      <div className="min-h-screen bg-linear-to-br from-blue-50 via-white to-indigo-50 p-4 sm:p-6 lg:p-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center py-12">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Users className="w-12 h-12 text-gray-400" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">No Registered Patients</h2>
            <p className="text-gray-600 mb-8">There are no patients registered in the system yet.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-blue-50 via-white to-indigo-50">
      <div className="p-4 sm:p-6 lg:p-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Patients Management</h1>
                <p className="text-gray-600 mt-1">View and manage all registered patients</p>
              </div>
            </div>
          </div>

          {/* Statistics Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-gray-600 text-xs sm:text-sm">Total</span>
                <Users className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600" />
              </div>
              <p className="text-xl sm:text-2xl font-bold text-gray-900">{stats.total}</p>
            </div>
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-gray-600 text-xs sm:text-sm">Male</span>
                <User className="w-4 h-4 sm:w-5 sm:h-5 text-blue-500" />
              </div>
              <p className="text-xl sm:text-2xl font-bold text-blue-600">{stats.male}</p>
            </div>
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-gray-600 text-xs sm:text-sm">Female</span>
                <User className="w-4 h-4 sm:w-5 sm:h-5 text-pink-500" />
              </div>
              <p className="text-xl sm:text-2xl font-bold text-pink-600">{stats.female}</p>
            </div>
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-gray-600 text-xs sm:text-sm">Children</span>
                <Heart className="w-4 h-4 sm:w-5 sm:h-5 text-green-500" />
              </div>
              <p className="text-xl sm:text-2xl font-bold text-green-600">{stats.children}</p>
            </div>
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-gray-600 text-xs sm:text-sm">Adults</span>
                <Activity className="w-4 h-4 sm:w-5 sm:h-5 text-purple-500" />
              </div>
              <p className="text-xl sm:text-2xl font-bold text-purple-600">{stats.adults}</p>
            </div>
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-gray-600 text-xs sm:text-sm">Seniors</span>
                <Shield className="w-4 h-4 sm:w-5 sm:h-5 text-orange-500" />
              </div>
              <p className="text-xl sm:text-2xl font-bold text-orange-600">{stats.seniors}</p>
            </div>
          </div>

          {/* Search and Filters */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 mb-6">
            <div className="flex flex-col lg:flex-row gap-4">
              {/* Search */}
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search patients by name or email..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>

              {/* Filters */}
              <div className="flex flex-wrap gap-2">
                <select
                  value={filterGender}
                  onChange={(e) => setFilterGender(e.target.value)}
                  className="px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
                >
                  <option value="all">All Genders</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>

                <select
                  value={filterAge}
                  onChange={(e) => setFilterAge(e.target.value)}
                  className="px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
                >
                  <option value="all">All Ages</option>
                  <option value="child">Children (0-17)</option>
                  <option value="adult">Adults (18-59)</option>
                  <option value="senior">Seniors (60+)</option>
                </select>

                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
                >
                  <option value="name">Sort by Name</option>
                  <option value="recent">Sort by Recent</option>
                  <option value="age">Sort by Age</option>
                </select>

                {/* View Mode Toggle */}
                <div className="flex border border-gray-300 rounded-lg overflow-hidden">
                  <button
                    onClick={() => setViewMode('grid')}
                    className={`px-3 py-2 ${viewMode === 'grid' ? 'bg-blue-600 text-white' : 'bg-white text-gray-600'}`}
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                    </svg>
                  </button>
                  <button
                    onClick={() => setViewMode('list')}
                    className={`px-3 py-2 ${viewMode === 'list' ? 'bg-blue-600 text-white' : 'bg-white text-gray-600'}`}
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Patients Grid/List */}
          <div className={viewMode === 'grid' 
            ? "grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6" 
            : "space-y-4"
          }>
            {sortedPatients.map((patient) => (
              <div
                key={patient._id}
                className={`bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-lg transition-all duration-200 ${
                  viewMode === 'list' ? 'flex flex-col sm:flex-row' : ''
                }`}
              >
                {/* Patient Info Section */}
                <div className={`${viewMode === 'list' ? 'sm:flex-1' : ''} p-6`}>
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-4">
                      {/* Patient Image */}
                      <div className="relative">
                        {patient?.user?.image ? (
                          <img
                            src={patient.user.image}
                            alt={patient.user.name}
                            className="w-16 h-16 rounded-full object-cover border-2 border-gray-200"
                          />
                        ) : (
                          <div className="w-16 h-16 rounded-full bg-linear-to-b from-blue-400 to-blue-600 flex items-center justify-center">
                            <User className="w-8 h-8 text-white" />
                          </div>
                        )}
                        {patient.insurance?.provider && (
                          <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center border-2 border-white" title="Insured">
                            <Shield className="w-3 h-3 text-white" />
                          </div>
                        )}
                      </div>

                      {/* Basic Info */}
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-gray-900">{patient.user?.name || 'Unknown'}</h3>
                        <p className="text-sm text-gray-600 flex items-center gap-1 mt-1">
                          <Mail className="w-3 h-3" />
                          {patient.user?.email}
                        </p>
                      </div>
                    </div>

                    {/* More Options */}
                    <button className="p-1 hover:bg-gray-100 rounded-lg transition-colors">
                      <MoreVertical className="w-5 h-5 text-gray-500" />
                    </button>
                  </div>

                  {/* Patient Details Grid */}
                  <div className="grid grid-cols-2 gap-3 mb-4">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-gray-400" />
                      <div>
                        <p className="text-xs text-gray-500">Age</p>
                        <p className="text-sm font-medium text-gray-900">
                          {patient.dob ? `${calculateAge(patient.dob)} years` : 'N/A'}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <User className="w-4 h-4 text-gray-400" />
                      <div>
                        <p className="text-xs text-gray-500">Gender</p>
                        <p className="text-sm font-medium text-gray-900">
                          {patient.gender || 'N/A'}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Droplet className="w-4 h-4 text-gray-400" />
                      <div>
                        <p className="text-xs text-gray-500">Blood</p>
                        <span className={`inline-block px-2 py-0.5 rounded text-xs font-medium ${getBloodGroupColor(patient.bloodGroup)}`}>
                          {patient.bloodGroup || 'N/A'}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Phone className="w-4 h-4 text-gray-400" />
                      <div>
                        <p className="text-xs text-gray-500">Phone</p>
                        <p className="text-sm font-medium text-gray-900">
                          {patient.phone || 'N/A'}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Additional Info */}
                  {patient.address && (
                    <div className="flex items-start gap-2 mb-4 p-3 bg-gray-50 rounded-lg">
                      <MapPin className="w-4 h-4 text-gray-400 mt-0.5" />
                      <div className="flex-1">
                        <p className="text-xs text-gray-500 mb-1">Address</p>
                        <p className="text-sm text-gray-700">{patient.address}</p>
                      </div>
                    </div>
                  )}

                  {/* Insurance Info */}
                  {patient.insurance?.provider && (
                    <div className="flex items-center gap-2 mb-4 p-3 bg-blue-50 rounded-lg">
                      <CreditCard className="w-4 h-4 text-blue-600" />
                      <div className="flex-1">
                        <p className="text-xs text-blue-600 font-medium">Insurance Provider</p>
                        <p className="text-sm text-blue-900">{patient.insurance.provider}</p>
                        {patient.insurance.policyNumber && (
                          <p className="text-xs text-blue-700 mt-1">Policy: {patient.insurance.policyNumber}</p>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Action Buttons */}
                  <div className="flex gap-2 pt-4 border-t border-gray-100">
                    <NavLink 
                      to={`/reports/${patient.user._id}`}
                      className="flex-1"
                    >
                      <button className="w-full px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2 text-sm">
                        <FileBarChart className="w-4 h-4" />
                        View Reports
                      </button>
                    </NavLink>
                    <NavLink 
                      to={`/script/${patient.user._id}`}
                      className="flex-1"
                    >
                      <button className="w-full px-3 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center justify-center gap-2 text-sm">
                        <Pill className="w-4 h-4" />
                        Prescriptions
                      </button>
                    </NavLink>
                  </div>

                  {/* Quick Stats */}
                  <div className="grid grid-cols-2 gap-2 mt-4 pt-4 border-t border-gray-100">
                    <div className="text-center">
                      <p className="text-2xl font-bold text-blue-600">{allReports.length}</p>
                      <p className="text-xs text-gray-500">Reports</p>
                    </div>
                    <div className="text-center">
                      <p className="text-2xl font-bold text-green-600">{allPrescriptions.length}</p>
                      <p className="text-xs text-gray-500">Scripts</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination */}
          <div className="mt-8 flex items-center justify-between">
            <p className="text-sm text-gray-600">
              Showing {sortedPatients.length} of {patients.length} patients
            </p>
            <div className="flex gap-2">
              <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-sm">
                Previous
              </button>
              <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm">
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Patients;


