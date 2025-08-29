-- Test and Fix Authentication Issues
-- Run this in your Supabase SQL Editor to diagnose auth problems

-- 1. Check if auth schema exists and is working
SELECT 'Checking auth schema...' as status;
SELECT 
    schema_name,
    schema_owner
FROM information_schema.schemata 
WHERE schema_name = 'auth';

-- 2. Check if profiles table exists and has correct structure
SELECT 'Checking profiles table...' as status;
SELECT 
    table_name,
    table_type
FROM information_schema.tables 
WHERE table_schema = 'public' 
AND table_name = 'profiles';

-- 3. Check profiles table structure
SELECT 'Profiles table structure:' as status;
SELECT 
    column_name,
    data_type,
    is_nullable,
    column_default
FROM information_schema.columns 
WHERE table_schema = 'public' 
AND table_name = 'profiles'
ORDER BY ordinal_position;

-- 4. Check if RLS policies are correct
SELECT 'Checking RLS policies...' as status;
SELECT 
    schemaname,
    tablename,
    policyname,
    permissive,
    roles,
    cmd,
    qual
FROM pg_policies 
WHERE schemaname = 'public'
AND tablename = 'profiles';

-- 5. Check current profiles
SELECT 'Current profiles in database:' as status;
SELECT 
    id,
    email,
    user_type,
    business_name,
    first_name,
    last_name,
    is_verified,
    created_at
FROM profiles
ORDER BY created_at DESC;

-- 6. Check for any auth.users (if they exist)
SELECT 'Checking auth.users...' as status;
SELECT 
    id,
    email,
    created_at,
    last_sign_in_at
FROM auth.users
ORDER BY created_at DESC;

-- 7. Create a test profile if none exist
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

-- 8. Verify the test profile was created
SELECT 'Test profile created:' as status;
SELECT 
    id,
    email,
    user_type,
    first_name,
    last_name,
    is_verified
FROM profiles 
WHERE email = 'test@example.com';

-- 9. Check for any foreign key constraint issues
SELECT 'Checking foreign key constraints...' as status;
SELECT 
    tc.constraint_name,
    tc.table_name,
    kcu.column_name,
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

-- 10. Summary
SELECT 'Authentication setup summary:' as status;
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
    'RLS policies exist',
    CASE 
        WHEN (SELECT COUNT(*) FROM pg_policies WHERE schemaname = 'public' AND tablename = 'profiles') > 0
        THEN '✅ YES'
        ELSE '❌ NO'
    END;
