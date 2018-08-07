import { Component, OnInit } from '@angular/core';
import { NgbDateAdapter, NgbDateStruct, NgbDateNativeAdapter } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'app-volunteer',
  templateUrl: './volunteer.component.html',
  styleUrls: ['./volunteer.component.scss'],
  providers: [{ provide: NgbDateAdapter, useClass: NgbDateNativeAdapter }]
})
export class VolunteerComponent implements OnInit {
  time1: any;
  time2: any;
  chooseStart: boolean = false;
  chooseEnd: boolean = false;
  volunteerForm: FormGroup;
  files: File[] = [];
  volunteerFormErrors = {
    'name': '',
    'location': '',
    'pay': '',
    'description': ''
  }
  volunteerFormValidaMsg = {
    'name': {
      'required': 'Volunteer Activity Name is required'
    },
    'location': {
      'required': 'Volunteer Activity Location is required'
    },
    'description': {
      'required': 'Volunteer Activity Description is required'
    },
  }
  constructor(
    private fb: FormBuilder
  ) { }

  ngOnInit() {
  }
  get today() {
    const now = new Date();
    return { year: now.getFullYear(), month: now.getMonth() + 1, day: now.getDate() };
  }
  get duration() {
    if (this.time2 && this.time1)
      return this.time2.hour * 60 + this.time2.minute - this.time1.hour * 60 - this.time1.minute;
    else return null;
  }
  onVolunteerFormCreate() {
    this.volunteerForm = this.fb.group({
      name: ['', Validators.required],
      location: ['', Validators.required],
      description: ['', Validators.required],
      timeslots: ['']
    })
  }
}
