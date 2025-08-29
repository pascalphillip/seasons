// Local Storage Utility for Seasons App
// Handles cart, wishlist, user preferences, and other local data

const STORAGE_KEYS = {
  CART: 'seasons_cart',
  WISHLIST: 'seasons_wishlist',
  USER_PREFERENCES: 'seasons_user_preferences',
  RECENT_PRODUCTS: 'seasons_recent_products',
  SEARCH_HISTORY: 'seasons_search_history',
  THEME: 'seasons_theme'
}

// Cart Storage
export const cartStorage = {
  get: () => {
    try {
      const cart = localStorage.getItem(STORAGE_KEYS.CART)
      return cart ? JSON.parse(cart) : []
    } catch (error) {
      console.error('Error reading cart from storage:', error)
      return []
    }
  },

  set: (cart) => {
    try {
      localStorage.setItem(STORAGE_KEYS.CART, JSON.stringify(cart))
      return true
    } catch (error) {
      console.error('Error saving cart to storage:', error)
      return false
    }
  },

  addItem: (product, quantity = 1) => {
    const cart = cartStorage.get()
    const existingItem = cart.find(item => item.id === product.id)
    
    if (existingItem) {
      existingItem.quantity += quantity
    } else {
      cart.push({
        id: product.id,
        name: product.name,
        sku: product.sku,
        price: product.retail_price,
        wholesale_price: product.wholesale_base_price,
        image: product.images?.[0] || null,
        quantity,
        addedAt: new Date().toISOString()
      })
    }
    
    return cartStorage.set(cart)
  },

  removeItem: (productId) => {
    const cart = cartStorage.get()
    const filteredCart = cart.filter(item => item.id !== productId)
    return cartStorage.set(filteredCart)
  },

  updateQuantity: (productId, quantity) => {
    const cart = cartStorage.get()
    const item = cart.find(item => item.id === productId)
    
    if (item) {
      if (quantity <= 0) {
        return cartStorage.removeItem(productId)
      }
      item.quantity = quantity
      return cartStorage.set(cart)
    }
    
    return false
  },

  clear: () => {
    try {
      localStorage.removeItem(STORAGE_KEYS.CART)
      return true
    } catch (error) {
      console.error('Error clearing cart:', error)
      return false
    }
  },

  getTotal: () => {
    const cart = cartStorage.get()
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0)
  },

  getItemCount: () => {
    const cart = cartStorage.get()
    return cart.reduce((count, item) => count + item.quantity, 0)
  }
}

// Wishlist Storage
export const wishlistStorage = {
  get: () => {
    try {
      const wishlist = localStorage.getItem(STORAGE_KEYS.WISHLIST)
      return wishlist ? JSON.parse(wishlist) : []
    } catch (error) {
      console.error('Error reading wishlist from storage:', error)
      return []
    }
  },

  set: (wishlist) => {
    try {
      localStorage.setItem(STORAGE_KEYS.WISHLIST, JSON.stringify(wishlist))
      return true
    } catch (error) {
      console.error('Error saving wishlist to storage:', error)
      return false
    }
  },

  addItem: (product) => {
    const wishlist = wishlistStorage.get()
    const exists = wishlist.some(item => item.id === product.id)
    
    if (!exists) {
      wishlist.push({
        id: product.id,
        name: product.name,
        sku: product.sku,
        price: product.retail_price,
        image: product.images?.[0] || null,
        addedAt: new Date().toISOString()
      })
      return wishlistStorage.set(wishlist)
    }
    
    return true
  },

  removeItem: (productId) => {
    const wishlist = wishlistStorage.get()
    const filteredWishlist = wishlist.filter(item => item.id !== productId)
    return wishlistStorage.set(filteredWishlist)
  },

  isInWishlist: (productId) => {
    const wishlist = wishlistStorage.get()
    return wishlist.some(item => item.id === productId)
  },

  clear: () => {
    try {
      localStorage.removeItem(STORAGE_KEYS.WISHLIST)
      return true
    } catch (error) {
      console.error('Error clearing wishlist:', error)
      return false
    }
  }
}

