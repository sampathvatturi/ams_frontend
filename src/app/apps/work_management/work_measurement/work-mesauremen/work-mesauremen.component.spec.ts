import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkMesauremenComponent } from './work-mesauremen.component';

describe('WorkMesauremenComponent', () => {
  let component: WorkMesauremenComponent;
  let fixture: ComponentFixture<WorkMesauremenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WorkMesauremenComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkMesauremenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
