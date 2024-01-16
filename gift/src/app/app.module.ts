import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { FooterComponent } from './footer/footer.component';
import { SearchComponent } from './search/search.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { CartPageComponent } from './cart-page/cart-page.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { MyOrdersComponent } from './my-orders/my-orders.component';
import { PaymentComponent } from './payment/payment.component';
import { UserComponent } from './user/user.component';
import { AdminComponent } from './admin/admin.component';
import { AdminHomeComponent } from './admin-home/admin-home.component';
import { AdminUpdateProductComponent } from './admin-update-product/admin-update-product.component';
import { AdminAddProductComponent } from './admin-add-product/admin-add-product.component';
import{LoggerModule,NgxLoggerLevel} from "ngx-logger";
import{OrderedProductsComponent} from "./ordered-products/ordered-products.component";

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    FooterComponent,
    SearchComponent,
    ProductDetailsComponent,
    CartPageComponent,
    CheckoutComponent,
    MyOrdersComponent,
    PaymentComponent,
    UserComponent,
    AdminComponent,
    AdminHomeComponent,
    AdminUpdateProductComponent,
    AdminAddProductComponent,
    OrderedProductsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    LoggerModule.forRoot({
      serverLoggingUrl:'http://localhost:3030/logger',
      level:NgxLoggerLevel.DEBUG,
      serverLogLevel:NgxLoggerLevel.ERROR
    }),
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
