import React from 'react';
import { 
  Heart, Award, Users, Clock, ArrowRight, UserCheck, 
  Stethoscope, Ambulance
} from 'lucide-react';

const About = () => {
  const features = [
    { icon: Heart, title: "Compassionate Care", description: "We treat every patient with empathy and understanding" },
    { icon: Award, title: "Excellence in Service", description: "Award-winning healthcare services recognized nationally" },
    { icon: Users, title: "Expert Team", description: "Board-certified doctors and experienced medical staff" },
    { icon: Clock, title: "24/7 Availability", description: "Round-the-clock emergency and support services" }
  ];

  const stats = [
    { icon: UserCheck, count: "50k+", label: "Happy Patients", color: "bg-blue-100 text-blue-600" },
    { icon: Stethoscope, count: "100+", label: "Expert Doctors", color: "bg-green-100 text-green-600" },
    { icon: Award, count: "25+", label: "Awards Won", color: "bg-purple-100 text-purple-600" },
    { icon: Ambulance, count: "24/7", label: "Emergency Service", color: "bg-orange-100 text-orange-600" }
  ];

  return (
    <section className="py-16 bg-white" id="about">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            About <span className="text-blue-600">HealthCare Plus</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Leading the way in medical excellence, compassionate care, and innovation for over 15 years
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
          {/* Left Image */}
          <div className="relative">
            <img 
              src="https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=600" 
              alt="Medical Team" 
              className="rounded-2xl shadow-xl w-full"
            />
            <div className="absolute -bottom-8 -right-8 bg-blue-600 text-white p-6 rounded-2xl shadow-xl">
              <h3 className="text-4xl font-bold">15+</h3>
              <p className="text-sm">Years of Excellence</p>
            </div>
          </div>

          {/* Right Content */}
          <div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Dedicated to Your Health and Well-being
            </h3>
            <p className="text-gray-600 mb-6">
              At HealthCare Plus, we combine cutting-edge medical technology with compassionate care to provide 
              exceptional healthcare services. Our mission is to improve the health and quality of life for every 
              patient we serve.
            </p>
            <p className="text-gray-600 mb-8">
              With state-of-the-art facilities and a team of highly skilled healthcare professionals, we offer 
              comprehensive medical services ranging from preventive care to complex surgical procedures.
            </p>

            {/* Feature List */}
            <div className="space-y-4">
              {features.map((feature, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <div className="bg-blue-100 p-2 rounded-lg flex-shrink-0">
                    <feature.icon className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">{feature.title}</h4>
                    <p className="text-sm text-gray-600">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>

            <button className="mt-8 inline-flex items-center px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition">
              Learn More About Us
              <ArrowRight className="ml-2 h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-16 py-8 border-t border-b border-gray-200">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 ${stat.color}`}>
                <stat.icon className="h-8 w-8" />
              </div>
              <h3 className="text-3xl font-bold text-gray-900">{stat.count}</h3>
              <p className="text-gray-600">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;