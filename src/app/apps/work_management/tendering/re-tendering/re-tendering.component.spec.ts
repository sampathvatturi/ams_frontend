import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReTenderingComponent } from './re-tendering.component';

describe('ReTenderingComponent', () => {
  let component: ReTenderingComponent;
  let fixture: ComponentFixture<ReTenderingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReTenderingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReTenderingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
