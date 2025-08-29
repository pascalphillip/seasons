import React, { useState, useEffect, useMemo, useCallback } from 'react'
import { supabase } from '../../lib/supabase'
import { Package, ShoppingBag, Grid, TrendingUp } from 'lucide-react'

const CategoriesPage = () => {
  const [categories, setCategories] = useState([])
  const [selectedCategory, setSelectedCategory] = useState(null)
  const [categoryProducts, setCategoryProducts] = useState([])
  const [loading, setLoading] = useState(true)

  // Memoized sample products to prevent re-creation on every render
  const sampleProducts = useMemo(() => ({
    'Electronics': [
      {
        id: 'elec-1',
        name: 'Smartphone Pro Max',
        description: 'Latest smartphone with advanced camera system and 5G connectivity',
        sku: 'SM-001',
        retail_price: 999.99,
        wholesale_base_price: 799.99,
        stock_quantity: 50,
        images: ['https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=200&h=150&fit=crop&auto=format&q=60']
      },
      {
        id: 'elec-2',
        name: 'Wireless Earbuds',
        description: 'Premium wireless earbuds with noise cancellation and 24-hour battery life',
        sku: 'WE-002',
        retail_price: 199.99,
        wholesale_base_price: 149.99,
        stock_quantity: 100,
        images: ['https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=200&h=150&fit=crop&auto=format&q=60']
      },
      {
        id: 'elec-3',
        name: 'Smart Watch Series 5',
        description: 'Advanced fitness tracking and health monitoring smartwatch',
        sku: 'SW-003',
        retail_price: 399.99,
        wholesale_base_price: 299.99,
        stock_quantity: 75,
        images: ['https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=200&h=150&fit=crop&auto=format&q=60']
      }
    ],
    'Clothing': [
      {
        id: 'cloth-1',
        name: 'Premium Cotton T-Shirt',
        description: 'Soft, breathable cotton t-shirt available in multiple colors and sizes',
        sku: 'CT-001',
        retail_price: 29.99,
        wholesale_base_price: 19.99,
        stock_quantity: 200,
        images: ['https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=200&h=150&fit=crop&auto=format&q=60']
      },
      {
        id: 'cloth-2',
        name: 'Designer Jeans',
        description: 'High-quality denim jeans with perfect fit and modern styling',
        sku: 'DJ-002',
        retail_price: 89.99,
        wholesale_base_price: 59.99,
        stock_quantity: 150,
        images: ['https://images.unsplash.com/photo-1542272604-787c3835535d?w=200&h=150&fit=crop&auto=format&q=60']
      },
      {
        id: 'cloth-3',
        name: 'Casual Blazer',
        description: 'Versatile blazer perfect for both casual and formal occasions',
        sku: 'CB-003',
        retail_price: 129.99,
        wholesale_base_price: 89.99,
        stock_quantity: 80,
        images: ['https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=200&h=150&fit=crop&auto=format&q=60']
      }
    ],
    'Home & Garden': [
      {
        id: 'home-1',
        name: 'Modern Coffee Table',
        description: 'Elegant wooden coffee table with storage shelf and modern design',
        sku: 'CT-001',
        retail_price: 299.99,
        wholesale_base_price: 199.99,
        stock_quantity: 25,
        images: ['https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=200&h=150&fit=crop&auto=format&q=60']
      },
      {
        id: 'home-2',
        name: 'Indoor Plant Set',
        description: 'Collection of 5 low-maintenance indoor plants with decorative pots',
        sku: 'IPS-002',
        retail_price: 79.99,
        wholesale_base_price: 49.99,
        stock_quantity: 60,
        images: ['https://images.unsplash.com/photo-1466692476868-aef1dfb1e735?w=200&h=150&fit=crop&auto=format&q=60']
      },
      {
        id: 'home-3',
        name: 'Smart LED Bulbs',
        description: 'WiFi-enabled LED bulbs with customizable colors and scheduling',
        sku: 'SLB-003',
        retail_price: 49.99,
        wholesale_base_price: 29.99,
        stock_quantity: 120,
        images: ['https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=200&h=150&fit=crop&auto=format&q=60']
      }
    ],
    'Health & Beauty': [
      {
        id: 'health-1',
        name: 'Organic Face Serum',
        description: 'Natural anti-aging serum with vitamin C and hyaluronic acid',
        sku: 'OFS-001',
        retail_price: 59.99,
        wholesale_base_price: 39.99,
        stock_quantity: 90,
        images: ['https://images.unsplash.com/photo-1556228720-195a672e8a03?w=200&h=150&fit=crop&auto=format&q=60']
      },
      {
        id: 'health-2',
        name: 'Fitness Tracker',
        description: 'Advanced fitness tracking device with heart rate monitoring',
        sku: 'FT-002',
        retail_price: 149.99,
        wholesale_base_price: 99.99,
        stock_quantity: 70,
        images: ['https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=200&h=150&fit=crop&auto=format&q=60']
      },
      {
        id: 'health-3',
        name: 'Yoga Mat Premium',
        description: 'Non-slip yoga mat with alignment lines and carrying strap',
        sku: 'YM-003',
        retail_price: 39.99,
        wholesale_base_price: 24.99,
        stock_quantity: 150,
        images: ['https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=200&h=150&fit=crop&auto=format&q=60']
      }
    ],
    'Sports & Outdoor': [
      {
        id: 'sports-1',
        name: 'Mountain Bike',
        description: 'Professional mountain bike with 21-speed gear system and disc brakes',
        sku: 'MB-001',
        retail_price: 899.99,
        wholesale_base_price: 699.99,
        stock_quantity: 30,
        images: ['https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=200&h=150&fit=crop&auto=format&q=60']
      },
      {
        id: 'sports-2',
        name: 'Camping Tent',
        description: '4-person camping tent with weather protection and easy setup',
        sku: 'CT-002',
        retail_price: 199.99,
        wholesale_base_price: 149.99,
        stock_quantity: 45,
        images: ['https://images.unsplash.com/photo-1523987355523-c7b5b0dd90a7?w=200&h=150&fit=crop&auto=format&q=60']
      },
      {
        id: 'sports-3',
        name: 'Running Shoes',
        description: 'Lightweight running shoes with superior cushioning and support',
        sku: 'RS-003',
        retail_price: 129.99,
        wholesale_base_price: 89.99,
        stock_quantity: 100,
        images: ['https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=200&h=150&fit=crop&auto=format&q=60']
      }
    ]
  }), [])

  // Memoized functions to prevent unnecessary re-renders
  const getCategoryImage = useCallback((categoryName) => {
    const name = categoryName.toLowerCase()
    if (name.includes('electronics')) {
      return "https://images.unsplash.com/photo-1498049794561-7780e7231661?w=300&h=200&fit=crop&auto=format&q=60"
    }
    if (name.includes('clothing')) {
      return "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=300&h=200&fit=crop&auto=format&q=60"
    }
    if (name.includes('home') || name.includes('garden')) {
      return "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=300&h=200&fit=crop&auto=format&q=60"
    }
    if (name.includes('health') || name.includes('beauty')) {
      return "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=300&h=200&fit=crop&auto=format&q=60"
    }
    if (name.includes('sports') || name.includes('outdoor')) {
      return "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=300&h=200&fit=crop&auto=format&q=60"
    }
    return "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=300&h=200&fit=crop&auto=format&q=60"
  }, [])

  const getCategoryDescription = useCallback((categoryName) => {
    const name = categoryName.toLowerCase()
    if (name.includes('electronics')) {
      return "Cutting-edge technology and gadgets for modern living."
    }
    if (name.includes('clothing')) {
      return "Fashion-forward apparel and accessories for every style."
    }
    if (name.includes('home') || name.includes('garden')) {
      return "Transform your living spaces with beautiful home decor."
    }
    if (name.includes('health') || name.includes('beauty')) {
      return "Premium health and beauty products for your wellness journey."
    }
    if (name.includes('sports') || name.includes('outdoor')) {
      return "High-performance sports equipment and outdoor gear."
    }
    return "Discover amazing products in this category."
  }, [])

  const getCategoryStats = useCallback((categoryName) => {
    const name = categoryName.toLowerCase()
    if (name.includes('electronics')) {
      return { productCount: 150, brandCount: 25, avgRating: 4.6 }
    }
    if (name.includes('clothing')) {
      return { productCount: 200, brandCount: 30, avgRating: 4.5 }
    }
    if (name.includes('home') || name.includes('garden')) {
      return { productCount: 180, brandCount: 28, avgRating: 4.7 }
    }
    if (name.includes('health') || name.includes('beauty')) {
      return { productCount: 120, brandCount: 22, avgRating: 4.4 }
    }
    if (name.includes('sports') || name.includes('outdoor')) {
      return { productCount: 160, brandCount: 26, avgRating: 4.8 }
    }
    return { productCount: 100, brandCount: 20, avgRating: 4.5 }
  }, [])

  const getCategoryIcon = useCallback((categoryName) => {
    const name = categoryName.toLowerCase()
    if (name.includes('electronics')) return <Package className="w-8 h-8" />
    if (name.includes('clothing')) return <ShoppingBag className="w-8 h-8" />
    if (name.includes('home') || name.includes('garden')) return <Grid className="w-8 h-8" />
    if (name.includes('health') || name.includes('beauty')) return <TrendingUp className="w-8 h-8" />
    if (name.includes('sports') || name.includes('outdoor')) return <TrendingUp className="w-8 h-8" />
    return <Package className="w-8 h-8" />
  }, [])

  const getCategoryColor = useCallback((index) => {
    const colors = [
      'bg-blue-100 text-blue-600',
      'bg-green-100 text-green-600',
      'bg-purple-100 text-purple-600',
      'bg-orange-100 text-orange-600',
      'bg-red-100 text-red-600',
      'bg-indigo-100 text-indigo-600'
    ]
    return colors[index % colors.length]
  }, [])

  useEffect(() => {
    fetchCategories()
  }, [])

  useEffect(() => {
    if (selectedCategory) {
      const categoryName = selectedCategory.name
      if (sampleProducts[categoryName]) {
        setCategoryProducts(sampleProducts[categoryName])
      } else {
        setCategoryProducts([])
      }
    }
  }, [selectedCategory, sampleProducts])

  const fetchCategories = useCallback(async () => {
    try {
      setLoading(true)
      const { data, error } = await supabase
        .from('categories')
        .select('*')
        .eq('is_active', true)
        .order('name')

      if (error) {
        console.error('Error fetching categories:', error)
        // Fallback to sample categories
        setCategories([
          { id: 1, name: 'Electronics', description: 'Technology and gadgets' },
          { id: 2, name: 'Clothing', description: 'Fashion and apparel' },
          { id: 3, name: 'Home & Garden', description: 'Home decor and garden' },
          { id: 4, name: 'Health & Beauty', description: 'Wellness and beauty' },
          { id: 5, name: 'Sports & Outdoor', description: 'Sports equipment and outdoor gear' }
        ])
      } else {
        setCategories(data || [])
      }
    } catch (error) {
      console.error('Error:', error)
      setCategories([
        { id: 1, name: 'Electronics', description: 'Technology and gadgets' },
        { id: 2, name: 'Clothing', description: 'Fashion and apparel' },
        { id: 3, name: 'Home & Garden', description: 'Home decor and garden' },
        { id: 4, name: 'Health & Beauty', description: 'Wellness and beauty' },
        { id: 5, name: 'Sports & Outdoor', description: 'Sports equipment and outdoor gear' }
      ])
    } finally {
      setLoading(false)
    }
  }, [])

  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Product Categories</h1>
          <p className="text-gray-600">Explore our wide range of product categories</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Categories List */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">All Categories</h2>
              <div className="space-y-3">
                {categories.map((category, index) => {
                  const stats = getCategoryStats(category.name)
                  return (
                    <button
                      key={category.id}
                      onClick={() => setSelectedCategory(category)}
                      className={`w-full text-left rounded-lg border transition-all duration-200 hover:shadow-md overflow-hidden ${
                        selectedCategory?.id === category.id
                          ? 'border-blue-500 bg-blue-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <div className="relative">
                        <img
                          src={getCategoryImage(category.name)}
                          alt={category.name}
                          className="w-full h-24 object-cover"
                          loading="lazy"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
                        <div className="absolute bottom-2 left-2">
                          <div className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium text-white ${getCategoryColor(index)}`}>
                            {stats.productCount}+ Products
                          </div>
                        </div>
                      </div>
                      <div className="p-4">
                        <div className="flex items-center space-x-3 mb-2">
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center ${getCategoryColor(index)}`}>
                            {getCategoryIcon(category.name)}
                          </div>
                          <h3 className="font-medium text-gray-900">{category.name}</h3>
                        </div>
                        <p className="text-sm text-gray-500">{getCategoryDescription(category.name)}</p>
                      </div>
                    </button>
                  )
                })}
              </div>
            </div>
          </div>

          {/* Category Products */}
          <div className="lg:col-span-2">
            {selectedCategory ? (
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <div className="flex items-center space-x-3 mb-6">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center ${getCategoryColor(categories.findIndex(c => c.id === selectedCategory.id))}`}>
                    {getCategoryIcon(selectedCategory.name)}
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900">{selectedCategory.name}</h2>
                    <p className="text-gray-600">{getCategoryDescription(selectedCategory.name)}</p>
                  </div>
                </div>

                {categoryProducts.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {categoryProducts.map((product) => (
                      <div key={product.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow duration-200">
                        <h3 className="font-semibold text-gray-900 mb-2">{product.name}</h3>
                        <p className="text-sm text-gray-600 mb-3">{product.description}</p>
                        <div className="flex justify-between items-center">
                          <span className="text-lg font-bold text-blue-600">${product.retail_price}</span>
                          <span className="text-sm text-gray-500">{product.sku}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <Package className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">No Products Found</h3>
                    <p className="text-gray-500">This category doesn't have any products yet.</p>
                  </div>
                )}
              </div>
            ) : (
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-12 text-center">
                <Package className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">Select a Category</h3>
                <p className="text-gray-500">Choose a category from the left to view its products.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default CategoriesPage
