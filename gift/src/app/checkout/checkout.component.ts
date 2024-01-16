import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { cart, order } from '../data-type';
import { ProductService } from '../product.service';
import { Location } from '@angular/common';
import { environment } from 'src/environment';
import { NGXLogger } from 'ngx-logger';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

  totalPrice: number | undefined;
  cartData: cart[] | undefined;
  orderMessage: string | undefined;
  orderDataModel = { email: '', address: '', contact: '' };

  constructor(private product: ProductService, private router: Router, private location: Location, private logger: NGXLogger) { }

  ngOnInit(): void {
    this.product.currentCart().subscribe((result) => {

      let price = environment.price;
      this.cartData = result;
      result.forEach((item) => {
        if (item.quantity) {
          price = price + (+item.price * +item.quantity);
        }
      });
      this.totalPrice = price + (price / 10) + environment.shipping - (price / 10);
    });
  }

  orderNow(data: { email: string, address: string, contact: string }) {
    let user = localStorage.getItem('user');
    let userId = user && JSON.parse(user).id;
    let userName = user && JSON.parse(user).name;

    if (this.totalPrice) {
      let orderData: order = {
        email: data.email,
        address: data.address,
        contact: data.contact,
        totalPrice: this.totalPrice,
        userId,
        userName,
        id: undefined,
        orderedProducts: this.cartData || [],
        status: '',
        orderOn: new Date(),
      };
      this.cartData?.forEach((item) => {
        setTimeout(() => {
          item.id && this.product.deleteCartItems(item.id);
        }, 700);
      });
      this.product.orderNow(orderData).subscribe((result) => {
        if (result) {
          this.orderMessage = "Order has been placed";
          this.logger.error("Order Placed" + '-' + this.orderMessage);

          const orderedTime = new Date();
          localStorage.setItem('orderedTime', JSON.stringify(orderedTime));


          setTimeout(() => {
            this.orderMessage = undefined;
            this.router.navigate(['/my-orders']);
          }, 4000);
        }
      });
    }
  }

  goBack() {
    this.location.back();
  }
}

