import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RevisedGoProceedingsComponent } from './revised-go-proceedings.component';

describe('RevisedGoProceedingsComponent', () => {
  let component: RevisedGoProceedingsComponent;
  let fixture: ComponentFixture<RevisedGoProceedingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RevisedGoProceedingsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RevisedGoProceedingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
