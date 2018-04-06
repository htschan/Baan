import { Component, OnInit, OnDestroy } from '@angular/core';
import { NavController, NavParams, FabContainer, App, ModalController, Events } from 'ionic-angular';
import { SelectProductPage } from '../selectproduct/selectproduct';
import { AuthService } from '../../services/auth.service';
import { ProductService } from '../../services/product.service';
import { ShoppingItemVm } from '../../viewmodels/shoppingitemvm';
import { ShoppingItemViewPage } from '../shoppingitemview/shoppingitemview';
import { ShoppingItemPage } from '../shoppingitem/shoppingitem';
import { NavGuard } from '../support/nav.guard';


@Component({
  selector: 'page-shopping',
  templateUrl: 'shopping.html',
})
export class ShoppingPage extends NavGuard implements OnInit, OnDestroy {

  items: ShoppingItemVm[] = [];
  displayName;

  constructor(
    public auth: AuthService,
    public appCtrl: App,
    public prodService: ProductService,
    public modalCtrl: ModalController,
    public events: Events) {
    super(auth, modalCtrl, appCtrl);
    events.subscribe('user:signout', (user) => {
      console.log("home.component user logged out");
    });
    events.subscribe('user:signin', (user) => {
      console.log("home.component user signed in");
      this.displayName = user.displayName;
    });
    console.dir(AuthService);
  }

  ngOnInit(): void {
    console.log("Home on init");
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

  viewItem(item: any) {
    let modal = this.modalCtrl.create(ShoppingItemViewPage, { data: item });
    modal.present();
  }

  editItem(item: any) {
    let modal = this.modalCtrl.create(ShoppingItemPage, { data: item });
    modal.onDidDismiss(data => {
      if (data) {
        let vm = new ShoppingItemVm(data);
        this.prodService.updateShoppinglistItem(vm.Key, vm);
      }
    });
    modal.present();
  }

  addItem(fab: FabContainer) {
    fab.close();
    let modal = this.modalCtrl.create(ShoppingItemPage);
    modal.onDidDismiss(data => {
      if (data) {
        let vm = new ShoppingItemVm(data);
        this.prodService.addShoppinglistItem(vm);
      }
    });
    modal.present();
  }

  selectProduct(fab: FabContainer) {
    fab.close();
    let modal = this.modalCtrl.create(SelectProductPage);
    modal.onDidDismiss(data => {
      if (data) {
        let vm = ShoppingItemVm.fromProductItem(data.item, data.key);
        vm.Key = data.key;
        this.prodService.addShoppinglistItem(vm);
      }
    });
    modal.present();
  }
}
