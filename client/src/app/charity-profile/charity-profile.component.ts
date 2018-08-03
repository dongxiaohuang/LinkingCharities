import { Component, OnInit } from '@angular/core';
import { AuthCharityService } from '../services/auth-charity.service';
import { baseURL } from '../shared/baseurl';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { onValueChanged, matchOtherValidator } from '../utils/helpers';
import { Category } from '../shared/category';
import { CategoriesService } from '../services/categories.service';
import { Router } from '@angular/router';
import { Countries } from '../shared/countries';
import { mergeMap } from 'rxjs/operators';
import { GetCharitiesService } from '../services/get-charities.service';

@Component({
  selector: 'app-charity-profile',
  templateUrl: './charity-profile.component.html',
  styleUrls: ['./charity-profile.component.scss']
})
export class CharityProfileComponent implements OnInit {
  pswMsg: string;
  userMsg: string;
  baseUrl = baseURL;
  userForm: FormGroup;
  countries = Countries;
  paymentMsg: string = undefined;
  addrUpdataMsg: string = undefined;
  UpdateMsg: string = undefined;
  categories: Category[] = [];
  passwordForm: FormGroup;
  paymentDetailsForm: FormGroup;
  addressForm: FormGroup;
  fullAddressForm: FormGroup;
  charityDetailForm: FormGroup;
  dropdownList = [];
  dropdownSettings = {};

  userFormErrors = {
    'firstname': '',
    'lastname': '',
  };
  charityDetailErrors = {
    "rno": '',
    "name": '',
    "tel": '',
    "web": "",
    "email": "",
    "categories": '',
    "info": "",
    "details": "",

  }
  addressErrors = {
    'line1': '',
  };
  fullAddressErrors = {
    'line1': '',
    "city": "",
    "postcode": "",
    "country": ""
  };
  paymentDetailsErros = {
    'name': '',
    'number': '',
    'sortcode': '',
    'account_no': ''
  }
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
  CharityDetailValidaMsg = {
    "rno": {
      'pattern': 'Register number should be digits'
    },
    "name": {
      'required': 'Charity name is required.'
    },
    "tel": {
      'required': 'Charity telephone number is required.',
      'pattern': 'Telephone number should be digits'
    },
    "web": {
      'pattern': 'website is not valid, please start with http(s)://www'
    },
    "email": {
      'required': 'Email is required.',
      'email': 'email not in valid format.'
    },
    "categories": {
      'required': 'Category is required.'
    },
    "info": {
      'required': 'Information is required.',
      'maxlength': 'Max length is 200'
    },
    "details": {
      'required': 'Detail is required.',
      'maxlength': 'Max length is 500'
    },

  }
  PaymentDetailsValidaMsg = {
    'name': {
      'required': 'Username is required.',
      'minlength': 'Username should have at least 6 characters.'
    },
    'number': {
      'required': 'Card number is required',
      'pattern': 'Card number should be consist of  digits'
    },
    'sortcode': {
      'required': 'Sort code is required',
      'pattern': 'Sort code should be consist of  digits'
    },
    'account_no': {
      'required': 'Account no is required',
      'pattern': 'Account no should be consist of  digits'
    }
  }
  addressValidaMsg = {
    'line1': {
      'required': 'Address is required.'
    }
  }
  fullAddressValidaMsg = {
    "city": {
      'required': 'City is required.'
    },
    "postcode": {
      'required': 'Postcode is required.'
    },
    "country": {
      'required': 'Country is required.'
    }
  }


  constructor(private authCharityService: AuthCharityService,
    private categoriesService: CategoriesService,
    private router: Router,
    private getCharityService: GetCharitiesService,
    private fb: FormBuilder) { }
  profile;
  ngOnInit() {
    if (!this.authCharityService.isLoggedIn()) {
      this.router.navigate(['/']);
    }
    this.categoriesService.getCategories()
      .subscribe(data => {
        if (data['success']) {
          this.categories = data.categories;
          // console.log('log categories', this.categories);
        } else {
          console.log('unsuccessful get categories');
        }
      }
      )

    this.authCharityService.getProfile()
      .pipe(
        mergeMap(profile => {
          this.profile = profile;
          this.dropdownSettings = {
            singleSelection: false,
            idField: '_id',
            textField: 'name',
            selectAllText: 'Select All',
            unSelectAllText: 'UnSelect All',
            itemsShowLimit: 5,
            allowSearchFilter: true
          };
          return this.onCharityDetailsFormCreate();
        })
      )
      .subscribe(
        data => onValueChanged(this.charityDetailErrors, this.CharityDetailValidaMsg, data, this.charityDetailForm)
      );

    this.onUserFormCreate();
    this.onPasswordFormCreate();
    this.onPaymentDetailsFormCreate();
    this.onAddressFormCreate();
    this.onFullAddressFormCreate();

  }

