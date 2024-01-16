
import { Component} from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { PaymentService } from '../payment.service';
import { Router } from '@angular/router';
import{Location}from '@angular/common';
import{NGXLogger} from 'ngx-logger';
@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent {
  paymentForm: FormGroup;
  priceSummary:any;
  totalAmount:number;
  orderMessage: string | undefined;
  paymentError: string | undefined;
  constructor(
    private formBuilder: FormBuilder,
    private paymentService: PaymentService,
    private router: Router,
    private location:Location,
    private logger:NGXLogger
  ) {
    this.paymentForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.pattern('[a-zA-Z ]*')]],
      number: ['', [Validators.required, Validators.pattern('[0-9]{16}')]],
      date: ['', [Validators.required]],
      cvv: ['', [Validators.required, Validators.pattern('[0-9]{4}')]]
    });
    this.totalAmount=Number(localStorage.getItem('totalAmount'));
  }

  onSubmit() {
    if (this.paymentForm.invalid) {
      return;
    }

    let paymentData = this.paymentForm.value;
    paymentData = Object.assign(paymentData, { amount: this.totalAmount });

    this.paymentService.storePayment(paymentData).subscribe((result) => {
      if (result) {
        this.orderMessage = "Payment is Done Successfully";
        this.logger.error('Payment stored successfully');

        setTimeout(() => {
          this.orderMessage = undefined;
          this.router.navigate(['/checkout']);
        }, 4000);
      } else {
        this.orderMessage = "Error in Storing Payment";
        this.paymentError = 'Error storing payment. Please try again.';
        this.logger.error('Error storing payment');

        setTimeout(() => {
          this.orderMessage = undefined;
        }, 4000);
      }
    });
  }




  goBack()
  {
    this.location.back();
  }
}
