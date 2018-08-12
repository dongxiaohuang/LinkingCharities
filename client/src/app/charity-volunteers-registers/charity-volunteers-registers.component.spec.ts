import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CharityVolunteersRegistersComponent } from './charity-volunteers-registers.component';

describe('CharityVolunteersRegistersComponent', () => {
  let component: CharityVolunteersRegistersComponent;
  let fixture: ComponentFixture<CharityVolunteersRegistersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CharityVolunteersRegistersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CharityVolunteersRegistersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
