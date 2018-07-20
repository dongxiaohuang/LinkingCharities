import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { CategoriesService } from '../services/categories.service';
import { Category } from '../shared/category';

@Component({
  selector: 'app-charity-register',
  templateUrl: './charity-register.component.html',
  styleUrls: ['./charity-register.component.scss']
})
export class CharityRegisterComponent implements OnInit {
  categories:Category[] =[];
  charityDetailForm: FormGroup;
  basicInfoForm: FormGroup;
  paymentDetailsForm: FormGroup;

  dropdownList = [];
  choosedCategories = [];
  dropdownSettings = {};

  basicInfoErrors = {
    'username': '',
    'password': '',
    'confirmPSW': '',
    'firstname': '',
    'lastname': ''
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
  constructor(private _formBuilder: FormBuilder,
     private categoriesService: CategoriesService) { }

  ngOnInit() {

    this.onBasicFormCreate();
    this.onCharityDetailsFormCreate();
    this.onPaymentDetailsFormCreate();
    this.categoriesService.getCategories()
     .subscribe(data => {
          if(data['success']){
               this.categories = data.categories;
               // console.log('log categories', this.categories);
          }else{
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

  onCharityDetailsFormCreate(){
       this.charityDetailForm = this._formBuilder.group({
           ccn: [''],
           rbody:[''],
           rno:[''],
           name: ['', Validators.required],
           tel:['', [Validators.required, Validators.pattern]],
           web:['', [Validators.pattern]],
           email:['', [Validators.required, Validators.email]],
           categories: [Category, Validators.required],
           image: [''],
           info: ['', [Validators.required, Validators.maxLength(200)]],
           details:['', [Validators.required, Validators.maxLength(500)]],
           address: ['', [Validators.required]],
           city: ['', [Validators.required]],
           state:[''],
           postcode:['', [Validators.required]],
           country:['', [Validators.required]]
       })
 };

 onPaymentDetailsFormCreate(){
      this.paymentDetailsForm = this._formBuilder.group({
           name:['', [Validators.required, Validators.minLength(2), Validators.maxLength(25)]],
           number:['', [Validators.required]],
           sortcode:['',[Validators.required]],
           account_no: ['', [Validators.required]],
           paypal:['']
      })
};
  onBasicFormCreate() {
    this.basicInfoForm = this._formBuilder.group({
      username: ['', [Validators.required, Validators.minLength(6)]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPSW: ['', [Validators.required, this.matchOtherValidator('password')]],
      firstname: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(25)]],
      lastname: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(25)]],
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
