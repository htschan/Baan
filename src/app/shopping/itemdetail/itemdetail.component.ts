import { Component, Input, Output, EventEmitter } from '@angular/core';
import { ShoppingItemVm } from '../../../viewmodels/shoppingitem';
import { Router } from '@angular/router';
import { DbService } from '../../services/db.service';

@Component({
  selector: 'app-itemdetail',
  templateUrl: './itemdetail.component.html',
  styleUrls: ['./itemdetail.component.scss']
})
export class ItemDetailComponent {

  constructor(
    private router: Router,
    public db: DbService
  ) { }

  @Input()
  item: ShoppingItemVm;
  @Output()
  edit = new EventEmitter<ShoppingItemVm>();

  editItem(item) {
    this.edit.emit(item);
  }

  async toggleImportant(item) {
    const Important = item.Important === true ? false : true;
    this.db.updateAt(`/shoppinglist/${item.id}`, { Important });
  }

  async toggleFavorite(item) {
    const Favorite = item.Favorite === true ? false : true;
    this.db.updateAt(`/shoppinglist/${item.id}`, { Favorite });
  }


}
