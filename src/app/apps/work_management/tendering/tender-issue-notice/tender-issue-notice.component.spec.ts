import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TenderIssueNoticeComponent } from './tender-issue-notice.component';

describe('TenderIssueNoticeComponent', () => {
  let component: TenderIssueNoticeComponent;
  let fixture: ComponentFixture<TenderIssueNoticeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TenderIssueNoticeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TenderIssueNoticeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
