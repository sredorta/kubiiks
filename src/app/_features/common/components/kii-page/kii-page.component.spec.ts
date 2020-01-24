import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KiiPageComponent } from './kii-page.component';

describe('KiiPageComponent', () => {
  let component: KiiPageComponent;
  let fixture: ComponentFixture<KiiPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KiiPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KiiPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
