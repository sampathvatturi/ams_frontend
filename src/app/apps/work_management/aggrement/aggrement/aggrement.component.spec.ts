import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AggrementComponent } from './aggrement.component';

describe('AggrementComponent', () => {
  let component: AggrementComponent;
  let fixture: ComponentFixture<AggrementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AggrementComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AggrementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
