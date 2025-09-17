import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppnavComponent } from '../appnav/appnav.component';
import { ProductsService } from '../services/products.service';
import { RouterModule } from '@angular/router';
@Component({
  selector: 'app-cart',
  imports: [CommonModule,AppnavComponent,RouterModule],
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent {
  cart: any[] = [];  // <-- explicitly type it
  cartTotal = 0
 
 constructor(private productservice: ProductsService){}
 ngOnInit(){
   this.productservice.getCart().subscribe(data => {
     this.cart = [...data];
     this.cartTotal = this.cart.reduce((acc,cur)=> acc + Number(cur.price), 0);
   });
 }

 removeFromCart(item: any) {
      this.productservice.removeFromCart(item.id); // call the service
 }
}
