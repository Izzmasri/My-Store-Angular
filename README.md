# 🛒 Shop Store - Angular E-Commerce Application

A modern e-commerce web application built with Angular 19, featuring product browsing, shopping cart management, and checkout with form validation.

![Angular](https://img.shields.io/badge/Angular-19-red)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0+-blue)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.0+-38B2AC)

## ✨ Features

- **Product Catalog** - Browse and filter products by category
- **Product Details** - View detailed information with ratings
- **Shopping Cart** - Add, remove, update quantities with persistent storage
- **Checkout Process** - Complete form validation and order confirmation
- **Server-Side Rendering** - SEO-friendly with SSR support
- **Responsive Design** - Mobile-first with Tailwind CSS

## 🛠 Technologies

- **Angular 19** - Standalone components with Signals
- **TypeScript 5+** - Type-safe development
- **Tailwind CSS** - Utility-first styling
- **RxJS** - Reactive programming
- **SSR** - Server-side rendering enabled

## 📁 Project Structure

```
my-store/
├── src/app/
│   ├── core/                    # Services and models
│   │   ├── models/              # TypeScript interfaces
│   │   └── services/            # Cart & Product services
│   ├── features/                # Feature modules
│   │   ├── products/            # Product list & details
│   │   ├── cart/                # Shopping cart
│   │   └── checkout/            # Checkout & confirmation
│   ├── shared/                  # Reusable components
│   └── app.routes.ts            # Route definitions
|
└── package.json
```

## 🚀 Quick Start

### Prerequisites

- Node.js 18+
- npm 9+
- Angular CLI 19

### Installation

```
# Clone repository
git clone <repository-url>
cd my-store

# Install dependencies
npm install

# Run development server
ng serve

# Open browser
http://localhost:4200
```

### Build for Production

```
ng build --configuration production
```

## 🎯 Key Features

### Signal-Based State Management

```
private cartItems = signal<CartItem[]>([]);
totalItems = computed(() =>
  this.cartItems().reduce((sum, item) => sum + item.quantity, 0)
);
```

### SSR-Compatible Storage

```
private isBrowser = isPlatformBrowser(inject(PLATFORM_ID));

private saveToStorage(): void {
  if (this.isBrowser) {
    localStorage.setItem('cartItems', JSON.stringify(this.cartItems()));
  }
}
```

### Lazy Loading Routes

```
{
  path: 'products',
  loadComponent: () =>
    import('./features/products/product-list/product-list.component')
}
```

## 🐛 Troubleshooting

**Issue**: `NG0908: Angular requires Zone.js`  
**Solution**: Add `import 'zone.js';` at top of `main.ts` and `main.server.ts`

**Issue**: `localStorage is not defined`  
**Solution**: Use `isPlatformBrowser()` check before accessing localStorage

**Issue**: Build cache problems  
**Solution**: Run `ng cache clean`

## 🔮 Future Enhancements

- User authentication
- Product search
- Payment integration
- Order history
- Product reviews
- Admin dashboard

## 👨‍💻 Author

**Izzeddin Masri**

---

**Built with Angular 19 and Tailwind CSS** ❤️

```

```
