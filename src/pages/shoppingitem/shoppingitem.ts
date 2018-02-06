import { Component } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';

@Component({
  selector: 'page-shoppingitem',
  templateUrl: 'shoppingitem.html',
})
export class ShoppingItemPage {
  myParam: string;

  constructor(public viewCtrl: ViewController, public navCtrl: NavController, public navParams: NavParams) {
    this.myParam = navParams.get('myParam');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ShoppingitemPage');
  }
  dismiss() {
    let data = { 'foo': 'bar' };
    this.viewCtrl.dismiss(data);
  }
}
