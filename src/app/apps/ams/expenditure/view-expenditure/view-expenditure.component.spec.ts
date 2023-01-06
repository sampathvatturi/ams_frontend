import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewExpenditureComponent } from './view-expenditure.component';

describe('ViewExpenditureComponent', () => {
  let component: ViewExpenditureComponent;
  let fixture: ComponentFixture<ViewExpenditureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewExpenditureComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewExpenditureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
