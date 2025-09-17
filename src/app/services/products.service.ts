import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  products: Product[] = [];
  cart: Product[] = [];

  private productsSub = new BehaviorSubject<Product[]>([]);
  private cartSub = new BehaviorSubject<Product[]>([]);

  constructor(private http: HttpClient) {}

  fetchProducts() {
    this.http.get<Product[]>('/api/products').subscribe({
      next: (data) => {
        this.products = [...data];
        this.productsSub.next(this.products);
      },
      error: (err) => console.error('Error fetching products:', err)
    });
  }

  getProductsObservable() {
    return this.productsSub.asObservable();
  }

  getCart() {
    return this.cartSub.asObservable();
  }

  addToCart(id: string) {
    const product = this.products.find(p => p._id === id);
    if (product) {
      if (this.cart.find(p => p._id === id)) {
        this.removeFromCart(id);
      } else {
        this.cart.push(product);
      }
      this.cartSub.next([...this.cart]);
    }
  }

  removeFromCart(id: string) {
    if (this.findItemInCart(id).length) {
      const item = this.findItemInCart(id)[0];
      const index = this.cart.indexOf(item);
      this.cart.splice(index, 1);   
    }
    this.cartSub.next([...this.cart]);
  }

 clearCart() {
  this.cart = [];                                // 🔥 _cart illa, cart use pannunga
  this.cartSub.next([...this.cart]);
}

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>('/api/products');
  }

  checkout(data: any) {
  return this.http.post('/api/checkout', data);  // 🔥 return venum
}


  private findItemInCart(id: string) {
    return this.cart.filter(p => p._id === id); 
  }
}
