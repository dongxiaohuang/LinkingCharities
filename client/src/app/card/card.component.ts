import { Component, OnInit, Input } from '@angular/core';
import { baseURL } from '../shared/baseurl';
import { NgbRatingConfig } from '@ng-bootstrap/ng-bootstrap';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { PaymentComponent } from '../payment/payment.component';
import { GetCharitiesService } from '../services/get-charities.service';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {
@Input()
charity;

ratingAmount;
avgRating;

baseUrl = baseURL;
  constructor(config: NgbRatingConfig,
       private modalService: NgbModal,
       private charityService: GetCharitiesService
 ) {
       config.max = 5; }

  ngOnInit() {
       this.charityService.getAverageRating(this.charity._id)
       .subscribe(res => {
         if (res) {
          this.avgRating = res.avgRating;
          this.ratingAmount = res.count;
         }
       })
  }
  openVerticallyCentered() {
     const modalRef = this.modalService.open(PaymentComponent, { centered: true });
     modalRef.componentInstance.name = this.charity.name;
     modalRef.componentInstance.charityId = this.charity._id;
  }
}
