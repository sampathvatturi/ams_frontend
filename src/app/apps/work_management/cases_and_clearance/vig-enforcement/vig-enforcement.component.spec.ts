import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VigEnforcementComponent } from './vig-enforcement.component';

describe('VigEnforcementComponent', () => {
  let component: VigEnforcementComponent;
  let fixture: ComponentFixture<VigEnforcementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VigEnforcementComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VigEnforcementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
