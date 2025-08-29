-- Test Frontend Authentication
-- This script creates test users that can be used to test the frontend

-- 1. First, let's check what we have
SELECT 'Current database state:' as status;
SELECT 
    'Profiles table' as table_name,
    (SELECT COUNT(*) FROM profiles) as record_count
UNION ALL
SELECT 
    'Auth users (if accessible)',
    (SELECT COUNT(*) FROM auth.users)
UNION ALL
SELECT 
    'Products table',
    (SELECT COUNT(*) FROM products)
UNION ALL
SELECT 
    'Categories table',
    (SELECT COUNT(*) FROM categories);

-- 2. Create test profiles for frontend testing
SELECT 'Creating test profiles for frontend authentication...' as status;

-- Test Profile 1: Consumer User
INSERT INTO profiles (id, email, user_type, business_name, first_name, last_name, phone, address, city, state, country, postal_code, is_verified)
VALUES 
    (
        gen_random_uuid(),
        'testuser@example.com',
        'consumer',
        null,
        'Test',
        'Consumer',
        '+255 768 235 360',
        '123 Test Street',
        'Dar es Salaam',
        'Dar es Salaam',
        'Tanzania',
        '12345',
        true
    )
ON CONFLICT (email) DO NOTHING;

-- Test Profile 2: Business User
INSERT INTO profiles (id, email, user_type, business_name, first_name, last_name, phone, address, city, state, country, postal_code, is_verified)
VALUES 
    (
        gen_random_uuid(),
        'businessuser@example.com',
        'business',
        'Test Business Ltd',
        'Business',
        'Owner',
        '+255 768 235 361',
        '456 Business Avenue',
        'Dar es Salaam',
        'Dar es Salaam',
        'Tanzania',
        '54321',
        true
    )
ON CONFLICT (email) DO NOTHING;

-- Test Profile 3: Another Consumer
INSERT INTO profiles (id, email, user_type, business_name, first_name, last_name, phone, address, city, state, country, postal_code, is_verified)
VALUES 
    (
        gen_random_uuid(),
        'demo@example.com',
        'consumer',
        null,
        'Demo',
        'User',
        '+255 768 235 362',
        '789 Demo Road',
        'Dar es Salaam',
        'Dar es Salaam',
        'Tanzania',
        '67890',
        true
    )
ON CONFLICT (email) DO NOTHING;

-- 3. Verify the profiles were created
SELECT 'Test profiles created:' as status;
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
WHERE email IN ('testuser@example.com', 'businessuser@example.com', 'demo@example.com')
ORDER BY created_at DESC;

-- 4. Test profile queries (simulating what the frontend would do)
SELECT 'Testing profile queries...' as status;

-- Test 1: Query by email
SELECT 'Profile by email (testuser@example.com):' as query_type;
SELECT 
    id,
    email,
    user_type,
    first_name,
    last_name,
    is_verified
FROM profiles 
WHERE email = 'testuser@example.com';

-- Test 2: Query by user type
SELECT 'Profiles by user type:' as query_type;
SELECT 
    user_type,
    COUNT(*) as count
FROM profiles 
GROUP BY user_type;

-- Test 3: Query all profiles
SELECT 'All profiles summary:' as query_type;
SELECT 
    COUNT(*) as total_profiles,
    COUNT(CASE WHEN user_type = 'consumer' THEN 1 END) as consumer_count,
    COUNT(CASE WHEN user_type = 'business' THEN 1 END) as business_count,
    COUNT(CASE WHEN is_verified = true THEN 1 END) as verified_count
FROM profiles;

-- 5. Frontend testing instructions
SELECT 'Frontend Testing Instructions:' as status;
SELECT 'Test User 1: testuser@example.com (consumer) - Use this to test consumer signup/signin' as instruction
UNION ALL
SELECT 'Test User 2: businessuser@example.com (business) - Use this to test business signup/signin'
UNION ALL
SELECT 'Test User 3: demo@example.com (consumer) - Use this for general testing';

-- 6. Authentication flow test
SELECT 'Authentication Flow Test:' as status;
SELECT 'Step 1: Go to /auth in your React app' as step
UNION ALL
SELECT 'Step 2: Try to sign up with testuser@example.com'
UNION ALL
SELECT 'Step 3: Check if profile is created in database'
UNION ALL
SELECT 'Step 4: Try to sign in with the same credentials'
UNION ALL
SELECT 'Step 5: Check if user stays logged in after refresh';

-- 7. Debug information
SELECT 'Debug Information:' as status;
SELECT 'Check browser console - Look for authentication logs' as debug_step
UNION ALL
SELECT 'Check Network tab - Look for failed API calls to Supabase'
UNION ALL
SELECT 'Check localStorage - Look for auth tokens and user data'
UNION ALL
SELECT 'Check AuthDebugger component - Use the debug panel in bottom-right corner';

-- 8. Summary
SELECT 'Ready for frontend testing!' as status;
SELECT 'Profiles created: ' || (SELECT COUNT(*) FROM profiles WHERE email IN ('testuser@example.com', 'businessuser@example.com', 'demo@example.com'))::text as result
UNION ALL
SELECT 'Next step: Test authentication in your React app'
UNION ALL
SELECT 'Use these emails: testuser@example.com, businessuser@example.com, demo@example.com'
UNION ALL
SELECT 'Check AuthDebugger: Look for the debug panel in your app';
