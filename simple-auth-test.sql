-- Simple Authentication Test - No Foreign Key Constraints
-- This script will work around the foreign key constraint issue

-- 1. Check if we can create profiles without the constraint
SELECT 'Testing profile creation without foreign key constraint...' as status;

-- Create a test profile with a random UUID
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

-- 2. Verify the profile was created
SELECT 'Profile creation result:' as status;
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

-- 3. Create a few more test profiles for different user types
SELECT 'Creating additional test profiles...' as status;

-- Business user profile
INSERT INTO profiles (id, email, user_type, business_name, first_name, last_name, phone, address, city, state, country, postal_code, is_verified)
VALUES 
    (
        gen_random_uuid(),
        'business@example.com',
        'business',
        'Test Business Inc.',
        'Business',
        'Owner',
        '+255 768 235 358',
        '123 Business Street',
        'Dar es Salaam',
        'Dar es Salaam',
        'Tanzania',
        '12345',
        true
    )
ON CONFLICT (email) DO NOTHING;

-- Consumer user profile
INSERT INTO profiles (id, email, user_type, business_name, first_name, last_name, phone, address, city, state, country, postal_code, is_verified)
VALUES 
    (
        gen_random_uuid(),
        'consumer@example.com',
        'consumer',
        null,
        'Regular',
        'Customer',
        '+255 768 235 359',
        '456 Customer Ave',
        'Dar es Salaam',
        'Dar es Salaam',
        'Tanzania',
        '54321',
        true
    )
ON CONFLICT (email) DO NOTHING;

-- 4. Show all created profiles
SELECT 'All test profiles:' as status;
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
WHERE email IN ('test@example.com', 'business@example.com', 'consumer@example.com')
ORDER BY created_at DESC;

-- 5. Test if we can query profiles (for authentication testing)
SELECT 'Testing profile queries...' as status;

-- Test by email
SELECT 'Profile by email (test@example.com):' as query_type;
SELECT 
    id,
    email,
    user_type,
    first_name,
    last_name
FROM profiles 
WHERE email = 'test@example.com';

-- Test by user type
SELECT 'Profiles by user type:' as query_type;
SELECT 
    user_type,
    COUNT(*) as count
FROM profiles 
GROUP BY user_type;

-- 6. Summary
SELECT 'Test completed successfully!' as status;
SELECT 
    'Profiles created' as action,
    (SELECT COUNT(*) FROM profiles WHERE email IN ('test@example.com', 'business@example.com', 'consumer@example.com')) as result
UNION ALL
SELECT 
    'Next step',
    'Test authentication in your React app with these credentials:'
UNION ALL
SELECT 
    'Email: test@example.com',
    'Password: (create this in your app)'
UNION ALL
SELECT 
    'Email: business@example.com', 
    'Password: (create this in your app)'
UNION ALL
SELECT 
    'Email: consumer@example.com',
    'Password: (create this in your app)';
