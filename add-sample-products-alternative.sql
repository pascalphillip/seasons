-- Alternative: Add Sample Products using existing authenticated users
-- Use this if you already have users in your auth.users table

-- First, let's add some sample categories if they don't exist
INSERT INTO categories (name, description) VALUES
    ('Electronics', 'Electronic devices and accessories'),
    ('Clothing & Apparel', 'Fashion and clothing items'),
    ('Home & Garden', 'Home improvement and garden supplies'),
    ('Health & Beauty', 'Health products and beauty supplies'),
    ('Sports & Outdoors', 'Sports equipment and outdoor gear')
ON CONFLICT (name) DO NOTHING;

-- Option 1: If you have existing authenticated users, create profiles for them
-- Replace these emails with actual user emails from your auth.users table
INSERT INTO profiles (id, email, user_type, business_name, first_name, last_name, phone, address, city, state, country, postal_code, is_verified)
SELECT 
    au.id,
    au.email,
    'business',
    CASE 
        WHEN au.email LIKE '%tech%' THEN 'TechCorp Electronics'
        WHEN au.email LIKE '%fashion%' THEN 'Fashion Forward'
        WHEN au.email LIKE '%home%' THEN 'Home Essentials Co'
        ELSE 'Business User'
    END,
    COALESCE(au.raw_user_meta_data->>'first_name', 'John'),
    COALESCE(au.raw_user_meta_data->>'last_name', 'Doe'),
    '+1-555-0100',
    '123 Business Street',
    'San Francisco',
    'CA',
    'USA',
    '94102',
    true
FROM auth.users au
WHERE au.email IN (
    -- Replace these with actual user emails from your system
    'user1@example.com',
    'user2@example.com', 
    'user3@example.com'
)
ON CONFLICT (id) DO UPDATE SET
    business_name = EXCLUDED.business_name,
    is_verified = EXCLUDED.is_verified;

-- Option 2: Create a single test profile if no users exist
-- This will create a profile that you can use for testing
INSERT INTO profiles (id, email, user_type, business_name, first_name, last_name, phone, address, city, state, country, postal_code, is_verified)
VALUES 
    (
        gen_random_uuid(),
        'test-seller@example.com',
        'business',
        'Test Business',
        'Test',
        'Seller',
        '+1-555-0000',
        '123 Test Street',
        'Test City',
        'TS',
        'USA',
        '00000',
        true
    )
ON CONFLICT (email) DO NOTHING;

-- Now add sample products with proper seller_id references
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
        (SELECT id FROM profiles WHERE email = 'test-seller@example.com' LIMIT 1),
        (SELECT id FROM categories WHERE name = 'Electronics'),
        'Premium Wireless Headphones',
        'High-quality wireless headphones with noise cancellation and premium sound quality. Perfect for both business and personal use.',
        'WH-001',
        'both',
        45.00,
        '[{"min_qty": 10, "price": 42.00}, {"min_qty": 50, "price": 38.00}, {"min_qty": 100, "price": 35.00}]',
        10,
        89.99,
        '["https://via.placeholder.com/400x400?text=Headphones"]',
        '{"brand": "AudioTech", "model": "WH-2000", "connectivity": "Bluetooth 5.0", "battery_life": "30 hours"}',
        ARRAY['wireless', 'noise-cancelling', 'premium', 'bluetooth'],
        500,
        true,
        true,
        0.3,
        '{"length": 18, "width": 15, "height": 8}',
        'standard'
    ),
    (
        (SELECT id FROM profiles WHERE email = 'test-seller@example.com' LIMIT 1),
        (SELECT id FROM categories WHERE name = 'Clothing & Apparel'),
        'Organic Cotton T-Shirt',
        'Premium organic cotton t-shirt available in multiple colors and sizes. Perfect for wholesale distribution or individual purchase.',
        'CT-001',
        'both',
        8.50,
        '[{"min_qty": 25, "price": 8.00}, {"min_qty": 100, "price": 7.50}, {"min_qty": 500, "price": 7.00}]',
        25,
        24.99,
        '["https://via.placeholder.com/400x400?text=T-Shirt"]',
        '{"material": "100% Organic Cotton", "weight": "180 GSM", "fit": "Regular", "care": "Machine wash cold"}',
        ARRAY['organic', 'cotton', 'sustainable', 'comfortable'],
        1000,
        true,
        true,
        0.2,
        '{"length": 28, "width": 20, "height": 2}',
        'light'
    ),
    (
        (SELECT id FROM profiles WHERE email = 'test-seller@example.com' LIMIT 1),
        (SELECT id FROM categories WHERE name = 'Home & Garden'),
        'Smart LED Light Bulb Pack',
        'Energy-efficient smart LED bulbs with WiFi connectivity. Control via smartphone app. Available in various color temperatures.',
        'LED-001',
        'both',
        12.00,
        '[{"min_qty": 20, "price": 11.00}, {"min_qty": 100, "price": 10.00}, {"min_qty": 500, "price": 9.00}]',
        20,
        29.99,
        '["https://via.placeholder.com/400x400?text=LED+Bulb"]',
        '{"wattage": "9W", "lumens": "800", "color_temp": "2700K-6500K", "connectivity": "WiFi 2.4GHz", "lifespan": "25000 hours"}',
        ARRAY['smart', 'led', 'energy-efficient', 'wifi'],
        750,
        true,
        false,
        0.1,
        '{"length": 6, "width": 6, "height": 12}',
        'light'
    );

-- Add some sample reviews
INSERT INTO product_reviews (
    product_id,
    reviewer_id,
    rating,
    title,
    comment,
    is_verified_purchase
) VALUES
    (
        (SELECT id FROM products WHERE sku = 'WH-001'),
        (SELECT id FROM profiles WHERE email = 'test-seller@example.com' LIMIT 1),
        5,
        'Excellent Sound Quality',
        'These headphones exceeded my expectations. The noise cancellation is incredible and the sound quality is premium.',
        true
    ),
    (
        (SELECT id FROM products WHERE sku = 'CT-001'),
        (SELECT id FROM profiles WHERE email = 'test-seller@example.com' LIMIT 1),
        4,
        'Great Quality T-Shirt',
        'Very comfortable and the organic cotton feels great against the skin. Will definitely order more.',
        true
    );

-- Display the added products
SELECT 
    p.name,
    p.sku,
    p.product_type,
    p.wholesale_base_price,
    p.retail_price,
    c.name as category,
    p.stock_quantity,
    pr.email as seller_email
FROM products p
JOIN categories c ON p.category_id = c.id
JOIN profiles pr ON p.seller_id = pr.id
WHERE p.is_active = true
ORDER BY p.created_at DESC;

-- Helper query: Check what profiles exist
SELECT id, email, user_type, business_name, is_verified FROM profiles;

-- Helper query: Check what products were created
SELECT p.name, p.sku, pr.email as seller FROM products p JOIN profiles pr ON p.seller_id = pr.id;
