import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlternateSanctionsComponent } from './alternate-sanctions.component';

describe('AlternateSanctionsComponent', () => {
  let component: AlternateSanctionsComponent;
  let fixture: ComponentFixture<AlternateSanctionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AlternateSanctionsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AlternateSanctionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
