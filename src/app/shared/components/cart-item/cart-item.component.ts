import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CartItem } from '../../../core/models/product.model';

@Component({
  selector: 'app-cart-item',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './cart-item.component.html',
  styleUrls: ['./cart-item.component.css'],
})
export class CartItemComponent {
  @Input() item!: CartItem;
  @Output() quantityChange = new EventEmitter<{ productId: number; quantity: number }>();
  @Output() removeItem = new EventEmitter<number>();

  quantityInput: number = 1;
  quantityError: string = '';

  ngOnInit(): void {
    this.quantityInput = this.item.quantity;
  }

  onQuantityChange(value: number): void {
    this.quantityError = '';

    if (!value || value < 1) {
      this.quantityError = 'Quantity must be at least 1';
      return;
    }

    if (value > 99) {
      this.quantityError = 'Quantity cannot exceed 99';
      return;
    }

    // Emit the change to parent
    this.quantityChange.emit({
      productId: this.item.product.id,
      quantity: value,
    });
  }

  onRemove(): void {
    this.removeItem.emit(this.item.product.id);
  }

  increaseQuantity(): void {
    this.quantityInput++;
    this.onQuantityChange(this.quantityInput);
  }

  decreaseQuantity(): void {
    if (this.quantityInput > 1) {
      this.quantityInput--;
      this.onQuantityChange(this.quantityInput);
    }
  }
}
