import { EventEmitter, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { login } from './data-type';
import { environment } from 'src/environment';

@Injectable({
  providedIn: 'root'
})
export class SellerService {
  isSellerLoggedIn: any;
  isLoginError = new EventEmitter<boolean>(false);

  constructor(private http: HttpClient, private router: Router) { }

  reloadSeller() {
    if (localStorage.getItem('seller')) {
      this.isSellerLoggedIn.next(true);
      this.router.navigate(['admin-home']);
    }
  }

  userLogin(data: login) {
    this.http.get(environment.JSONServerUrl + `admin?email=${data.email}&password=${data.password}`,
      { observe: 'response' }).subscribe((result: any) => {
        if (result && result.body && result.body.length === 1) {
          this.isLoginError.emit(false);
          localStorage.setItem('seller', JSON.stringify(result.body));
          this.router.navigate(['admin-home']);
        } else {
          this.isLoginError.emit(true);
        }
      });
  }
}
