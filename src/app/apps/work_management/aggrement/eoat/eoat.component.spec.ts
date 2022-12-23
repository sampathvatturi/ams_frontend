import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EoatComponent } from './eoat.component';

describe('EoatComponent', () => {
  let component: EoatComponent;
  let fixture: ComponentFixture<EoatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EoatComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EoatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
