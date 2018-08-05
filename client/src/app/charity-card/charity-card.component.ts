import { Component, OnInit, Input } from '@angular/core';
import { Charity } from '../shared/charity';
import { baseURL } from '../shared/baseurl';
import { FavoriteService } from '../services/favorite.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import * as $ from 'jquery';
import { onValueChanged } from '../utils/helpers';
import { PaymentComponent } from '../payment/payment.component';


@Component({
  selector: 'app-charity-card',
  templateUrl: './charity-card.component.html',
  styleUrls: ['./charity-card.component.scss']
})
export class CharityCardComponent implements OnInit {
  @Input()
  charity: Charity;
  isLoggedIn;
  alertMsg: string = undefined;
  // amountForm: FormGroup;
  // amountErrors = {
  //   'amount': '',
  // };
  // amountValidMsg: {
  //   'amount': {
  //        'required': 'Donation amount is required.',
  //        'pattern': 'Please input valid amount',
  //        'min': 'You should donate at least 1 pound'}
  // }


  baseUrl = baseURL;
  isFavorite: boolean = false;
  constructor(private favoriteService: FavoriteService,
    private authService: AuthService,
    private modalService: NgbModal,
    private fb: FormBuilder,
    private router: Router) { }

  ngOnInit() {
    this.isLoggedIn = this.authService.isLoggedIn();
    if (this.isLoggedIn) {
      this.favoriteService.isFavorite(this.charity._id)
        .subscribe(fav => {
          console.log(fav);
          this.isFavorite = fav.exists;
        });
   };

    // this.amountForm = this.fb.group({
    //   amount: ['', [Validators.required,
    //         Validators.min(1),
    //         Validators.pattern]]
    // })
    // this.amountForm.valueChanges.subscribe(data => onValueChanged(this.amountErrors, this.amountValidMsg, data, this.amountForm))
  }
  display(classId: string) { $('.' + classId).slideToggle('slow'); }
  getUrl(img): string {
    return "url(" + this.baseUrl + img + ") center/cover no-repeat";
  }

  toggleFavorite() {
    if (this.isLoggedIn) {
      if (this.isFavorite) {
        this.favoriteService.deleteFavorite(this.charity._id)
          .subscribe(resp => {
            console.log(resp);
            this.isFavorite = false;
          }, err => console.log(err));
      } else {
        this.favoriteService.postFavorite(this.charity._id)
          .subscribe(resp => {
            console.log(resp);
            this.isFavorite = true;
          }, err => console.log(err));
      }
    } else {
      this.alertMsg = "Please log in as a user!"
    }
  }
  openVerticallyCentered() {
     const modalRef = this.modalService.open(PaymentComponent);
     modalRef.componentInstance.name = this.charity.name;
     modalRef.componentInstance.charityId = this.charity._id;
  }

}
