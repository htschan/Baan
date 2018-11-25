import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { App, ModalController, Events, Fab, List } from '@ionic/angular';
import { ProductService } from '../services/product.service';
import { ShoppingItemVm } from '../../viewmodels/shoppingitem';
import { SelectproductComponent } from './selectproduct/selectproduct.component';
import { DbService } from '../services/db.service';
import { switchMap, shareReplay, map } from 'rxjs/operators';
import { EdititemComponent } from './edititem/edititem.component';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-shopping',
  templateUrl: './shopping.page.html',
  styleUrls: ['./shopping.page.scss'],
})
export class ShoppingPage implements OnInit {
  @ViewChild('slidingList') slidingList: List;
  items$;
  filtered;
  filter = new BehaviorSubject(null);

  constructor(
    public auth: AuthService,
    public appCtrl: App,
    public db: DbService,
    public prodService: ProductService,
    public modalCtrl: ModalController,
    public events: Events) {
  }

  ngOnInit() {
    this.items$ = this.auth.user$.pipe(
      switchMap(user =>
        this.db.collection$('shoppinglist', ref =>
          ref
            .where('uid', '==', user.uid)
            .orderBy('createdAt', 'desc')
            .limit(25))
      ),
      shareReplay(1)
    );
    this.filtered = this.filter.pipe(
      switchMap(State => {
        return this.items$.pipe(
          map(arr =>
            (arr as any[]).filter(
              obj => (State ? obj.State === State : true)
            )
          )
        );
      })
    );
  }

  trackById(idx, item) {
    return item.Key;
  }

  async toggleState(item) {
    const State = item.State === 'done' ? 'pending' : 'done';
    this.db.updateAt(`/shoppinglist/${item.id}`, { State });
    await this.slidingList.closeSlidingItems();
  }

  async deleteItem(item) {
    this.db.delete(`shoppinglist/${item.id}`);
    await this.slidingList.closeSlidingItems();
  }

  updateFilter(val) {
    this.filter.next(val);
  }

  async editItem(item?: any) {
    const modal = await this.modalCtrl.create({
      component: EdititemComponent,
      componentProps: { item }
    });
    return await modal.present();
  }

  async addItem(fab: Fab) {
    fab.close();
    const modal = await this.modalCtrl.create({
      component: EdititemComponent
    });
    return await modal.present();
  }

  async selectProduct(fab: Fab) {
    fab.close();
    const modal = await this.modalCtrl.create({
      component: SelectproductComponent
    });
    modal.onDidDismiss().then((data: any) => {
      if (data) {
        const vm = ShoppingItemVm.fromProductItem(data.data.item, data.data.key);
        this.createShoppingItem(vm);
      }
    });
    modal.present();
  }

  async createShoppingItem(vm) {
    const uid = await this.auth.uid();
    const id = vm ? vm.Key : '';
    const data = {
      uid,
      createdAt: Date.now(),
      ...vm
    };
    this.db.updateAt(`shoppinglist/${id}`, data);
  }
}
