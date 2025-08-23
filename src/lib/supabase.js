import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://placeholder.supabase.co'
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'placeholder-key'

// Log warning if using placeholder values
if (!import.meta.env.VITE_SUPABASE_URL || !import.meta.env.VITE_SUPABASE_ANON_KEY) {
  console.warn('⚠️ Supabase environment variables not found. Using placeholder values. Please set up your .env file.')
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Database table names
export const TABLES = {
  USERS: 'users',
  PROFILES: 'profiles',
  PRODUCTS: 'products',
  ORDERS: 'orders',
  ORDER_ITEMS: 'order_items',
  CATEGORIES: 'categories',
  SELLER_VERIFICATIONS: 'seller_verifications'
}

// User types
export const USER_TYPES = {
  BUSINESS: 'business',
  CONSUMER: 'consumer'
}

// Product types
export const PRODUCT_TYPES = {
  WHOLESALE: 'wholesale',
  RETAIL: 'retail',
  BOTH: 'both'
}
