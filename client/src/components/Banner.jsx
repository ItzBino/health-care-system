import React from "react";
import {
  Heart,
  Shield,
  CheckCircle,
  Calendar,
  ChevronRight,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const Banner = () => {
  const navigate = useNavigate();
  return (
    <section className="relative bg-gradient-to-br from-blue-50 via-white to-blue-50 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="text-center lg:text-left animate-fadeInLeft">
            <div className="inline-flex items-center px-4 py-2 bg-blue-100 rounded-full mb-6">
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
              </span>
              <span className="ml-2 text-sm font-medium text-blue-800">
                24/7 Emergency Available
              </span>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
              Your Health is Our
              <span className="text-blue-600 block mt-2">Top Priority</span>
            </h1>

            <p className="text-lg text-gray-600 mb-8 max-w-xl mx-auto lg:mx-0">
              Experience world-class healthcare with our team of expert doctors
              and state-of-the-art facilities. We're committed to providing
              compassionate care for you and your family.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-8">
              <button type="button"
                onClick={() => {
                  console.log("Book Appointment clicked!");
                  navigate("/doctors");
                }}
                className="inline-flex items-center justify-center px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transform transition hover:scale-105 shadow-lg"
              >
                Book Appointment
                <Calendar className="ml-2 h-5 w-5" />
              </button>
              <button className="inline-flex items-center justify-center px-6 py-3 bg-white text-blue-600 font-medium rounded-lg hover:bg-gray-50 border-2 border-blue-600 transition">
                Learn More
                <ChevronRight className="ml-2 h-5 w-5" />
              </button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 max-w-lg mx-auto lg:mx-0">
              <div className="text-center lg:text-left">
                <h3 className="text-3xl font-bold text-gray-900">15+</h3>
                <p className="text-sm text-gray-600">Years Experience</p>
              </div>
              <div className="text-center lg:text-left">
                <h3 className="text-3xl font-bold text-gray-900">50k+</h3>
                <p className="text-sm text-gray-600">Happy Patients</p>
              </div>
              <div className="text-center lg:text-left">
                <h3 className="text-3xl font-bold text-gray-900">100+</h3>
                <p className="text-sm text-gray-600">Expert Doctors</p>
              </div>
            </div>
          </div>

          {/* Right Image */}
          <div className="relative animate-fadeInRight">
            <div className="relative z-10">
              <img
                src="https://images.unsplash.com/photo-1559328101-7e028dc7f7ba?w=600"
                alt="Healthcare Professional"
                className="rounded-2xl shadow-2xl w-full"
              />

              {/* Floating Cards */}
              <div className="absolute -bottom-6 -left-6 bg-white p-4 rounded-xl shadow-xl animate-float">
                <div className="flex items-center space-x-3">
                  <div className="bg-green-100 p-3 rounded-full">
                    <CheckCircle className="h-6 w-6 text-green-600" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">
                      Certified Doctors
                    </p>
                    <p className="text-sm text-gray-600">100% Verified</p>
                  </div>
                </div>
              </div>

              <div className="absolute -top-6 -right-6 bg-white p-4 rounded-xl shadow-xl animate-float-delayed">
                <div className="flex items-center space-x-3">
                  <div className="bg-blue-100 p-3 rounded-full">
                    <Shield className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">Safe & Secure</p>
                    <p className="text-sm text-gray-600">Trust Guaranteed</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Background Decoration */}
            <div className="absolute inset-0 bg-blue-600 rounded-2xl transform rotate-6 scale-105 -z-10 opacity-10"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Banner;
