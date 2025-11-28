import { Component, OnInit, signal, inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';

@Component({
  selector: 'app-order-confirmation',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './order-confirmation.component.html',
  styleUrls: ['./order-confirmation.component.css'],
})
export class OrderConfirmationComponent implements OnInit {
  private platformId = inject(PLATFORM_ID);
  private isBrowser = isPlatformBrowser(this.platformId);
  private route = inject(ActivatedRoute);

  orderId = signal<string>('');
  orderData = signal<any>(null);

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.orderId.set(params['orderId'] || '');
    });

    if (this.isBrowser) {
      const storedOrder = sessionStorage.getItem('lastOrder');
      if (storedOrder) {
        this.orderData.set(JSON.parse(storedOrder));
      }
    }
  }
}
