# LinkWithMentor E-Commerce Platform

A modern, feature-rich e-commerce application built with Svelte, TypeScript, and Vite.

## 🚀 Features

### Core Functionality
- ✅ **Real Product Data** - 20 products from FakeStoreAPI
- ✅ **Search Autocomplete** - Instant suggestions with keyboard navigation
- ✅ **Product Reviews** - Star ratings, distribution charts, verified badges
- ✅ **Image Lightbox** - Full-screen zoom with animations
- ✅ **Persistent Cart** - localStorage persistence across sessions
- ✅ **Persistent Wishlist** - Save favorites with localStorage
- ✅ **Recently Viewed** - Auto-tracking of browsing history (max 10)
- ✅ **Product Comparison** - Compare up to 4 products side-by-side
- ✅ **Quick View Modal** - Preview products without leaving page
- ✅ **Product Recommendations** - Smart suggestions based on category & price
- ✅ **Multi-Currency** - USD, EUR, SAR, JPY, GBP with real-time conversion
- ✅ **Multi-Language** - 5 languages with RTL support (Arabic)

### Advanced Features
- ✅ **Category Filtering** - Filter by 4 product categories
- ✅ **Smart Sorting** - Sort by price or name (ascending/descending)
- ✅ **Pagination** - 6 items per page with smart ellipsis
- ✅ **Toast Notifications** - Professional feedback system
- ✅ **Error Recovery** - Retry mechanisms for failed operations
- ✅ **Responsive Design** - Mobile, tablet, and desktop optimized
- ✅ **Floating Comparison Bar** - Sticky bottom bar for comparisons
- ✅ **Horizontal Scroll** - Recently viewed products carousel

## 🏗️ Architecture

```
src/
├── components/
│   ├── atoms/          # LoadingSpinner, ErrorMessage
│   ├── molecules/      # ProductCard, SearchBar, Pagination, etc.
│   ├── organisms/      # Header, ReviewSection, ToastContainer
│   └── pages/          # Home, ProductDetails, Cart
├── jet/                # Business Logic Layer
│   ├── adapters/       # API data transformation
│   ├── dependencies/   # DI container, HTTP client
│   ├── intents/        # Use-case services
│   └── models/         # Domain entities
├── stores/             # Reactive state management
├── utils/              # Utilities (localStorage, logger, etc.)
└── config/             # Configuration files
```

## 🛠️ Tech Stack

- **Framework:** Svelte 5
- **Language:** TypeScript
- **Build Tool:** Vite
- **State Management:** Svelte Stores
- **API:** FakeStoreAPI
- **Styling:** Vanilla CSS

## 📦 Installation

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## 🎯 Key Components

### SearchBar
- Real-time autocomplete suggestions
- Keyboard navigation (↑↓ arrows, Enter, ESC)
- Product preview with images

### ReviewSection
- 5-star rating system
- Average rating calculation
- Rating distribution bars
- Verified purchase badges

### ImageLightbox
- Full-screen image zoom
- Smooth animations
- Keyboard support (ESC to close)

### ProductFilters
- Category dropdown
- Sort options (price, name)
- Real-time filtering

### Pagination
- Smart page navigation
- Ellipsis for large page counts
- Smooth scrolling

## 🌍 Internationalization

Supports 5 languages:
- English (en-US)
- Arabic (ar-SA) with RTL support
- Spanish (es-ES)
- French (fr-FR)
- German (de-DE)

Supports 5 currencies:
- USD ($)
- EUR (€)
- SAR (﷼)
- JPY (¥)
- GBP (£)

## 💾 Data Persistence

Cart data is automatically saved to localStorage and persists across:
- Page refreshes
- Browser restarts
- Tab closures

## 🎨 UI/UX Features

- Gradient buttons with hover effects
- Smooth micro-animations
- Toast notifications for user feedback
- Loading states for async operations
- Error messages with retry functionality
- Responsive grid layouts
- Professional color palette

## 📱 Responsive Design

Optimized for:
- Mobile devices (320px+)
- Tablets (768px+)
- Desktops (1024px+)
- Large screens (1400px+)

## 🔧 Development

The project follows enterprise-grade patterns:
- **Intent-based architecture** for business logic
- **Adapter pattern** for API integration
- **Dependency injection** for loose coupling
- **Type-safe** with 100% TypeScript coverage
- **Reactive** state management with Svelte stores

## 📄 License

MIT

## 🤝 Contributing

Contributions welcome! Please feel free to submit a Pull Request.

---

Built with ❤️ using Svelte + TypeScript
