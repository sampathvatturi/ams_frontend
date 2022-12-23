import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkWiseMasterComponent } from './work-wise-master.component';

describe('WorkWiseMasterComponent', () => {
  let component: WorkWiseMasterComponent;
  let fixture: ComponentFixture<WorkWiseMasterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WorkWiseMasterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkWiseMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
