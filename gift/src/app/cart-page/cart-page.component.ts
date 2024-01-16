import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { cart, priceSummary } from '../data-type';
import { ProductService } from '../product.service';
import { Location } from '@angular/common';
import { environment } from 'src/environment';
import { faCartShopping } from '@fortawesome/free-solid-svg-icons';
import { NGXLogger } from 'ngx-logger';

@Component({
  selector: 'app-cart-page',
  templateUrl: './cart-page.component.html',
  styleUrls: ['./cart-page.component.css']
})
export class CartPageComponent implements OnInit {
  cartData!: cart[];
icon = faCartShopping;
  priceSummary: priceSummary = {
    price:environment.price,
    discount:environment.discount,

    delivery: environment.delivery,
    total: environment.total
  }
  paymentAmount: number | undefined;
  cartId:number|undefined;
  constructor(private product: ProductService, private router: Router,private location:Location,private logger:NGXLogger) { }

  ngOnInit(): void {
   this.loadDetails()

  }

  removeToCart(cartId:number|undefined){
    cartId && this.cartData && this.product.removeToCart(cartId)
    .subscribe((result:any)=>{
      this.loadDetails();
      this.logger.error(`Item removed from cart. Cart ID: ${cartId}`);
    })
  }

  loadDetails(){
    this.product.currentCart().subscribe((result:any) => {
      this.cartData = result;
      this.cartId=result.Id
      let price = environment.price;
      let discount=environment.discount;
      const productNames:string[]=[];
      result.forEach((item:any) => {
        this.logger.error(item);
        if (item.quantity) {
          price = price + (+item.price * +item.quantity);
          discount = discount + (item.price * item.discount) / 100;
          productNames.push(item.name);
        }
      })
      this.priceSummary.price = price;
      this.priceSummary.discount = discount;
      this.priceSummary.delivery = environment.shipping;
      this.priceSummary.total = price + environment.shipping - discount;
      if(productNames.length>0)
      {
        this.logger.error(`Product added to cart:${productNames.join(',')}`);
      }
    })

  }

  checkout() {
    localStorage.setItem('totalAmount',String(this.priceSummary.total));
      this.router.navigate(['/payment']);
  }
  goBack()
    {
      this.location.back();
    }
  }
