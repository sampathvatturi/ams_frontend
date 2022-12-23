import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DropingOfMasterGoProceedingsComponent } from './droping-of-master-go-proceedings.component';

describe('DropingOfMasterGoProceedingsComponent', () => {
  let component: DropingOfMasterGoProceedingsComponent;
  let fixture: ComponentFixture<DropingOfMasterGoProceedingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DropingOfMasterGoProceedingsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DropingOfMasterGoProceedingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
