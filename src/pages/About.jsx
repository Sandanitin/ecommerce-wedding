import React from 'react';
import { FaHeart, FaAward, FaUsers, FaStar } from 'react-icons/fa';

const About = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-white to-pink-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-rose-600 via-pink-600 to-purple-600 py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 md:mb-6">
            About <span className="text-yellow-300">Bridal Dreams</span>
          </h1>
          <p className="text-lg md:text-xl text-rose-100 max-w-3xl mx-auto mb-3 md:mb-4">
            Creating magical moments and unforgettable memories for your special day
          </p>
          <p className="text-base md:text-lg text-rose-200 max-w-4xl mx-auto">
            Founded with a passion for making every bride's dream come true, Bridal Dreams specializes 
            in creating the perfect wedding experience. We believe every bride deserves to look and feel 
            absolutely stunning on her special day.
          </p>
        </div>
      </div>

      {/* Our Story Section */}
      <div className="py-12 md:py-16 lg:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <div className="order-2 lg:order-1">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 md:mb-6">
                Our Story
              </h2>
              <p className="text-base md:text-lg text-gray-600 mb-4 md:mb-6 leading-relaxed">
                Founded in 2015, Bridal Dreams began as a small boutique with a big vision: 
                to make every bride feel like a princess on her special day. What started 
                as a passion for beautiful wedding dresses has grown into a comprehensive 
                bridal experience.
              </p>
              <p className="text-base md:text-lg text-gray-600 mb-4 md:mb-6 leading-relaxed">
                We believe that every bride deserves to look and feel absolutely stunning 
                on her wedding day. Our carefully curated collection features the finest 
                wedding dresses, accessories, and jewelry from renowned designers around 
                the world.
              </p>
              <div className="flex items-center space-x-3 md:space-x-4">
                <div className="bg-gradient-to-r from-rose-500 to-pink-500 p-2 md:p-3 rounded-full">
                  <FaHeart className="text-white text-lg md:text-xl" />
                </div>
                <span className="text-base md:text-lg font-semibold text-gray-900">
                  Making Dreams Come True Since 2015
                </span>
              </div>
            </div>
            <div className="relative order-1 lg:order-2">
              <div className="bg-gradient-to-br from-rose-200 to-pink-200 rounded-xl md:rounded-2xl p-6 md:p-8 h-64 md:h-80 lg:h-96 flex items-center justify-center">
                <div className="text-center">
                  <FaHeart className="text-4xl md:text-5xl lg:text-6xl text-rose-500 mx-auto mb-3 md:mb-4" />
                  <p className="text-base md:text-lg text-gray-600">
                    Beautiful wedding moments captured
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* What Sets Us Apart Section */}
      <div className="py-12 md:py-16 lg:py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10 md:mb-12 lg:mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3 md:mb-4">
              What Sets Us Apart
            </h2>
            <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
              The pillars that define Bridal Dreams
            </p>
          </div>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            <div className="text-center group bg-white rounded-xl p-6 md:p-8 shadow-lg hover:shadow-xl transition-all duration-300">
              <div className="bg-gradient-to-br from-rose-500 to-pink-500 w-16 h-16 md:w-20 md:h-20 rounded-full flex items-center justify-center mx-auto mb-4 md:mb-6 group-hover:scale-110 transition-transform duration-300">
                <FaAward className="text-white text-xl md:text-2xl" />
              </div>
              <h3 className="text-lg md:text-xl font-semibold text-gray-900 mb-2 md:mb-3">
                Premium Quality
              </h3>
              <p className="text-sm md:text-base text-gray-600 leading-relaxed">
                We source only the finest materials and work with the most skilled artisans 
                to ensure every piece meets our high standards.
              </p>
            </div>

            <div className="text-center group bg-white rounded-xl p-6 md:p-8 shadow-lg hover:shadow-xl transition-all duration-300">
              <div className="bg-gradient-to-br from-purple-500 to-pink-500 w-16 h-16 md:w-20 md:h-20 rounded-full flex items-center justify-center mx-auto mb-4 md:mb-6 group-hover:scale-110 transition-transform duration-300">
                <FaUsers className="text-white text-xl md:text-2xl" />
              </div>
              <h3 className="text-lg md:text-xl font-semibold text-gray-900 mb-2 md:mb-3">
                Personal Service
              </h3>
              <p className="text-sm md:text-base text-gray-600 leading-relaxed">
                Every bride is unique, and we provide personalized consultations to help 
                you find the perfect dress for your special day.
              </p>
            </div>

            <div className="text-center group bg-white rounded-xl p-6 md:p-8 shadow-lg hover:shadow-xl transition-all duration-300">
              <div className="bg-gradient-to-br from-pink-500 to-rose-500 w-16 h-16 md:w-20 md:h-20 rounded-full flex items-center justify-center mx-auto mb-4 md:mb-6 group-hover:scale-110 transition-transform duration-300">
                <FaHeart className="text-white text-xl md:text-2xl" />
              </div>
              <h3 className="text-lg md:text-xl font-semibold text-gray-900 mb-2 md:mb-3">
                Passion & Love
              </h3>
              <p className="text-sm md:text-base text-gray-600 leading-relaxed">
                We're passionate about weddings and love helping couples create 
                unforgettable memories that will last a lifetime.
              </p>
            </div>

            <div className="text-center group bg-white rounded-xl p-6 md:p-8 shadow-lg hover:shadow-xl transition-all duration-300">
              <div className="bg-gradient-to-br from-yellow-500 to-orange-500 w-16 h-16 md:w-20 md:h-20 rounded-full flex items-center justify-center mx-auto mb-4 md:mb-6 group-hover:scale-110 transition-transform duration-300">
                <FaStar className="text-white text-xl md:text-2xl" />
              </div>
              <h3 className="text-lg md:text-xl font-semibold text-gray-900 mb-2 md:mb-3">
                Innovation
              </h3>
              <p className="text-sm md:text-base text-gray-600 leading-relaxed">
                We stay ahead of bridal fashion trends and continuously innovate to 
                bring you the latest styles and designs.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Core Values Section */}
      <div className="py-12 md:py-16 lg:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10 md:mb-12 lg:mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3 md:mb-4">
              Our Core Values
            </h2>
            <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
              The principles that guide everything we do
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6 md:gap-8">
            <div className="text-center group bg-gray-50 rounded-xl p-6 md:p-8 hover:bg-white hover:shadow-lg transition-all duration-300">
              <div className="bg-gradient-to-br from-rose-500 to-pink-500 w-16 h-16 md:w-20 md:h-20 rounded-full flex items-center justify-center mx-auto mb-4 md:mb-6 group-hover:scale-110 transition-transform duration-300">
                <FaUsers className="text-white text-xl md:text-2xl" />
              </div>
              <h3 className="text-lg md:text-xl font-semibold text-gray-900 mb-2 md:mb-3">
                Customer First
              </h3>
              <p className="text-sm md:text-base text-gray-600 leading-relaxed">
                Your satisfaction is our priority. We go above and beyond to ensure 
                an exceptional shopping experience.
              </p>
            </div>

            <div className="text-center group bg-gray-50 rounded-xl p-6 md:p-8 hover:bg-white hover:shadow-lg transition-all duration-300">
              <div className="bg-gradient-to-br from-purple-500 to-pink-500 w-16 h-16 md:w-20 md:h-20 rounded-full flex items-center justify-center mx-auto mb-4 md:mb-6 group-hover:scale-110 transition-transform duration-300">
                <FaAward className="text-white text-xl md:text-2xl" />
              </div>
              <h3 className="text-lg md:text-xl font-semibold text-gray-900 mb-2 md:mb-3">
                Excellence
              </h3>
              <p className="text-sm md:text-base text-gray-600 leading-relaxed">
                We strive for excellence in every aspect, from design to delivery, 
                setting new standards in the bridal industry.
              </p>
            </div>

            <div className="text-center group bg-gray-50 rounded-xl p-6 md:p-8 hover:bg-white hover:shadow-lg transition-all duration-300">
              <div className="bg-gradient-to-br from-pink-500 to-rose-500 w-16 h-16 md:w-20 md:h-20 rounded-full flex items-center justify-center mx-auto mb-4 md:mb-6 group-hover:scale-110 transition-transform duration-300">
                <FaHeart className="text-white text-xl md:text-2xl" />
              </div>
              <h3 className="text-lg md:text-xl font-semibold text-gray-900 mb-2 md:mb-3">
                Innovation
              </h3>
              <p className="text-sm md:text-base text-gray-600 leading-relaxed">
                We continuously innovate and evolve, bringing fresh perspectives and 
                cutting-edge designs to our bridal collections.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Vision Section */}
      <div className="py-12 md:py-16 lg:py-20 bg-gradient-to-br from-rose-50 to-pink-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10 md:mb-12 lg:mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3 md:mb-4">
              Our Vision
            </h2>
            <p className="text-lg md:text-xl text-gray-600 max-w-4xl mx-auto mb-6 md:mb-8 leading-relaxed">
              Our vision is to become the premier destination for bridal fashion, offering 
              a comprehensive range of wedding dresses, accessories, and jewelry. We aim 
              to create a one-stop bridal experience where every bride can find everything 
              she needs for her perfect day.
            </p>
            <div className="bg-gradient-to-r from-rose-600 via-pink-600 to-purple-600 rounded-xl md:rounded-2xl p-6 md:p-8 max-w-4xl mx-auto">
              <p className="text-lg md:text-xl lg:text-2xl font-bold text-white italic leading-relaxed">
                "Every bride deserves to feel like a princess on her special day. 
                We're here to make that dream a reality."
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="py-12 md:py-16 lg:py-20 bg-gradient-to-r from-rose-600 via-pink-600 to-purple-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 text-center">
            <div className="group">
              <div className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-1 md:mb-2 group-hover:scale-110 transition-transform duration-300">
                500+
              </div>
              <div className="text-sm md:text-base text-rose-100">Happy Brides</div>
            </div>
            <div className="group">
              <div className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-1 md:mb-2 group-hover:scale-110 transition-transform duration-300">
                8
              </div>
              <div className="text-sm md:text-base text-rose-100">Years Experience</div>
            </div>
            <div className="group">
              <div className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-1 md:mb-2 group-hover:scale-110 transition-transform duration-300">
                50+
              </div>
              <div className="text-sm md:text-base text-rose-100">Designer Brands</div>
            </div>
            <div className="group">
              <div className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-1 md:mb-2 group-hover:scale-110 transition-transform duration-300">
                100%
              </div>
              <div className="text-sm md:text-base text-rose-100">Satisfaction Rate</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;