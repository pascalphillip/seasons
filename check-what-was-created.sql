-- Check What Was Created
-- Run this to see what's currently in your database

-- Check profiles
SELECT '=== PROFILES ===' as section;
SELECT id, email, user_type, business_name, is_verified FROM profiles;

-- Check categories
SELECT '=== CATEGORIES ===' as section;
SELECT id, name, description, is_active FROM categories;

-- Check products
SELECT '=== PRODUCTS ===' as section;
SELECT 
    p.id,
    p.name,
    p.sku,
    p.product_type,
    p.wholesale_base_price,
    p.retail_price,
    c.name as category_name,
    p.stock_quantity,
    p.is_active,
    p.is_featured
FROM products p
LEFT JOIN categories c ON p.category_id = c.id
ORDER BY p.created_at DESC;

-- Count everything
SELECT '=== SUMMARY ===' as section;
SELECT 'Profiles' as table_name, COUNT(*) as record_count FROM profiles
UNION ALL
SELECT 'Categories', COUNT(*) FROM categories
UNION ALL
SELECT 'Products', COUNT(*) FROM products;

-- Check for any issues
SELECT '=== VALIDATION ===' as section;
SELECT 
    'Products without valid seller' as issue,
    COUNT(*) as count
FROM products p
LEFT JOIN profiles pr ON p.seller_id = pr.id
WHERE pr.id IS NULL
UNION ALL
SELECT 
    'Products without valid category' as issue,
    COUNT(*) as count
FROM products p
LEFT JOIN categories c ON p.category_id = c.id
WHERE c.id IS NULL;
