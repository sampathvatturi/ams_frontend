import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProposalsHomeComponent } from './proposals-home.component';

describe('ProposalsHomeComponent', () => {
  let component: ProposalsHomeComponent;
  let fixture: ComponentFixture<ProposalsHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProposalsHomeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProposalsHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
