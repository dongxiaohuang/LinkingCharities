import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CountryPickerService, ICountry } from 'ngx-country-picker';
import { ValidatorFn } from '@angular/forms';
import { FormControl } from '@angular/forms';
import { User } from '../shared/user';
import { AuthService } from '../services/auth.service';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  personalInfoForm: FormGroup;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  public countries: ICountry[] = [];
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
     protected countryPicker: CountryPickerService,
     private authService: AuthService) {

  }

  ngOnInit() {
    this.countryPicker.getCountries()
      .subscribe((countries: ICountry[]) => this.countries = countries);

    this.personalInfoForm = this._formBuilder.group({
      username: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPSW:['', [Validators.required, this.matchOtherValidator('password') ]],
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
 onSubmit(){
      console.log(this.personalInfoForm.value);
      // this.personalInfoForm.reset();
      this.authService.signUp(this.personalInfoForm.value)
          .subscribe(res => console.log("res from register", res),error => {
           console.log(error);
         });
}
  matchOtherValidator (otherControlName: string) {

   let thisControl: FormControl;
   let otherControl: FormControl;

   return function matchOtherValidate (control: FormControl) {

     if (!control.parent) {
       return null;
     }

     // Initializing the validator.
     if (!thisControl) {
       thisControl = control;
       otherControl = control.parent.get(otherControlName) as FormControl;
       if (!otherControl) {
         throw new Error('matchOtherValidator(): other control is not found in parent group');
       }
       otherControl.valueChanges.subscribe(() => {
         thisControl.updateValueAndValidity();
       });
     }

     if (!otherControl) {
       return null; //pass
     }

     if (otherControl.value !== thisControl.value) {
       return {
         matchOther: true //validator symbol
       };
     }

     return null;

   }
 }


}
