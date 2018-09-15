import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { App, ModalController, Events, Fab } from '@ionic/angular';
import { ProductService } from '../services/product.service';
import { ShoppingItemVm } from '../../viewmodels/shoppingitem';
import { ShoppingitemviewComponent } from './shoppingitemview/shoppingitemview.component';
import { ShoppingitemComponent } from './shoppingitem/shoppingitem.component';
import { SelectproductComponent } from './selectproduct/selectproduct.component';

@Component({
  selector: 'app-shopping',
  templateUrl: './shopping.page.html',
  styleUrls: ['./shopping.page.scss'],
})
export class ShoppingPage implements OnInit, OnDestroy {

  items: ShoppingItemVm[] = [];

  constructor(
    public auth: AuthService,
    public appCtrl: App,
    public prodService: ProductService,
    public modalCtrl: ModalController,
    public events: Events) {
  }

  ngOnInit(): void {
    console.log('Shopping on init');
  }

  ngOnDestroy(): void {
    this.events.unsubscribe('user:signout');
    this.events.unsubscribe('user:signin');
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

  async viewItem(item: any) {
    const modal = await this.modalCtrl.create({
      component: ShoppingitemviewComponent,
      componentProps: { data: item },
      showBackdrop: false
    });
    modal.onWillDismiss().then(data => {
      if ( data.role !== 'backdrop') {
        return true;
      }
    });
    return await modal.present();
  }

  async editItem(item: any) {
    const modal = await this.modalCtrl.create({
      component: ShoppingitemComponent,
      componentProps: { data: item }
    });
    modal.onDidDismiss().then(data => {
      if (data) {
        const vm = new ShoppingItemVm(data);
        this.prodService.updateShoppinglistItem(vm.Key, vm);
      }
    });
    return await modal.present();
  }

  async addItem(fab: Fab) {
    fab.close();
    const modal = await this.modalCtrl.create({
      component: ShoppingitemComponent
    });
    modal.onDidDismiss().then(data => {
      if (data) {
        const vm = new ShoppingItemVm(data);
        this.prodService.updateShoppinglistItem(vm.Key, vm);
      }
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
        const vm = ShoppingItemVm.fromProductItem(data.item, data.key);
        vm.Key = data.key;
        this.prodService.addShoppinglistItem(vm);
      }
    });
    modal.present();
  }

}