  onUserFormCreate() {
    this.userForm = this.fb.group({
      firstname: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(25)]],
      lastname: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(25)]],
    });
    this.userForm.valueChanges.subscribe(data => onValueChanged(this.userFormErrors, this.userFormValidationMsg, data, this.userForm))
  }

  onPasswordFormCreate() {
    this.passwordForm = this.fb.group({
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPSW: ['', [Validators.required, matchOtherValidator('password')]],
    });
    this.passwordForm.valueChanges.subscribe(data => onValueChanged(this.passwardFormErrors, this.passwordFormValidationMsg, data, this.passwordForm));
  }
  onAddressFormCreate() {
    this.addressForm = this.fb.group({
      line1: ['', Validators.required],
      line2: [''],
    });

    return this.addressForm.valueChanges.subscribe(data => onValueChanged(this.addressErrors, this.addressValidaMsg, data, this.addressForm));
  }
  onFullAddressFormCreate() {
    this.fullAddressForm = this.fb.group({
      address: [''],
      city: ['', [Validators.required]],
      state: [''],
      postcode: ['', [Validators.required]],
      country: ['', [Validators.required]]
    });

    return this.fullAddressForm.valueChanges.subscribe(data => onValueChanged(this.fullAddressErrors, this.fullAddressValidaMsg, data, this.fullAddressForm));
  }
  onCharityDetailsFormCreate() {
    this.charityDetailForm = this.fb.group({
      ccn: [this.profile.charity.ccn],
      rbody: [this.profile.charity.rbody],
      rno: [this.profile.charity.rno],
      name: [this.profile.charity.name, Validators.required],
      tel: [this.profile.charity.tel, [Validators.required]],
      web: [this.profile.charity.web, [Validators.pattern]],
      email: [this.profile.charity.email, [Validators.required, Validators.email]],
      categories: [this.profile.charity.categories, Validators.required],
      info: [this.profile.charity.info, [Validators.required, Validators.maxLength(200)]],
      details: [this.profile.charity.details, [Validators.required, Validators.maxLength(500)]],
    });
    return this.charityDetailForm.valueChanges;
  };
  onReset() {
    this.charityDetailForm = this.fb.group({
      ccn: [this.profile.charity.ccn],
      rbody: [this.profile.charity.rbody],
      rno: [this.profile.charity.rno],
      name: [this.profile.charity.name],
      tel: [this.profile.charity.tel],
      web: [this.profile.charity.web],
      email: [this.profile.charity.email],
      categories: [this.profile.charity.categories],
      info: [this.profile.charity.info],
      details: [this.profile.charity.details],
    });
  }

  onPaymentDetailsFormCreate() {
    this.paymentDetailsForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(25)]],
      number: ['', [Validators.required, Validators.pattern]],
      sortcode: ['', [Validators.required, Validators.pattern]],
      account_no: ['', [Validators.required, Validators.pattern]],
      paypal: ['']
    });

    this.paymentDetailsForm.valueChanges.subscribe(
      data => onValueChanged(this.paymentDetailsErros, this.PaymentDetailsValidaMsg, data, this.paymentDetailsForm)
    );
  };
  changeProfile(): any {
    this.authCharityService.changeProfile(this.userForm.value)
      .subscribe(res => {
        this.userMsg = 'Update profile successfully';
      }, err => this.userMsg = 'Update profile failed')
  }
  changePSW(): any {
    this.authCharityService.changePSW(this.passwordForm.value)
      .subscribe(res => {
        console.log(res)
        this.pswMsg = "Update passward successfully";
        this.authCharityService.logOut();
      }, err => this.pswMsg = "Update passward failed");
  }
  onCancel() {
    this.passwordForm.reset();
  }
  changePayment() {
    this.authCharityService.changePaymentDetail(this.profile.charity.card._id, this.paymentDetailsForm.value)
      .subscribe(res => {
        if (res.success) {
          this.paymentMsg = "Update Payment Details Successfully!";
        } else {
          this.paymentMsg = "Sorry, Update failed :( "
        }
      })
  }
  changeCharity() {
    this.authCharityService.changeCharity(this.profile.charity._id, this.charityDetailForm.value)
      .subscribe(res => {
        this.UpdateMsg = "Update Payment Details Successfully!";
      }, err => { this.UpdateMsg = "Update Payment Details Failed!"; })
  }
  changeAddress() {
    this.fullAddressForm.value.address = this.addressForm.value;
    console.log(this.fullAddressForm.value);
    this.authCharityService.changeCharity(this.profile.charity._id, this.fullAddressForm.value)
      .pipe(
        mergeMap(res => {
          let addr = this.addressForm.value.line1 + ', ' + this.addressForm.value.line2 + ', ' +
            this.fullAddressForm.value.postcode + ', ' +
            this.fullAddressForm.value.city + ', ' + this.fullAddressForm.value.state + ', ' +
            this.fullAddressForm.value.country;
          console.log('geoAddress', addr);
          return this.getCharityService.getGeocode(addr);
        }
        ),
        mergeMap(
          res => {
            return this.getCharityService.changeGeocoding(this.profile.charity._id, res)
          }
        )
      )
      .subscribe(
        res => {
          this.addrUpdataMsg = "Address Update Successfully"
        }, err => {
          this.addrUpdataMsg = "Address Update Failed"
        }
      )
  }
}
