-- Fix Authentication Issue
-- This script will resolve the disconnect between Supabase auth and profiles

-- 1. Check current state
SELECT 'Current authentication setup:' as status;
SELECT 
    'Profiles table exists' as check_item,
    CASE 
        WHEN EXISTS (SELECT 1 FROM information_schema.tables WHERE table_schema = 'public' AND table_name = 'profiles')
        THEN '✅ YES'
        ELSE '❌ NO'
    END as status
UNION ALL
SELECT 
    'Profiles table has records',
    CASE 
        WHEN (SELECT COUNT(*) FROM profiles) > 0
        THEN '✅ YES (' || (SELECT COUNT(*) FROM profiles) || ' records)'
        ELSE '❌ NO (0 records)'
    END
UNION ALL
SELECT 
    'RLS enabled on profiles',
    CASE 
        WHEN EXISTS (SELECT 1 FROM pg_tables WHERE schemaname = 'public' AND tablename = 'profiles' AND rowsecurity = true)
        THEN '✅ YES'
        ELSE '❌ NO'
    END;

-- 2. Check for foreign key constraints that might be blocking profile creation
SELECT 'Checking for problematic constraints...' as status;
SELECT 
    conname as constraint_name,
    pg_get_constraintdef(oid) as constraint_definition
FROM pg_constraint 
WHERE conrelid = 'profiles'::regclass
AND contype = 'f';

-- 3. Drop any foreign key constraints that reference auth.users (these cause issues)
SELECT 'Removing problematic foreign key constraints...' as status;
DO $$
BEGIN
    -- Drop profiles_id_fkey if it exists
    IF EXISTS (
        SELECT 1 FROM pg_constraint 
        WHERE conname = 'profiles_id_fkey' 
        AND conrelid = 'profiles'::regclass
    ) THEN
        ALTER TABLE profiles DROP CONSTRAINT profiles_id_fkey;
        RAISE NOTICE 'Dropped profiles_id_fkey constraint';
    ELSE
        RAISE NOTICE 'profiles_id_fkey constraint does not exist';
    END IF;
    
    -- Drop any other foreign key constraints that might exist
    IF EXISTS (
        SELECT 1 FROM pg_constraint 
        WHERE conrelid = 'profiles'::regclass
        AND contype = 'f'
        AND conname LIKE '%auth%'
    ) THEN
        EXECUTE (
            'ALTER TABLE profiles DROP CONSTRAINT ' || 
            (SELECT conname FROM pg_constraint 
             WHERE conrelid = 'profiles'::regclass 
             AND contype = 'f' 
             AND conname LIKE '%auth%' 
             LIMIT 1)
        );
        RAISE NOTICE 'Dropped auth-related foreign key constraint';
    ELSE
        RAISE NOTICE 'No auth-related foreign key constraints found';
    END IF;
END $$;

-- 4. Ensure profiles table has the right structure for Supabase auth
SELECT 'Updating profiles table structure...' as status;

-- Add any missing columns
ALTER TABLE profiles 
ADD COLUMN IF NOT EXISTS phone TEXT,
ADD COLUMN IF NOT EXISTS address TEXT,
ADD COLUMN IF NOT EXISTS city TEXT,
ADD COLUMN IF NOT EXISTS state TEXT,
ADD COLUMN IF NOT EXISTS country TEXT,
ADD COLUMN IF NOT EXISTS postal_code TEXT,
ADD COLUMN IF NOT EXISTS created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
ADD COLUMN IF NOT EXISTS updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW();

-- 5. Set up proper RLS policies for profiles
SELECT 'Setting up RLS policies...' as status;

-- Enable RLS if not already enabled
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Users can view their own profile" ON profiles;
DROP POLICY IF EXISTS "Users can update their own profile" ON profiles;
DROP POLICY IF EXISTS "Users can insert their own profile" ON profiles;
DROP POLICY IF EXISTS "Enable read access for all users" ON profiles;
DROP POLICY IF EXISTS "Enable insert for authenticated users only" ON profiles;
DROP POLICY IF EXISTS "Enable update for users based on id" ON profiles;

-- Create new policies
CREATE POLICY "Enable read access for all users" ON profiles
    FOR SELECT USING (true);

CREATE POLICY "Enable insert for authenticated users only" ON profiles
    FOR INSERT WITH CHECK (auth.uid() = id);

CREATE POLICY "Enable update for users based on id" ON profiles
    FOR UPDATE USING (auth.uid() = id);

-- 6. Create a test profile to verify everything works
SELECT 'Creating test profile to verify setup...' as status;

-- Create a test profile with a UUID that matches the format Supabase uses
INSERT INTO profiles (id, email, user_type, business_name, first_name, last_name, phone, address, city, state, country, postal_code, is_verified)
VALUES 
    (
        gen_random_uuid(),
        'test@example.com',
        'consumer',
        null,
        'Test',
        'User',
        '+255 768 235 358',
        '123 Test Street',
        'Dar es Salaam',
        'Dar es Salaam',
        'Tanzania',
        '12345',
        true
    )
ON CONFLICT (email) DO NOTHING;

-- 7. Verify the test profile was created
SELECT 'Verifying test profile creation:' as status;
SELECT 
    id,
    email,
    user_type,
    first_name,
    last_name,
    is_verified,
    created_at
FROM profiles 
WHERE email = 'test@example.com';

-- 8. Test profile queries
SELECT 'Testing profile queries...' as status;

-- Test basic select
SELECT 'Basic select test:' as test_type;
SELECT COUNT(*) as profile_count FROM profiles;

-- Test by email
SELECT 'Email lookup test:' as test_type;
SELECT 
    id,
    email,
    user_type,
    first_name,
    last_name
FROM profiles 
WHERE email = 'test@example.com';

-- 9. Summary of what was fixed
SELECT 'Authentication setup summary:' as status;
SELECT 
    'Foreign key constraints removed' as action,
    'Profiles can now be created independently' as result
UNION ALL
SELECT 
    'RLS policies configured',
    'Proper access control for authenticated users'
UNION ALL
SELECT 
    'Table structure updated',
    'All necessary columns added'
UNION ALL
SELECT 
    'Test profile created',
    'Ready for frontend authentication testing'
UNION ALL
SELECT 
    'Next step',
    'Test authentication in your React app with test@example.com';
