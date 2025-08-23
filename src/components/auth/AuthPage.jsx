import React, { useState } from 'react'
import SignInForm from './SignInForm'
import SignUpForm from './SignUpForm'

const AuthPage = () => {
  const [isSignUp, setIsSignUp] = useState(false)

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-gray-50 flex">
      {/* Left Side - Features */}
      <div className="hidden lg:flex lg:w-1/2 bg-blue-600 text-white p-12 flex-col justify-center">
        <div className="max-w-lg">
          <div className="mb-8">
            <h1 className="text-4xl font-bold mb-4">Seasons</h1>
            <p className="text-xl text-blue-100">
              The Global Marketplace for Businesses and the Consumers They Serve
            </p>
          </div>

          <div className="space-y-6">
            <div className="flex items-start space-x-4">
              <div className="bg-blue-500 p-3 rounded-lg">
                <div className="w-6 h-6">🏢</div>
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-1">Dual Marketplace</h3>
                <p className="text-blue-100">
                  Source wholesale products for your business or shop retail as a consumer - all in one place.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="bg-blue-500 p-3 rounded-lg">
                <div className="w-6 h-6">🌍</div>
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-1">Global Reach</h3>
                <p className="text-blue-100">
                  Connect with verified suppliers worldwide and access products before they hit traditional retail.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="bg-blue-500 p-3 rounded-lg">
                <div className="w-6 h-6">🛡️</div>
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-1">Trust & Verification</h3>
                <p className="text-blue-100">
                  Rigorous seller verification ensures a secure and reliable marketplace experience.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side - Auth Forms */}
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          {isSignUp ? (
            <SignUpForm onSwitchToSignIn={() => setIsSignUp(false)} />
          ) : (
            <SignInForm onSwitchToSignUp={() => setIsSignUp(true)} />
          )}
        </div>
      </div>
    </div>
  )
}

export default AuthPage
