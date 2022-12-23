import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GrantRegFormComponent } from './grant-reg-form.component';

describe('GrantRegFormComponent', () => {
  let component: GrantRegFormComponent;
  let fixture: ComponentFixture<GrantRegFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GrantRegFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GrantRegFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
