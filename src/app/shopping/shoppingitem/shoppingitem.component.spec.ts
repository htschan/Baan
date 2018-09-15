import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShoppingitemComponent } from './shoppingitem.component';

describe('ShoppingitemComponent', () => {
  let component: ShoppingitemComponent;
  let fixture: ComponentFixture<ShoppingitemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShoppingitemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShoppingitemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
