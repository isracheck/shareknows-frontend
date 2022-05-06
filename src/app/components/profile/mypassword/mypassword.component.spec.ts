import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MypasswordComponent } from './mypassword.component';

describe('MypasswordComponent', () => {
  let component: MypasswordComponent;
  let fixture: ComponentFixture<MypasswordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MypasswordComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MypasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
