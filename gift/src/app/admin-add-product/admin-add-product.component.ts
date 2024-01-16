import { Component, OnInit } from '@angular/core';
import { product } from '../data-type';
import { ProductService } from '../product.service';
import { FormGroup } from '@angular/forms';
import { Location } from '@angular/common';
import { NGXLogger } from 'ngx-logger';

@Component({
  selector: 'app-admin-add-product',
  templateUrl: './admin-add-product.component.html',
  styleUrls: ['./admin-add-product.component.css']
})
export class AdminAddProductComponent implements OnInit {
  public addProduct!: FormGroup;
  addProductMessage: string | undefined;
  successMessage:string|undefined;
  constructor(private product: ProductService, private location: Location, private logger: NGXLogger) {}

  ngOnInit(): void {}

  submit(data: product) {
    this.product.addProduct(data).subscribe((result: any) => {
      if (result) {
        const productName = data.name;
        this.addProductMessage="Product is Added Successfully"
        this.successMessage = `Product ${productName} is added successfully`;
        this.logger.error(`Product Add-${this.successMessage}`);
        this.addProduct.reset();
      } else {
        this.logger.error("Error in adding the product");
      }
    });

    setTimeout(() => {
      this.addProductMessage = undefined;
    }, 3000);
  }

  goBack() {
    this.location.back();
  }
}
