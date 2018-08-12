import { Component, OnInit, Input } from '@angular/core';
import { baseURL } from '../shared/baseurl';
import { NgbRatingConfig } from '@ng-bootstrap/ng-bootstrap';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { PaymentComponent } from '../payment/payment.component';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {
@Input()
charity;

baseUrl = baseURL;
  constructor(config: NgbRatingConfig,
       private modalService: NgbModal,

 ) {
       config.max = 5; }

  ngOnInit() {
  }
  openVerticallyCentered() {
     const modalRef = this.modalService.open(PaymentComponent, { centered: true });
     modalRef.componentInstance.name = this.charity.name;
     modalRef.componentInstance.charityId = this.charity._id;
  }
}
