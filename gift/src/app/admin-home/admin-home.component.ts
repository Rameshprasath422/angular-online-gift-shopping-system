import { Component, OnInit } from '@angular/core';
import { product } from '../data-type';
import { ProductService } from '../product.service';
import { NGXLogger } from 'ngx-logger';

@Component({
  selector: 'app-admin-home',
  templateUrl: './admin-home.component.html',
  styleUrls: ['./admin-home.component.css']
})
export class AdminHomeComponent implements OnInit {
  productList: undefined | product[];
  productMessage: undefined | string;
  deletedProductName: string | undefined;
  successMessage:string|undefined;
  constructor(private product: ProductService, private logger: NGXLogger) {}

  ngOnInit(): void {
    this.list();
  }

  deleteProduct(id: number, name: string) {
    this.product.deleteProduct(id).subscribe((result: any) => {
      if (result) {
        this.productMessage="Product is deleted"
        this.successMessage = `Product ${name} is Deleted Successfully`;
        this.deletedProductName = name;
        this.logger.error(`Product Delete - ${this.successMessage}`);
        this.list();
      } else {
        this.logger.error('Product Delete - Error in deleting the product');
      }
    });
    setTimeout(() => {
      this.productMessage = undefined;
      this.deletedProductName = undefined;
    }, 3000);
  }

  list() {
    this.product.productList().subscribe((result: any) => {
      if (result) {
        this.productList = result;
      }
    });
  }
}
