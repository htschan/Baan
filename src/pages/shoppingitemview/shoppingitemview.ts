import { Component } from '@angular/core';
import { NavController, NavParams, ViewController, ModalController } from 'ionic-angular';
import { ProductService } from '../../services/product.service';
import { ShoppingItemPage } from '../shoppingitem/shoppingitem';
import { ShoppingItemVm } from '../../viewmodels/shoppingitemvm';


@Component({
  selector: 'page-shoppingitemview',
  templateUrl: 'shoppingitemview.html',
})
export class ShoppingItemViewPage {
  param: ShoppingItemVm;

  constructor(public viewCtrl: ViewController,
    public prodService: ProductService,
    public modalCtrl: ModalController,
    public navCtrl: NavController,
    public navParams: NavParams) {
    this.param = navParams.get('data') as ShoppingItemVm;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ShoppingitemviewPage');
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

  editItem(item: any) {
    let modal = this.modalCtrl.create(ShoppingItemPage, { data: item });
    modal.onDidDismiss(data => {
      if (data) {
        let vm = new ShoppingItemVm(data);
        this.prodService.updateShoppinglistItem(vm.Key, vm);
        this.param = vm;
      }
    });
    modal.present();
  }
}
