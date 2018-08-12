import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditTimeslotComponent } from './edit-timeslot.component';

describe('EditTimeslotComponent', () => {
  let component: EditTimeslotComponent;
  let fixture: ComponentFixture<EditTimeslotComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditTimeslotComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditTimeslotComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
