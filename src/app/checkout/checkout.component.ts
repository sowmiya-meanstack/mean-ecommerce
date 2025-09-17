import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppnavComponent } from '../appnav/appnav.component';
import { ProductsService } from '../services/products.service';
import { ReactiveFormsModule,FormBuilder,FormGroup,Validators } from '@angular/forms';
import { Router } from '@angular/router';
@Component({
  selector: 'app-checkout',
  standalone: true,   // ✅ must add
  imports: [CommonModule, AppnavComponent, ReactiveFormsModule],
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']   // ✅ should be plural
})
export class CheckoutComponent {
  cart: any[] = [];
  cartTotal = 0;
  checkoutForm: FormGroup;

  constructor(private productservice: ProductsService, private fb: FormBuilder, private router: Router ) {
    this.checkoutForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      address: ['', Validators.required],
      address2: [''],
      country: ['', Validators.required],
      state: ['', Validators.required],
      zip: ['', Validators.required]
    });
  }


  
  getTotal() {
    return this.cart.reduce((sum, item) => sum + (item.price * item.qty), 0);
  }

  ngOnInit(){
    this.productservice.getCart().subscribe(data => {
      this.cart = [...data];
      this.cartTotal = this.cart.reduce((acc, cur) => acc + Number (cur.price * cur.qty), 0);
    });
  }


doCheckout() {
  const order = {
    ...this.checkoutForm.value,
    items: this.cart
  };

  this.productservice.checkout(order).subscribe(res => {
    const snackbar = document.getElementById("snackbar");
    if (snackbar) {  // 🔥 null check
      snackbar.innerHTML = 'Order placed successfully';
      snackbar.className = "show";
    }

    setTimeout(() => {
      this.productservice.clearCart();
      this.router.navigate(['/products']);
    }, 3000);
  });
}
}