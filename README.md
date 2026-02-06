# Solemate - E-Commerce Shoe Platform

A modern, full-featured e-commerce application for browsing, purchasing, and managing shoes. Built with React, Redux, and TailwindCSS, Solemate offers a seamless shopping experience with advanced features for both customers and administrators.

## 🎯 Features

### Customer Features
- **Product Browsing**: Explore a wide variety of shoes with detailed product information and high-quality images
- **Advanced Search & Filter**: Search products with sorting and filtering options (price, size, style)
- **Shopping Cart**: Add/remove items, manage quantities, and persistent cart state
- **Secure Checkout**: Multi-step checkout process with shipping and payment options
- **Payment Integration**: Integrated payment processing for secure transactions
- **Order Management**: View order history, track order status, and download receipts
- **Product Reviews**: Leave and read customer reviews and ratings
- **User Profiles**: Personalized user accounts with saved preferences and addresses
- **Responsive Design**: Fully responsive UI optimized for mobile, tablet, and desktop devices

### Admin Features
- **Product Management**: Add, edit, and delete products
- **Order Management**: View and update order statuses
- **User Management**: Manage customer accounts and permissions
- **Dashboard**: View sales statistics and key metrics
- **Analytics**: Track business performance with visual analytics

## 🛠️ Tech Stack

### Frontend Framework
- **React 18** - UI library
- **Vite** - Lightning-fast build tool
- **React Router v7** - Client-side routing

### State Management
- **Redux Toolkit** - Predictable state container
- **React-Redux** - Official React bindings for Redux

### Styling
- **TailwindCSS** - Utility-first CSS framework
- **PostCSS** - CSS processing
- **Framer Motion** - Smooth animations

### UI Components & Icons
- **Radix UI** - Headless UI component library
- **FontAwesome** - Icon library
- **Lucide React** - Open-source icon set
- **Embla Carousel** - Carousel/slider component

### API & Data
- **Axios** - HTTP client for API requests
- **React-Toastify** - Toast notifications

### Development Tools
- **ESLint** - Code linting
- **Autoprefixer** - CSS vendor prefixes

## 📋 Prerequisites

Before getting started, ensure you have the following installed:
- **Node.js** (v16 or higher)
- **npm** or **yarn** package manager
- **Git**

## 🚀 Getting Started

### 1. Clone the Repository
```bash
git clone <repository-url>
cd Solemate-Client-Side
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Environment Setup
Create a `.env` file in the root directory with your API configuration:
```env
VITE_API_BASE_URL=http://localhost:5000/api
VITE_APP_NAME=Solemate
```

### 4. Start Development Server
```bash
npm run dev
```
The application will be available at `http://localhost:5173`

## 📦 Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start the development server with hot reload |
| `npm run build` | Build the application for production |
| `npm run preview` | Preview the production build locally |
| `npm run lint` | Run ESLint to check code quality |

## 📁 Project Structure

```
src/
├── App.jsx                    # Main application component
├── AppLayout.jsx              # Main layout wrapper
├── Store.js                   # Redux store configuration
├── main.jsx                   # React DOM entry point
├── index.css                  # Global styles
│
├── components/                # Reusable React components
│   ├── CartSection.jsx
│   ├── ProductCard.jsx
│   ├── Header.jsx
│   ├── Hero.jsx
│   ├── ProductGrid.jsx
│   ├── LoginForm.jsx
│   ├── ui/                    # UI component library
│   └── ...
│
├── Pages/                     # Page components (route-based)
│   ├── Home.jsx
│   ├── Shop.jsx
│   ├── ProductDetails.jsx
│   ├── Cart.jsx
│   ├── Checkout.jsx
│   ├── Profile.jsx
│   ├── Login.jsx
│   └── Register.jsx
│
├── Routes/                    # Route configurations
│   ├── UserRoutes.jsx         # Customer routes
│   └── AdminRoutes.jsx        # Admin routes
│
├── layouts/                   # Layout components
│   ├── AdminLayout.jsx
│   ├── Navigation.jsx
│   └── Footer.jsx
│
├── Slices/                    # Redux slices (state management)
│   ├── auth.slice.js
│   ├── product.slice.js
│   ├── cart.slice.js
│   ├── order.slice.js
│   ├── payment.slice.js
│   ├── review.slice.js
│   └── user.slice.js
│
├── thunks/                    # Redux async thunks
│   ├── auth.thunk.js
│   ├── product.thunk.js
│   ├── cart.thunks.js
│   ├── order.thunk.js
│   └── ...
│
├── apiServices/               # API service layer
│   ├── auth.service.js
│   ├── product.service.js
│   ├── cart.service.js
│   ├── order.service.js
│   ├── payment.service.js
│   ├── review.service.js
│   ├── user.service.js
│   └── axios.js               # Axios configuration
│
├── Constants/                 # Application constants
│   └── Routes.json
│
└── lib/                       # Utility functions
    └── utils.js
```

## 🔌 API Integration

The application communicates with a backend API through the `apiServices` layer. Each service module handles specific API endpoints:

- **auth.service.js** - Authentication endpoints (login, register, logout)
- **product.service.js** - Product fetching and searching
- **cart.service.js** - Shopping cart operations
- **order.service.js** - Order management
- **payment.service.js** - Payment processing
- **review.service.js** - Product reviews
- **user.service.js** - User profile management

All API calls are made through configured Axios instance with automatic token management.

## 🎨 Styling

This project uses **TailwindCSS** for styling with custom configuration. Styles are organized as:
- Global styles in `src/index.css`
- Component-scoped utility classes
- Custom theme configuration in `tailwind.config.js`

## 🔐 Authentication

The application uses Redux for state management of authentication. Auth flow:
1. User logs in/registers through login/register pages
2. Credentials are validated against the backend API
3. JWT token is stored in Redux state
4. Protected routes check authentication status
5. Token is included in API requests via Axios interceptors

## 📱 Responsive Design

The application is fully responsive and works seamlessly on:
- **Mobile**: 320px and up
- **Tablet**: 768px and up
- **Desktop**: 1024px and up

## 🚢 Deployment

### Build for Production
```bash
npm run build
```

The `dist/` directory will contain the production-ready files optimized for the best performance.

### Deploy to Vercel
This project includes `vercel.json` configuration for easy deployment to Vercel:
```bash
npm install -g vercel
vercel
```

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Create a feature branch (`git checkout -b feature/AmazingFeature`)
2. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
3. Push to the branch (`git push origin feature/AmazingFeature`)
4. Open a Pull Request

## 📝 Code Standards

- Follow ESLint rules configured in `eslint.config.js`
- Use functional components with React hooks
- Keep components small and reusable
- Use Redux for global state management
- Document complex logic with comments

## 🐛 Troubleshooting

### Development Server Not Starting
```bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
npm run dev
```

### Port 5173 Already in Use
```bash
# Specify a different port
npm run dev -- --port 3000
```

### Build Failures
```bash
# Check for linting errors
npm run lint

# Fix auto-fixable errors
npm run lint -- --fix
```

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 💬 Support

For issues, questions, or suggestions, please create an issue in the repository.

## 🎉 Acknowledgments

- Built with [React](https://react.dev/)
- Styled with [TailwindCSS](https://tailwindcss.com/)
- State management with [Redux Toolkit](https://redux-toolkit.js.org/)
- Powered by [Vite](https://vitejs.dev/)
