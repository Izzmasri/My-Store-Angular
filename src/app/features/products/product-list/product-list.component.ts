import { Component, OnInit, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ProductService } from '../../../core/services/product.service';
import { CartService } from '../../../core/services/cart.service';
import { Product } from '../../../core/models/product.model';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
})
export class ProductListComponent implements OnInit {
  private productService = inject(ProductService);
  private cartService = inject(CartService);

  products = signal<Product[]>([]);
  selectedCategory = signal<string>('All');
  categories = signal<string[]>(['All', 'Electronics', 'Accessories']);

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {
    this.productService.getProducts().subscribe({
      next: (products) => this.products.set(products),
      error: (error) => console.error('Error loading products:', error),
    });
  }

  filterByCategory(category: string): void {
    this.selectedCategory.set(category);
    if (category === 'All') {
      this.loadProducts();
    } else {
      this.productService.getProductsByCategory(category).subscribe({
        next: (products) => this.products.set(products),
      });
    }
  }

  addToCart(product: Product, event: Event): void {
    event.preventDefault();
    event.stopPropagation();
    this.cartService.addToCart(product, 1);
    this.showNotification(`${product.name} added to cart!`);
  }

  private showNotification(message: string): void {
    // Simple notification - you can enhance this with a proper toast service
    alert(message);
  }
}
