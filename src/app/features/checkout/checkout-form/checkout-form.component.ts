import { Component, OnInit, inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CartService } from '../../../core/services/cart.service';

@Component({
  selector: 'app-checkout-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './checkout-form.component.html',
  styleUrls: ['./checkout-form.css'],
})
export class CheckoutFormComponent implements OnInit {
  private fb = inject(FormBuilder);
  private router = inject(Router);
  private platformId = inject(PLATFORM_ID);
  private isBrowser = isPlatformBrowser(this.platformId);

  cartService = inject(CartService);
  checkoutForm!: FormGroup;
  submitted = false;

  ngOnInit(): void {
    if (this.cartService.isEmpty()) {
      this.router.navigate(['/products']);
      return;
    }

    this.checkoutForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]],
      address: ['', [Validators.required, Validators.minLength(10)]],
      city: ['', Validators.required],
      state: ['', Validators.required],
      zipCode: ['', [Validators.required, Validators.pattern(/^\d{5}$/)]],
      cardNumber: ['', [Validators.required, Validators.pattern(/^\d{16}$/)]],
      cardName: ['', Validators.required],
      expiryDate: ['', [Validators.required, Validators.pattern(/^(0[1-9]|1[0-2])\/\d{2}$/)]],
      cvv: ['', [Validators.required, Validators.pattern(/^\d{3}$/)]],
    });
  }

  get f() {
    return this.checkoutForm.controls;
  }

  onSubmit(): void {
    this.submitted = true;

    if (this.checkoutForm.invalid) {
      this.markFormGroupTouched(this.checkoutForm);
      return;
    }

    // Generate order ID
    const orderId = 'ORD-' + Date.now();

    // Store order data (only in browser)
    if (this.isBrowser) {
      const orderData = {
        orderId,
        customerInfo: this.checkoutForm.value,
        items: this.cartService.items(),
        totalAmount: this.cartService.totalPrice() * 1.1,
        orderDate: new Date(),
      };

      sessionStorage.setItem('lastOrder', JSON.stringify(orderData));
    }

    // Clear cart
    this.cartService.clearCart();

    // Navigate to confirmation
    this.router.navigate(['/confirmation'], {
      queryParams: { orderId },
    });
  }

  private markFormGroupTouched(formGroup: FormGroup): void {
    Object.keys(formGroup.controls).forEach((key) => {
      const control = formGroup.get(key);
      control?.markAsTouched();
    });
  }
}
