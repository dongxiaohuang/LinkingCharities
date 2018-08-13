import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserVolunteerHistoryComponent } from './user-volunteer-history.component';

describe('UserVolunteerHistoryComponent', () => {
  let component: UserVolunteerHistoryComponent;
  let fixture: ComponentFixture<UserVolunteerHistoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserVolunteerHistoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserVolunteerHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
