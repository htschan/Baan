import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShoppingitemviewComponent } from './shoppingitemview.component';

describe('ShoppingitemviewComponent', () => {
  let component: ShoppingitemviewComponent;
  let fixture: ComponentFixture<ShoppingitemviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShoppingitemviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShoppingitemviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
