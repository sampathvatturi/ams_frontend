import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuarryChartForRoadsComponent } from './quarry-chart-for-roads.component';

describe('QuarryChartForRoadsComponent', () => {
  let component: QuarryChartForRoadsComponent;
  let fixture: ComponentFixture<QuarryChartForRoadsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QuarryChartForRoadsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QuarryChartForRoadsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
