import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SellerService } from '../seller.service';
import { signUp } from '../data-type';
import{NGXLogger} from 'ngx-logger';
@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  userData: signUp = {
    email: '',
    password: '',
    name: ''
  };
  showLogin = false;
  message: string = '';

  constructor(private seller: SellerService, private router: Router,private logger:NGXLogger) {}

  ngOnInit(): void {
    this.seller.reloadSeller();
  }

  login(): void {
    this.seller.userLogin(this.userData);
    this.seller.isLoginError.subscribe((isError) => {
      if (isError) {
        this.message = 'Invalid Login Credentials';
        this.logger.error("Admin Login"+':'+this.message);
      } else {
        this.message= 'Login Success';
        this.logger.error("Admin Login"+':'+this.message);
        this.router.navigate(['admin-home']);
      }
    });
  }

  openLogin() {
    this.showLogin = true;
  }
}
