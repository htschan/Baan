import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KmlPage } from './kml.page';

describe('KmlPage', () => {
  let component: KmlPage;
  let fixture: ComponentFixture<KmlPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KmlPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KmlPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
