import { Routes } from '@angular/router';
import { ProductlistComponent } from './productlist/productlist.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { CartComponent } from './cart/cart.component';
import { AppnavComponent } from './appnav/appnav.component';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';
import { OrderComponent } from './order/order.component';

export const routes: Routes = [
        { path: 'products', component: ProductlistComponent },
        { path: 'orders', component: OrderComponent },
        { path: 'cart', component: CartComponent },
        { path: 'checkout', component: CheckoutComponent },
        { path: '', redirectTo: '/products', pathMatch: 'full' },
        { path: '**', component: PagenotfoundComponent }
];
