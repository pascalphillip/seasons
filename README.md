# Seasons - Global Marketplace

**The Global Marketplace for Businesses and the Consumers They Serve**

Seasons is a next-generation hybrid e-commerce platform that bridges the gap between global wholesale trade and direct-to-consumer retail. Our foundation is built on the principles of trust, variety, and seamless transactional efficiency for every type of buyer, from a Fortune 500 procurement manager to a family shopping for their home.

## 🚀 Features

### Dual Marketplace Model
- **B2B (Wholesale)**: Source products in bulk directly from manufacturers and distributors
- **B2C (Retail)**: Purchase individual items with fast, reliable shipping
- **Unified Platform**: Single destination for both business and consumer needs

### Core Functionalities
- **Dual-Format Product Listings**: Products with both wholesale and retail pricing
- **Intelligent Search & Filtering**: Filter results for wholesale or retail offerings
- **Seller Verification System**: Rigorous process ensuring marketplace trust
- **Dualized User Profiles**: Separate business and consumer account types
- **Secure Payment Gateway**: Support for both business and consumer payment methods

## 🛠️ Tech Stack

- **Frontend**: React 18 + Vite
- **Styling**: Tailwind CSS
- **Authentication**: Supabase Auth
- **Database**: Supabase PostgreSQL
- **Icons**: Lucide React
- **Routing**: React Router DOM

## 📋 Prerequisites

- Node.js 18+ 
- npm or yarn
- Supabase account and project

## 🚀 Quick Start

### 1. Clone the Repository
```bash
git clone <your-repo-url>
cd seasons
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Set Up Supabase

#### Create a Supabase Project
1. Go to [supabase.com](https://supabase.com) and create an account
2. Create a new project
3. Note your project URL and anon key

#### Set Up Database Schema
1. Go to your Supabase project dashboard
2. Navigate to SQL Editor
3. Copy and paste the contents of `supabase-schema.sql`
4. Run the SQL commands

#### Configure Environment Variables
1. Copy `env.example` to `.env.local`
2. Fill in your Supabase credentials:
```bash
VITE_SUPABASE_URL=https://ikftwxvivpvvjrawvmvs.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlrZnR3eHZpdnB2dmpyYXd2bXZzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTU5MjgzMDIsImV4cCI6MjA3MTUwNDMwMn0.isVKdYsskn37nQ-1CtSkvZ-0eAktE2cfSqULX9_dLaI
```

### 4. Start Development Server
```bash
npm run dev
```

The application will open at `http://localhost:3000`

## 🏗️ Project Structure

```
seasons/
├── src/
│   ├── components/
│   │   ├── auth/           # Authentication components
│   │   │   ├── AuthPage.jsx
│   │   │   ├── SignInForm.jsx
│   │   │   └── SignUpForm.jsx
│   │   └── dashboard/      # Dashboard components
│   │       └── Dashboard.jsx
│   ├── contexts/           # React contexts
│   │   └── AuthContext.jsx
│   ├── lib/                # Utility libraries
│   │   └── supabase.js
│   ├── App.jsx             # Main app component
│   ├── main.jsx            # App entry point
│   └── index.css           # Global styles
├── supabase-schema.sql     # Database schema
├── package.json            # Dependencies
├── tailwind.config.js      # Tailwind configuration
└── README.md
```

## 🔐 Authentication Flow

### Sign Up Process
1. User selects account type (Business or Consumer)
2. Business users provide business name
3. All users provide personal information
4. Account creation with Supabase Auth
5. Profile creation in database
6. Redirect to appropriate dashboard

### Sign In Process
1. User enters email and password
2. Supabase Auth validates credentials
3. User profile is fetched from database
4. Redirect to appropriate dashboard based on user type

## 🗄️ Database Schema

### Core Tables
- **profiles**: User profiles with business/consumer distinction
- **products**: Product listings with dual pricing
- **orders**: Order management for both B2B and B2C
- **categories**: Product categorization
- **seller_verifications**: Seller trust verification system

### Key Features
- Row Level Security (RLS) policies for data protection
- Automatic timestamp management
- Comprehensive indexing for performance
- Flexible product pricing structure

## 🎨 Customization

### Styling
- Modify `tailwind.config.js` for theme changes
- Update `src/index.css` for global styles
- Use Tailwind utility classes for component styling

### Components
- Authentication forms can be customized in `src/components/auth/`
- Dashboard layouts in `src/components/dashboard/`
- Add new features by extending existing components

## 🚀 Deployment

### Build for Production
```bash
npm run build
```

### Deploy to Vercel/Netlify
1. Connect your repository
2. Set environment variables
3. Deploy automatically on push

### Environment Variables for Production
Ensure these are set in your deployment platform:
- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_ANON_KEY`

## 🔒 Security Features

- **Row Level Security**: Database-level access control
- **Authentication**: Supabase Auth with JWT tokens
- **Input Validation**: Form validation and sanitization
- **Secure Routes**: Protected routes for authenticated users

## 📱 Responsive Design

- Mobile-first approach with Tailwind CSS
- Responsive grid layouts
- Touch-friendly interface elements
- Optimized for all device sizes

## 🧪 Testing

### Run Linting
```bash
npm run lint
```

### Fix Linting Issues
```bash
npm run lint:fix
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🆘 Support

For support and questions:
- Create an issue in the repository
- Check the Supabase documentation
- Review the authentication flow documentation

## 🔮 Future Enhancements

- **Product Management**: Seller product listing interface
- **Order Management**: Complete order lifecycle management
- **Payment Integration**: Stripe/PayPal integration
- **Analytics Dashboard**: Business insights and reporting
- **Mobile App**: React Native mobile application
- **Multi-language Support**: Internationalization
- **Advanced Search**: AI-powered product discovery
- **Inventory Management**: Real-time stock tracking

---

**Built with ❤️ by the Seasons Team**
