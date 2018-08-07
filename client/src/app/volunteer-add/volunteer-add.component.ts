import { Component, OnInit } from '@angular/core';
import {NgbDateAdapter, NgbDateStruct, NgbDateNativeAdapter} from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { onValueChanged } from '../utils/helpers';
import { VolunteerService } from '../services/volunteer.service';
@Component({
  selector: 'app-volunteer-add',
  templateUrl: './volunteer-add.component.html',
  styleUrls: ['./volunteer-add.component.scss'],
  providers: [{provide: NgbDateAdapter, useClass: NgbDateNativeAdapter}]


})
export class VolunteerAddComponent implements OnInit {
     feedback: string = undefined;
     time1: any;
     time2: any;
     chooseStart: boolean = false;
     chooseEnd: boolean = false;
     volunteerForm: FormGroup;
     timeslotForm: FormGroup;
     periodForm:FormGroup;
     timeslots=[];
     periodMsg=undefined;
     btnDisable:boolean = true;
     volunteerFormErrors = {
       'name': '',
       'location': '',
       'description': ''
     }
     periodFormErrors = {
       'start': '',
       'end': '',
       'duration': ''
     }
     timeslotFormErrors = {
       'date': '',
       'requiredNumber': '',
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
         'pattern': 'Please input right format of number of people'
       },
     }
     constructor(
       private fb: FormBuilder,
       private volunteerService:VolunteerService
     ) { }

     ngOnInit() {
          this.onVolunteerFormCreate();
          this.onTimeslotFormCreate();
          this.onPeriodFormCreate();
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
     onVolunteerFormCreate() {
       this.volunteerForm = this.fb.group({
         name: ['', Validators.required],
         location: ['', Validators.required],
         description: ['', Validators.required],
         timeslots: [''],
         pay:['']
       })

       this.volunteerForm.valueChanges.subscribe(
            data => {
                 onValueChanged(this.volunteerFormErrors, this.volunteerFormValidaMsg, data, this.volunteerForm);
            }
       )
     }
     onPeriodFormCreate() {
       this.periodForm = this.fb.group({
         start: ['', Validators.required],
         end: ['', Validators.required],
         duration:['', Validators.min(0)]
       })
       this.periodForm.valueChanges.subscribe(data=>{
            onValueChanged(this.periodFormErrors, this.periodFormValidaMsg, data, this.periodForm);
       })
     }
     onTimeslotFormCreate() {
       this.timeslotForm = this.fb.group({
         date: ['', Validators.required],
         period: [''],
         requiredNumber:['', [Validators.required, Validators.pattern]],
       })

       this.timeslotForm.valueChanges.subscribe(data => {
            onValueChanged(this.timeslotFormErrors, this.timeslotFormValidaMsg, data, this.timeslotForm);
       })
     }
     addToTimeslots(){
          this.timeslotForm.value.period = this.periodForm.value;
          this.timeslots.push(this.timeslotForm.value);
          this.timeslotForm.reset();
          this.periodForm.reset();
     }

     register(){
          this.volunteerForm.value.timeslots = this.timeslots;
          this.volunteerService.postVolunteer(this.volunteerForm.value)
          .subscribe(data => {
               console.log('activity success')
          //      this.router.navigate(['/profile/myproducts'])
          //   .then(() => this.data.success(data['message']))
          //   .catch(error => this.data.error(error))
          // : this.data.error(data['message']);
               this.feedback ="post successful";
          }, err=> {
                    console.log('activity failed');
               this.feedback ="post failed";
          })
     }
     delete(timeslot){
          let idx = this.timeslots.indexOf(timeslot);
          this.timeslots.splice(idx, 1);
     }
}
