import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CartPageComponent } from './cart-page/cart-page.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { HomeComponent } from './home/home.component';
import { MyOrdersComponent } from './my-orders/my-orders.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { SearchComponent } from './search/search.component';
import { PaymentComponent } from './payment/payment.component';
import { AboutusComponent } from './aboutus/aboutus.component';
import { ContactUsComponent } from './contactus/contactus.component';
import { AdminComponent } from './admin/admin.component';
import { AdminAddProductComponent } from './admin-add-product/admin-add-product.component';
import { AdminUpdateProductComponent } from './admin-update-product/admin-update-product.component';
import { AdminHomeComponent } from './admin-home/admin-home.component';
import { UserComponent } from './user/user.component';
import { OrderedProductsComponent } from './ordered-products/ordered-products.component';

const routes: Routes = [
  {
    component: HomeComponent,
    path: '',
  },
  {
    component:UserComponent,
    path:'user',
  },
  {
    component: ProductDetailsComponent,
    path: 'details/:productId',
  },
  {
    component: CartPageComponent,
    path: 'cart-page',
  },
  {
    component: PaymentComponent,
    path: 'payment',
  },
  {
    component: CheckoutComponent,
    path: 'checkout',
  },
  {
    component: MyOrdersComponent,
    path: 'my-orders',
  },
  {
    component: SearchComponent,
    path: 'search/:query',
  },

  {
    component: AboutusComponent,
    path: 'aboutus',
  },
  {
    component: ContactUsComponent,
    path: 'contactus',
  },
  {
    component:AdminComponent,
    path:'admin',
  },
  {
    component:AdminAddProductComponent,
    path:'admin-add-product',
  },
  {
    component:AdminUpdateProductComponent,
    path:'admin-update-product/:id',
  },
  {
    component:AdminHomeComponent,
    path:'admin-home',
  },
  {
    component:OrderedProductsComponent,
    path:'ordered-products',
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
