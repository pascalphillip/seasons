# Authentication Troubleshooting Guide

## Common Issues and Solutions

### 1. "Invalid Credentials" Error

**Problem**: Users get "Invalid credentials" when trying to sign in or sign up.

**Possible Causes**:
- Supabase environment variables not set correctly
- Database connection issues
- RLS (Row Level Security) policies blocking access
- Profile table doesn't exist or has wrong structure

**Solutions**:

#### A. Check Environment Variables
Make sure your `.env` file has the correct Supabase credentials:

```env
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key-here
```

#### B. Verify Supabase Connection
Check if your Supabase client is connecting properly:

```javascript
// In your browser console, check:
console.log('Supabase URL:', import.meta.env.VITE_SUPABASE_URL)
console.log('Supabase Key:', import.meta.env.VITE_SUPABASE_ANON_KEY)
```

#### C. Run the Test Script
Execute the `test-auth.sql` script in your Supabase SQL Editor to diagnose database issues.

### 2. Profile Creation Fails

**Problem**: User account is created but profile is not created.

**Solution**: The updated AuthContext now handles this automatically and creates a basic profile if needed.

### 3. RLS Policy Issues

**Problem**: Users can't access their own profiles due to RLS policies.

**Solution**: Make sure your RLS policies are correct:

```sql
-- Enable RLS on profiles table
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

-- Policy for users to view their own profile
CREATE POLICY "Users can view their own profile" ON profiles
    FOR SELECT USING (auth.uid() = id);

-- Policy for users to update their own profile
CREATE POLICY "Users can update their own profile" ON profiles
    FOR UPDATE USING (auth.uid() = id);

-- Policy for users to insert their own profile
CREATE POLICY "Users can insert their own profile" ON profiles
    FOR INSERT WITH CHECK (auth.uid() = id);
```

### 4. Database Schema Issues

**Problem**: Profiles table has wrong structure or missing columns.

**Solution**: Run the schema setup script again:

```sql
-- Check if profiles table exists
SELECT * FROM information_schema.tables 
WHERE table_schema = 'public' 
AND table_name = 'profiles';

-- If it doesn't exist, run the schema setup
-- (Use the supabase-schema.sql file)
```

## Testing Authentication

### 1. Test Sign Up
Try creating a new account with:
- Email: `test@example.com`
- Password: `testpassword123`
- User Type: `consumer`
- Name: `Test User`

### 2. Test Sign In
After successful sign up, try signing in with the same credentials.

### 3. Check Browser Console
Look for any error messages in the browser console that might indicate the specific problem.

## Debugging Steps

### Step 1: Check Environment
```bash
# Make sure your .env file exists and has correct values
cat .env
```

### Step 2: Test Supabase Connection
```javascript
// In browser console
import { supabase } from './src/lib/supabase.js'
console.log('Supabase client:', supabase)
```

### Step 3: Check Database
Run the `test-auth.sql` script in Supabase SQL Editor.

### Step 4: Check Network Tab
In browser DevTools, check the Network tab for failed API calls.

### Step 5: Verify RLS Policies
Make sure RLS policies allow authenticated users to access their profiles.

## Common Fixes

### Fix 1: Reset Environment Variables
```bash
# Stop your dev server
# Update .env file
# Restart dev server
npm run dev
```

### Fix 2: Clear Browser Data
- Clear localStorage
- Clear cookies
- Hard refresh the page

### Fix 3: Check Supabase Dashboard
- Verify your project is active
- Check if you have the correct API keys
- Ensure your database is running

### Fix 4: Update RLS Policies
If RLS policies are too restrictive, temporarily disable them for testing:

```sql
-- WARNING: Only for testing, not for production
ALTER TABLE profiles DISABLE ROW LEVEL SECURITY;
```

## Still Having Issues?

1. **Check Supabase Logs**: Look at the Logs section in your Supabase dashboard
2. **Verify Database**: Make sure your database is running and accessible
3. **Check Network**: Ensure your app can reach Supabase servers
4. **Test with Simple Credentials**: Use basic email/password combinations
5. **Check for Typos**: Verify all environment variable names and values

## Quick Test

Try this simple test to isolate the issue:

```javascript
// In browser console
const testAuth = async () => {
  try {
    const { data, error } = await supabase.auth.signUp({
      email: 'test@example.com',
      password: 'testpassword123'
    })
    console.log('Sign up result:', { data, error })
  } catch (err) {
    console.error('Sign up error:', err)
  }
}

testAuth()
```

If this fails, the issue is with Supabase connection or configuration.
If this succeeds, the issue is with profile creation or RLS policies.
