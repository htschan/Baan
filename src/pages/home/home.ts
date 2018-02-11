import { Component, OnInit } from '@angular/core';
import { Events, ModalController } from 'ionic-angular';
import { App } from 'ionic-angular';
import { ProductService } from '../../services/product.service';
import { NavGuard } from '../support/nav.guard';
import { AuthService } from '../../services/auth.service';
import { ShoppingItemVm } from '../../viewmodels/shoppingitemvm';
import { OnDestroy } from '@angular/core/src/metadata/lifecycle_hooks';
import { ShoppingItemPage } from '../shoppingitem/shoppingitem';
import { SelectProductPage } from '../selectproduct/selectproduct';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage extends NavGuard implements OnInit, OnDestroy {

  items: ShoppingItemVm[] = [];
  displayName;

  constructor(
    public auth: AuthService,
    public appCtrl: App,
    public prodService: ProductService,
    public modalCtrl: ModalController,
    public events: Events) {
    super(auth, appCtrl);
    events.subscribe('user:signout', (user) => {
      console.log("home.component user logged out");
    });
    events.subscribe('user:signin', (user) => {
      console.log("home.component user signed in");
      this.displayName = user.displayName;
    });
  }

  ngOnInit(): void {
    console.log("Home on init");
  }

  ngOnDestroy(): void {
    this.events.unsubscribe('user:signout');
    this.events.unsubscribe('user:signin');
  }

  deleteItem(key: any) {
    this.prodService.deleteShoppinglistItem(key);

  }

  editItem(item: any) {
    let modal = this.modalCtrl.create(ShoppingItemPage, { data: item });
    modal.onDidDismiss(data => {
      if (data) {
        let vm = new ShoppingItemVm(data);
        this.prodService.addShoppinglistItem(vm);
      }
    });
    modal.present();
  }

  addItem() {
    let modal = this.modalCtrl.create(ShoppingItemPage);
    modal.onDidDismiss(data => {
      if (data) {
        let vm = new ShoppingItemVm(data);
        this.prodService.addShoppinglistItem(vm);
      }
    });
    modal.present();
  }

  selectProduct(){
    let modal = this.modalCtrl.create(SelectProductPage);
    modal.onDidDismiss(data => {
      if (data) {
        let vm = new ShoppingItemVm(data);
        this.prodService.addShoppinglistItem(vm);
      }
    });
    modal.present();
  }
}
