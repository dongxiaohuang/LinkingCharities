import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CharityVolunteerComponent } from './charity-volunteer.component';

describe('CharityVolunteerComponent', () => {
  let component: CharityVolunteerComponent;
  let fixture: ComponentFixture<CharityVolunteerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CharityVolunteerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CharityVolunteerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
