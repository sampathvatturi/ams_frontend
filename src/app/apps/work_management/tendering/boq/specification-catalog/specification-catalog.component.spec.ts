import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpecificationCatalogComponent } from './specification-catalog.component';

describe('SpecificationCatalogComponent', () => {
  let component: SpecificationCatalogComponent;
  let fixture: ComponentFixture<SpecificationCatalogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SpecificationCatalogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SpecificationCatalogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
