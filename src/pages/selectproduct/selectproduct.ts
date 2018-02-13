import { Component } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'page-selectproduct',
  templateUrl: 'selectproduct.html',
})
export class SelectProductPage {

  cat;
  constructor(
    public viewCtrl: ViewController,
    public navCtrl: NavController, 
    public prodService: ProductService,
    public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SelectproductPage');
  }

  selectProduct(item: any){
    this.viewCtrl.dismiss(item);
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

}
