import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common'; // <-- import this
import { ProductsService } from '../services/products.service';

@Component({
  selector: 'app-appnav',
  imports: [RouterModule, CommonModule], // <-- add CommonModule here
  templateUrl: './appnav.component.html',
  styleUrls: ['./appnav.component.css']
})
export class AppnavComponent {
  cart: any[] = [];

  constructor(private productsService: ProductsService) {}

  ngOnInit() {
    this.productsService.getCart().subscribe(data => {
      this.cart = [...data];
    });
  }
}
