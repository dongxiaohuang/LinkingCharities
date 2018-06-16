import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Feedback, ContactType } from '../shared/feedback';
@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {

  feedbackForm: FormGroup;
  feedback: Feedback;
  contactType = ContactType;
  formErrors = {
    'firstname': '',
    'lastname': '',
    'telnum': '',
    'email': ''
  }
  ValidationMessages = {
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
    'telnum': {
      'required': 'Tel. number is required.',
      'pattern': 'Tel. number musy contain only numbers.'
    },
    'email': {
      'required': 'Email is required.',
      'email': 'email not in valid format.'
    }
  }

  constructor(private fb: FormBuilder) {
    this.createForm();
  }

  createForm(): void {
    this.feedbackForm = this.fb.group({
      firstname: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(25)]],
      lastname: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(25)]],
      telnum: [null, [Validators.required, Validators.pattern]],
      email: ['', [Validators.required, Validators.email]],
      contacttype: 'None',
      message: ''
    })

    this.feedbackForm.valueChanges
      .subscribe(data => this.onValueChanged(data));

    this.onValueChanged(); //(re)set validation message
  }

  ngOnInit() {
  }

  onSubmit() {
    this.feedback = this.feedbackForm.value;
    console.log(this.feedback);
    this.feedbackForm.reset(); // clear
  }
  onValueChanged(data?:any){
       if(!this.feedbackForm) return;
       const form = this.feedbackForm;
       for(const field in this.formErrors){
            //clear previous error if any
            this.formErrors[field] = '';
            const control = form.get(field);
            if(control && control.dirty && !control.valid){
                 const messages = this.ValidationMessages[field];
                 for(const key in control.errors){
                      this.formErrors[field] += messages[key] + ' ';
                 }
            }
       }
 }
}
