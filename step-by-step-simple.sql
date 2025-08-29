-- STEP-BY-STEP SIMPLE SETUP
-- Run each section one at a time in your Supabase SQL Editor

-- ========================================
-- STEP 1: Create Categories
-- ========================================
-- Copy and paste this section first, then click "Run"
INSERT INTO categories (name, description) VALUES
    ('Electronics', 'Electronic devices and accessories'),
    ('Clothing & Apparel', 'Fashion and clothing items'),
    ('Home & Garden', 'Home improvement and garden supplies'),
    ('Health & Beauty', 'Health products and beauty supplies'),
    ('Sports & Outdoors', 'Sports equipment and outdoor gear')
ON CONFLICT (name) DO NOTHING;

-- ========================================
-- STEP 2: Find Your User ID
-- ========================================
-- Run this to find your user ID (copy the UUID)
SELECT id, email FROM profiles LIMIT 5;

-- ========================================
-- STEP 3: Add First Product (Headphones)
-- ========================================
-- Replace 'YOUR_USER_ID_HERE' with the UUID you found in Step 2
INSERT INTO products (
    seller_id,
    category_id,
    name,
    description,
    sku,
    product_type,
    wholesale_base_price,
    retail_price,
    images,
    stock_quantity,
    is_active
) VALUES (
    'YOUR_USER_ID_HERE', -- Replace this with your actual UUID
    (SELECT id FROM categories WHERE name = 'Electronics'),
    'Premium Wireless Headphones',
    'High-quality wireless headphones with noise cancellation and premium sound quality.',
    'WH-001',
    'both',
    45.00,
    89.99,
    '["https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop"]',
    500,
    true
);

-- ========================================
-- STEP 4: Add Second Product (T-Shirt)
-- ========================================
-- Replace 'YOUR_USER_ID_HERE' with the same UUID
INSERT INTO products (
    seller_id,
    category_id,
    name,
    description,
    sku,
    product_type,
    wholesale_base_price,
    retail_price,
    images,
    stock_quantity,
    is_active
) VALUES (
    'YOUR_USER_ID_HERE', -- Same UUID as above
    (SELECT id FROM categories WHERE name = 'Clothing & Apparel'),
    'Organic Cotton T-Shirt',
    'Premium organic cotton t-shirt available in multiple colors and sizes.',
    'CT-001',
    'both',
    8.50,
    24.99,
    '["https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=400&fit=crop"]',
    1000,
    true
);

-- ========================================
-- STEP 5: Check Your Products
-- ========================================
-- Run this to see what you created
SELECT 
    name,
    sku,
    wholesale_base_price,
    retail_price,
    stock_quantity
FROM products
WHERE is_active = true
ORDER BY created_at DESC;
