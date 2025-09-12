import React, { useState } from 'react';
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaClock, FaInstagram, FaFacebook, FaTwitter, FaYoutube, FaPaperPlane, FaCheckCircle } from 'react-icons/fa';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    console.log('Form submitted:', formData);
    setIsSubmitted(true);
    setIsSubmitting(false);
    
    // Reset form after 3 seconds
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
      });
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-white to-pink-50">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-rose-600 via-pink-600 to-purple-600 py-16 md:py-20 lg:py-24 overflow-hidden">
        <div className="absolute inset-0 bg-black opacity-10"></div>
        <div className="absolute inset-0">
          <div className="absolute top-10 left-10 w-16 h-16 md:w-20 md:h-20 bg-white opacity-10 rounded-full"></div>
          <div className="absolute top-32 right-20 w-12 h-12 md:w-16 md:h-16 bg-white opacity-10 rounded-full"></div>
          <div className="absolute bottom-20 left-1/4 w-8 h-8 md:w-12 md:h-12 bg-white opacity-10 rounded-full"></div>
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 md:mb-6">
            Contact <span className="text-yellow-300">Us</span>
          </h1>
          <p className="text-lg md:text-xl lg:text-2xl text-rose-100 max-w-4xl mx-auto mb-6 md:mb-8">
            We'd love to hear from you. Get in touch for consultations, questions, or to schedule your bridal appointment.
          </p>
          <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-8 text-rose-100">
            <div className="flex items-center space-x-2">
              <FaPhone className="text-lg md:text-xl" />
              <span className="text-base md:text-lg">+1 (555) 123-4567</span>
            </div>
            <div className="flex items-center space-x-2">
              <FaEnvelope className="text-lg md:text-xl" />
              <span className="text-base md:text-lg">info@bridaldreams.com</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="py-12 md:py-16 lg:py-20 -mt-8 md:-mt-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
            {/* Contact Form */}
            <div className="order-2 lg:order-1">
              <div className="bg-white rounded-2xl md:rounded-3xl shadow-xl md:shadow-2xl p-6 md:p-8 border border-gray-100 h-full">
                <div className="text-center mb-6 md:mb-8">
                  <div className="inline-flex items-center justify-center w-12 h-12 md:w-16 md:h-16 bg-gradient-to-br from-rose-500 to-pink-500 rounded-full mb-3 md:mb-4">
                    <FaPaperPlane className="text-white text-lg md:text-xl" />
                  </div>
                  <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2 md:mb-3">
                    Send us a Message
                  </h2>
                  <p className="text-gray-600 text-sm md:text-base">
                    Fill out the form below and we'll get back to you within 24 hours
                  </p>
                </div>

                {isSubmitted ? (
                  <div className="text-center py-8 md:py-12">
                    <div className="inline-flex items-center justify-center w-16 h-16 md:w-20 md:h-20 bg-green-100 rounded-full mb-4 md:mb-6">
                      <FaCheckCircle className="text-green-500 text-2xl md:text-3xl" />
                    </div>
                    <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-2">Message Sent!</h3>
                    <p className="text-gray-600 text-sm md:text-base">Thank you for contacting us. We'll get back to you soon.</p>
                  </div>
                ) : (
                   <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
                     <div className="grid sm:grid-cols-2 gap-4 md:gap-6">
                       <div className="group">
                         <label htmlFor="name" className="block text-sm md:text-base font-semibold text-gray-700 mb-2">
                           Full Name *
                         </label>
                         <input
                           type="text"
                           id="name"
                           name="name"
                           value={formData.name}
                           onChange={handleChange}
                           required
                           className="w-full px-4 md:px-6 py-3 md:py-4 border-2 border-gray-200 rounded-lg md:rounded-xl focus:ring-2 focus:ring-rose-100 focus:border-rose-500 transition-all duration-300 text-sm md:text-base"
                           placeholder="Enter your full name"
                         />
                       </div>
                       <div className="group">
                         <label htmlFor="phone" className="block text-sm md:text-base font-semibold text-gray-700 mb-2">
                           Phone Number
                         </label>
                         <input
                           type="tel"
                           id="phone"
                           name="phone"
                           value={formData.phone}
                           onChange={handleChange}
                           className="w-full px-4 md:px-6 py-3 md:py-4 border-2 border-gray-200 rounded-lg md:rounded-xl focus:ring-2 focus:ring-rose-100 focus:border-rose-500 transition-all duration-300 text-sm md:text-base"
                           placeholder="Enter your phone number"
                         />
                       </div>
                     </div>

                     <div className="group">
                       <label htmlFor="email" className="block text-sm md:text-base font-semibold text-gray-700 mb-2">
                         Email Address *
                       </label>
                       <input
                         type="email"
                         id="email"
                         name="email"
                         value={formData.email}
                         onChange={handleChange}
                         required
                         className="w-full px-4 md:px-6 py-3 md:py-4 border-2 border-gray-200 rounded-lg md:rounded-xl focus:ring-2 focus:ring-rose-100 focus:border-rose-500 transition-all duration-300 text-sm md:text-base"
                         placeholder="Enter your email address"
                       />
                     </div>

                     <div className="group">
                       <label htmlFor="subject" className="block text-sm md:text-base font-semibold text-gray-700 mb-2">
                         Subject *
                       </label>
                       <select
                         id="subject"
                         name="subject"
                         value={formData.subject}
                         onChange={handleChange}
                         required
                         className="w-full px-4 md:px-6 py-3 md:py-4 border-2 border-gray-200 rounded-lg md:rounded-xl focus:ring-2 focus:ring-rose-100 focus:border-rose-500 transition-all duration-300 bg-white text-sm md:text-base"
                       >
                         <option value="">Select a subject</option>
                         <option value="consultation">Bridal Consultation</option>
                         <option value="appointment">Schedule Appointment</option>
                         <option value="custom-dress">Custom Dress Inquiry</option>
                         <option value="alterations">Alterations</option>
                         <option value="general">General Question</option>
                         <option value="other">Other</option>
                       </select>
                     </div>

                     <div className="group">
                       <label htmlFor="message" className="block text-sm md:text-base font-semibold text-gray-700 mb-2">
                         Message *
                       </label>
                       <textarea
                         id="message"
                         name="message"
                         value={formData.message}
                         onChange={handleChange}
                         required
                         rows={5}
                         className="w-full px-4 md:px-6 py-3 md:py-4 border-2 border-gray-200 rounded-lg md:rounded-xl focus:ring-2 focus:ring-rose-100 focus:border-rose-500 transition-all duration-300 resize-none text-sm md:text-base"
                         placeholder="Tell us about your wedding plans, questions, or how we can help make your special day perfect..."
                       />
                     </div>

                     <button
                       type="submit"
                       disabled={isSubmitting}
                       className="w-full bg-gradient-to-r from-rose-500 to-pink-500 text-white font-bold py-4 md:py-5 px-6 md:px-8 rounded-lg md:rounded-xl hover:from-rose-600 hover:to-pink-600 transition-all duration-300 transform hover:scale-105 shadow-lg md:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none text-sm md:text-base"
                     >
                       {isSubmitting ? (
                         <div className="flex items-center justify-center space-x-2">
                           <div className="w-4 h-4 md:w-5 md:h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                           <span>Sending...</span>
                         </div>
                       ) : (
                         <div className="flex items-center justify-center space-x-2">
                           <FaPaperPlane className="text-lg md:text-xl" />
                           <span>Send Message</span>
                         </div>
                       )}
                     </button>
                   </form>
                )}
              </div>
            </div>

            {/* Contact Information */}
            <div className="order-1 lg:order-2 space-y-6 md:space-y-8">
              {/* Contact Details */}
              <div className="bg-white rounded-2xl md:rounded-3xl shadow-xl md:shadow-2xl p-6 md:p-8 border border-gray-100">
                <div className="text-center mb-6 md:mb-8">
                  <div className="inline-flex items-center justify-center w-14 h-14 md:w-16 md:h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full mb-3 md:mb-4">
                    <FaMapMarkerAlt className="text-white text-xl md:text-2xl" />
                  </div>
                  <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
                    Get in Touch
                  </h2>
                  <p className="text-gray-600 text-sm md:text-base">
                    Multiple ways to reach us
                  </p>
                </div>
                
                <div className="space-y-4 md:space-y-6">
                  <div className="group p-4 md:p-6 rounded-xl hover:bg-gray-50 transition-colors duration-300">
                    <div className="flex items-start space-x-3 md:space-x-4">
                      <div className="bg-gradient-to-br from-rose-500 to-pink-500 p-2 md:p-3 rounded-full group-hover:scale-110 transition-transform duration-300">
                        <FaPhone className="text-white text-lg md:text-xl" />
                      </div>
                      <div>
                        <h3 className="text-base md:text-lg font-semibold text-gray-900 mb-1">Phone</h3>
                        <p className="text-gray-600 font-medium text-sm md:text-base">+1 (555) 123-4567</p>
                        <p className="text-gray-600 font-medium text-sm md:text-base">+1 (555) 987-6543</p>
                        <p className="text-xs md:text-sm text-gray-500 mt-1">Mon-Fri: 10AM-7PM</p>
                      </div>
                    </div>
                  </div>

                  <div className="group p-4 md:p-6 rounded-xl hover:bg-gray-50 transition-colors duration-300">
                    <div className="flex items-start space-x-3 md:space-x-4">
                      <div className="bg-gradient-to-br from-purple-500 to-pink-500 p-2 md:p-3 rounded-full group-hover:scale-110 transition-transform duration-300">
                        <FaEnvelope className="text-white text-lg md:text-xl" />
                      </div>
                      <div>
                        <h3 className="text-base md:text-lg font-semibold text-gray-900 mb-1">Email</h3>
                        <p className="text-gray-600 font-medium text-sm md:text-base">info@bridaldreams.com</p>
                        <p className="text-gray-600 font-medium text-sm md:text-base">appointments@bridaldreams.com</p>
                        <p className="text-xs md:text-sm text-gray-500 mt-1">24/7 support</p>
                      </div>
                    </div>
                  </div>

                  <div className="group p-4 md:p-6 rounded-xl hover:bg-gray-50 transition-colors duration-300">
                    <div className="flex items-start space-x-3 md:space-x-4">
                      <div className="bg-gradient-to-br from-pink-500 to-rose-500 p-2 md:p-3 rounded-full group-hover:scale-110 transition-transform duration-300">
                        <FaMapMarkerAlt className="text-white text-lg md:text-xl" />
                      </div>
                      <div>
                        <h3 className="text-base md:text-lg font-semibold text-gray-900 mb-1">Address</h3>
                        <p className="text-gray-600 font-medium text-sm md:text-base">
                          123 Bridal Lane<br />
                          Wedding District<br />
                          New York, NY 10001
                        </p>
                        <p className="text-xs md:text-sm text-gray-500 mt-1">Free parking available</p>
                      </div>
                    </div>
                  </div>

                  <div className="group p-4 md:p-6 rounded-xl hover:bg-gray-50 transition-colors duration-300">
                    <div className="flex items-start space-x-3 md:space-x-4">
                      <div className="bg-gradient-to-br from-yellow-500 to-orange-500 p-2 md:p-3 rounded-full group-hover:scale-110 transition-transform duration-300">
                        <FaClock className="text-white text-lg md:text-xl" />
                      </div>
                      <div>
                        <h3 className="text-base md:text-lg font-semibold text-gray-900 mb-1">Hours</h3>
                        <div className="text-gray-600 font-medium space-y-1 text-sm md:text-base">
                          <p>Monday - Friday: 10:00 AM - 7:00 PM</p>
                          <p>Saturday: 9:00 AM - 6:00 PM</p>
                          <p>Sunday: 12:00 PM - 5:00 PM</p>
                        </div>
                        <p className="text-xs md:text-sm text-gray-500 mt-1">By appointment only</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Social Media */}
              <div className="bg-white rounded-2xl md:rounded-3xl shadow-xl md:shadow-2xl p-6 md:p-8 border border-gray-100">
                <div className="text-center mb-4 md:mb-6">
                  <div className="inline-flex items-center justify-center w-14 h-14 md:w-16 md:h-16 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full mb-3 md:mb-4">
                    <FaInstagram className="text-white text-xl md:text-2xl" />
                  </div>
                  <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
                    Follow Us
                  </h2>
                  <p className="text-gray-600 text-sm md:text-base">
                    Stay updated with our latest collections and bridal tips
                  </p>
                </div>
                
                <div className="grid grid-cols-2 gap-3 md:gap-4">
                  <a
                    href="#"
                    className="group bg-gradient-to-br from-blue-500 to-blue-600 p-4 md:p-6 rounded-xl text-white hover:scale-105 transition-all duration-300 text-center"
                  >
                    <FaFacebook className="text-xl md:text-2xl mx-auto mb-2 group-hover:scale-110 transition-transform duration-300" />
                    <span className="text-xs md:text-sm font-semibold">Facebook</span>
                  </a>
                  <a
                    href="#"
                    className="group bg-gradient-to-br from-pink-500 to-purple-500 p-4 md:p-6 rounded-xl text-white hover:scale-105 transition-all duration-300 text-center"
                  >
                    <FaInstagram className="text-xl md:text-2xl mx-auto mb-2 group-hover:scale-110 transition-transform duration-300" />
                    <span className="text-xs md:text-sm font-semibold">Instagram</span>
                  </a>
                  <a
                    href="#"
                    className="group bg-gradient-to-br from-blue-400 to-blue-500 p-4 md:p-6 rounded-xl text-white hover:scale-105 transition-all duration-300 text-center"
                  >
                    <FaTwitter className="text-xl md:text-2xl mx-auto mb-2 group-hover:scale-110 transition-transform duration-300" />
                    <span className="text-xs md:text-sm font-semibold">Twitter</span>
                  </a>
                  <a
                    href="#"
                    className="group bg-gradient-to-br from-red-500 to-red-600 p-4 md:p-6 rounded-xl text-white hover:scale-105 transition-all duration-300 text-center"
                  >
                    <FaYoutube className="text-xl md:text-2xl mx-auto mb-2 group-hover:scale-110 transition-transform duration-300" />
                    <span className="text-xs md:text-sm font-semibold">YouTube</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;