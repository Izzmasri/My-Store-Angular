import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { CartService } from '../../../core/services/cart.service';
import { CartItemComponent } from '../../../shared/components/cart-item/cart-item.component';

@Component({
  selector: 'app-shopping-cart',
  standalone: true,
  imports: [CommonModule, RouterLink, CartItemComponent],
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.css'],
})
export class ShoppingCartComponent {
  cartService = inject(CartService);

  // Handler for quantity change event from child component
  handleQuantityChange(event: { productId: number; quantity: number }): void {
    this.cartService.updateQuantity(event.productId, event.quantity);
  }

  // Handler for remove item event from child component
  handleRemoveItem(productId: number): void {
    if (confirm('Are you sure you want to remove this item from your cart?')) {
      this.cartService.removeFromCart(productId);
    }
  }

  clearCart(): void {
    if (confirm('Are you sure you want to clear your entire cart?')) {
      this.cartService.clearCart();
    }
  }
}
