import React from 'react'
import { useAuth } from '../../contexts/AuthContext'
import { supabase } from '../../lib/supabase'

const AuthDebugger = () => {
  const { user, profile, loading, isAuthenticated, getUserDisplayName } = useAuth()

  const testAuth = async () => {
    try {
      console.log('=== Testing Authentication ===')
      
      // Test 1: Check current session
      const { data: { session }, error: sessionError } = await supabase.auth.getSession()
      console.log('Current session:', session)
      console.log('Session error:', sessionError)
      
      // Test 2: Check current user
      const { data: { user: currentUser }, error: userError } = await supabase.auth.getUser()
      console.log('Current user:', currentUser)
      console.log('User error:', userError)
      
      // Test 3: Check if we can access profiles table
      if (currentUser) {
        const { data: profileData, error: profileError } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', currentUser.id)
          .single()
        
        console.log('Profile data:', profileData)
        console.log('Profile error:', profileError)
      }
      
      console.log('=== End Test ===')
    } catch (error) {
      console.error('Test failed:', error)
    }
  }

  const clearAuth = async () => {
    try {
      await supabase.auth.signOut()
      console.log('Auth cleared')
    } catch (error) {
      console.error('Error clearing auth:', error)
    }
  }

  if (!user) {
    return (
      <div className="fixed bottom-4 right-4 bg-yellow-100 border border-yellow-400 rounded-lg p-4 max-w-sm">
        <h3 className="font-semibold text-yellow-800 mb-2">🔍 Auth Debugger</h3>
        <p className="text-yellow-700 text-sm mb-3">No user logged in</p>
        <div className="space-y-2">
          <button
            onClick={testAuth}
            className="bg-yellow-500 text-white px-3 py-1 rounded text-sm hover:bg-yellow-600"
          >
            Test Auth
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="fixed bottom-4 right-4 bg-blue-100 border border-blue-400 rounded-lg p-4 max-w-sm">
      <h3 className="font-semibold text-blue-800 mb-2">🔍 Auth Debugger</h3>
      
      <div className="space-y-2 text-sm">
        <div>
          <strong>User:</strong> {user?.email || 'No email'}
        </div>
        <div>
          <strong>Profile:</strong> {profile ? '✅ Loaded' : '❌ Missing'}
        </div>
        <div>
          <strong>Authenticated:</strong> {isAuthenticated() ? '✅ Yes' : '❌ No'}
        </div>
        <div>
          <strong>Display Name:</strong> {getUserDisplayName()}
        </div>
        <div>
          <strong>Loading:</strong> {loading ? '⏳ Yes' : '✅ No'}
        </div>
      </div>
      
      <div className="mt-3 space-y-2">
        <button
          onClick={testAuth}
          className="bg-blue-500 text-white px-3 py-1 rounded text-sm hover:bg-blue-600 w-full"
        >
          Test Auth
        </button>
        <button
          onClick={clearAuth}
          className="bg-red-500 text-white px-3 py-1 rounded text-sm hover:bg-red-600 w-full"
        >
          Clear Auth
        </button>
      </div>
    </div>
  )
}

export default AuthDebugger
