import React from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, Star, Shield, Globe, Users, TrendingUp } from 'lucide-react'

const HomePage = () => {
  const features = [
    {
      icon: <Globe className="w-8 h-8" />,
      title: 'Global Reach',
      description: 'Connect with suppliers and buyers worldwide in one unified platform.'
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: 'Trust & Verification',
      description: 'Rigorous seller verification ensures secure and reliable transactions.'
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: 'Dual Marketplace',
      description: 'Serve both B2B wholesale and B2C retail customers simultaneously.'
    },
    {
      icon: <TrendingUp className="w-8 h-8" />,
      title: 'Growth Opportunities',
      description: 'Expand your business reach and discover new market opportunities.'
    }
  ]

  const stats = [
    { number: '10K+', label: 'Products Available' },
    { number: '500+', label: 'Verified Suppliers' },
    { number: '50+', label: 'Countries Served' },
    { number: '99%', label: 'Customer Satisfaction' }
  ]

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-50 to-purple-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
              The Global Marketplace for
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
                {' '}Businesses and Consumers
              </span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Seasons bridges the gap between wholesale trade and retail shopping. 
              Source products in bulk for your business or shop individually as a consumer - all in one place.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/auth?signup=true"
                className="bg-blue-600 text-white px-8 py-4 rounded-lg hover:bg-blue-700 transition-colors duration-200 text-lg font-semibold flex items-center justify-center space-x-2"
              >
                <span>Get Started</span>
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                to="/products"
                className="bg-white text-blue-600 px-8 py-4 rounded-lg hover:bg-gray-50 transition-colors duration-200 text-lg font-semibold border-2 border-blue-600"
              >
                Browse Products
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Why Choose Seasons?
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Our platform combines the best of B2B and B2C commerce, 
              creating opportunities for businesses and consumers alike.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="text-center p-6">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4 text-blue-600">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl font-bold text-blue-600 mb-2">
                  {stat.number}
                </div>
                <div className="text-gray-600">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Ready to Transform Your Commerce Experience?
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Join thousands of businesses and consumers who are already using Seasons 
            to discover new opportunities and streamline their operations.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/auth?signup=true"
              className="bg-blue-600 text-white px-8 py-4 rounded-lg hover:bg-blue-700 transition-colors duration-200 text-lg font-semibold"
            >
              Create Your Account
            </Link>
            <Link
              to="/about"
              className="bg-white text-blue-600 px-8 py-4 rounded-lg hover:bg-gray-50 transition-colors duration-200 text-lg font-semibold border-2 border-blue-600"
            >
              Learn More
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-lg">S</span>
                </div>
                <span className="text-2xl font-bold">Seasons</span>
              </div>
              <p className="text-gray-400">
                The global marketplace for businesses and the consumers they serve.
              </p>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">For Businesses</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="/business" className="hover:text-white transition-colors">Wholesale Sourcing</a></li>
                <li><a href="/verification" className="hover:text-white transition-colors">Seller Verification</a></li>
                <li><a href="/analytics" className="hover:text-white transition-colors">Business Analytics</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">For Consumers</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="/products" className="hover:text-white transition-colors">Browse Products</a></li>
                <li><a href="/wishlist" className="hover:text-white transition-colors">Wishlist</a></li>
                <li><a href="/orders" className="hover:text-white transition-colors">Order Tracking</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Support</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="/help" className="hover:text-white transition-colors">Help Center</a></li>
                <li><a href="/contact" className="hover:text-white transition-colors">Contact Us</a></li>
                <li><a href="/terms" className="hover:text-white transition-colors">Terms of Service</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 Seasons. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default HomePage
