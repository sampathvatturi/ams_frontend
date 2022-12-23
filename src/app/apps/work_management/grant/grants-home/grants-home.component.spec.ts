import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GrantsHomeComponent } from './grants-home.component';

describe('GrantsHomeComponent', () => {
  let component: GrantsHomeComponent;
  let fixture: ComponentFixture<GrantsHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GrantsHomeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GrantsHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
