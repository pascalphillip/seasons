-- Fix Profiles First - Then Add Products
-- Run this in your Supabase SQL Editor

-- STEP 1: Check what profiles exist
SELECT 'Current profiles:' as status;
SELECT id, email, user_type, business_name FROM profiles;

-- STEP 2: Create a profile if none exist
-- This will create a business profile that you can use
INSERT INTO profiles (id, email, user_type, business_name, first_name, last_name, phone, address, city, state, country, postal_code, is_verified)
VALUES 
    (
        '39268465-5d82-41c4-b051-836fc821a30f',
        'your-business@example.com',
        'business',
        'Your Business Name',
        'Your',
        'Name',
        '+1-555-0000',
        '123 Business Street',
        'Your City',
        'ST',
        'USA',
        '00000',
        true
    )
ON CONFLICT (id) DO UPDATE SET
    email = EXCLUDED.email,
    business_name = EXCLUDED.business_name,
    is_verified = EXCLUDED.is_verified;

-- STEP 3: Verify the profile was created
SELECT 'Profile created/updated:' as status;
SELECT id, email, user_type, business_name FROM profiles WHERE id = '39268465-5d82-41c4-b051-836fc821a30f';

-- STEP 4: Now add categories
INSERT INTO categories (name, description) VALUES
    ('Electronics', 'Electronic devices and accessories'),
    ('Clothing & Apparel', 'Fashion and clothing items'),
    ('Home & Garden', 'Home improvement and garden supplies'),
    ('Health & Beauty', 'Health products and beauty supplies'),
    ('Sports & Outdoors', 'Sports equipment and outdoor gear')
ON CONFLICT (name) DO NOTHING;

-- STEP 5: Now add products (this should work now)
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
        '39268465-5d82-41c4-b051-836fc821a30f',
        'c04928b0-02c7-4303-b45d-7171648514d2',
        'Premium Wireless Headphones',
        'High-quality wireless headphones with noise cancellation and premium sound quality. Perfect for both business and personal use.',
        'WH-001',
        'both',
        45.00,
        '[{"min_qty": 10, "price": 42.00}, {"min_qty": 50, "price": 38.00}]',
        10,
        89.99,
        '["https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop"]',
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
        '39268465-5d82-41c4-b051-836fc821a30f',
        '23ba92e0-814d-4980-8d79-6a6339cd6797',
        'Organic Cotton T-Shirt',
        'Premium organic cotton t-shirt available in multiple colors and sizes. Perfect for wholesale distribution or individual purchase.',
        'CT-001',
        'both',
        8.50,
        '[{"min_qty": 25, "price": 8.00}, {"min_qty": 100, "price": 7.50}]',
        25,
        24.99,
        '["https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=400&fit=crop"]',
        '{"material": "100% Organic Cotton", "weight": "180 GSM", "fit": "Regular", "care": "Machine wash cold"}',
        ARRAY['organic', 'cotton', 'sustainable', 'comfortable'],
        1000,
        true,
        true,
        0.2,
        '{"length": 28, "width": 20, "height": 2}',
        'light'
    );

-- STEP 6: Check what was created
SELECT 'Products created:' as status;
SELECT 
    p.name,
    p.sku,
    p.product_type,
    p.wholesale_base_price,
    p.retail_price,
    c.name as category,
    p.stock_quantity
FROM products p
JOIN categories c ON p.category_id = c.id
WHERE p.is_active = true
ORDER BY p.created_at DESC;
