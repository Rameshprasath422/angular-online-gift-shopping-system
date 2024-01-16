import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { cart, order, product } from './data-type';
import{environment} from 'src/environment';
@Injectable({
  providedIn: 'root',
})
export class ProductService {
  getAllOrders: any;
  updateOrderStatus: any;
  deleteOrder: any;
  cartData = new EventEmitter<product[] | []>();
  getOrderList: any;
  constructor(private http: HttpClient) { }
  addProduct(data: product) {
    return this.http.post(environment.JSONServerUrl + 'products', data);
  }
  productList() {
    return this.http.get<product[]>(environment.JSONServerUrl + 'products');
  }

  deleteProduct(id: number) {
    return this.http.delete(environment.JSONServerUrl + `products/${id}`);
  }

  getProduct(id: string) {
    return this.http.get<product>(environment.JSONServerUrl + `products/${id}`);
  }

  updateProduct(product: product) {
    return this.http.put<product>(
      environment.JSONServerUrl + `products/${product.id}`,
      product
    );
  }
  trendyProducts() {
    return this.http.get<product[]>(environment.JSONServerUrl + 'products?_limit=30');
  }

  searchProduct(query: string) {
    return this.http.get<product[]>(
      environment.JSONServerUrl + `products?q=${query}`
    );
  }

  localAddToCart(data: product) {
    let cartData = [];
    let localCart = localStorage.getItem('localCart');
    if (!localCart) {
      localStorage.setItem('localCart', JSON.stringify([data]));
      this.cartData.emit([data]);
    } else {
      cartData = JSON.parse(localCart);
      cartData.push(data);
      localStorage.setItem('localCart', JSON.stringify(cartData));
      this.cartData.emit(cartData);
    }
  }

  removeItemFromCart(productId: number) {
    let cartData = localStorage.getItem('localCart');
    if (cartData) {
      let items: product[] = JSON.parse(cartData);
      items = items.filter((item: product) => productId !== item.id);
      localStorage.setItem('localCart', JSON.stringify(items));
      this.cartData.emit(items);
    }
  }

  addToCart(cartData: cart) {
    return this.http.post(environment.JSONServerUrl + 'cart', cartData);
  }
  updateCartList(cartId:any,cartData:any)
  {
    this.http.patch(environment.JSONServerUrl + 'cart/'+cartId,cartData).subscribe(result=>console.log(result));
  }
  getCartList(userId: number) {
    return this.http
      .get<product[]>(environment.JSONServerUrl + 'cart?userId=' + userId, {
        observe: 'response',
      })
      .subscribe((result) => {
        if (result && result.body) {
          this.cartData.emit(result.body);
        }
      });
  }
  removeToCart(cartId: number) {
    return this.http.delete(environment.JSONServerUrl + 'cart/' + cartId);
  }
  currentCart() {
    let userStore = localStorage.getItem('user');
    let userData = userStore && JSON.parse(userStore);
    return this.http.get<cart[]>(environment.JSONServerUrl + 'cart?userId=' + userData.id);
  }

  orderNow(data: order) {
    return this.http.post(environment.JSONServerUrl + 'orders', data);
  }
  allOrderList() {
    return this.http.get<order[]>(environment.JSONServerUrl + 'orders');
  }
  getOrderByOderID(orderId: number){
    return this.http.get<order[]>(environment.JSONServerUrl + 'orders/' + orderId);
  }
  orderList() {
    let userStore = localStorage.getItem('user');
    let userData = userStore && JSON.parse(userStore);
    return this.http.get<order[]>(environment.JSONServerUrl + 'orders?userId=' + userData.id);
  }

  deleteCartItems(cartId: number) {
    return this.http.delete(environment.JSONServerUrl + 'cart/' + cartId).subscribe((result) => {
      this.cartData.emit([]);
    })
  }

  cancelOrder(orderId:number){
    return this.http.delete(environment.JSONServerUrl + 'orders/'+orderId);
  }


}
