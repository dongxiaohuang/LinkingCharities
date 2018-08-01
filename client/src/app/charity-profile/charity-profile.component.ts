import { Component, OnInit } from '@angular/core';
import { AuthCharityService } from '../services/auth-charity.service';
import { baseURL } from '../shared/baseurl';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { onValueChanged, matchOtherValidator } from '../utils/helpers';
@Component({
  selector: 'app-charity-profile',
  templateUrl: './charity-profile.component.html',
  styleUrls: ['./charity-profile.component.scss']
})
export class CharityProfileComponent implements OnInit {
  baseUrl = baseURL;
  userForm: FormGroup;
  passwordForm: FormGroup;

  userFormErrors = {
    'firstname': '',
    'lastname': '',
    'country': ''
  };
  passwardFormErrors = {
    'password': '',
    'confirmPSW': '',
  };
  userFormValidationMsg = {
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
  passwordFormValidationMsg = {
    'password': {
      'required': 'Password is required.',
      'minlength': 'Password should have at least 6 characters.'
    },
    'confirmPSW': {
      'required': 'Please retype password.',
      'matchOther': 'Password is inconsistent.'
    },
  }


  constructor(private authCharityService:AuthCharityService,
 private fb: FormBuilder) { }
  profile;
  ngOnInit() {
       this.authCharityService.getProfile()
          .subscribe(
               profile =>
               this.profile =profile
          );
       this.onUserFormCreate();
       this.onPasswordFormCreate()
  }

  onUserFormCreate() {
       this.userForm = this.fb.group({
       firstname: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(25)]],
       lastname: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(25)]],
       country: ['', [Validators.required]],
       // profile: ['']
     });
     this.userForm.valueChanges.subscribe(data => onValueChanged(this.userFormErrors, this.userFormValidationMsg, data, this.userForm))
 }

 onPasswordFormCreate(){
      this.passwordForm = this.fb.group({
        password: ['', [Validators.required, Validators.minLength(6)]],
        confirmPSW: ['', [Validators.required, matchOtherValidator('password')]],
      });
      this.passwordForm.valueChanges.subscribe(data => onValueChanged(this.passwardFormErrors, this.passwordFormValidationMsg, data, this.passwordForm));
}

}
