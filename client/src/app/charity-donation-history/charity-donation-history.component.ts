import { Component, OnInit } from '@angular/core';
import { PaymentService } from '../services/payment.service';
@Component({
  selector: 'app-charity-donation-history',
  templateUrl: './charity-donation-history.component.html',
  styleUrls: ['./charity-donation-history.component.scss']
})
export class CharityDonationHistoryComponent implements OnInit {

  totalNumber: number;
  page: number = 1;
  perPage: number;
  totalPage: number;
  donations: any;
  totalAmount: number;
  constructor(private paymentService: PaymentService) { }

  ngOnInit() {
    this.getDonations(this.page-1)
  }
  getDonations(page) {
    this.paymentService.getCharityDonations(page)
      .subscribe(
        donations => {
          this.donations = donations;
          this.totalPage = donations.pages;
          this.perPage = donations.numberPerPage,
          this.totalNumber = donations.totalNumber,
          this.totalAmount = donations.totalDonations[0].totalamount
        }
      )
  }
  get lower() {
    return 1 + (this.page - 1) * this.perPage;
  }
  get upper() {
    return Math.min(this.totalNumber, this.page * this.perPage);
  }

}