// User Preferences Storage
export const preferencesStorage = {
  get: () => {
    try {
      const preferences = localStorage.getItem(STORAGE_KEYS.USER_PREFERENCES)
      return preferences ? JSON.parse(preferences) : {
        theme: 'light',
        language: 'en',
        currency: 'USD',
        notifications: true
      }
    } catch (error) {
      console.error('Error reading preferences from storage:', error)
      return {
        theme: 'light',
        language: 'en',
        currency: 'USD',
        notifications: true
      }
    }
  },

  set: (preferences) => {
    try {
      localStorage.setItem(STORAGE_KEYS.USER_PREFERENCES, JSON.stringify(preferences))
      return true
    } catch (error) {
      console.error('Error saving preferences to storage:', error)
      return false
    }
  },

  update: (key, value) => {
    const preferences = preferencesStorage.get()
    preferences[key] = value
    return preferencesStorage.set(preferences)
  }
}

// Recent Products Storage
export const recentProductsStorage = {
  get: () => {
    try {
      const recent = localStorage.getItem(STORAGE_KEYS.RECENT_PRODUCTS)
      return recent ? JSON.parse(recent) : []
    } catch (error) {
      console.error('Error reading recent products from storage:', error)
      return []
    }
  },

  add: (product) => {
    const recent = recentProductsStorage.get()
    const exists = recent.findIndex(item => item.id === product.id)
    
    if (exists !== -1) {
      recent.splice(exists, 1)
    }
    
    recent.unshift({
      id: product.id,
      name: product.name,
      sku: product.sku,
      image: product.images?.[0] || null,
      viewedAt: new Date().toISOString()
    })
    
    // Keep only last 10 products
    if (recent.length > 10) {
      recent.splice(10)
    }
    
    try {
      localStorage.setItem(STORAGE_KEYS.RECENT_PRODUCTS, JSON.stringify(recent))
      return true
    } catch (error) {
      console.error('Error saving recent products to storage:', error)
      return false
    }
  },

  clear: () => {
    try {
      localStorage.removeItem(STORAGE_KEYS.RECENT_PRODUCTS)
      return true
    } catch (error) {
      console.error('Error clearing recent products:', error)
      return false
    }
  }
}

// Search History Storage
export const searchHistoryStorage = {
  get: () => {
    try {
      const history = localStorage.getItem(STORAGE_KEYS.SEARCH_HISTORY)
      return history ? JSON.parse(history) : []
    } catch (error) {
      console.error('Error reading search history from storage:', error)
      return []
    }
  },

  add: (searchTerm) => {
    if (!searchTerm.trim()) return false
    
    const history = searchHistoryStorage.get()
    const exists = history.findIndex(item => item.term.toLowerCase() === searchTerm.toLowerCase())
    
    if (exists !== -1) {
      history.splice(exists, 1)
    }
    
    history.unshift({
      term: searchTerm,
      searchedAt: new Date().toISOString()
    })
    
    // Keep only last 20 searches
    if (history.length > 20) {
      history.splice(20)
    }
    
    try {
      localStorage.setItem(STORAGE_KEYS.SEARCH_HISTORY, JSON.stringify(history))
      return true
    } catch (error) {
      console.error('Error saving search history to storage:', error)
      return false
    }
  },

  clear: () => {
    try {
      localStorage.removeItem(STORAGE_KEYS.SEARCH_HISTORY)
      return true
    } catch (error) {
      console.error('Error clearing search history:', error)
      return false
    }
  }
}

// Theme Storage
export const themeStorage = {
  get: () => {
    try {
      return localStorage.getItem(STORAGE_KEYS.THEME) || 'light'
    } catch (error) {
      console.error('Error reading theme from storage:', error)
      return 'light'
    }
  },

  set: (theme) => {
    try {
      localStorage.setItem(STORAGE_KEYS.THEME, theme)
      return true
    } catch (error) {
      console.error('Error saving theme to storage:', error)
      return false
    }
  },

  toggle: () => {
    const currentTheme = themeStorage.get()
    const newTheme = currentTheme === 'light' ? 'dark' : 'light'
    return themeStorage.set(newTheme)
  }
}

// Utility function to clear all app data
export const clearAllData = () => {
  try {
    Object.values(STORAGE_KEYS).forEach(key => {
      localStorage.removeItem(key)
    })
    return true
  } catch (error) {
    console.error('Error clearing all data:', error)
    return false
  }
}

// Export all storage functions
export default {
  cart: cartStorage,
  wishlist: wishlistStorage,
  preferences: preferencesStorage,
  recentProducts: recentProductsStorage,
  searchHistory: searchHistoryStorage,
  theme: themeStorage,
  clearAll: clearAllData
}
