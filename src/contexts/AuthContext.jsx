import React, { createContext, useContext, useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'

const AuthContext = createContext({})

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [profile, setProfile] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Get initial session
    const getSession = async () => {
      try {
        console.log('Getting initial session...')
        const { data: { session }, error } = await supabase.auth.getSession()
        
        if (error) {
          console.error('Error getting session:', error)
          setLoading(false)
          return
        }
        
        console.log('Session data:', session)
        setUser(session?.user ?? null)
        
        if (session?.user) {
          console.log('User found in session:', session.user.email)
          await fetchProfile(session.user.id)
        } else {
          console.log('No user in session')
          setProfile(null)
        }
      } catch (error) {
        console.error('Error in getSession:', error)
        setLoading(false)
      } finally {
        setLoading(false)
      }
    }

    getSession()

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        console.log('Auth state change:', event, session?.user?.email)
        
        setUser(session?.user ?? null)
        
        if (session?.user) {
          await fetchProfile(session.user.id)
        } else {
          setProfile(null)
        }
        
        setLoading(false)
      }
    )

    return () => subscription.unsubscribe()
  }, [])

  const fetchProfile = async (userId) => {
    try {
      console.log('Fetching profile for user:', userId)
      
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single()

      if (error) {
        console.error('Error fetching profile:', error)
        
        // If profile doesn't exist, try to create a basic one
        if (error.code === 'PGRST116') { // No rows returned
          console.log('Profile not found, creating basic profile...')
          try {
            const { data: userData, error: userError } = await supabase.auth.getUser()
            
            if (userError) {
              console.error('Error getting user data:', userError)
              return
            }
            
            if (userData.user) {
              const basicProfile = {
                id: userId,
                email: userData.user.email,
                user_type: 'consumer', // Default to consumer
                business_name: null,
                first_name: 'User',
                last_name: 'Account',
                phone: null,
                address: null,
                city: null,
                state: null,
                country: null,
                postal_code: null,
                is_verified: false
              }
              
              console.log('Creating basic profile:', basicProfile)
              
              const { error: createError } = await supabase
                .from('profiles')
                .insert([basicProfile])
              
              if (!createError) {
                console.log('Basic profile created successfully')
                setProfile(basicProfile)
                return
              } else {
                console.error('Error creating basic profile:', createError)
              }
            }
          } catch (createError) {
            console.error('Failed to create basic profile:', createError)
          }
        }
      } else {
        console.log('Profile found:', data)
        setProfile(data)
      }
    } catch (error) {
      console.error('Error fetching profile:', error)
    }
  }

  const signUp = async ({ email, password, userType, businessName, firstName, lastName }) => {
    try {
      setLoading(true)
      
      // First, create the user account
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            user_type: userType,
            business_name: businessName,
            first_name: firstName,
            last_name: lastName
          }
        }
      })

      if (error) {
        console.error('Signup error:', error)
        return { data: null, error }
      }

      // If signup successful, create profile
      if (data.user) {
        try {
          const profileData = {
            id: data.user.id,
            email: data.user.email,
            user_type: userType,
            business_name: businessName || null,
            first_name: firstName,
            last_name: lastName,
            phone: null,
            address: null,
            city: null,
            state: null,
            country: null,
            postal_code: null,
            is_verified: false
          }

          const { error: profileError } = await supabase
            .from('profiles')
            .insert([profileData])

          if (profileError) {
            console.error('Profile creation error:', profileError)
            // Don't fail the signup if profile creation fails
            // The user can still sign in and we'll create the profile later
          } else {
            console.log('Profile created successfully')
            setProfile(profileData)
          }
        } catch (profileError) {
          console.error('Profile creation failed:', profileError)
          // Continue with signup even if profile creation fails
        }
      }

      return { data, error: null }
    } catch (error) {
      console.error('Unexpected signup error:', error)
      return { data: null, error }
    } finally {
      setLoading(false)
    }
  }

  const signIn = async ({ email, password }) => {
    try {
      setLoading(true)
      
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      })

      if (error) {
        console.error('Sign in error:', error)
        return { data: null, error }
      }

      // If sign in successful, fetch or create profile
      if (data.user) {
        try {
          await fetchProfile(data.user.id)
        } catch (profileError) {
          console.error('Profile fetch error:', profileError)
          // Don't fail sign in if profile fetch fails
        }
      }

      return { data, error: null }
    } catch (error) {
      console.error('Unexpected sign in error:', error)
      return { data: null, error }
    } finally {
      setLoading(false)
    }
  }

  const signOut = async () => {
    try {
      const { error } = await supabase.auth.signOut()
      if (error) throw error
    } catch (error) {
      console.error('Error signing out:', error)
    }
  }

  // Function to check if user is authenticated
  const isAuthenticated = () => {
    return !!user && !!profile
  }

  // Function to get user's display name
  const getUserDisplayName = () => {
    if (profile) {
      if (profile.first_name && profile.last_name) {
        return `${profile.first_name} ${profile.last_name}`
      }
      return profile.email
    }
    return user?.email || 'Guest'
  }

  const value = {
    user,
    profile,
    loading,
    isAuthenticated,
    getUserDisplayName,
    signUp,
    signIn,
    signOut
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}
