import React from 'react'
import { useAuth } from '../../contexts/AuthContext'

const Dashboard = () => {
  const { user, profile, signOut } = useAuth()

  if (!user || !profile) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-blue-600">Seasons</h1>
            </div>

            {/* User Menu */}
            <div className="flex items-center space-x-4">
              <div className="text-gray-700 px-3 py-2 rounded-md text-sm font-medium">
                Welcome, {profile.first_name} {profile.last_name}
              </div>
              <button
                onClick={signOut}
                className="btn-secondary"
              >
                Sign Out
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        {/* Welcome Section */}
        <div className="px-4 sm:px-0 mb-8">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Welcome to Seasons! 👋
            </h2>
            <p className="text-gray-600">
              {profile.user_type === 'business' 
                ? `You're logged in as a business user. Manage your wholesale operations and source products.`
                : `You're logged in as a consumer. Discover amazing products and enjoy retail shopping.`
              }
            </p>
            
            {/* User Type Badge */}
            <div className="mt-4">
              <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                profile.user_type === 'business'
                  ? 'bg-blue-100 text-blue-800'
                  : 'bg-green-100 text-green-800'
              }`}>
                {profile.user_type === 'business' ? 'Business Account' : 'Consumer Account'}
              </span>
              {profile.user_type === 'business' && profile.business_name && (
                <span className="ml-2 text-sm text-gray-600">
                  • {profile.business_name}
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Dashboard Content */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Dashboard Coming Soon</h3>
          <p className="text-gray-600">
            This is where you'll see your personalized dashboard with products, orders, and analytics.
            The full Seasons marketplace functionality is being developed.
          </p>
          
          <div className="mt-6 p-4 bg-blue-50 rounded-lg">
            <h4 className="font-medium text-blue-900 mb-2">What's Next?</h4>
            <ul className="text-sm text-blue-800 space-y-1">
              <li>• Product browsing and search</li>
              <li>• Order management</li>
              <li>• Business analytics (for business users)</li>
              <li>• Shopping cart and wishlist (for consumers)</li>
              <li>• Seller verification system</li>
            </ul>
          </div>
        </div>
      </main>
    </div>
  )
}

export default Dashboard
