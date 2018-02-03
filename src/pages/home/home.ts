import { Component, OnInit } from '@angular/core';
import { NavController, ModalController, AlertController } from 'ionic-angular';
import { ProductService, ShoppingItem } from '../../services/product.service';
import { NavGuard } from '../support/nav.guard';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage extends NavGuard implements OnInit {

  items: ShoppingItem[] = [];
  displayName;

  constructor(public navCtrl: NavController, public auth: AuthService, public prodService: ProductService, public modalCtrl: ModalController, public alertCtrl: AlertController) {
    super(auth, modalCtrl, alertCtrl);
    // auth.authState.subscribe(user => {
    //   if (!user) {
    //     this.displayName = null;
    //     return;
    //   }
    //   this.displayName = user.displayName;
    //   prodService.getShoppinglist().subscribe(data => this.items = Object.assign(data));
    // });
  }

  ngOnInit(): void {
    console.log("Home on init");
  }

  addItem() {
    this.items.push(Object.assign({ Name: "sdfsdf" }));
  }

  signOut() {
    this.auth.signOut();
  }
}
