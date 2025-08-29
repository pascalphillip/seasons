import React, { useState, useEffect } from 'react'
import { supabase } from '../../lib/supabase'
import { cartStorage, wishlistStorage, recentProductsStorage, searchHistoryStorage } from '../../lib/storage'
import { Search, Filter, ShoppingCart, Heart } from 'lucide-react'

const ProductList = () => {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [userType, setUserType] = useState('consumer') // or 'business'

  useEffect(() => {
    fetchProducts()
  }, [selectedCategory])

  const fetchProducts = async () => {
    try {
      setLoading(true)
      let query = supabase
        .from('products')
        .select(`
          *,
          categories(name),
          profiles!products_seller_id_fkey(first_name, last_name, business_name)
        `)
        .eq('is_active', true)

      if (selectedCategory !== 'all') {
        query = query.eq('category_id', selectedCategory)
      }

      const { data, error } = await query

      if (error) {
        console.error('Error fetching products:', error)
      } else {
        setProducts(data || [])
      }
    } catch (error) {
      console.error('Error:', error)
    } finally {
      setLoading(false)
    }
  }

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.description?.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const handleAddToCart = (product) => {
    cartStorage.addItem(product, 1)
    // Force re-render of navbar cart count
    window.dispatchEvent(new Event('storage'))
  }

  const handleAddToWishlist = (product) => {
    if (wishlistStorage.isInWishlist(product.id)) {
      wishlistStorage.removeItem(product.id)
    } else {
      wishlistStorage.addItem(product)
    }
    // Force re-render of navbar wishlist count
    window.dispatchEvent(new Event('storage'))
  }

  const handleProductClick = (product) => {
    recentProductsStorage.add(product)
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Discover Products</h1>
        <p className="text-gray-600">Find amazing products for your business or personal needs</p>
      </div>

      {/* Search and Filters */}
      <div className="mb-8 space-y-4">
        {/* Search Bar */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value)
              if (e.target.value.trim()) {
                searchHistoryStorage.add(e.target.value)
              }
            }}
            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-4 items-center">
          <div className="flex items-center space-x-2">
            <Filter className="w-5 h-5 text-gray-500" />
            <span className="text-sm font-medium text-gray-700">Filters:</span>
          </div>
          
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">All Categories</option>
            <option value="electronics">Electronics</option>
            <option value="clothing">Clothing & Apparel</option>
            <option value="home">Home & Garden</option>
            <option value="health">Health & Beauty</option>
            <option value="sports">Sports & Outdoors</option>
          </select>

          <div className="flex items-center space-x-4">
            <label className="flex items-center space-x-2">
              <input
                type="radio"
                name="userType"
                value="consumer"
                checked={userType === 'consumer'}
                onChange={(e) => setUserType(e.target.value)}
                className="text-blue-600"
              />
              <span className="text-sm text-gray-700">Consumer</span>
            </label>
            <label className="flex items-center space-x-2">
              <input
                type="radio"
                name="userType"
                value="business"
                checked={userType === 'business'}
                onChange={(e) => setUserType(e.target.value)}
                className="text-blue-600"
              />
              <span className="text-sm text-gray-700">Business</span>
            </label>
          </div>
        </div>
      </div>

      {/* Products Grid */}
      {filteredProducts.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">No products found. Try adjusting your search or filters.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <div 
              key={product.id} 
              className="bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow duration-200 cursor-pointer"
              onClick={() => handleProductClick(product)}
            >
              {/* Product Image */}
              <div className="aspect-square bg-gray-100 flex items-center justify-center">
                {product.images && product.images[0] ? (
                  <img
                    src={product.images[0]}
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="text-gray-400 text-4xl">📦</div>
                )}
              </div>

              {/* Product Info */}
              <div className="p-4">
                <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">{product.name}</h3>
                <p className="text-sm text-gray-600 mb-3 line-clamp-2">{product.description}</p>
                
                {/* Pricing */}
                <div className="mb-3">
                  {userType === 'business' && product.wholesale_base_price ? (
                    <div>
                      <span className="text-lg font-bold text-blue-600">
                        ${product.wholesale_base_price}
                      </span>
                      <span className="text-sm text-gray-500 ml-2">wholesale</span>
                    </div>
                  ) : (
                    <div>
                      <span className="text-lg font-bold text-green-600">
                        ${product.retail_price}
                      </span>
                      <span className="text-sm text-gray-500 ml-2">retail</span>
                    </div>
                  )}
                </div>

                {/* Seller Info */}
                <div className="text-sm text-gray-500 mb-4">
                  by {product.profiles?.business_name || `${product.profiles?.first_name} ${product.profiles?.last_name}`}
                </div>

                {/* Actions */}
                <div className="flex space-x-2">
                  <button
                    onClick={() => handleAddToCart(product)}
                    className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors duration-200 flex items-center justify-center space-x-2"
                  >
                    <ShoppingCart className="w-4 h-4" />
                    <span>Add to Cart</span>
                  </button>
                  <button
                    onClick={() => handleAddToWishlist(product)}
                    className={`p-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors duration-200 ${
                      wishlistStorage.isInWishlist(product.id) ? 'bg-red-50 border-red-300' : ''
                    }`}
                  >
                    <Heart className={`w-4 h-4 ${
                      wishlistStorage.isInWishlist(product.id) ? 'text-red-600 fill-current' : 'text-gray-600'
                    }`} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default ProductList
