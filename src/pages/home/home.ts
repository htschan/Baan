import { Component, OnInit } from '@angular/core';
import { Events, ModalController } from 'ionic-angular';
import { App } from 'ionic-angular';
import { ProductService } from '../../services/product.service';
import { NavGuard } from '../support/nav.guard';
import { AuthService } from '../../services/auth.service';
import { ShoppingItemVm } from '../../viewmodels/shoppingitemvm';
import { OnDestroy } from '@angular/core/src/metadata/lifecycle_hooks';
import { Subscription } from 'rxjs/Subscription';
import { ShoppingItemPage } from '../shoppingitem/shoppingitem';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage extends NavGuard implements OnInit, OnDestroy {

  items: ShoppingItemVm[] = [];
  displayName;
  shoppingListSubscription: Subscription;

  constructor(
    public auth: AuthService,
    public appCtrl: App,
    public prodService: ProductService,
    public modalCtrl: ModalController,
    public events: Events) {
    super(auth, appCtrl);
    events.subscribe('user:signout', (user) => {
      console.log("home.component user logged out");
      if (this.shoppingListSubscription && !this.shoppingListSubscription.closed)
        this.shoppingListSubscription.unsubscribe();
    });
    events.subscribe('user:signin', (user) => {
      console.log("home.component user signed in");
      this.displayName = user.displayName;
      if (!this.shoppingListSubscription)
        this.shoppingListSubscription = this.prodService.getShoppinglist().subscribe(data => this.items = Object.assign(data));
    });
  }

  ngOnInit(): void {
    console.log("Home on init");
    this.shoppingListSubscription = this.prodService.getShoppinglist().subscribe(data => this.items = Object.assign(data));
  }

  ngOnDestroy(): void {
    this.events.unsubscribe('user:signout');
    this.events.unsubscribe('user:signin');
    if (this.shoppingListSubscription && !this.shoppingListSubscription.closed)
      this.shoppingListSubscription.unsubscribe();
  }

  addItem() {
    let modal = this.modalCtrl.create(ShoppingItemPage);
    modal.onDidDismiss(data => {
      if (data) {
        console.log(data);
        this.items.push(Object.assign(data));
      }
    });
    modal.present();
  }
}
