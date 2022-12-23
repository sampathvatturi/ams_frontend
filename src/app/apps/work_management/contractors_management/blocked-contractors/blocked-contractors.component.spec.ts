import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BlockedContractorsComponent } from './blocked-contractors.component';

describe('BlockedContractorsComponent', () => {
  let component: BlockedContractorsComponent;
  let fixture: ComponentFixture<BlockedContractorsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BlockedContractorsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BlockedContractorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
