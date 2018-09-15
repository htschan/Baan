import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { YoutubedownloadPage } from './youtubedownload.page';

describe('YoutubedownloadPage', () => {
  let component: YoutubedownloadPage;
  let fixture: ComponentFixture<YoutubedownloadPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ YoutubedownloadPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(YoutubedownloadPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
