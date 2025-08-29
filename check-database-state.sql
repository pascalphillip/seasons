-- Database State Check Script
-- Run this in your Supabase SQL Editor to diagnose issues

-- Check if tables exist
SELECT 
    table_name,
    CASE 
        WHEN table_name IS NOT NULL THEN '✅ Table exists'
        ELSE '❌ Table missing'
    END as status
FROM information_schema.tables 
WHERE table_schema = 'public' 
AND table_name IN ('profiles', 'products', 'categories', 'orders', 'product_reviews');

-- Check profiles table structure
SELECT 
    column_name,
    data_type,
    is_nullable,
    column_default
FROM information_schema.columns 
WHERE table_schema = 'public' 
AND table_name = 'profiles'
ORDER BY ordinal_position;

-- Check products table structure
SELECT 
    column_name,
    data_type,
    is_nullable,
    column_default
FROM information_schema.columns 
WHERE table_schema = 'public' 
AND table_name = 'products'
ORDER BY ordinal_position;

-- Check if profiles exist
SELECT 
    COUNT(*) as total_profiles,
    COUNT(CASE WHEN user_type = 'business' THEN 1 END) as business_profiles,
    COUNT(CASE WHEN user_type = 'consumer' THEN 1 END) as consumer_profiles,
    COUNT(CASE WHEN is_verified = true THEN 1 END) as verified_profiles
FROM profiles;

-- Check if products exist
SELECT 
    COUNT(*) as total_products,
    COUNT(CASE WHEN is_active = true THEN 1 END) as active_products,
    COUNT(CASE WHEN seller_id IS NOT NULL THEN 1 END) as products_with_seller
FROM products;

-- Check for orphaned products (products without valid seller_id)
SELECT 
    p.id,
    p.name,
    p.sku,
    p.seller_id,
    CASE 
        WHEN pr.id IS NOT NULL THEN '✅ Valid seller'
        ELSE '❌ Orphaned product - no valid seller'
    END as seller_status
FROM products p
LEFT JOIN profiles pr ON p.seller_id = pr.id
WHERE pr.id IS NULL;

-- Check for products with invalid category_id
SELECT 
    p.id,
    p.name,
    p.sku,
    p.category_id,
    CASE 
        WHEN c.id IS NOT NULL THEN '✅ Valid category'
        ELSE '❌ Invalid category'
    END as category_status
FROM products p
LEFT JOIN categories c ON p.category_id = c.id
WHERE c.id IS NULL;

-- Check categories
SELECT 
    COUNT(*) as total_categories,
    COUNT(CASE WHEN is_active = true THEN 1 END) as active_categories
FROM categories;

-- Check foreign key constraints
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
AND tc.table_name IN ('products', 'orders', 'product_reviews');

-- Check RLS policies
SELECT 
    schemaname,
    tablename,
    policyname,
    permissive,
    roles,
    cmd,
    qual,
    with_check
FROM pg_policies 
WHERE schemaname = 'public'
AND tablename IN ('profiles', 'products', 'orders', 'product_reviews');

-- Sample data check
SELECT 'Profiles' as table_name, COUNT(*) as record_count FROM profiles
UNION ALL
SELECT 'Products', COUNT(*) FROM products
UNION ALL
SELECT 'Categories', COUNT(*) FROM categories
UNION ALL
SELECT 'Orders', COUNT(*) FROM orders
UNION ALL
SELECT 'Product Reviews', COUNT(*) FROM product_reviews;
