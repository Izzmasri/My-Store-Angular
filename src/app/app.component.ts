import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './shared/components/header/header.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent],
  template: `
    <div class="min-h-screen flex flex-col">
      <app-header></app-header>
      <main class="flex-1">
        <router-outlet></router-outlet>
      </main>
      <footer class="bg-gray-800 text-white py-8 mt-12">
        <div class="container mx-auto px-6 text-center">
          <p>&copy; 2025 Shop Store By Izzeddin Masri. All rights reserved.</p>
        </div>
      </footer>
    </div>
  `,
  styles: [],
})
export class AppComponent {
  title = 'ecommerce-app';
}
