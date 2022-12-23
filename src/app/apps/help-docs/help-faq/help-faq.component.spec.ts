import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HelpFAQComponent } from './help-faq.component';

describe('HelpFAQComponent', () => {
  let component: HelpFAQComponent;
  let fixture: ComponentFixture<HelpFAQComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HelpFAQComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HelpFAQComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
