import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Product } from '../models/product.model';
import productData from '../../../assets/data/products.json';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor() {}

  getProducts(): Observable<Product[]> {
    return of(productData.products);
  }

  getProductById(id: number): Observable<Product | undefined> {
    const product = productData.products.find((p) => p.id === id);
    return of(product);
  }

  getProductsByCategory(category: string): Observable<Product[]> {
    const products = productData.products.filter((p) => p.category === category);
    return of(products);
  }
}
