import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuarryChartForHabitationComponent } from './quarry-chart-for-habitation.component';

describe('QuarryChartForHabitationComponent', () => {
  let component: QuarryChartForHabitationComponent;
  let fixture: ComponentFixture<QuarryChartForHabitationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QuarryChartForHabitationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QuarryChartForHabitationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
