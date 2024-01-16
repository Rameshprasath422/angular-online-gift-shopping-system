import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { product } from '../data-type';
import { ProductService } from '../product.service';
import { NGXLogger } from 'ngx-logger';
import { Location } from '@angular/common';

@Component({
  selector: 'app-admin-update-product',
  templateUrl: './admin-update-product.component.html',
  styleUrls: ['./admin-update-product.component.css']
})
export class AdminUpdateProductComponent implements OnInit {
  productData: product | undefined;
  productMessage: string | undefined;
  updateMessage:string|undefined;
  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private logger: NGXLogger,
    private location: Location
  ) {}

  ngOnInit(): void {
    const productId = this.route.snapshot.paramMap.get('id');
    if (productId) {
      this.productService.getProduct(productId).subscribe((data: product) => {
        this.productData = data;
      });
    }
  }

  submit(data: product) {
    if (this.productData) {
      data.id = this.productData.id;
      const productName = this.productData.name;
      this.productService.updateProduct(data).subscribe((result: any) => {
        if (result) {
          this.productMessage="Product Updated Successfully";
          this.updateMessage = `Product ${productName} has been updated successfully`;
          this.logger.error(`Product Update - ${this.updateMessage}`);
        } else {
          this.logger.error(`Product Update - ${productName} - Error in updating product`);
        }
      });

      setTimeout(() => {
        this.productMessage = undefined;
      }, 3000);
    }
  }

  goBack() {
    this.location.back();
  }
}
