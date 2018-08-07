import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VolunteerAddComponent } from './volunteer-add.component';

describe('VolunteerAddComponent', () => {
  let component: VolunteerAddComponent;
  let fixture: ComponentFixture<VolunteerAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VolunteerAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VolunteerAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
