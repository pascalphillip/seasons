import React from 'react'
import { Link } from 'react-router-dom'
import { MapPin, Phone, Mail, Globe, Users, Award, Shield, Truck } from 'lucide-react'

const AboutPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Hero Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            About Seasons
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Your trusted partner in connecting businesses with quality suppliers and consumers with amazing products.
            We're building the future of commerce in Tanzania and beyond.
          </p>
        </div>
      </section>

      {/* Company Story */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Story</h2>
              <p className="text-lg text-gray-600 mb-6">
                Seasons was founded with a vision to revolutionize how businesses source products and how consumers discover quality goods. 
                We believe that every business, regardless of size, should have access to the best suppliers and products.
              </p>
              <p className="text-lg text-gray-600 mb-6">
                Based in Dar es Salaam, Tanzania, we're proud to be part of Africa's growing digital economy. 
                Our platform serves both local businesses and international partners, creating opportunities for growth and collaboration.
              </p>
              <p className="text-lg text-gray-600">
                We're committed to building trust through verification, quality assurance, and exceptional customer service. 
                Every product on our platform meets our rigorous standards for quality and reliability.
              </p>
            </div>
            <div className="bg-gradient-to-br from-blue-100 to-purple-100 rounded-2xl p-8">
              <div className="text-center">
                <Globe className="w-24 h-24 text-blue-600 mx-auto mb-6" />
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Global Vision, Local Impact</h3>
                <p className="text-gray-600">
                  Connecting Tanzania to the world while empowering local businesses to grow and succeed.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Values */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Mission & Values</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              We're driven by core values that guide everything we do
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="text-center p-6 rounded-lg hover:bg-gray-50 transition-all duration-200">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Trust & Quality</h3>
              <p className="text-gray-600">We verify every supplier and ensure product quality meets our high standards</p>
            </div>
            
            <div className="text-center p-6 rounded-lg hover:bg-gray-50 transition-all duration-200">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Community First</h3>
              <p className="text-gray-600">Building strong relationships with our business partners and customers</p>
            </div>
            
            <div className="text-center p-6 rounded-lg hover:bg-gray-50 transition-all duration-200">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Truck className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Reliable Service</h3>
              <p className="text-gray-600">Consistent, dependable service that businesses can count on</p>
            </div>
            
            <div className="text-center p-6 rounded-lg hover:bg-gray-50 transition-all duration-200">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="w-8 h-8 text-orange-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Excellence</h3>
              <p className="text-gray-600">Striving for excellence in every aspect of our business</p>
            </div>
            
            <div className="text-center p-6 rounded-lg hover:bg-gray-50 transition-all duration-200">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Globe className="w-8 h-8 text-red-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Global Reach</h3>
              <p className="text-gray-600">Connecting local businesses with global opportunities</p>
            </div>
            
            <div className="text-center p-6 rounded-lg hover:bg-gray-50 transition-all duration-200">
              <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="w-8 h-8 text-indigo-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Innovation</h3>
              <p className="text-gray-600">Continuously improving our platform and services</p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact & Location */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Get In Touch</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              We'd love to hear from you. Reach out to us for any questions or partnerships.
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Information */}
            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Contact Information</h3>
              
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <Phone className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">Phone</h4>
                    <p className="text-gray-600 text-lg">+255 768 235 358</p>
                    <p className="text-sm text-gray-500">Available Monday - Friday, 8:00 AM - 6:00 PM EAT</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <Mail className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">Email</h4>
                    <p className="text-gray-600 text-lg">info@seasons.co.tz</p>
                    <p className="text-sm text-gray-500">We'll respond within 24 hours</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-6 h-6 text-purple-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">Location</h4>
                    <p className="text-gray-600 text-lg">Dar es Salaam, Tanzania</p>
                    <p className="text-sm text-gray-500">The commercial capital of Tanzania</p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Location Details */}
            <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">About Dar es Salaam</h3>
              <p className="text-gray-600 mb-6">
                Dar es Salaam is Tanzania's largest city and commercial hub, located on the Indian Ocean coast. 
                It's a vibrant, multicultural city that serves as the gateway to East Africa.
              </p>
              <p className="text-gray-600 mb-6">
                Our location here allows us to serve the entire East African region, connecting local businesses 
                with international suppliers and markets.
              </p>
              <div className="bg-white rounded-lg p-4">
                <h4 className="font-semibold text-gray-900 mb-2">Why Dar es Salaam?</h4>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Strategic location for East African trade</li>
                  <li>• Major port and transportation hub</li>
                  <li>• Growing digital economy</li>
                  <li>• Access to regional markets</li>
                  <li>• Strong business community</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">
            Ready to Partner With Us?
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Whether you're a business looking to source products or a supplier wanting to reach new markets, 
            we're here to help you succeed.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/products"
              className="inline-flex items-center px-8 py-4 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-all duration-200"
            >
              Browse Products
            </Link>
            <Link
              to="/auth"
              className="inline-flex items-center px-8 py-4 border-2 border-blue-600 text-blue-600 font-semibold rounded-lg hover:bg-blue-50 transition-all duration-200"
            >
              Get Started
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}

export default AboutPage
