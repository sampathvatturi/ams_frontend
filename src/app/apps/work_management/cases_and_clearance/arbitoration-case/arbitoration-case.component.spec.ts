import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArbitorationCaseComponent } from './arbitoration-case.component';

describe('ArbitorationCaseComponent', () => {
  let component: ArbitorationCaseComponent;
  let fixture: ComponentFixture<ArbitorationCaseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ArbitorationCaseComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ArbitorationCaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
