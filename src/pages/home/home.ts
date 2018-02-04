import { Component, OnInit } from '@angular/core';
import { Events, NavController, AlertController } from 'ionic-angular';
import { App, ViewController } from 'ionic-angular';
import { ProductService } from '../../services/product.service';
import { NavGuard } from '../support/nav.guard';
import { AuthService } from '../../services/auth.service';
import { ShoppingItemVm } from '../../viewmodels/shoppingitemvm';
import { LogoutPage } from '../logout/logout';
import { OnDestroy } from '@angular/core/src/metadata/lifecycle_hooks';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage extends NavGuard implements OnInit, OnDestroy {

  items: ShoppingItemVm[] = [];
  displayName;

  constructor(public navCtrl: NavController,
    public auth: AuthService,
    public viewCtrl: ViewController,
    public appCtrl: App,
    public prodService: ProductService,
    public alertCtrl: AlertController,
    public events: Events) {
    super(auth, viewCtrl, appCtrl, navCtrl, alertCtrl);
    events.subscribe('user:signout', (user) => {
      console.log("home.component user logged out")
    });
    events.subscribe('user:signin', (user) => {
      console.log("home.component user signed in");
      this.displayName = user.displayName;
    });
    this.prodService.getShoppinglist().subscribe(data => this.items = Object.assign(data));
  }

  ngOnInit(): void {
    console.log("Home on init");
  }

  ngOnDestroy(): void {
    this.events.unsubscribe('user:signout');
    this.events.unsubscribe('user:signin');
  }

  addItem() {
    this.items.push(Object.assign({ Name: "sdfsdf" }));
  }

  signOut() {
    this.navCtrl.push(LogoutPage);
  }
}
