import { EventEmitter, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { login, signUp } from './data-type';
import { environment } from 'src/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  validatingUserLogin = new EventEmitter<boolean>(false);
  isUserLoggedIn: any;

  constructor(private http: HttpClient, private router: Router) { }

  userSignUp(user: signUp) {
    this.http.post(environment.JSONServerUrl + 'users', user, { observe: 'response' })
      .subscribe((result) => {
        if (result) {
          localStorage.setItem('user', JSON.stringify(result.body));
          this.router.navigate(['/']);
        }
      });
  }

  userLogin(data: login) {
    this.http.get<signUp[]>(environment.JSONServerUrl + `users?email=${data.email}&password=${data.password}`,
      { observe: 'response' }).subscribe((result) => {
        if (result && result.body?.length) {
          localStorage.setItem('user', JSON.stringify(result.body[0]));
          this.router.navigate(['/']);
          this.validatingUserLogin.emit(false);
        } else {
          this.validatingUserLogin.emit(true);
        }
      });
  }

  userReload() {
    if (localStorage.getItem('user')) {
      this.router.navigate(['/']);
    }
  }
}
