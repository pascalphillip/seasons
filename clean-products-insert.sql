-- Clean Products Insert Script
-- Run this in your Supabase SQL Editor

-- First, add categories
INSERT INTO categories (name, description) VALUES
    ('Electronics', 'Electronic devices and accessories'),
    ('Clothing & Apparel', 'Fashion and clothing items'),
    ('Home & Garden', 'Home improvement and garden supplies'),
    ('Health & Beauty', 'Health products and beauty supplies'),
    ('Sports & Outdoors', 'Sports equipment and outdoor gear')
ON CONFLICT (name) DO NOTHING;

-- Now add products
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
    ),
    (
        '39268465-5d82-41c4-b051-836fc821a30f',
        'bfe3cbce-532a-4985-857a-fb397ae3b86f',
        'Smart LED Light Bulb Pack',
        'Energy-efficient smart LED bulbs with WiFi connectivity. Control via smartphone app. Available in various color temperatures.',
        'LED-001',
        'both',
        12.00,
        '[{"min_qty": 20, "price": 11.00}, {"min_qty": 100, "price": 10.00}]',
        20,
        29.99,
        '["https://images.unsplash.com/photo-1517991104123-1d56a6e81ed9?w=400&h=400&fit=crop"]',
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
        '39268465-5d82-41c4-b051-836fc821a30f',
        'c81fd816-add6-4156-9c79-9cce1218d13e',
        'Natural Face Cream',
        'Organic face cream made with natural ingredients. Suitable for all skin types. Available in wholesale quantities.',
        'FC-001',
        'both',
        15.00,
        '[{"min_qty": 15, "price": 14.00}, {"min_qty": 50, "price": 13.00}]',
        15,
        39.99,
        '["https://images.unsplash.com/photo-1556228720-195a672e8a03?w=400&h=400&fit=crop"]',
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
        '39268465-5d82-41c4-b051-836fc821a30f',
        '9b8a7a8e-7bed-4b89-9916-02bba747c628',
        'Yoga Mat Premium',
        'High-quality yoga mat with excellent grip and cushioning. Perfect for yoga studios and individual practitioners.',
        'YM-001',
        'both',
        22.00,
        '[{"min_qty": 10, "price": 20.00}, {"min_qty": 50, "price": 18.00}]',
        10,
        59.99,
        '["https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=400&h=400&fit=crop"]',
        '{"material": "TPE", "thickness": "6mm", "length": "183cm", "width": "61cm", "weight": "2.5kg"}',
        ARRAY['yoga', 'fitness', 'premium', 'non-slip'],
        200,
        true,
        false,
        2.5,
        '{"length": 183, "width": 61, "height": 0.6}',
        'standard'
    );

-- Check what was created
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
