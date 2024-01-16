import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from '../product.service';
import { NGXLogger } from 'ngx-logger';
import { product } from '../data-type';
import { environment } from 'src/environment';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  menuType: string = 'default';
  sellerName: string = '';
  userName: string = '';
  searchResult: undefined | product[];
  cartItems = 0;

  constructor(
    private route: Router,
    private product: ProductService,
    private logger: NGXLogger,
  ) {}

  ngOnInit(): void {
    const storedMenuType = localStorage.getItem('menuType');
    if (storedMenuType) {
      this.menuType = storedMenuType;
    }

    this.route.events.subscribe((val: any) => {
      if (val.url) {
        if (localStorage.getItem('seller') && (val.url.includes('admin') || val.url.includes('ordered-products'))) {
          let sellerStore = localStorage.getItem('seller');
          let sellerData = sellerStore && JSON.parse(sellerStore)[0];
          this.sellerName = sellerData.name;
          this.menuType = 'admin';
          localStorage.setItem('menuType', 'admin');
        } else if (localStorage.getItem('user')) {
          let userStore = localStorage.getItem('user');
          let userData = userStore && JSON.parse(userStore);
          this.userName = userData.name;
          this.menuType = 'user';
          this.product.getCartList(userData.id);
        } else {
          this.menuType = 'default';
          localStorage.setItem('menuType', 'default');
        }
      }
    });

    const cartData = localStorage.getItem('localCart');
    if (cartData) {
      this.cartItems = JSON.parse(cartData).length;
    }

    this.product.cartData.subscribe((items) => {
      this.cartItems = items.length;
    });
  }

  logout() {
    localStorage.removeItem('seller');
    localStorage.removeItem('menuType');
    this.route.navigate(['/']);
    this.logger.error('Admin Logout Successfully');
  }

  userLogout() {
    localStorage.removeItem('user');
    localStorage.removeItem('menuType');
    this.route.navigate(['/']);
    this.product.cartData.emit([]);
    this.logger.error('User Logout Successfully');
  }

  searchProduct(query: KeyboardEvent) {
    if (query) {
      const element = query.target as HTMLInputElement;
      this.product.searchProduct(element.value).subscribe((result: any) => {
        if (result.length > 10) {
          result.length = length;
        }
        this.searchResult = result;
      });
    }
  }

  hideSearch() {
    this.searchResult = undefined;
  }

  redirectToDetails(id: number) {
    this.route.navigate(['/details/' + id]);
  }

  submitSearch(val: string) {
    console.warn(val);
    this.route.navigate([`search/${val}`]);
  }
}
