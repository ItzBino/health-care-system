import React from 'react';
import { 
  Heart, Brain, Eye, Baby, Activity, Microscope, ChevronRight
} from 'lucide-react';

const Services = () => {
  const services = [
    {
      icon: Heart,
      title: "Cardiology",
      description: "Comprehensive heart care with advanced diagnostic and treatment options",
      color: "bg-red-100 text-red-600"
    },
    {
      icon: Brain,
      title: "Neurology",
      description: "Expert care for brain, spine, and nervous system disorders",
      color: "bg-purple-100 text-purple-600"
    },
    {
      icon: Eye,
      title: "Ophthalmology",
      description: "Complete eye care services from routine exams to surgery",
      color: "bg-blue-100 text-blue-600"
    },
    {
      icon: Baby,
      title: "Pediatrics",
      description: "Specialized healthcare for infants, children, and adolescents",
      color: "bg-pink-100 text-pink-600"
    },
    {
      icon: Activity,
      title: "Emergency Care",
      description: "24/7 emergency medical services with rapid response team",
      color: "bg-orange-100 text-orange-600"
    },
    {
      icon: Microscope,
      title: "Laboratory",
      description: "State-of-the-art diagnostic testing and pathology services",
      color: "bg-green-100 text-green-600"
    }
  ];

  return (
    <section className="py-16 bg-gray-50" id="services">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Our Medical <span className="text-blue-600">Services</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            We offer a comprehensive range of medical services with the latest technology and expert care
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div key={index} className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group">
              <div className="p-6">
                <div className={`w-14 h-14 rounded-lg ${service.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                  <service.icon className="h-7 w-7" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{service.title}</h3>
                <p className="text-gray-600 mb-4">{service.description}</p>
                <a href="#" className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium">
                  Learn More
                  <ChevronRight className="ml-1 h-4 w-4 group-hover:translate-x-2 transition-transform" />
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="mt-12 bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl p-8 text-center text-white">
          <h3 className="text-2xl font-bold mb-4">Need Medical Consultation?</h3>
          <p className="mb-6 max-w-2xl mx-auto">
            Our expert doctors are available 24/7 to provide you with the best medical advice and treatment
          </p>
          <button className="bg-white text-blue-600 px-6 py-3 rounded-lg font-medium hover:bg-gray-100 transition">
            Schedule Consultation
          </button>
        </div>
      </div>
    </section>
  );
};

export default Services;