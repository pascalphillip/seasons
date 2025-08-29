-- STEP-BY-STEP SETUP SCRIPT
-- Run each section separately in your Supabase SQL Editor
-- This prevents any dependency issues

-- ========================================
-- STEP 1: Create Categories
-- ========================================
-- Run this first
INSERT INTO categories (name, description) VALUES
    ('Electronics', 'Electronic devices and accessories'),
    ('Clothing & Apparel', 'Fashion and clothing items'),
    ('Home & Garden', 'Home improvement and garden supplies'),
    ('Health & Beauty', 'Health products and beauty supplies'),
    ('Sports & Outdoors', 'Sports equipment and outdoor gear')
ON CONFLICT (name) DO NOTHING;

-- Verify categories were created
SELECT 'Categories created:' as status, COUNT(*) as count FROM categories;

-- ========================================
-- STEP 2: Create Sample Profiles
-- ========================================
-- Run this second (after categories)
INSERT INTO profiles (id, email, user_type, business_name, first_name, last_name, phone, address, city, state, country, postal_code, is_verified)
VALUES 
    (
        gen_random_uuid(),
        'seller1@example.com',
        'business',
        'TechCorp Electronics',
        'John',
        'Smith',
        '+1-555-0101',
        '123 Tech Street',
        'San Francisco',
        'CA',
        'USA',
        '94102',
        true
    ),
    (
        gen_random_uuid(),
        'seller2@example.com',
        'business',
        'Fashion Forward',
        'Sarah',
        'Johnson',
        '+1-555-0102',
        '456 Fashion Ave',
        'New York',
        'NY',
        'USA',
        '10001',
        true
    ),
    (
        gen_random_uuid(),
        'seller3@example.com',
        'business',
        'Home Essentials Co',
        'Mike',
        'Davis',
        '+1-555-0103',
        '789 Home Lane',
        'Chicago',
        'IL',
        'USA',
        '60601',
        true
    )
ON CONFLICT (email) DO NOTHING;

-- Verify profiles were created
SELECT 'Profiles created:' as status, COUNT(*) as count FROM profiles;

-- ========================================
-- STEP 3: Create Sample Products
-- ========================================
-- Run this third (after profiles)
INSERT INTO products (
    seller_id,
    category_id,
    name,
    description,
    sku,
    product_type,
    wholesale_base_price,
    wholesale_tiers,
    min_wholesale_qty,
    retail_price,
    images,
    specifications,
    tags,
    stock_quantity,
    is_active,
    is_featured,
    weight,
    dimensions,
    shipping_class
) VALUES
    (
        (SELECT id FROM profiles WHERE email = 'seller1@example.com' LIMIT 1),
        (SELECT id FROM categories WHERE name = 'Electronics'),
        'Premium Wireless Headphones',
        'High-quality wireless headphones with noise cancellation and premium sound quality.',
        'WH-001',
        'both',
        45.00,
        '[{"min_qty": 10, "price": 42.00}, {"min_qty": 50, "price": 38.00}]',
        10,
        89.99,
        '["https://via.placeholder.com/400x400?text=Headphones"]',
        '{"brand": "AudioTech", "model": "WH-2000"}',
        ARRAY['wireless', 'noise-cancelling', 'premium'],
        500,
        true,
        true,
        0.3,
        '{"length": 18, "width": 15, "height": 8}',
        'standard'
    ),
    (
        (SELECT id FROM profiles WHERE email = 'seller2@example.com' LIMIT 1),
        (SELECT id FROM categories WHERE name = 'Clothing & Apparel'),
        'Organic Cotton T-Shirt',
        'Premium organic cotton t-shirt available in multiple colors and sizes.',
        'CT-001',
        'both',
        8.50,
        '[{"min_qty": 25, "price": 8.00}, {"min_qty": 100, "price": 7.50}]',
        25,
        24.99,
        '["https://via.placeholder.com/400x400?text=T-Shirt"]',
        '{"material": "100% Organic Cotton", "weight": "180 GSM"}',
        ARRAY['organic', 'cotton', 'sustainable'],
        1000,
        true,
        true,
        0.2,
        '{"length": 28, "width": 20, "height": 2}',
        'light'
    );

-- Verify products were created
SELECT 'Products created:' as status, COUNT(*) as count FROM products;

-- ========================================
-- STEP 4: Create Product Reviews
-- ========================================
-- Run this last (after products exist)
INSERT INTO product_reviews (
    product_id,
    reviewer_id,
    rating,
    title,
    comment,
    is_verified_purchase
) VALUES
    (
        (SELECT id FROM products WHERE sku = 'WH-001' LIMIT 1),
        (SELECT id FROM profiles WHERE email = 'seller2@example.com' LIMIT 1),
        5,
        'Excellent Sound Quality',
        'These headphones exceeded my expectations. The noise cancellation is incredible.',
        true
    ),
    (
        (SELECT id FROM products WHERE sku = 'CT-001' LIMIT 1),
        (SELECT id FROM profiles WHERE email = 'seller3@example.com' LIMIT 1),
        4,
        'Great Quality T-Shirt',
        'Very comfortable and the organic cotton feels great against the skin.',
        true
    );

-- Verify reviews were created
SELECT 'Reviews created:' as status, COUNT(*) as count FROM product_reviews;

-- ========================================
-- FINAL VERIFICATION
-- ========================================
-- Run this to see everything that was created
SELECT 
    p.name,
    p.sku,
    c.name as category,
    pr.email as seller_email,
    p.stock_quantity
FROM products p
JOIN categories c ON p.category_id = c.id
JOIN profiles pr ON p.seller_id = pr.id
WHERE p.is_active = true
ORDER BY p.created_at DESC;
