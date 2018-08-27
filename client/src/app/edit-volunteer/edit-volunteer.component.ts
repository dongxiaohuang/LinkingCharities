import { Component, OnInit } from '@angular/core';
import { Params, ActivatedRoute } from '@angular/router'
import { VolunteerService } from '../services/volunteer.service';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { onValueChanged } from '../utils/helpers';
import { mergeMap } from 'rxjs/operators';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { EditTimeslotComponent } from '../edit-timeslot/edit-timeslot.component'
import { Router } from '@angular/router';
@Component({
  selector: 'app-edit-volunteer',
  templateUrl: './edit-volunteer.component.html',
  styleUrls: ['./edit-volunteer.component.scss']
})
export class EditVolunteerComponent implements OnInit {
  deleteMsg: string= undefined;
  addTimeslotMsg: string = undefined;
  volunteerForm: FormGroup;
  res: any;
  volunteerId: any;
  time1: any = undefined;
  time2: any = undefined;
  chooseStart: boolean = false;
  chooseEnd: boolean = false;
  timeslotForm: FormGroup;
  periodForm: FormGroup;
  volunteerMsg:string = undefined;
  acticityTimeslots = [];
  volunteerFormErrors = {
    'name': '',
    'location': '',
    'description': '',
    'study_type': ''
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
    'study_type': {
      'required': 'Volunteer Activity Type is required'
    },
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
  constructor(private route: ActivatedRoute,
    private fb: FormBuilder,
    private modalService: NgbModal,
    private router: Router,
    private volunteerService: VolunteerService) { }

  ngOnInit() {
    this.volunteerId = this.route.snapshot.params['id']; //'+' convert a string into interger value
    this.volunteerService.getVolunteer(this.volunteerId)
      .pipe(
        mergeMap(res => {
          this.res = res;
          this.acticityTimeslots = res.timeslots;
          this.volunteerForm = this.fb.group({
            name: [res.name, Validators.required],
            location: [res.location, Validators.required],
            description: [res.description, Validators.required],
            pay: [res.pay],
            principal: [res.principal],
            restrictions: [res.restrictions],
            study_type: [res.study_type, Validators.required]
          })
          return this.volunteerForm.valueChanges;
        })
      )
      .subscribe(data => {
        onValueChanged(this.volunteerFormErrors, this.volunteerFormValidaMsg, data, this.volunteerForm);
      });
    this.onPeriodFormCreate();
    this.onTimeslotFormCreate();
  }

  onVolunteerFormReset() {
    this.volunteerForm.reset({
      name: this.res.name,
      location: this.res.location,
      description: this.res.description,
      pay: this.res.pay,
      principal: this.res.principal,
      restrictions: this.res.restrictions,
      study_type: this.res.study_type
    })
  }
  onPeriodFormCreate() {
    this.periodForm = this.fb.group({
      start: ['', Validators.required],
      end: ['', Validators.required],
      duration: ['', Validators.min(0)]
    })
    this.periodForm.valueChanges.subscribe(data => {
      onValueChanged(this.periodFormErrors, this.periodFormValidaMsg, data, this.periodForm);
    })
  }
  onTimeslotFormCreate() {
    this.timeslotForm = this.fb.group({
      date: ['', Validators.required],
      period: [''],
      dateTimestamp: [''],
      requiredNumber: ['', [Validators.required, Validators.pattern]],
    })

    this.timeslotForm.valueChanges.subscribe(data => {
      onValueChanged(this.timeslotFormErrors, this.timeslotFormValidaMsg, data, this.timeslotForm);
    })
  }
  // timeslotReset() {
  //      this.volunteerService.getVolunteer(this.volunteerId)
  //         .subscribe(res => {
  //              this.acticityTimeslots = res.timeslots;
  //         })
  // }
  addToTimeslots() {
    let date = new Date(this.timeslotForm.value.date.year, this.timeslotForm.value.date.month, this.timeslotForm.value.date.day);
    console.log(date)
    this.timeslotForm.value.dateTimestamp = date.getTime();
    this.timeslotForm.value.period = this.periodForm.value;
    console.log(this.timeslotForm.value)
    this.volunteerService.postToTimeslots(this.volunteerId, this.timeslotForm.value)
     .subscribe(res => {
          if(res.success){
               this.acticityTimeslots = res.results;
               this.timeslotForm.reset();
               this.periodForm.reset();
               this.addTimeslotMsg ="Add Timeslot Successfully";
          }else{
               this.addTimeslotMsg ="Add Timeslot Failed"
          }
     }, err => this.addTimeslotMsg ="Add Timeslot Failed")
  }

  delete(timeslot) {
       this.volunteerService.deleteTimeslot(this.volunteerId, timeslot._id)
          .subscribe(res => {
               this.acticityTimeslots = res.timeslots;
               this.deleteMsg = "Delete Successfully"
          }, err => {this.deleteMsg = "Delete Failed"});
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
  changeVolunteer(){
       this.volunteerService.changeVolunteer(this.volunteerId, this.volunteerForm.value)
          .subscribe(res => {
               this.res = res;
               this.volunteerMsg = "Update Successfully"
          }, err => this.volunteerMsg = "Update Failed" )
 }

 openEditModel(timeslot) {
    const modalRef = this.modalService.open(EditTimeslotComponent, { centered: true });
    modalRef.componentInstance.timeslot = timeslot;
    modalRef.componentInstance.volunteerId = this.volunteerId;
 }

 getTimeslots(){
      this.volunteerService.getTimeslots(this.volunteerId)
      .subscribe(timeslots => this.acticityTimeslots = timeslots)
}

deleteActicity(){
     this.volunteerService.deleteVolunteer(this.volunteerId)
          .subscribe(res => {
               console.log(res);
     this.router.navigate(["/charityuser/volunteer"]);})
}

}
