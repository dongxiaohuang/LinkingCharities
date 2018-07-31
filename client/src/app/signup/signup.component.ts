import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl, ValidatorFn } from '@angular/forms';
import { User } from '../shared/user';
import { AuthService } from '../services/auth.service';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { matchOtherValidator } from '../utils/helpers';
import { Countries } from '../shared/countries';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  tab_pos = 'center';
  personalInfoForm: FormGroup;
  secondFormGroup: FormGroup;
  public countries = Countries;
  user: User;
  basicInfoErrors = {
       'username':'',
       'password':'',
       'confirmPSW':'',
       'firstname': '',
       'lastname': '',
       'country': ''
 }
 BasicInfoValidaMsg = {
      'username':{
           'required': 'Email is required.',
           'email': 'Email is not in valid format.'
      },
      'password':{
           'required': 'Password is required.',
           'minlength': 'Password should have at least 6 characters.'
      },
      'confirmPSW':{
           'required': 'Please retype password.',
           'matchOther': 'Password is inconsistent.'
      },
      'firstname': {
       'required': 'First Name is required.',
       'minlength': 'First Name must be at least 2 characters long.',
       'maxlength': 'First Name cannot be more than 25 characters.'
     },
     'lastname': {
       'required': 'Last Name is required.',
       'minlength': 'Last Name must be at least 2 characters long.',
       'maxlength': 'Last Name cannot be more than 25 characters.'
     },
     'contry': {
       'required': 'Country is required.',
     }
}

  constructor(private _formBuilder: FormBuilder,
     private modalService: NgbModal,
     private authService: AuthService,
     ) {

  }

  ngOnInit() {

    this.personalInfoForm = this._formBuilder.group({
      username: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPSW:['', [Validators.required, matchOtherValidator('password') ]],
      firstname: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(25)]],
      lastname: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(25)]],
      country: ['', [Validators.required]]
});

     this.personalInfoForm.valueChanges.subscribe(
          data => this.onValueChanged(this.basicInfoErrors, this.BasicInfoValidaMsg, data, this.personalInfoForm)
     );

    this.secondFormGroup = this._formBuilder.group({
      secondCtrl: ['', Validators.required]
    });
  }

  onValueChanged(errs, errMsg, data?:any, fg?:FormGroup ){
       if(!fg) return ;
       const form = fg;
       for(const field in errs){
            errs[field] = '';
            const control = fg.get(field);
            if(control && control.dirty && !control.valid){
                 const messages = errMsg[field];
                 for(const key in control.errors){
                      errs[field] += messages[key] + ' ';
                 }
            }
       }
 }
 onSubmit(content){
      console.log(this.personalInfoForm.value);
      // this.personalInfoForm.reset();
      this.authService.signUp(this.personalInfoForm.value)
          .subscribe(res => console.log("res from register", res),error => {
           console.log(error);
         });
      this.personalInfoForm.reset();
      this.modalService.open(content, { centered: true });
}


}
