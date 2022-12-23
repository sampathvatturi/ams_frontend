import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrCompletionReportComponent } from './cr-completion-report.component';

describe('CrCompletionReportComponent', () => {
  let component: CrCompletionReportComponent;
  let fixture: ComponentFixture<CrCompletionReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CrCompletionReportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CrCompletionReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
