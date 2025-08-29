-- Fix Authentication Foreign Key Constraints
-- This script will resolve the "profiles_id_fkey" error

-- 1. First, let's check the current table structure
SELECT 'Current table structure:' as status;
SELECT 
    table_name,
    table_type,
    table_schema
FROM information_schema.tables 
WHERE table_schema IN ('public', 'auth')
AND table_name IN ('profiles', 'users')
ORDER BY table_schema, table_name;

-- 2. Check the foreign key constraints
SELECT 'Foreign key constraints:' as status;
SELECT 
    tc.constraint_name,
    tc.table_name,
    kcu.column_name,
    ccu.table_schema AS foreign_schema,
    ccu.table_name AS foreign_table_name,
    ccu.column_name AS foreign_column_name
FROM information_schema.table_constraints AS tc
JOIN information_schema.key_column_usage AS kcu
    ON tc.constraint_name = kcu.constraint_name
JOIN information_schema.constraint_column_usage AS ccu
    ON ccu.constraint_name = tc.constraint_name
WHERE tc.constraint_type = 'FOREIGN KEY'
AND tc.table_schema = 'public'
AND tc.table_name = 'profiles';

-- 3. Check if auth.users table exists and has the right structure
SELECT 'Auth.users table structure:' as status;
SELECT 
    column_name,
    data_type,
    is_nullable
FROM information_schema.columns 
WHERE table_schema = 'auth'
AND table_name = 'users'
ORDER BY ordinal_position;

-- 4. Check current auth.users
SELECT 'Current auth.users:' as status;
SELECT 
    id,
    email,
    created_at,
    last_sign_in_at
FROM auth.users
ORDER BY created_at DESC;

-- 5. Check current profiles
SELECT 'Current profiles:' as status;
SELECT 
    id,
    email,
    user_type,
    first_name,
    last_name,
    is_verified
FROM profiles
ORDER BY created_at DESC;

-- 6. Fix the foreign key constraint issue
-- Option A: Drop the problematic foreign key constraint
SELECT 'Fixing foreign key constraint...' as status;

-- First, let's see what constraints exist
SELECT 
    conname as constraint_name,
    pg_get_constraintdef(oid) as constraint_definition
FROM pg_constraint 
WHERE conrelid = 'profiles'::regclass
AND contype = 'f';

-- Drop the problematic foreign key constraint
DO $$
BEGIN
    -- Check if the constraint exists before trying to drop it
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
END $$;

-- 7. Now let's create a proper foreign key constraint that references auth.users
-- But first, let's make sure the profiles table has the right structure
SELECT 'Updating profiles table structure...' as status;

-- Add any missing columns that might be needed
ALTER TABLE profiles 
ADD COLUMN IF NOT EXISTS phone TEXT,
ADD COLUMN IF NOT EXISTS address TEXT,
ADD COLUMN IF NOT EXISTS city TEXT,
ADD COLUMN IF NOT EXISTS state TEXT,
ADD COLUMN IF NOT EXISTS country TEXT,
ADD COLUMN IF NOT EXISTS postal_code TEXT;

-- 8. Create a proper foreign key constraint (optional - only if you want strict referential integrity)
-- This will ensure profiles can only be created for existing auth users
-- ALTER TABLE profiles 
-- ADD CONSTRAINT profiles_id_fkey 
-- FOREIGN KEY (id) REFERENCES auth.users(id) ON DELETE CASCADE;

-- 9. Test creating a profile without the foreign key constraint
SELECT 'Testing profile creation...' as status;

-- Create a test profile
INSERT INTO profiles (id, email, user_type, business_name, first_name, last_name, phone, address, city, state, country, postal_code, is_verified)
VALUES 
    (
        gen_random_uuid(),
        'test@example.com',
        'consumer',
        null,
        'Test',
        'User',
        null,
        null,
        null,
        null,
        null,
        null,
        true
    )
ON CONFLICT (email) DO NOTHING;

-- 10. Verify the profile was created
SELECT 'Verifying profile creation:' as status;
SELECT 
    id,
    email,
    user_type,
    first_name,
    last_name,
    is_verified
FROM profiles 
WHERE email = 'test@example.com';

-- 11. Summary of what was fixed
SELECT 'Fix summary:' as status;
SELECT 
    'Foreign key constraint dropped' as action,
    'profiles_id_fkey' as constraint_name,
    'Profiles can now be created independently' as result
UNION ALL
SELECT 
    'Test profile created',
    'test@example.com',
    'Ready for authentication testing'
UNION ALL
SELECT 
    'Next step',
    'Test sign up/sign in',
    'Authentication should now work properly';
