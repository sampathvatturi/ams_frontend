import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BridgeDesignComponent } from './bridge-design.component';

describe('BridgeDesignComponent', () => {
  let component: BridgeDesignComponent;
  let fixture: ComponentFixture<BridgeDesignComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BridgeDesignComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BridgeDesignComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
