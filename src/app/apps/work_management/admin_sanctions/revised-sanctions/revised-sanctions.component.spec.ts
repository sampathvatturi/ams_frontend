import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RevisedSanctionsComponent } from './revised-sanctions.component';

describe('RevisedSanctionsComponent', () => {
  let component: RevisedSanctionsComponent;
  let fixture: ComponentFixture<RevisedSanctionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RevisedSanctionsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RevisedSanctionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
