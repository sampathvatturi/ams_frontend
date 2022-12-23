import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ForestClearanceComponent } from './forest-clearance.component';

describe('ForestClearanceComponent', () => {
  let component: ForestClearanceComponent;
  let fixture: ComponentFixture<ForestClearanceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ForestClearanceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ForestClearanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
