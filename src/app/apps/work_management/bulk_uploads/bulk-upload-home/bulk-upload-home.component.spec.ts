import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BulkUploadHomeComponent } from './bulk-upload-home.component';

describe('BulkUploadHomeComponent', () => {
  let component: BulkUploadHomeComponent;
  let fixture: ComponentFixture<BulkUploadHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BulkUploadHomeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BulkUploadHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
