import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TopcharitiesComponent } from './topcharities.component';

describe('TopcharitiesComponent', () => {
  let component: TopcharitiesComponent;
  let fixture: ComponentFixture<TopcharitiesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TopcharitiesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TopcharitiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
