import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FinalPaymentsComponent } from './final-payments.component';

describe('FinalPaymentsComponent', () => {
  let component: FinalPaymentsComponent;
  let fixture: ComponentFixture<FinalPaymentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FinalPaymentsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FinalPaymentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
