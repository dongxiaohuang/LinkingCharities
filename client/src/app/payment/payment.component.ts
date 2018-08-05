import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { environment } from '../../environments/environment';
import { baseURL } from '../shared/baseurl';
import { HttpClient } from '@angular/common/http';
import { Input } from '@angular/core';
import { onValueChanged } from '../utils/helpers';
import {NgbModal, NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss']
})
export class PaymentComponent implements OnInit {
     @Input()
     name:string
     @Input()
     charityId:string
  amount;
  able;
  amountForm: FormGroup;

  amountFormErrors = {
       'amount':''
 }
 amountFormValidationMsg = {
      'amount': {
           'required': 'Donation amount is required.',
           'pattern': 'Please input valid amount',
           'min': 'You should donate at least 1 pound'
      }
}
  handler: any;
  constructor(private http: HttpClient,
       private fb: FormBuilder,
       public activeModal: NgbActiveModal
 ) { }
  ngOnInit(): void {
    this.handler = StripeCheckout.configure({
      key: environment.stripeKey,
      image: 'assets/img/logo-charity.png',
      locale: 'auto',
      token: async stripeToken => {
        this.http.post(baseURL +'payment',{
             "amount": this.amountForm.value.amount,
             "stripeToken":stripeToken,
             "charity":this.charityId,
             "message":this.amountForm.value.message
        })
        .subscribe(res => {
             this.activeModal.dismiss('Cross click');
             if(res['success']){ console.log("success")}
             else{ console.log("stripe failed")}
        })
      },
    });
    this.onAmountFormCreate();
  }

  checkout() {
    try {

        this.handler.open({
          name: this.name,
          description: 'Checkout Donation Payment',
          amount: this.amountForm.value.amount*100,
          currency: 'gbp',
          closed: () => {
          },
        });

    } catch (error) {
      // this.data.error(error);
    }
  }

  onAmountFormCreate(){
       this.amountForm = this.fb.group({
       amount: ['', [Validators.required,
              Validators.min(1),
              Validators.pattern]],
       message:['']
     })
     this.amountForm.valueChanges.subscribe(data => onValueChanged(this.amountFormErrors, this.amountFormValidationMsg, data, this.amountForm))
 }
 // dismiss() {
      // const modalRef = this.modalService.open(PaymentComponent, { centered: true });
      // modalRef.dismiss();
// }
}
