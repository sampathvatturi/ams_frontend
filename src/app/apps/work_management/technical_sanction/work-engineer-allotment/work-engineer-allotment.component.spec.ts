import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkEngineerAllotmentComponent } from './work-engineer-allotment.component';

describe('WorkEngineerAllotmentComponent', () => {
  let component: WorkEngineerAllotmentComponent;
  let fixture: ComponentFixture<WorkEngineerAllotmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WorkEngineerAllotmentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkEngineerAllotmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
