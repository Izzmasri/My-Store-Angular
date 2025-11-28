import { Component, OnInit, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductService } from '../../../core/services/product.service';
import { CartService } from '../../../core/services/cart.service';
import { Product } from '../../../core/models/product.model';
import { ProductCardComponent } from '../../../shared/components/product-card/product-card.component';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule, ProductCardComponent],
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
})
export class ProductListComponent implements OnInit {
  private productService = inject(ProductService);
  private cartService = inject(CartService);

  products = signal<Product[]>([]);

  private allProducts: Product[] = [];

  selectedCategory = signal<string>('All');
  categories = signal<string[]>(['All', 'Electronics', 'Accessories']);

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {
    this.productService.getProducts().subscribe({
      next: (products: Product[]) => {
        if (products.length > 0) {
          this.allProducts = products;
          this.applyFilter();
        } else {
          console.log('Still waiting for data or empty...');
        }
      },
      error: (error: any) => console.error('Error loading products:', error),
    });
  }

  filterByCategory(category: string): void {
    this.selectedCategory.set(category);
    this.applyFilter();
  }

  private applyFilter(): void {
    const category = this.selectedCategory();
    if (category === 'All') {
      this.products.set(this.allProducts);
    } else {
      const filtered = this.allProducts.filter((p) => p.category === category);
      this.products.set(filtered);
    }
  }

  handleAddToCart(product: Product): void {
    this.cartService.addToCart(product, 1);
    alert(`${product.name} added to cart!`);
  }
}
