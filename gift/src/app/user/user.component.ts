import { Component, OnInit } from '@angular/core';
import { cart, login, product, signUp } from '../data-type';
import { ProductService } from '../product.service';
import { UserService } from '../user.service';
import { NGXLogger } from 'ngx-logger';
import { environment } from 'src/environment';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
})
export class UserComponent implements OnInit {
  userData: any = {
    name: '',
    email: '',
    password: '',
    id: ''
  };
  showLogin: boolean = true;
  message: string = '';
  loggedInSuccessfully: boolean = false;

  constructor(
    private user: UserService,
    private product: ProductService,
    private logger: NGXLogger
  ) {}

  ngOnInit(): void {
    this.user.userReload();
  }

  signUp(data: signUp) {
    this.user.userSignUp(data);
    this.logger.error('User Signup - User Registered Successfully');
  }

  login(data: login) {
    this.user.userLogin(data);
    this.user.validatingUserLogin.subscribe((result: any) => {
      if (result) {
        this.message = 'User not found';
        this.logger.error('User Login - ' + this.message);
      } else if (!this.loggedInSuccessfully) {
        let user=localStorage.getItem('user');
        let userId=user&&JSON.parse(user).id;
        this.logger.error('User: '+userId+'-Login Success');
        this.loggedInSuccessfully = true;
        this.localCartToRemoteCart();
      }
    });
  }

  openSignUp() {
    this.showLogin = false;
  }

  openLogin() {
    this.showLogin = true;
  }

  localCartToRemoteCart() {
    let data = localStorage.getItem('localCart');
    let user = localStorage.getItem('user');
    let userId = user && JSON.parse(user).id;
    if (data) {
      let cartDataList: product[] = JSON.parse(data);

      cartDataList.forEach((product: product, index) => {
        let cartData: cart = {
          productId: product.id,
          userId: userId,
          name: product.name,
          price: product.price,
          category: product.category,
          color: product.color,
          image: product.image,
          description: product.description,
          quantity:environment.quantity,
          discount: environment.discount,
          id: undefined
        };

        setTimeout(() => {
          this.product.addToCart(cartData).subscribe((result: any) => {
            if (result) {
              this.logger.error('Data is stored in Database Successfully - User ID: ' + this.userData.id);
            }
          });
        }, 500);

        if (cartDataList.length === index + 1) {
          localStorage.removeItem('localCart');
        }
      });
    }

    setTimeout(() => {
      this.product.getCartList(userId);
    }, 2000);
  }
}
