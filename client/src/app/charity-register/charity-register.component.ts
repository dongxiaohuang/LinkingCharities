import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { types } from '../shared/types';
@Component({
  selector: 'app-charity-register',
  templateUrl: './charity-register.component.html',
  styleUrls: ['./charity-register.component.scss']
})
export class CharityRegisterComponent implements OnInit {
  types: string[];
  basicInfoForm: FormGroup;

  dropdownList = [];
  selectedItems = [];
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
      'required': 'Email is required.',
      'email': 'Email is not in valid format.'
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
  constructor(private _formBuilder: FormBuilder, ) { }

  ngOnInit() {
    this.types = types;
    this.onBasicFormCreate();

    this.dropdownSettings = {
      singleSelection: false,
      idField: 'item_id',
      textField: 'item_text',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 5,
      allowSearchFilter: true
    };
  }
  onBasicFormCreate() {
    this.basicInfoForm = this._formBuilder.group({
      username: ['', [Validators.required, Validators.email]],
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
