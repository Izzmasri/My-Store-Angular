import { Injectable, signal, computed, PLATFORM_ID, inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { CartItem, Product } from '../models/product.model';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private platformId = inject(PLATFORM_ID);
  private isBrowser = isPlatformBrowser(this.platformId);

  // Writable signal for cart items
  private cartItems = signal<CartItem[]>(this.loadFromStorage());

  // Read-only signals for components to consume
  items = this.cartItems.asReadonly();

  // Computed signals for derived state
  totalItems = computed(() => this.cartItems().reduce((sum, item) => sum + item.quantity, 0));

  totalPrice = computed(() =>
    this.cartItems().reduce((sum, item) => sum + item.product.price * item.quantity, 0)
  );

  isEmpty = computed(() => this.cartItems().length === 0);

  addToCart(product: Product, quantity: number = 1): void {
    const items = [...this.cartItems()];
    const existingItemIndex = items.findIndex((item) => item.product.id === product.id);

    if (existingItemIndex > -1) {
      items[existingItemIndex] = {
        ...items[existingItemIndex],
        quantity: items[existingItemIndex].quantity + quantity,
      };
    } else {
      items.push({ product, quantity });
    }

    this.cartItems.set(items);
    this.saveToStorage();
  }

  updateQuantity(productId: number, quantity: number): void {
    if (quantity <= 0) {
      this.removeFromCart(productId);
      return;
    }

    const items = this.cartItems().map((item) =>
      item.product.id === productId ? { ...item, quantity } : item
    );
    this.cartItems.set(items);
    this.saveToStorage();
  }

  removeFromCart(productId: number): void {
    const items = this.cartItems().filter((item) => item.product.id !== productId);
    this.cartItems.set(items);
    this.saveToStorage();
  }

  clearCart(): void {
    this.cartItems.set([]);
    if (this.isBrowser) {
      localStorage.removeItem('cartItems');
    }
  }

  private saveToStorage(): void {
    if (this.isBrowser) {
      localStorage.setItem('cartItems', JSON.stringify(this.cartItems()));
    }
  }

  private loadFromStorage(): CartItem[] {
    if (this.isBrowser) {
      const stored = localStorage.getItem('cartItems');
      return stored ? JSON.parse(stored) : [];
    }
    return [];
  }
}
