import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, map, tap } from 'rxjs';
import { isPlatformServer } from '@angular/common';
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private jsonUrl = '/assets/data/products.json';

  constructor(private http: HttpClient, @Inject(PLATFORM_ID) private platformId: Object) {}

  getProducts(): Observable<Product[]> {
    if (isPlatformServer(this.platformId)) {
      return of([]);
    }

    return this.http.get<{ products: Product[] }>(this.jsonUrl).pipe(
      map((response) => response.products),
      tap((data) => console.log('ProductService fetched:', data))
    );
  }

  getProductById(id: number): Observable<Product | undefined> {
    return this.getProducts().pipe(map((products) => products.find((p) => p.id === id)));
  }

  getProductsByCategory(category: string): Observable<Product[]> {
    return this.getProducts().pipe(
      map((products) => products.filter((p) => p.category === category))
    );
  }
}
