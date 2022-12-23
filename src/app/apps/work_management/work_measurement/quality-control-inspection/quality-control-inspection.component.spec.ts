import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QualityControlInspectionComponent } from './quality-control-inspection.component';

describe('QualityControlInspectionComponent', () => {
  let component: QualityControlInspectionComponent;
  let fixture: ComponentFixture<QualityControlInspectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QualityControlInspectionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QualityControlInspectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
