import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppnavComponent } from '../appnav/appnav.component';
import { ProductsService } from '../services/products.service';
import { TruncatePipe } from '../../truncate.pipe';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-productlist',
  imports: [CommonModule, AppnavComponent, TruncatePipe],
  templateUrl: './productlist.component.html',
  styleUrls: ['./productlist.component.css']
})
export class ProductlistComponent {
  products: any[] = [];

  constructor(private productsService: ProductsService) {}

 ngOnInit() {
  this.productsService.fetchProducts(); // backend call
  this.productsService.getProductsObservable().subscribe(data => {
    console.log(data); // console-la backend data check pannunga
    this.products = [...data];
  });
}

  addItemToCart(item: any) {
    this.productsService.addToCart(item._id);
  }

  ItemInCart(item: any) {
    return this.productsService.cart.some(cartItem => cartItem._id === item._id);
  }
}
