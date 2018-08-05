import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CharityDonationHistoryComponent } from './charity-donation-history.component';

describe('CharityDonationHistoryComponent', () => {
  let component: CharityDonationHistoryComponent;
  let fixture: ComponentFixture<CharityDonationHistoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CharityDonationHistoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CharityDonationHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
