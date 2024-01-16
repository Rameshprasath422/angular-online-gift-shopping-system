import { Component, OnInit } from '@angular/core';
import { product } from '../data-type';
import { ProductService } from '../product.service';
import { environment } from 'src/environment';
import{Router} from '@angular/router';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
 trendyProducts:undefined | product[];
 constantDiscountPrice: number | undefined;
  constructor(private product:ProductService,private router:Router) {}

  ngOnInit(): void {
    this.product.trendyProducts().subscribe((data)=>{
      this.trendyProducts=data.map((a) => Object.assign(a, {discount: this.getDiscount()}));
    })
  }
  getDiscount()
  {
    let currTime=new Date().getHours();
    if(currTime>=0&&currTime<6)
    {
      this.constantDiscountPrice=environment.constantDiscount1
    }
    else if(currTime>=6&&currTime<12)
    {
       this.constantDiscountPrice=environment.constantDiscount2
    }
    else if(currTime>=12&&currTime<18)
    {
      this.constantDiscountPrice=environment.constantDiscount3
    }
    else{
       this.constantDiscountPrice=environment.constantDiscount4
    }
    return this.constantDiscountPrice;
  }

  openViewDetails(item: any) {
    this.product.updateProduct(item).subscribe((result) => {
      if (result) {
        this.router.navigate(['/details/' + item.id]);
      }
    });
  }
  }



