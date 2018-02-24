import { Component } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';


@Component({
  selector: 'page-shoppingitemview',
  templateUrl: 'shoppingitemview.html',
})
export class ShoppingItemViewPage {
  param: any;

  constructor(public viewCtrl: ViewController, public navCtrl: NavController, public navParams: NavParams) {
    this.param = navParams.get('data');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ShoppingitemviewPage');
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

}
