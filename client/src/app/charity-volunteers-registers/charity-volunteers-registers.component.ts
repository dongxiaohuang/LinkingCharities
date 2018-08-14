import { Component, OnInit } from '@angular/core';
import { Params, ActivatedRoute } from '@angular/router';
import { VolunteerService } from '../services/volunteer.service';

@Component({
  selector: 'app-charity-volunteers-registers',
  templateUrl: './charity-volunteers-registers.component.html',
  styleUrls: ['./charity-volunteers-registers.component.scss']
})
export class CharityVolunteersRegistersComponent implements OnInit {
  volunteerId;
  res
  constructor(
       private route: ActivatedRoute,
       private volunteerService: VolunteerService
 ) { }

  ngOnInit() {
       this.volunteerId = this.route.snapshot.params['id']; //'+' convert a string into interger value
       this.getRegisters();
  }
  getRegisters(){
       this.volunteerService.getRegisters(this.volunteerId)
          .subscribe(res => {
               if(res.success){

                    this.res = res.results[0]
               }
          })
 }

}
