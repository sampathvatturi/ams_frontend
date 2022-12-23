import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmdBgsComponent } from './emd-bgs.component';

describe('EmdBgsComponent', () => {
  let component: EmdBgsComponent;
  let fixture: ComponentFixture<EmdBgsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmdBgsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmdBgsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
