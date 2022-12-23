import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SupplementaryAggrementComponent } from './supplementary-aggrement.component';

describe('SupplementaryAggrementComponent', () => {
  let component: SupplementaryAggrementComponent;
  let fixture: ComponentFixture<SupplementaryAggrementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SupplementaryAggrementComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SupplementaryAggrementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
