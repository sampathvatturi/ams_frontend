import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GoProceedingsComponent } from './go-proceedings.component';

describe('GoProceedingsComponent', () => {
  let component: GoProceedingsComponent;
  let fixture: ComponentFixture<GoProceedingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GoProceedingsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GoProceedingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
