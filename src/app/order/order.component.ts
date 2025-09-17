import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { AppnavComponent } from '../appnav/appnav.component';

@Component({
  selector: 'app-order',
  standalone: true,
  imports: [CommonModule, AppnavComponent],
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {
  orders: any[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.http.get<any[]>('/api/orders').subscribe({
      next: (data) => {
        this.orders = data;
      },
      error: (err) => {
        console.error('Error while fetching orders:', err);
      }
    });
  }

  totalEarnings(orders: any[]): number {
    return orders.reduce((acc: number, cur: any) => acc + this.orderTotal(cur.items), 0);  
  }

  totalItems(orders: any[]): number {
    return orders.reduce((acc: number, cur: any) => acc + cur.items.length, 0);  
  }

  orderTotal(items: any[]): number {
    return items.reduce((acc: number, cur: any) => acc + cur.price, 0);
  }
}
