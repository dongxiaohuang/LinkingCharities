import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { VolunteerService } from '../services/volunteer.service';
import { onValueChanged } from '../utils/helpers';

@Component({
  selector: 'app-edit-timeslot',
  templateUrl: './edit-timeslot.component.html',
  styleUrls: ['./edit-timeslot.component.scss']
})
export class EditTimeslotComponent implements OnInit {
  @Input()
  timeslot
  @Input()
  volunteerId

  time1: any = undefined;
  time2: any = undefined;
  chooseStart: boolean = false;
  chooseEnd: boolean = false;
  timeslotForm: FormGroup;
  periodForm: FormGroup;

  periodFormErrors = {
    'start': '',
    'end': '',
    'duration': ''
  }
  timeslotFormErrors = {
    'date': '',
    'requiredNumber': '',
  }
  periodFormValidaMsg = {
    'start': {
      'required': 'Volunteer Activity Start Time is required'
    },
    'end': {
      'required': 'Volunteer Activity End Time is required'
    },
    'duration': {
      'min': 'End time must be later than start time'
    },
  }
  timeslotFormValidaMsg = {
    'date': {
      'required': 'Volunteer Activity Date is required'
    },
    'requiredNumber': {
      'pattern': 'Please input right format of number of people',
      'required': 'Volunteer Activity Number of people is required'
    },
  }
  constructor(
       private fb: FormBuilder,
       private volunteerService: VolunteerService
 ) { }

  ngOnInit() {
       this.time1 = this.timeslot.period.start;
       this.time2 = this.timeslot.period.end;
       this.onPeriodFormCreate();
      this.onTimeslotFormCreate();
  }
  get today() {
   const now = new Date();
   return { year: now.getFullYear(), month: now.getMonth() + 1, day: now.getDate() };
  }
  get duration() {
   if (this.time2 && this.time1)
      return this.time2.hour * 60 + this.time2.minute - this.time1.hour * 60 - this.time1.minute;
   else return '';
  }
  onPeriodFormCreate() {
    this.periodForm = this.fb.group({
      start: [this.timeslot.period.start, Validators.required],
      end: [this.timeslot.period.end, Validators.required],
      duration: [this.timeslot.period.duration, Validators.min(0)]
    })
    this.periodForm.valueChanges.subscribe(data => {
      onValueChanged(this.periodFormErrors, this.periodFormValidaMsg, data, this.periodForm);
    })
  }
  onTimeslotFormCreate() {
    this.timeslotForm = this.fb.group({
      date: [this.timeslot.date, Validators.required],
      period: [this.timeslot.period],
      id:[this.timeslot.id],
      registers:[this.timeslot.registers],
      dateTimestamp: [this.timeslot.dateTimestamp],
      requiredNumber: [this.timeslot.requiredNumber, [Validators.required, Validators.pattern]],
    })

    this.timeslotForm.valueChanges.subscribe(data => {
      onValueChanged(this.timeslotFormErrors, this.timeslotFormValidaMsg, data, this.timeslotForm);
    })
  }
  saveChanges(){
       let date = new Date(this.timeslotForm.value.date.year,this.timeslotForm.value.date.month,this.timeslotForm.value.date.day);
       console.log(date)
       this.timeslotForm.value.dateTimestamp = date.getTime();
       this.timeslotForm.value.period = this.periodForm.value;
       // this.volunteerService.changeVolunteer(this.volunteerId, this.timeslotForm.value)
       // .subscribe()
 }

}
