import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CharityProfileComponent } from './charity-profile.component';

describe('CharityProfileComponent', () => {
  let component: CharityProfileComponent;
  let fixture: ComponentFixture<CharityProfileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CharityProfileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CharityProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
