import { Component, OnInit } from '@angular/core';
import { GetCharitiesService } from '../services/get-charities.service';
import { FavoriteService } from '../services/favorite.service';
import { Charity } from '../shared/charity';
import { Params, ActivatedRoute } from '@angular/router';
import { baseURL } from '../shared/baseurl';
import { NgbRatingConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { PaymentComponent } from '../payment/payment.component';
@Component({
  selector: 'app-charity-details',
  templateUrl: './charity-details.component.html',
  styleUrls: ['./charity-details.component.scss'],
  providers: [NgbRatingConfig] // add NgbRatingConfig to the component providers
})
export class CharityDetailsComponent implements OnInit {

  charity: Charity;
  isLoggedIn;
  alertMsg: string= undefined;
  // currentRate: number = 4;
  baseUrl: string = baseURL;
  favorite: boolean;
  id: string;
  selected: number = 0;
  commentForm: FormGroup;
  formErrors = {
    'rating': '',
    'comment': ''
  };

  validationMsg = {
    'rating': { 'min': 'rating is needed!' },
      'comment': { 'required': 'comment is needed!' }
  };

  constructor(private charityService: GetCharitiesService,
    private favoriteService: FavoriteService,
    private fb: FormBuilder,
    private modalService: NgbModal,
    private authService: AuthService,
    private route: ActivatedRoute,
    config: NgbRatingConfig) {
    config.max = 5;
  }

  ngOnInit() {
    this.id = this.route.snapshot.params['id']; //'+' convert a string into interger value
    this.charityService.getCharity(this.id)
      .subscribe(charity => this.charity = charity);
    this.isLoggedIn = this.authService.isLoggedIn();
    if(this.isLoggedIn){
         this.favoriteService.isFavorite(this.id)
         .subscribe(fav => {
              console.log(fav);
              this.favorite = fav.exists;
         });
    }



    //initial commentFrom
    this.createForm();
  }

  createForm() {
    this.commentForm = this.fb.group({
      rating: 5,
      comment: ['', [Validators.required, Validators.min(1)]]
    });

    this.commentForm.valueChanges
      .subscribe(data => this.onValueChanged(data));

    this.onValueChanged(); // reset formErrors
  }

  //
  onValueChanged(data?:any){
       if(!this.commentForm) return;
       const form = this.commentForm;
       for(const field in this.formErrors){
            this.formErrors[field] = '';
            const control = form.get(field);
            if(control && control.dirty && !control.valid){
                 const message = this.validationMsg[field];
                 for(const key in control.errors){
                      this.formErrors[field] += message[key] + ' ';
                 }
            }
       }
 }
  toggleFavorite() {
       if(this.isLoggedIn){
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
       }else{
            this.alertMsg = "Please log in as a user!"
       }
  }
  onSubmit() {
    // this.charityService.postComment(this.id,)
    console.log(this.commentForm.value);
    this.charityService.postComment(this.id, this.commentForm.value)
     .subscribe(comments => {this.charity.comments = comments},
          err => console.log(err));
    this.commentForm.reset({
     rating: 5,
     comment: ''
   });
  }

  openVerticallyCentered() {
     const modalRef = this.modalService.open(PaymentComponent);
     modalRef.componentInstance.name = this.charity.name;
     modalRef.componentInstance.charityId = this.charity._id;
  }
}
