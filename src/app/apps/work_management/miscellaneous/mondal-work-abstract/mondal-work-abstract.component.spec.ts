import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MondalWorkAbstractComponent } from './mondal-work-abstract.component';

describe('MondalWorkAbstractComponent', () => {
  let component: MondalWorkAbstractComponent;
  let fixture: ComponentFixture<MondalWorkAbstractComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MondalWorkAbstractComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MondalWorkAbstractComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
