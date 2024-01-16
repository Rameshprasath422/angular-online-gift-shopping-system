import { Component, OnInit } from '@angular/core';
import { order } from '../data-type';
import { ProductService } from '../product.service';
import { environment } from 'src/environment';
import { NGXLogger } from 'ngx-logger';
import { OrderService } from '../order.service';
@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.css']
})
export class MyOrdersComponent implements OnInit {
  cartData: any;
  orderData: order[] | any | undefined;
  amount: number | undefined;

  constructor(private product: ProductService, private orderService: OrderService, private logger: NGXLogger) {}

  ngOnInit(): void {
    this.getOrderList();
  }

  cancelOrder(orderId: number | undefined, items: any) {
    orderId &&
      this.product.getOrderByOderID(orderId).subscribe((result: any) => {
        if (result) {
          this.getOrderList();
          const currentUserOrderItems = result.orderedProducts.map((product: any) => product.name);
          this.logger.error(`Ordered Product Name: ${currentUserOrderItems.join(', ')}`);
          const currentTime = new Date().getTime();
          const orderedTime = new Date(result.orderOn).getTime();
          const cancellationTime = (currentTime - orderedTime) / (1000 * 60);
          console.log(`'currentTime:', ${currentTime}`);
          console.log(`'ordered time:', ${orderedTime}`);
          console.log(`'cancellation time:',${cancellationTime}`);
          this.product.cancelOrder(orderId).subscribe((result: any) => {});

          if (cancellationTime <= 5) {
            alert('Order Cancelled Successfully Full amount refunded');
            this.logger.error('Order Cancelled Successfully Full amount refunded');
          } else {
            const refundAmount = items * environment.refund;
            alert(`Refund Amount: ${refundAmount}`);
            alert('Order Cancelled Successfully half amount refunded');
            this.logger.error('Order Cancelled Successfully half amount refunded');
          }
          window.location.reload();
        }
      });
  }

  getOrderList() {
    this.product.orderList().subscribe((result: any) => {
      this.orderData = result;
    });
  }
}
