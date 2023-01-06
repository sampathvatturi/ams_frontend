import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CashAdjustmentComponent } from './cash-adjustment.component';

describe('CashAdjustmentComponent', () => {
  let component: CashAdjustmentComponent;
  let fixture: ComponentFixture<CashAdjustmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CashAdjustmentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CashAdjustmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
