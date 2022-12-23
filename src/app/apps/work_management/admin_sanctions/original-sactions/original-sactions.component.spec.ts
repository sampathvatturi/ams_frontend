import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OriginalSactionsComponent } from './original-sactions.component';

describe('OriginalSactionsComponent', () => {
  let component: OriginalSactionsComponent;
  let fixture: ComponentFixture<OriginalSactionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OriginalSactionsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OriginalSactionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
