import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlternateGoProceedingsComponent } from './alternate-go-proceedings.component';

describe('AlternateGoProceedingsComponent', () => {
  let component: AlternateGoProceedingsComponent;
  let fixture: ComponentFixture<AlternateGoProceedingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AlternateGoProceedingsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AlternateGoProceedingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
