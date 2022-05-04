import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyeventsDetailComponent } from './myevents-detail.component';

describe('MyeventsDetailComponent', () => {
  let component: MyeventsDetailComponent;
  let fixture: ComponentFixture<MyeventsDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MyeventsDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MyeventsDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
