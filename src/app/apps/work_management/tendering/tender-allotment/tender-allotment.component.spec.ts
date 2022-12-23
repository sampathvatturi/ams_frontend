import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TenderAllotmentComponent } from './tender-allotment.component';

describe('TenderAllotmentComponent', () => {
  let component: TenderAllotmentComponent;
  let fixture: ComponentFixture<TenderAllotmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TenderAllotmentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TenderAllotmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
