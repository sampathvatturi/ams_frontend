import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DroppingOfSanctionWorksComponent } from './dropping-of-sanction-works.component';

describe('DroppingOfSanctionWorksComponent', () => {
  let component: DroppingOfSanctionWorksComponent;
  let fixture: ComponentFixture<DroppingOfSanctionWorksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DroppingOfSanctionWorksComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DroppingOfSanctionWorksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
