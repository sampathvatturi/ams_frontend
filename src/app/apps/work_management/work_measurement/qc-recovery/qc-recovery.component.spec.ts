import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QcRecoveryComponent } from './qc-recovery.component';

describe('QcRecoveryComponent', () => {
  let component: QcRecoveryComponent;
  let fixture: ComponentFixture<QcRecoveryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QcRecoveryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QcRecoveryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
