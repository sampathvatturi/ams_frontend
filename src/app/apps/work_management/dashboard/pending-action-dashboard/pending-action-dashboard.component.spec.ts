import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PendingActionDashboardComponent } from './pending-action-dashboard.component';

describe('PendingActionDashboardComponent', () => {
  let component: PendingActionDashboardComponent;
  let fixture: ComponentFixture<PendingActionDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PendingActionDashboardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PendingActionDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
