import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { CategoriesService } from '../services/categories.service';
import { Category } from '../shared/category';
import { AuthCharityService } from '../services/auth-charity.service'
import { mergeMap } from 'rxjs/operators';
import { CountryPickerService, ICountry } from 'ngx-country-picker';

@Component({
  selector: 'app-charity-register',
  templateUrl: './charity-register.component.html',
  styleUrls: ['./charity-register.component.scss']
})
export class CharityRegisterComponent implements OnInit {
  msg: any;
  categories: Category[] = [];
  charityDetailForm: FormGroup;
  addressForm: FormGroup;
  basicInfoForm: FormGroup;
  paymentDetailsForm: FormGroup;
  dropdownList = [];
  dropdownSettings = {};
  countries: ICountry[];
  addressErrors = {
    'line1': ''
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
    "city": "",
    "postcode": "",
    "country": ""
  }
  basicInfoErrors = {
    'username': '',
    'password': '',
    'confirmPSW': '',
    'firstname': '',
    'lastname': ''
  }

  paymentDetailsErros = {
    'name': '',
    'card': '',
    'sortcode': '',
    'account_no': ''
  }

  addressValidaMsg = {
    'line1': {
      'required': 'Address is required.'
    }
  }

  CharityDetailValidaMsg = {
    "rno": {
      'pattern': 'Register number should be digits'
    },
    "name": {
      'required': 'Charity name is required.'
    },
    "tel": {
      'required': 'Charity telephone number is required.'
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
  BasicInfoValidaMsg = {
    'username': {
      'required': 'Username is required.',
      'minlength': 'Username should have at least 6 characters.'
    },
    'password': {
      'required': 'Password is required.',
      'minlength': 'Password should have at least 6 characters.'
    },
    'confirmPSW': {
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
    }
  }
  PaymentDetailsValidaMsg = {
    'name': {
      'required': 'Username is required.',
      'minlength': 'Username should have at least 6 characters.'
    },
    'card': {
      'required': 'Card number is required'
    },
    'sortcode': {
      'required': 'Sort code is required'
    },
    'account_no': {
      'required': 'Account no is required'
    }
  }
  constructor(private _formBuilder: FormBuilder,
    private categoriesService: CategoriesService,
    protected countryPicker: CountryPickerService,
    private authCharityService: AuthCharityService) { }

  ngOnInit() {
    this.countryPicker.getCountries()
      .subscribe((countries: ICountry[]) => this.countries = countries);
    this.onAddressFormCreate();
    this.onBasicFormCreate();
    this.onCharityDetailsFormCreate();
    this.onPaymentDetailsFormCreate();
    this.categoriesService.getCategories()
      .subscribe(data => {
        if (data['success']) {
          this.categories = data.categories;
          // console.log('log categories', this.categories);
        } else {
          console.log('unsuccessful get categories');
        }
      })

    this.dropdownSettings = {
      singleSelection: false,
      idField: '_id',
      textField: 'name',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 5,
      allowSearchFilter: true
    };


  }
  //  onItemSelect (item:any) {
  //    console.log(item);
  //    console.log("selected: ", this.choosedCategories);
  //  }
  //  onDeSelect(item:any){
  //       console.log("detele",item);
  // }
  onAddressFormCreate() {
    this.addressForm = this._formBuilder.group({
      line1: ['', Validators.required],
      line2: [''],
    });
    this.addressForm.valueChanges.subscribe(
      data => this.onValueChanged(this.addressErrors, this.addressValidaMsg, this.addressForm)
    )
  }
  onCharityDetailsFormCreate() {
    this.charityDetailForm = this._formBuilder.group({
      ccn: [''],
      rbody: [''],
      rno: [''],
      name: ['', Validators.required],
      tel: ['', [Validators.required, Validators.pattern]],
      web: ['', [Validators.pattern]],
      email: ['', [Validators.required, Validators.email]],
      categories: [Category, Validators.required],
      info: ['', [Validators.required, Validators.maxLength(200)]],
      details: ['', [Validators.required, Validators.maxLength(500)]],
      address: [''],
      city: ['', [Validators.required]],
      state: [''],
      postcode: ['', [Validators.required]],
      country: ['', [Validators.required]],
      card: ['']
    });
    this.charityDetailForm.valueChanges.subscribe(
      data => this.onValueChanged(this.charityDetailErrors, this.CharityDetailValidaMsg, data, this.charityDetailForm)
    )
  };

  onPaymentDetailsFormCreate() {
    this.paymentDetailsForm = this._formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(25)]],
      number: ['', [Validators.required]],
      sortcode: ['', [Validators.required]],
      account_no: ['', [Validators.required]],
      paypal: ['']
    });

    this.paymentDetailsForm.valueChanges.subscribe(
      data => this.onValueChanged(this.paymentDetailsErros, this.PaymentDetailsValidaMsg, data, this.paymentDetailsForm)
    );
  };
  onBasicFormCreate() {
    this.basicInfoForm = this._formBuilder.group({
      username: ['', [Validators.required, Validators.minLength(6)]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPSW: ['', [Validators.required, this.matchOtherValidator('password')]],
      firstname: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(25)]],
      lastname: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(25)]],
      charity: ['']
    });

    this.basicInfoForm.valueChanges.subscribe(
      data => this.onValueChanged(this.basicInfoErrors, this.BasicInfoValidaMsg, data, this.basicInfoForm)
    );
  };


  onValueChanged(errs, errMsg, data?: any, fg?: FormGroup) {
    if (!fg) return;
    const form = fg;
    for (const field in errs) {
      errs[field] = '';
      const control = fg.get(field);
      if (control && control.dirty && !control.valid) {
        const messages = errMsg[field];
        for (const key in control.errors) {
          errs[field] += messages[key] + ' ';
        }
      }
    }
  }

  onSubmit() {
    let cardID;
    let charityID;
    this.authCharityService.postCard(this.paymentDetailsForm.value)
      .pipe(
        mergeMap(res => {
          cardID = res.details._id;
          this.charityDetailForm.value.card = cardID;
          this.charityDetailForm.value.address = this.addressForm.value;
          console.log('charitydetails', this.charityDetailForm.value);

          return this.authCharityService.postCharity(this.charityDetailForm.value);
        })
        ,
        mergeMap(res => {
          charityID = res._id;
          this.basicInfoForm.value.charity = charityID;
          console.log('charities successful', this.basicInfoForm.value.charity);
          return this.authCharityService.signUp(this.basicInfoForm.value);
        })
      )
      .subscribe(
        res => {
          console.log(res);
          //{success: true, username: "imperial"}
          if (res.success) {
            this.msg = "register successfully!";

          } else {
            this.msg = res.err;
          }

        }
      )
  };

  matchOtherValidator(otherControlName: string) {

    let thisControl: FormControl;
    let otherControl: FormControl;

    return function matchOtherValidate(control: FormControl) {

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
