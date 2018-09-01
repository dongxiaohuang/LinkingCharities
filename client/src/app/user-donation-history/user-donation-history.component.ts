import { Component, OnInit } from '@angular/core';
import { PaymentService } from '../services/payment.service';
@Component({
  selector: 'app-user-donation-history',
  templateUrl: './user-donation-history.component.html',
  styleUrls: ['./user-donation-history.component.scss']
})
export class UserDonationHistoryComponent implements OnInit {
  totalAmount: any;
  totalPage: number;
  totalNumber: number;
  donations;
  perPage: number;
  page: number = 0;
  constructor(private paymentService: PaymentService) { }

  ngOnInit() {
    this.getDonations(this.page)
  }

  getDonations(page) {
    this.paymentService.getDonorDonations(page)
      .subscribe(donations => {
        this.donations = donations;
        this.totalPage = donations.pages;
        this.perPage = donations.numberPerPage,
        this.totalNumber = donations.totalNumber,
        this.totalAmount = donations.totalDonations[0].totalamount;
      })
  }
  get lower() {
    return 1 + (this.page - 1) * this.perPage;
  }
  get upper() {
    return Math.min(this.totalNumber, this.page * this.perPage);
  }

}
