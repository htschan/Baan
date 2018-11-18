import { Component, Input, Output, EventEmitter } from '@angular/core';
import { ShoppingItemVm } from '../../../viewmodels/shoppingitem';
import { Router } from '@angular/router';

@Component({
  selector: 'app-itemdetail',
  templateUrl: './itemdetail.component.html',
  styleUrls: ['./itemdetail.component.scss']
})
export class ItemDetailComponent {

  constructor(private router: Router) { }

  @Input()
  item: ShoppingItemVm;
  @Output()
  edit = new EventEmitter<ShoppingItemVm>();

  editItem(item) {
    this.edit.emit(item);
  }
}
