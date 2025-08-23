-- Add Sample Products to Seasons Marketplace
-- Run this in your Supabase SQL Editor after setting up the main schema

-- First, let's add some sample categories if they don't exist
INSERT INTO categories (name, description) VALUES
    ('Electronics', 'Electronic devices and accessories'),
    ('Clothing & Apparel', 'Fashion and clothing items'),
    ('Home & Garden', 'Home improvement and garden supplies'),
    ('Health & Beauty', 'Health products and beauty supplies'),
    ('Sports & Outdoors', 'Sports equipment and outdoor gear')
ON CONFLICT (name) DO NOTHING;

-- Add sample products (you'll need to replace seller_id with actual user IDs from your profiles table)
-- First, get a user ID to use as seller_id:
-- SELECT id FROM profiles LIMIT 1;

-- Then run this (replace 'YOUR_USER_ID_HERE' with the actual ID):
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
        (SELECT id FROM profiles LIMIT 1), -- Replace with actual user ID
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
        (SELECT id FROM profiles LIMIT 1), -- Replace with actual user ID
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
        (SELECT id FROM profiles LIMIT 1), -- Replace with actual user ID
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
    ),
    (
        (SELECT id FROM profiles LIMIT 1), -- Replace with actual user ID
        (SELECT id FROM categories WHERE name = 'Health & Beauty'),
        'Natural Face Cream',
        'Organic face cream made with natural ingredients. Suitable for all skin types. Available in wholesale quantities.',
        'FC-001',
        'both',
        15.00,
        '[{"min_qty": 15, "price": 14.00}, {"min_qty": 50, "price": 13.00}, {"min_qty": 200, "price": 12.00}]',
        15,
        39.99,
        '["https://via.placeholder.com/400x400?text=Face+Cream"]',
        '{"volume": "50ml", "ingredients": "Organic", "skin_type": "All", "scent": "Natural"}',
        ARRAY['organic', 'natural', 'skincare', 'face'],
        300,
        true,
        true,
        0.15,
        '{"length": 5, "width": 5, "height": 8}',
        'light'
    ),
    (
        (SELECT id FROM profiles LIMIT 1), -- Replace with actual user ID
        (SELECT id FROM categories WHERE name = 'Sports & Outdoors'),
        'Yoga Mat Premium',
        'High-quality yoga mat with excellent grip and cushioning. Perfect for yoga studios and individual practitioners.',
        'YM-001',
        'both',
        22.00,
        '[{"min_qty": 10, "price": 20.00}, {"min_qty": 50, "price": 18.00}, {"min_qty": 100, "price": 16.00}]',
        10,
        59.99,
        '["https://via.placeholder.com/400x400?text=Yoga+Mat"]',
        '{"material": "TPE", "thickness": "6mm", "length": "183cm", "width": "61cm", "weight": "2.5kg"}',
        ARRAY['yoga', 'fitness', 'premium', 'non-slip'],
        200,
        true,
        false,
        2.5,
        '{"length": 183, "width": 61, "height": 0.6}',
        'standard'
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
        (SELECT id FROM profiles LIMIT 1),
        5,
        'Excellent Sound Quality',
        'These headphones exceeded my expectations. The noise cancellation is incredible and the sound quality is premium.',
        true
    ),
    (
        (SELECT id FROM products WHERE sku = 'CT-001'),
        (SELECT id FROM profiles LIMIT 1),
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
    p.stock_quantity
FROM products p
JOIN categories c ON p.category_id = c.id
WHERE p.is_active = true
ORDER BY p.created_at DESC;
