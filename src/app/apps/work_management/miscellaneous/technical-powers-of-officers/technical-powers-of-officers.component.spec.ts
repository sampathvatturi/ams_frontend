import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TechnicalPowersOfOfficersComponent } from './technical-powers-of-officers.component';

describe('TechnicalPowersOfOfficersComponent', () => {
  let component: TechnicalPowersOfOfficersComponent;
  let fixture: ComponentFixture<TechnicalPowersOfOfficersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TechnicalPowersOfOfficersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TechnicalPowersOfOfficersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
