import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VolunteerTimeslotsComponent } from './volunteer-timeslots.component';

describe('VolunteerTimeslotsComponent', () => {
  let component: VolunteerTimeslotsComponent;
  let fixture: ComponentFixture<VolunteerTimeslotsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VolunteerTimeslotsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VolunteerTimeslotsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
