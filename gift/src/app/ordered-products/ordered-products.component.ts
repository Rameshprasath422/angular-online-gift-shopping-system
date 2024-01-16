import { Component } from '@angular/core';
import { order } from '../data-type';
import { ProductService } from '../product.service';
import{OnInit}from '@angular/core';
import{NGXLogger} from 'ngx-logger';
@Component({
  selector: 'app-ordered-products',
  templateUrl: './ordered-products.component.html',
  styleUrls: ['./ordered-products.component.css']
})
export class OrderedProductsComponent implements OnInit{
  orderData: order[] | undefined;

  constructor(private product: ProductService,private logger:NGXLogger) {}

  ngOnInit(): void {
    this.getOrderList();
  }

  getOrderList() {
    this.product.allOrderList().subscribe((result) => {
      this.orderData = result;
    });
  }

}


