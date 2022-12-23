import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InspectionAuditHomeComponent } from './inspection-audit-home.component';

describe('InspectionAuditHomeComponent', () => {
  let component: InspectionAuditHomeComponent;
  let fixture: ComponentFixture<InspectionAuditHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InspectionAuditHomeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InspectionAuditHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
