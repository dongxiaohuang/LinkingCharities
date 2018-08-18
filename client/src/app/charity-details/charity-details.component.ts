import { Component, ElementRef, OnInit } from '@angular/core';
import { GetCharitiesService } from '../services/get-charities.service';
import { FavoriteService } from '../services/favorite.service';
import { Charity } from '../shared/charity';
import { Params, ActivatedRoute } from '@angular/router';
import { baseURL } from '../shared/baseurl';
import { NgbRatingConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { PaymentComponent } from '../payment/payment.component';
import { VolunteerService } from '../services/volunteer.service';
import { LoginComponent } from '../login/login.component';
import { mergeMap } from 'rxjs/operators';
// import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import {NgxPaginationModule} from 'ngx-pagination';
@Component({
  selector: 'app-charity-details',
  templateUrl: './charity-details.component.html',
  styleUrls: ['./charity-details.component.scss'],
  providers: [NgbRatingConfig], // add NgbRatingConfig to the component providers
})
export class CharityDetailsComponent implements OnInit {

  msg: string;
  postMsg: string = undefined;
  page: number = 0;
  totalAmount: number;
  totalNumber: number;
  perPage: number;
  charity: Charity;
  isLoggedIn;
  alertMsg: string = undefined;
  // currentRate: number = 4;
  baseUrl: string = baseURL;
  favorite: boolean;
  id: string;
  selected: number = 0;
  charityActivities;
  commentForm: FormGroup;
  ratingForm: FormGroup;
  hasRated: boolean = false;
  rating: number = 0;
  avgRating;
  ratingAmount = 0;
  formErrors = {
    'comment': ''
  };

  validationMsg = {
    'comment': { 'required': 'comment is needed!' }
  };

  constructor(private charityService: GetCharitiesService,
    private favoriteService: FavoriteService,
    private fb: FormBuilder,
    private modalService: NgbModal,
    private authService: AuthService,
    private route: ActivatedRoute,
    private element: ElementRef,
    private volunteerService: VolunteerService,
    config: NgbRatingConfig) {
    config.max = 5;
  }

  ngOnInit() {

    this.id = this.route.snapshot.params['id']; //'+' convert a string into interger value
    this.charityService.getCharity(this.id)
      .subscribe(charity => this.charity = charity);
    this.isLoggedIn = this.authService.isLoggedIn();
    if (this.isLoggedIn) {
      this.favoriteService.isFavorite(this.id)
        .subscribe(fav => {
          console.log(fav);
          this.favorite = fav.exists;
        });
      this.charityService.hasRate(this.id)
        .subscribe(res => {
          if (res.exists) {
            this.hasRated = true;
            this.rating = res.rating;
          }
        })
    }
    this.charityService.getAverageRating(this.id)
      .subscribe(res => {
        if (res) {
          this.avgRating = res.avgRating;
          this.ratingAmount = res.count;
        }
      })



    //initial commentFrom
    this.createForm();
    this.createRatingForm();
    this.getVolunteers(this.page);
  }

  createForm() {
    this.commentForm = this.fb.group({
      comment: ['', [Validators.required, Validators.min(1)]]
    });

    this.commentForm.valueChanges
      .subscribe(data => this.onValueChanged(data));

    this.onValueChanged(); // reset formErrors
  }
  createRatingForm() {
    this.ratingForm = this.fb.group({
      rating: [5, [Validators.required, Validators.min(1)]]
    });

    this.commentForm.valueChanges
      .subscribe(data => this.onValueChanged(data));

    this.onValueChanged(); // reset formErrors
  }

  //
  onValueChanged(data?: any) {
    if (!this.commentForm) return;
    const form = this.commentForm;
    for (const field in this.formErrors) {
      this.formErrors[field] = '';
      const control = form.get(field);
      if (control && control.dirty && !control.valid) {
        const message = this.validationMsg[field];
        for (const key in control.errors) {
          this.formErrors[field] += message[key] + ' ';
        }
      }
    }
  }
  toggleFavorite() {
    this.isLoggedIn = this.authService.isLoggedIn();
    if (this.isLoggedIn) {
      if (this.favorite) {
        this.favoriteService.deleteFavorite(this.id)
          .subscribe(resp => {
            console.log(resp);
            this.favorite = false;
          }, err => console.log(err));
      } else {
        this.favoriteService.postFavorite(this.id)
          .subscribe(resp => {
            console.log(resp);
            this.favorite = true;
          }, err => console.log(err));
      }
    } else {
      const modalRef = this.modalService.open(LoginComponent, { centered: true });
    }
  }
  onSubmit() {
    // this.charityService.postComment(this.id,)
    // console.log(this.commentForm.value);
    this.charityService.postComment(this.id, this.commentForm.value)
      .subscribe(comments => {
        this.charity.comments = comments;
        this.postMsg = "Post Comment Successful";
        // console.log(this.postMsg);
      },
        err => {
          console.log(err);
          this.postMsg = "Post Comment Failed"
        });
    this.commentForm.reset({
      comment: ''
    });
  }

  openVerticallyCentered() {
    const modalRef = this.modalService.open(PaymentComponent, { centered: true });
    modalRef.componentInstance.name = this.charity.name;
    modalRef.componentInstance.charityId = this.charity._id;
  }


  getVolunteers(page: number) {
    this.volunteerService.getVolunteerForCharity(this.id, page)
      .subscribe(res => {
        if (res.success) {
          this.charityActivities = res.volunteers;
          this.perPage = res.numberPerPage,
            this.totalNumber = res.totalNumber,
            this.totalAmount = res.totalNumber;
        }
      })
  }
  get lower() {
    return 1 + (this.page - 1) * this.perPage;
  }
  get upper() {
    return Math.min(this.totalNumber, (this.page + 1) * this.perPage);
  }
  onRatingSubmit() {
    this.isLoggedIn = this.authService.isLoggedIn();
    if (this.isLoggedIn) {

      this.charityService.postRating(this.id, this.ratingForm.value)
        .pipe(
          mergeMap(res => {
            this.hasRated = true;
            this.rating = res.result.rating;
            if(res.exists)
            {this.msg = "Please do not submit twice"}
            return this.charityService.getAverageRating(this.id)
          })
        )
        .subscribe(res => {
          if (res) {
            this.avgRating = res.avgRating;
            this.ratingAmount = res.count;
          }
        })
    } else {
      const modalRef = this.modalService.open(LoginComponent, { centered: true });
    }
  }
}
