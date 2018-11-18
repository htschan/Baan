import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { App, ModalController, Events, Fab } from '@ionic/angular';
import { ProductService } from '../services/product.service';
import { ShoppingItemVm } from '../../viewmodels/shoppingitem';
import { ShoppingitemComponent } from './shoppingitem/shoppingitem.component';
import { SelectproductComponent } from './selectproduct/selectproduct.component';
import { Router, ActivatedRoute } from '@angular/router';
import { DbService } from '../services/db.service';
import { switchMap, shareReplay } from 'rxjs/operators';
import { EdititemComponent } from './edititem/edititem.component';

@Component({
  selector: 'app-shopping',
  templateUrl: './shopping.page.html',
  styleUrls: ['./shopping.page.scss'],
})
export class ShoppingPage implements OnInit {
  constructor(
    public auth: AuthService,
    public appCtrl: App,
    public db: DbService,
    public prodService: ProductService,
    public modalCtrl: ModalController,
    public events: Events,
    private router: Router,
    private route: ActivatedRoute) {
  }

  items$;

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
  }

  trackById(idx, item) {
    return item.Key;
  }

  importantItem(key: any, val: boolean) {
    this.prodService.importantProduct(key, val);
  }

  favoriteItem(key: any, val: boolean) {
    this.prodService.favoriteProduct(key, val);
  }

  deleteItem(key: any) {
    this.prodService.deleteShoppinglistItem(key);
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
