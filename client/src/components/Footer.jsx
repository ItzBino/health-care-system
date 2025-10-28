import React from 'react';
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaHeart } from 'react-icons/fa';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-blue-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Brand */}
          <div className="text-center sm:text-left">
            <div className="flex items-center justify-center sm:justify-start gap-2 mb-3">
              <FaHeart className="text-red-400 text-xl" />
              <span className="text-xl font-bold">NovaMed</span>
            </div>
            <p className="text-blue-200 text-sm">Your Health, Our Priority</p>
          </div>

          {/* Quick Links */}
          <div className="text-center">
            <div className="flex flex-wrap justify-center gap-4 text-sm">
              <a href="#" className="hover:text-blue-300 transition">About</a>
              <a href="#" className="hover:text-blue-300 transition">Services</a>
              <a href="#" className="hover:text-blue-300 transition">Doctors</a>
              <a href="#" className="hover:text-blue-300 transition">Contact</a>
            </div>
          </div>

          {/* Contact */}
          <div className="text-center lg:text-right space-y-2 text-sm">
            <div className="flex items-center justify-center lg:justify-end gap-2">
              <FaPhone className="text-blue-300" />
              <span>(123) 456-7890</span>
            </div>
            <div className="flex items-center justify-center lg:justify-end gap-2">
              <FaEnvelope className="text-blue-300" />
              <span>info@healthcare.com</span>
            </div>
          </div>
        </div>

        <hr className="my-6 border-blue-800" />

        <div className="text-center text-sm text-blue-200">
          © {currentYear} NovaMed. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;