import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoadTransferComponent } from './road-transfer.component';

describe('RoadTransferComponent', () => {
  let component: RoadTransferComponent;
  let fixture: ComponentFixture<RoadTransferComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RoadTransferComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RoadTransferComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
