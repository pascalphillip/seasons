import React, { useState } from 'react'
import { useAuth } from '../../contexts/AuthContext'
import { supabase } from '../../lib/supabase'

const AuthTester = () => {
  const { user, profile, signIn, signUp } = useAuth()
  const [testEmail, setTestEmail] = useState('testuser@example.com')
  const [testPassword, setTestPassword] = useState('testpassword123')
  const [results, setResults] = useState([])
  const [loading, setLoading] = useState(false)

  const addResult = (message, type = 'info') => {
    setResults(prev => [...prev, { message, type, timestamp: new Date().toLocaleTimeString() }])
  }

  const clearResults = () => {
    setResults([])
  }

  const testDirectSupabase = async () => {
    setLoading(true)
    addResult('Testing direct Supabase authentication...', 'info')
    
    try {
      // Test 1: Direct sign in
      addResult('Attempting direct sign in...', 'info')
      const { data, error } = await supabase.auth.signInWithPassword({
        email: testEmail,
        password: testPassword
      })
      
      if (error) {
        addResult(`Sign in error: ${error.message}`, 'error')
      } else {
        addResult(`Sign in successful! User ID: ${data.user?.id}`, 'success')
        addResult(`User email: ${data.user?.email}`, 'success')
        addResult(`Session: ${data.session ? 'Active' : 'None'}`, 'success')
      }
    } catch (err) {
      addResult(`Unexpected error: ${err.message}`, 'error')
    } finally {
      setLoading(false)
    }
  }

  const testSignUp = async () => {
    setLoading(true)
    addResult('Testing sign up...', 'info')
    
    try {
      const { data, error } = await signUp({
        email: testEmail,
        password: testPassword,
        userType: 'consumer',
        businessName: '',
        firstName: 'Test',
        lastName: 'User'
      })
      
      if (error) {
        addResult(`Sign up error: ${error.message}`, 'error')
      } else {
        addResult('Sign up successful!', 'success')
        addResult(`User data: ${JSON.stringify(data)}`, 'info')
      }
    } catch (err) {
      addResult(`Unexpected error: ${err.message}`, 'error')
    } finally {
      setLoading(false)
    }
  }

  const testSignIn = async () => {
    setLoading(true)
    addResult('Testing sign in through AuthContext...', 'info')
    
    try {
      const { data, error } = await signIn({
        email: testEmail,
        password: testPassword
      })
      
      if (error) {
        addResult(`Sign in error: ${error.message}`, 'error')
      } else {
        addResult('Sign in successful through AuthContext!', 'success')
        addResult(`User data: ${JSON.stringify(data)}`, 'info')
      }
    } catch (err) {
      addResult(`Unexpected error: ${err.message}`, 'error')
    } finally {
      setLoading(false)
    }
  }

  const checkCurrentSession = async () => {
    addResult('Checking current session...', 'info')
    
    try {
      const { data: { session }, error } = await supabase.auth.getSession()
      
      if (error) {
        addResult(`Session error: ${error.message}`, 'error')
      } else if (session) {
        addResult(`Session active! User: ${session.user.email}`, 'success')
        addResult(`User ID: ${session.user.id}`, 'info')
      } else {
        addResult('No active session', 'warning')
      }
    } catch (err) {
      addResult(`Session check error: ${err.message}`, 'error')
    }
  }

  const checkProfile = async () => {
    addResult('Checking profile...', 'info')
    
    if (user) {
      addResult(`User authenticated: ${user.email}`, 'success')
      addResult(`Profile loaded: ${profile ? 'Yes' : 'No'}`, profile ? 'success' : 'warning')
      
      if (profile) {
        addResult(`Profile data: ${JSON.stringify(profile, null, 2)}`, 'info')
      }
    } else {
      addResult('No user authenticated', 'warning')
    }
  }

  const signOut = async () => {
    try {
      await supabase.auth.signOut()
      addResult('Signed out successfully', 'success')
    } catch (err) {
      addResult(`Sign out error: ${err.message}`, 'error')
    }
  }

  return (
    <div className="fixed top-4 left-4 bg-white border border-gray-300 rounded-lg p-4 max-w-md max-h-96 overflow-y-auto shadow-lg">
      <h3 className="font-semibold text-gray-900 mb-3">🔐 Auth Tester</h3>
      
      <div className="space-y-3 mb-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Test Email:</label>
          <input
            type="email"
            value={testEmail}
            onChange={(e) => setTestEmail(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
            placeholder="test@example.com"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Test Password:</label>
          <input
            type="password"
            value={testPassword}
            onChange={(e) => setTestPassword(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
            placeholder="password"
          />
        </div>
      </div>

      <div className="space-y-2 mb-4">
        <button
          onClick={testDirectSupabase}
          disabled={loading}
          className="w-full bg-blue-500 text-white px-3 py-2 rounded text-sm hover:bg-blue-600 disabled:opacity-50"
        >
          Test Direct Supabase
        </button>
        
        <button
          onClick={testSignUp}
          disabled={loading}
          className="w-full bg-green-500 text-white px-3 py-2 rounded text-sm hover:bg-green-600 disabled:opacity-50"
        >
          Test Sign Up
        </button>
        
        <button
          onClick={testSignIn}
          disabled={loading}
          className="w-full bg-purple-500 text-white px-3 py-2 rounded text-sm hover:bg-purple-600 disabled:opacity-50"
        >
          Test Sign In
        </button>
        
        <button
          onClick={checkCurrentSession}
          className="w-full bg-yellow-500 text-white px-3 py-2 rounded text-sm hover:bg-yellow-600"
        >
          Check Session
        </button>
        
        <button
          onClick={checkProfile}
          className="w-full bg-indigo-500 text-white px-3 py-2 rounded text-sm hover:bg-indigo-600"
        >
          Check Profile
        </button>
        
        <button
          onClick={signOut}
          className="w-full bg-red-500 text-white px-3 py-2 rounded text-sm hover:bg-red-600"
        >
          Sign Out
        </button>
        
        <button
          onClick={clearResults}
          className="w-full bg-gray-500 text-white px-3 py-2 rounded text-sm hover:bg-gray-600"
        >
          Clear Results
        </button>
      </div>

      <div className="border-t pt-3">
        <h4 className="font-medium text-gray-700 mb-2">Results:</h4>
        <div className="space-y-1 max-h-32 overflow-y-auto">
          {results.map((result, index) => (
            <div
              key={index}
              className={`text-xs p-2 rounded ${
                result.type === 'error' ? 'bg-red-100 text-red-800' :
                result.type === 'success' ? 'bg-green-100 text-green-800' :
                result.type === 'warning' ? 'bg-yellow-100 text-yellow-800' :
                'bg-gray-100 text-gray-800'
              }`}
            >
              <span className="text-gray-500">{result.timestamp}</span> {result.message}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default AuthTester
